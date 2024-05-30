const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Enes Uraz <${process.env.EMAIL_FROM}>`;
  }

  transport() {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    return nodemailer.createTransport({
      host: process.env.MAIL_TRAP_EMAIL_HOST,
      port: process.env.MAIL_TRAP_EMAIL_PORT,
      auth: {
        user: process.env.MAIL_TRAP_EMAIL_USER,
        pass: process.env.MAIL_TRAP_EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    if (process.env.NODE_ENV === "production") {
      const mailer = new MailerSend({
        apiKey: process.env.SEND_MAILER_API,
      });
      const sentFrom = new Sender(
        process.env.SEND_MAILER_USERNAME,
        "Enes Uraz"
      );

      const recipients = [new Recipient(this.to, this.firstName)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(html)
        .setText(convert(html));

      await mailer.email.send(emailParams);
    } else {
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };

      await this.transport().sendMail(mailOptions);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the TimelessTrails Family!");
  }

  async passwordReset() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
