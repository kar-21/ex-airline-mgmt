const request = require("request");
const google = require("googleapis");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/user.schema");
const env = require("../environments/env.envirornment");

exports.loginUrl = (req, res, next) => {
  const message = { redirectURI: urlGoogle() };
  res.send(message);
};

exports.redirectURI = (req, res, next) => {
  getGoogleAccountFromCode(req.query.code, res);
};

const googleConfig = {
  clientId: env.env.google.clientId,
  clientSecret: env.env.google.clientSecret,
  redirect: env.env.google.redirect,
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
      if (!(await userSchema.findOne({ userId: body.sub }))) {
        const userData = new userSchema({
          userId: body.sub,
          emailId: body.email,
          givenName: body.given_name,
          fullName: body.name,
          photoURL: body.picture,
          role: "staff",
        });
        await userData.save();
      }

      const token = jwt.sign(
        { userId: body.sub, givenName: body.given_name },
        env.env.secret,
        {
          expiresIn: "1d",
        }
      );

      response.cookie("token", token);
      response.redirect(env.env.frontendAPI);
    }
  );
};
