import crypto from "crypto";
import { sendOrderMail, sendOrderNo } from "../email.js";

export const mailController = async (req, res) => {
  try {
    const { firstName, email, phone, location, date, time, description } =
      req.body;
    const orderNo = crypto.randomBytes(3).toString("hex");

    const mailData = {
      firstName,
      email,
      phone,
      location,
      date,
      time,
      description,
      orderNo: `EMAC-${orderNo}`,
    };

    sendOrderMail(mailData).then(() => {
      console.log("Order Mail sent");
    });

    sendOrderNo(mailData).then(() => {
      console.log("Customer Order No Sent!");
    });
    return res.status(200).json({
      message: "Order has been requested",
      data: mailData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
