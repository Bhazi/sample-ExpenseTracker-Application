const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const path = require("path");

exports.getForgotPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "views",
      "Authentication",
      "forgotPasswordForm.html"
    )
  );
};

exports.postForgotPassword = (req, res) => {
  const tranEmailapi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "ibasimk@gmail.com",
    name: "GuyTechne",
  };

  const receivers = [{ email: req.body.email }];

  tranEmailapi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset Password Link",
      textContent: `
    Habeebi`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch(console.log);
};
