import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message, to } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      // Fallback: log to console if no API key
      console.log("Contact form submission (no RESEND_API_KEY):", { name, email, message, to });
      return NextResponse.json({ success: true, mode: "logged" });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    const recipient = to || process.env.CONTACT_EMAIL || "info@romano.studio";

    await resend.emails.send({
      from: "Site Builder <noreply@romano.studio>",
      to: recipient,
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 100px;">Name:</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Nachricht:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Gesendet über Site Builder · romano.studio
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Fehler beim Senden. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
