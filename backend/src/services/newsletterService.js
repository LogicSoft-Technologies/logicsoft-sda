import nodemailer from "nodemailer";

import { buildNewsletterCampaignEmail } from "../emails/newsletterCampaignEmail.js";
import { buildNewsletterConfirmationEmail } from "../emails/newsletterConfirmationEmail.js";
import { buildNewsletterWelcomeEmail } from "../emails/newsletterWelcomeEmail.js";

const FRONTEND_URL = (
  process.env.FRONTEND_URL || "https://logicsofttechnologies.com"
).replace(/\/$/, "");

const BACKEND_PUBLIC_URL = (
  process.env.BACKEND_PUBLIC_URL || FRONTEND_URL
).replace(/\/$/, "");

let mailTransporter;

function getTransporter() {
  if (!mailTransporter) {
    mailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return mailTransporter;
}

function fromAddress() {
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not configured.");
  }

  return `"LogicSoft Technologies" <${process.env.SMTP_USER}>`;
}

export async function sendNewsletterConfirmation({
  email,
  firstName,
  confirmationToken,
}) {
  const confirmationUrl =
    `${BACKEND_PUBLIC_URL}/api/newsletter/confirm?token=${confirmationToken}`;

  return getTransporter().sendMail({
    from: fromAddress(),
    to: email,
    subject: "Confirm your LogicSoft Insights subscription",
    html: buildNewsletterConfirmationEmail({
      confirmationUrl,
      firstName,
    }),
  });
}

export async function sendNewsletterWelcome({
  email,
  firstName,
  unsubscribeToken,
}) {
  const unsubscribeUrl =
    `${BACKEND_PUBLIC_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  return getTransporter().sendMail({
    from: fromAddress(),
    to: email,
    subject: "Welcome to LogicSoft Insights",
    html: buildNewsletterWelcomeEmail({
      firstName,
      blogUrl: `${FRONTEND_URL}/blog`,
      unsubscribeUrl,
    }),
  });
}

export async function sendNewsletterPreview({
  email,
  edition,
  unsubscribeToken,
}) {
  const unsubscribeUrl =
    `${BACKEND_PUBLIC_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  return getTransporter().sendMail({
    from: fromAddress(),
    to: email,
    subject: `[Preview] ${edition.subject}`,
    html: buildNewsletterCampaignEmail({
      title: edition.title,
      htmlContent: edition.htmlContent,
      unsubscribeUrl,
    }),
  });
}