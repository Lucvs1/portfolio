import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TARGET_EMAIL = process.env.CONTACT_TO_EMAIL || "lucasbezerracontact0@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validação de campos obrigatórios
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Nome inválido ou muito curto." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "E-mail com formato inválido." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Mensagem vazia ou muito curta." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject ? String(subject).trim() : "Oportunidade de Engenharia";
    const cleanMessage = message.trim();
    const formattedDate = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const emailSubject = `[Portfólio] ${cleanSubject} - ${cleanName}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 32px 16px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
          .header { background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); padding: 28px 32px; border-bottom: 1px solid #059669; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #34d399; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; font-family: monospace; }
          .content { padding: 32px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #a1a1aa; font-family: monospace; margin-bottom: 4px; }
          .value { font-size: 15px; color: #ffffff; font-weight: 500; }
          .value a { color: #34d399; text-decoration: none; }
          .message-box { background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; font-family: inherit; margin-top: 8px; }
          .footer { background-color: #09090b; padding: 18px 32px; font-size: 11px; color: #71717a; border-top: 1px solid #27272a; font-family: monospace; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚡ Novo Despacho Recebido pelo Portfólio</h1>
            <p>Data: ${formattedDate} (BRT)</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Remetente</div>
              <div class="value">${cleanName}</div>
            </div>
            <div class="field">
              <div class="label">E-mail de Contato</div>
              <div class="value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></div>
            </div>
            <div class="field">
              <div class="label">Tipo de Proposta / Assunto</div>
              <div class="value">${cleanSubject}</div>
            </div>
            <div class="field">
              <div class="label">Mensagem</div>
              <div class="message-box">${cleanMessage}</div>
            </div>
          </div>
          <div class="footer">
            <span>Portfolio Engine • Lucas Bezerra</span>
            <span>Resposta direta: clique em Responder</span>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Prioridade: Envio via RESEND
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      let recipient = process.env.CONTACT_TO_EMAIL || "lucasbezerradev1@gmail.com";
      let resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Portfolio Lucas <onboarding@resend.dev>",
          to: [recipient],
          reply_to: cleanEmail,
          subject: emailSubject,
          html: htmlContent,
        }),
      });

      // Se falhar devido à restrição do domínio de onboarding do Resend, redireciona para a conta do usuário
      if (!resendRes.ok) {
        const errJson = await resendRes.json().catch(() => ({}));
        if (
          errJson.message &&
          typeof errJson.message === "string" &&
          errJson.message.includes("lucasbezerradev1@gmail.com")
        ) {
          recipient = "lucasbezerradev1@gmail.com";
          resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: process.env.RESEND_FROM || "Portfolio Lucas <onboarding@resend.dev>",
              to: [recipient],
              reply_to: cleanEmail,
              subject: emailSubject,
              html: htmlContent,
            }),
          });
        } else {
          console.error("[Resend Error]", errJson);
          return NextResponse.json(
            {
              success: false,
              error: errJson.message || "Falha ao enviar através do provedor Resend.",
              details: errJson,
            },
            { status: 502 }
          );
        }
      }

      if (!resendRes.ok) {
        const errorData = await resendRes.json().catch(() => ({}));
        console.error("[Resend Retry Error]", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Falha ao enviar através do provedor Resend.",
            details: errorData,
          },
          { status: 502 }
        );
      }

      const data = await resendRes.json();
      return NextResponse.json({
        success: true,
        provider: "resend",
        id: data.id,
      });
    }

    // 2. Prioridade: Envio via NODEMAILER (Gmail ou Servidor SMTP dedicado)
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpUser =
      process.env.SMTP_USER || process.env.GMAIL_USER || TARGET_EMAIL;

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_PORT
          ? Number(process.env.SMTP_PORT) === 465
          : true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${cleanName} (Portfólio)" <${smtpUser}>`,
        to: TARGET_EMAIL,
        replyTo: cleanEmail,
        subject: emailSubject,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        provider: "smtp",
      });
    }

    // 3. Caso nenhuma credencial esteja configurada no servidor (.env.local)
    return NextResponse.json(
      {
        success: false,
        configured: false,
        message:
          "Provedor de e-mail ainda não configurado no servidor. Configure RESEND_API_KEY ou SMTP em .env.local para entrega 100% automatizada.",
      },
      { status: 501 }
    );
  } catch (err: unknown) {
    console.error("[API Contact Route Error]", err);
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido ao processar requisição.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
