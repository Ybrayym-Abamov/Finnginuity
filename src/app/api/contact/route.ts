import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "info@finnginuity.com";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await req.json();
  const { name, email, phone, message } = body as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Finnginuity Contact Form <onboarding@resend.dev>",
    to: [TO_EMAIL],
    replyTo: email,
    subject: `New message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      ``,
      `Message:`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:4px">New contact form submission</h2>
        <p style="color:#666;margin-top:0">Sent from finnginuity.com</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;width:100px;color:#888">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${phone}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px">
          <p style="color:#888;margin-bottom:8px;font-size:12px;text-transform:uppercase;letter-spacing:.05em">Message</p>
          <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-radius:8px;margin:0">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
