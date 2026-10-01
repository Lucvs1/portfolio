const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const resumeData = {
  pt: {
    fileName: 'Lucas_Cabral_Curriculo.pdf',
    titleRole: 'Engenheiro de Software | Full Stack & UI/UX Developer',
    contact: 'Rio de Janeiro, Brasil  |  lucasbezerracontact0@gmail.com  |  linkedin.com/in/lucas-bezerra-51030b303  |  github.com/Lucvs1',
    sections: {
      summaryTitle: 'Resumo Profissional',
      summary: 'Engenheiro de Software com solida base tecnica forjada no curso tecnico de Automacao Industrial (Firjan SENAI) e graduacao em Engenharia de Software. Especialista no desenvolvimento de aplicacoes web de alta performance e interfaces fluidas com Next.js, TypeScript e GSAP, arquitetura de APIs RESTful e microsservicos assincronos com rigor analitico em tolerancia a falhas.',
      educationTitle: 'Formacao Academica & Tecnica',
      edu1: {
        title: 'Graduacao em Engenharia de Software',
        meta: 'Anhanguera | Previsao: 2027',
        desc: 'Enfase em engenharia de requisitos, microsservicos, arquitetura orientada a eventos, seguranca e boas praticas de engenharia de software.',
      },
      edu2: {
        title: 'Tecnico em Automacao Industrial',
        meta: 'Firjan SENAI | Concluido: 2022',
        desc: 'Programacao de Controladores Logicos Programaveis (CLP), instrumentacao industrial, redes de comunicacao (Modbus/Ethernet) e controle de processos de missao critica.',
      },
      projectsTitle: 'Projetos Selecionados em Producao',
      p1: {
        title: 'ROTA BGR (Web Application)',
        meta: 'Deploy: rotabgr.vercel.app',
        stack: 'Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP',
        desc: 'Aplicacao web interativa para corporacao policial em GTA RP/MTA. Inclui painel administrativo completo, catalogo de viaturas e fardas, hall de Legends e sistema de recrutamento com integracao Discord Webhook e emissao de dossie em PDF.',
      },
      p2: {
        title: 'Cantinho da Cigana (E-commerce Cultural & Leitura Cigana)',
        meta: 'Deploy: cantinhodacigana.vercel.app',
        stack: 'Stack: Next.js, React, Tailwind CSS, Design System, UI/UX Mistico',
        desc: 'Plataforma de comercio eletronico e cultura com foco central no agendamento de leitura de baralho cigano e venda de conteudos tematicos, alcancando excelente pontuacao Core Web Vitals.',
      },
      p3: {
        title: 'Bot Gateway Pro (Bot Discord de Pagamentos & Entregas)',
        meta: 'GitHub: github.com/Lucvs1',
        stack: 'Stack: Discord.js, Mercado Pago, Stripe, Node.js, Webhooks Assincronos',
        desc: 'Bot de Discord para monetizacao nativa com checkout via PIX e Cartao/Cripto. Atribui cargos automaticamente e despacha arquivos e conteudos comprados diretamente aos clientes logo apos o pagamento.',
      },
      skillsTitle: 'Arsenal Tecnologico & Competencias',
      skills: [
        { cat: 'Front-end & Creative Dev:', list: 'Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Lenis Scroll, HTML5/CSS3.' },
        { cat: 'Back-end & Infraestrutura:', list: 'Node.js, Express, RESTful APIs, MySQL, Docker, Bash/Shell Scripting, Git/GitHub, Vercel.' },
        { cat: 'Design, UI/UX & Metodologias:', list: 'Figma, Design Systems, Adobe Photoshop, Illustrator, Prototipacao, Microinteracoes, A11y.' },
      ],
      footerText: 'Curriculum Vitae • Lucas Bezerra de Menezes Cabral • Engenharia de Software',
    },
  },
  en: {
    fileName: 'Lucas_Cabral_Resume.pdf',
    titleRole: 'Software Engineer | Full Stack & UI/UX Developer',
    contact: 'Rio de Janeiro, Brazil  |  lucasbezerracontact0@gmail.com  |  linkedin.com/in/lucas-bezerra-51030b303  |  github.com/Lucvs1',
    sections: {
      summaryTitle: 'Professional Summary',
      summary: 'Software Engineer with a solid analytical background forged through Industrial Automation technical training (Firjan SENAI) and an ongoing degree in Software Engineering. Specialized in architecting high-performance web applications and fluid interfaces with Next.js, TypeScript, and GSAP, RESTful API architecture, and asynchronous microservices with analytical rigor in fault tolerance.',
      educationTitle: 'Education & Technical Background',
      edu1: {
        title: 'B.S. in Software Engineering',
        meta: 'Anhanguera | Expected: 2027',
        desc: 'Emphasis on requirements engineering, microservices, event-driven architecture, cybersecurity, and modern software engineering practices.',
      },
      edu2: {
        title: 'Industrial Automation Technician',
        meta: 'Firjan SENAI | Completed: 2022',
        desc: 'Programming of Programmable Logic Controllers (PLC), industrial instrumentation, field communication networks (Modbus/Ethernet), and mission-critical process control.',
      },
      projectsTitle: 'Selected Production Projects',
      p1: {
        title: 'ROTA BGR (Web Application)',
        meta: 'Deploy: rotabgr.vercel.app',
        stack: 'Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP',
        desc: 'Interactive web platform for a GTA RP/MTA police department. Features complete admin dashboard, patrol fleet & uniforms catalog, Legends memorial, and recruitment system with Discord Webhook and PDF dossier generation.',
      },
      p2: {
        title: 'Cantinho da Cigana (Cultural E-commerce & Tarot Platform)',
        meta: 'Deploy: cantinhodacigana.vercel.app',
        stack: 'Stack: Next.js, React, Tailwind CSS, Design System, Mystical UI/UX',
        desc: 'Cultural e-commerce and platform focused on Gypsy Tarot readings booking and themed content sales, achieving elite Core Web Vitals scores and conversion-oriented UX.',
      },
      p3: {
        title: 'Bot Gateway Pro (Discord Payments & Delivery Bot)',
        meta: 'GitHub: github.com/Lucvs1',
        stack: 'Stack: Discord.js, Mercado Pago, Stripe, Node.js, Async Webhooks',
        desc: 'Discord bot for in-app monetization with instant PIX and Card/Crypto checkout. Automatically grants server roles and delivers purchased digital files directly to buyers post-sale.',
      },
      skillsTitle: 'Technical Arsenal & Competencies',
      skills: [
        { cat: 'Front-end & Creative Dev:', list: 'Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Lenis Scroll, HTML5/CSS3.' },
        { cat: 'Back-end & Infrastructure:', list: 'Node.js, Express, RESTful APIs, MySQL, Docker, Bash/Shell Scripting, Git/GitHub, Vercel.' },
        { cat: 'Design, UI/UX & Methodologies:', list: 'Figma, Design Systems, Adobe Photoshop, Illustrator, Prototyping, Fluid UX, A11y.' },
      ],
      footerText: 'Curriculum Vitae • Lucas Bezerra de Menezes Cabral • Software Engineering',
    },
  },
};

async function generateSingleResume(langKey) {
  const data = resumeData[langKey];
  const pdfDoc = await PDFDocument.create();
  // A4 size: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Paleta de cores corporativa sofisticada
  const primaryColor = rgb(0.06, 0.09, 0.16); // Slate 900
  const emeraldColor = rgb(0.08, 0.64, 0.35); // Emerald 600
  const secondaryColor = rgb(0.3, 0.35, 0.45); // Slate 600
  const bodyColor = rgb(0.18, 0.22, 0.28); // Slate 800
  const borderColor = rgb(0.85, 0.88, 0.92); // Slate 200

  const margin = 40;
  let y = height - 45;

  // Barra de destaque topo
  page.drawRectangle({
    x: 0,
    y: height - 6,
    width: width,
    height: 6,
    color: emeraldColor,
  });

  // Nome Principal
  page.drawText('LUCAS BEZERRA DE MENEZES CABRAL', {
    x: margin,
    y: y,
    size: 19,
    font: fontBold,
    color: primaryColor,
  });

  y -= 18;

  // Subtítulo / Especialidade
  page.drawText(data.titleRole, {
    x: margin,
    y: y,
    size: 11,
    font: fontBold,
    color: emeraldColor,
  });

  y -= 16;

  // Dados de Contato e Links
  page.drawText(data.contact, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });

  y -= 14;

  // Linha divisória horizontal
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 1,
    color: borderColor,
  });

  y -= 20;

  // Helper para títulos de seção
  function drawSectionTitle(title) {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 10,
      font: fontBold,
      color: emeraldColor,
    });
    page.drawLine({
      start: { x: margin, y: y - 4 },
      end: { x: width - margin, y: y - 4 },
      thickness: 0.8,
      color: borderColor,
    });
    y -= 18;
  }

  // Helper para quebra de texto justificado/multilinha
  function drawWrappedText(text, x, fontSize, font, color, maxWidth, lineHeight) {
    const words = text.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxWidth && currentLine) {
        page.drawText(currentLine, { x, y, size: fontSize, font, color });
        y -= lineHeight;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, { x, y, size: fontSize, font, color });
      y -= lineHeight;
    }
  }

  // 1. RESUMO PROFISSIONAL
  drawSectionTitle(data.sections.summaryTitle);
  drawWrappedText(data.sections.summary, margin, 8.8, fontRegular, bodyColor, width - margin * 2, 13);
  y -= 10;

  // 2. FORMAÇÃO ACADÊMICA & TÉCNICA
  drawSectionTitle(data.sections.educationTitle);

  // Edu 1
  page.drawText(data.sections.edu1.title, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(data.sections.edu1.meta, {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 13;
  drawWrappedText(data.sections.edu1.desc, margin + 8, 8.5, fontRegular, secondaryColor, width - margin * 2 - 8, 12);
  y -= 6;

  // Edu 2
  page.drawText(data.sections.edu2.title, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(data.sections.edu2.meta, {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 13;
  drawWrappedText(data.sections.edu2.desc, margin + 8, 8.5, fontRegular, secondaryColor, width - margin * 2 - 8, 12);
  y -= 10;

  // 3. PROJETOS SELECIONADOS EM PRODUÇÃO
  drawSectionTitle(data.sections.projectsTitle);

  // P1 - ROTA BGR
  page.drawText(data.sections.p1.title, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(data.sections.p1.meta, {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText(data.sections.p1.stack, {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText(data.sections.p1.desc, margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);
  y -= 6;

  // P2 - Cantinho da Cigana
  page.drawText(data.sections.p2.title, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(data.sections.p2.meta, {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText(data.sections.p2.stack, {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText(data.sections.p2.desc, margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);
  y -= 6;

  // P3 - Bot Gateway Pro
  page.drawText(data.sections.p3.title, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(data.sections.p3.meta, {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText(data.sections.p3.stack, {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText(data.sections.p3.desc, margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);
  y -= 10;

  // 4. ARSENAL DE TECNOLOGIAS
  drawSectionTitle(data.sections.skillsTitle);

  data.sections.skills.forEach(s => {
    page.drawText(s.cat, {
      x: margin,
      y: y,
      size: 8.5,
      font: fontBold,
      color: primaryColor,
    });
    page.drawText(s.list, {
      x: margin + 140,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: secondaryColor,
    });
    y -= 14;
  });

  // Rodapé do documento
  page.drawLine({
    start: { x: margin, y: 35 },
    end: { x: width - margin, y: 35 },
    thickness: 0.5,
    color: borderColor,
  });

  page.drawText(data.sections.footerText, {
    x: margin,
    y: 24,
    size: 7.5,
    font: fontRegular,
    color: secondaryColor,
  });

  page.drawText('1/1', {
    x: width - margin - 15,
    y: 24,
    size: 7.5,
    font: fontBold,
    color: secondaryColor,
  });

  const pdfBytes = await pdfDoc.save();
  const outPath = path.join(__dirname, '..', 'public', data.fileName);
  fs.writeFileSync(outPath, pdfBytes);
  console.log(`[${langKey.toUpperCase()}] PDF gerado com sucesso em: ${outPath} (y final restante: ${Math.round(y)})`);
}

async function main() {
  await generateSingleResume('pt');
  await generateSingleResume('en');
}

main().catch(console.error);
