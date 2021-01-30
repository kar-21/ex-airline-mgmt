const request = require("request");
const google = require("googleapis");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/user.schema");

exports.loginUrl = (req, res, next) => {
  const message = { redirectURI: urlGoogle() };
  res.send(message);
};

exports.redirectURI = (req, res, next) => {
  getGoogleAccountFromCode(req.query.code, res);
};

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECEET,
  redirect:
    process.env.NODE_ENV === "development"
      ? process.env.GOOGLE_DEV_REDIRECT
      : process.env.GOOGLE_PROD_REDIRECT,
};

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

createConnection = () => {
  return new google.google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    acces_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
};

urlGoogle = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

getGoogleAccountFromCode = async (code, response) => {
  console.log(code);
  const auth = createConnection();

  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  request(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.id_token}`,
    { json: true },
    async (err, res, body) => {
      if (err) {
        response
          .status(500)
          .send(`some unexpected/uncaught async exception is thrown ${err}`);
      }
      let token;
      if (!(await userSchema.findOne({ userId: body.sub }))) {
        console.log(">>>data creation");
        const userData = new userSchema({
          userId: body.sub,
          emailId: body.email,
          givenName: body.given_name,
          fullName: body.name,
          photoURL: body.picture,
          role: "staff",
        });
        await userData.save();
        token = jwt.sign(
          { userId: body.sub, givenName: body.given_name, role: "staff" },
          process.env.SECRET,
          {
            expiresIn: "1d",
          }
        );
      } else {
        const user = await userSchema.findOne({ userId: body.sub });
        token = jwt.sign(
          { userId: user.userId, givenName: user.givenName, role: user.role },
          process.env.SECRET,
          {
            expiresIn: "1d",
          }
        );
      }

      response.cookie("token", token);
      response.redirect(
        process.env.NODE_ENV === "development"
          ? process.env.FRONTEND_DEV_API
          : process.env.FRONTEND_PROD_API
      );
    }
  );
};
