import { renderFile } from "ejs";
import { createTransport } from "nodemailer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendOrderMail = async (data) => {
  try {
    const transport = createTransport({
      host: "wghp3.wghservers.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailData = data;

    console.log(mailData);

    const locateEJSFile = join(__dirname, "./views/mail.ejs");
    const readFile = await renderFile(locateEJSFile, mailData);

    const mailer = {
      from: `Order is placed <${process.env.EMAIL}>`,
      to: "pickup@emacdinoclean.ng",
      subject: "ORDER FOR YOUR SERVICE HAS BEEN REQUESTED",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.error(error);
  }
};

export const sendOrderNo = async (data) => {
  try {
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailData = data;

    console.log(mailData);

    const locateEJSFile = join(__dirname, "./views/customer.ejs");
    const readFile = await renderFile(locateEJSFile, mailData);

    const mailer = {
      from: `You placed an order <${process.env.EMAIL}>`,
      to: data.email,
      subject: "Your Order has been recieved",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.error(error);
  }
};
