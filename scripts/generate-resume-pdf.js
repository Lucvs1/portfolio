const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createResume() {
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
  const lightBg = rgb(0.96, 0.97, 0.99); // Slate 50

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
  page.drawText('Engenheiro de Software | Full Stack & UI/UX Developer', {
    x: margin,
    y: y,
    size: 11,
    font: fontBold,
    color: emeraldColor,
  });

  y -= 16;

  // Dados de Contato e Links
  const contactText = 'Rio de Janeiro, Brasil  |  lucasbezerracontact0@gmail.com  |  linkedin.com/in/lucas-bezerra-51030b303  |  github.com/Lucvs1';
  page.drawText(contactText, {
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

  // SEÇÃO: RESUMO PROFISSIONAL
  drawSectionTitle('Resumo Profissional');
  const summary = 'Engenheiro de Software com solida base tecnica forjada no curso tecnico de Automacao Industrial (Firjan SENAI) e graduacao em Engenharia de Software. Especialista no desenvolvimento de aplicacoes web de alta performance e fidelidade visual em 60 FPS com Next.js, TypeScript e GSAP, arquitetura de APIs RESTful e microsservicos assincronos com rigor analitico em tolerancia a falhas.';
  drawWrappedText(summary, margin, 8.8, fontRegular, bodyColor, width - margin * 2, 13);

  y -= 10;

  // SEÇÃO: FORMAÇÃO ACADÊMICA & TÉCNICA
  drawSectionTitle('Formacao Academica & Tecnica');

  // Anhanguera
  page.drawText('Graduacao em Engenharia de Software', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText('Anhanguera | Previsao: 2027', {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 13;
  drawWrappedText('Enfase em engenharia de requisitos, microsservicos, arquitetura orientada a eventos, seguranca e boas praticas de engenharia de software.', margin + 8, 8.5, fontRegular, secondaryColor, width - margin * 2 - 8, 12);

  y -= 6;

  // SENAI
  page.drawText('Tecnico em Automacao Industrial', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText('Firjan SENAI | Concluido: 2022', {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 13;
  drawWrappedText('Programacao de Controladores Logicos Programaveis (CLP), instrumentacao industrial, redes de comunicacao (Modbus/Ethernet) e controle de processos de missao critica.', margin + 8, 8.5, fontRegular, secondaryColor, width - margin * 2 - 8, 12);

  y -= 10;

  // SEÇÃO: PROJETOS SELECIONADOS EM PRODUÇÃO
  drawSectionTitle('Projetos Selecionados em Producao');

  // Projeto 1
  page.drawText('ROTA BGR (Web Application)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText('Deploy: rotabgr.vercel.app', {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText('Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP Animations', {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText('Plataforma web interativa de alta performance voltada para comunidade e operacoes. Mantem 99.98% de uptime, renderizacao estavel a 60 FPS e latencia inferior a 25ms.', margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);

  y -= 6;

  // Projeto 2
  page.drawText('Cantinho da Cigana (E-commerce)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText('Deploy: cantinhodacigana.vercel.app', {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText('Stack: React, Next.js, Modern CSS, Design System, UI/UX de Alta Conversao', {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText('Plataforma de comercio eletronico completa com catalogo responsivo de produtos, navegacao fluida e arquitetura orientada a taxas elevadas de conversao.', margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);

  y -= 6;

  // Projeto 3
  page.drawText('Bot Gateway Pro (Microsservico de Backend & Webhooks)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText('GitHub: github.com/Lucvs1', {
    x: width - margin - 150,
    y: y,
    size: 8.5,
    font: fontBold,
    color: emeraldColor,
  });
  y -= 12;
  page.drawText('Stack: Node.js, Express, Docker, RESTful Architecture, Pipelines Assincronos', {
    x: margin + 8,
    y: y,
    size: 8,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 12;
  drawWrappedText('Engine assincrona de alta vazao para ingestao, roteamento e despacho de mensagens e webhooks corporativos, com latencia de processamento inferior a 1.5ms.', margin + 8, 8.5, fontRegular, bodyColor, width - margin * 2 - 8, 12);

  y -= 10;

  // SEÇÃO: ARSENAL DE TECNOLOGIAS
  drawSectionTitle('Arsenal Tecnologico & Competencias');

  const skills = [
    { cat: 'Front-end & Creative Dev:', list: 'Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Lenis Scroll, HTML5/CSS3.' },
    { cat: 'Back-end & Infraestrutura:', list: 'Node.js, Express, RESTful APIs, MySQL, Docker, Bash/Shell Scripting, Git/GitHub, Vercel.' },
    { cat: 'Design, UI/UX & Metodologias:', list: 'Figma, Design Systems, Adobe Photoshop, Illustrator, Prototipacao, Microinteracoes, A11y.' },
  ];

  skills.forEach(s => {
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

  page.drawText('Curriculum Vitae • Lucas Bezerra de Menezes Cabral • Engenharia de Software', {
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
  const outPath = path.join(__dirname, '..', 'public', 'Lucas_Cabral_Curriculo.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('PDF gerado com sucesso em:', outPath);
}

createResume().catch(console.error);
