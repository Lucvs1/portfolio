"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type Language = "pt" | "en";

export interface Translations {
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
    commands: string;
    talk: string;
    switchLang: string;
    switchLangTitle: string;
  };
  hero: {
    badgeLocation: string;
    badgeRole: string;
    titleLine1: string;
    titleLine2: string;
    subtitleGreeting: string;
    subtitleName: string;
    subtitleText: string;
    exploreBtn: string;
    contactBtn: string;
    terminalBtn: string;
    terminalActive: string;
    scrollDown: string;
    statsNext: string;
    statsNextSub: string;
    statsFps: string;
    statsFpsSub: string;
    statsFull: string;
    statsFullSub: string;
    statsUi: string;
    statsUiSub: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    card1Date: string;
    card1Title: string;
    card1Desc: string;
    card2Date: string;
    card2Title: string;
    card2Desc: string;
    card3Date: string;
    card3Title: string;
    card3Desc: string;
    tabFlow: string;
    tabSimulator: string;
    labBadge: string;
    labTitle: string;
    flowBadge: string;
    flowTitle: string;
    pipelineStatus: string;
    stageLabel: string;
    stage1Name: string;
    stage1Subtitle: string;
    stage1Specs: [string, string, string];
    stage1TelemetryLabel: string;
    stage1TelemetryValue: string;
    stage2Name: string;
    stage2Subtitle: string;
    stage2Specs: [string, string, string];
    stage2TelemetryLabel: string;
    stage2TelemetryValue: string;
    stage3Name: string;
    stage3Subtitle: string;
    stage3Specs: [string, string, string];
    stage3TelemetryLabel: string;
    stage3TelemetryValue: string;
    flowTrailLabel: string;
    flowTrailStep1: string;
    flowTrailStep2: string;
    flowTrailStep3: string;
    flowTrailFooter: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    viewCaseStudy: string;
    accessPlatform: string;
    repository: string;
    online: string;
    statusActive: string;
    uptime: string;
    performance: string;
    trafficFlow: string;
    responseTime: string;
    catalogActive: string;
    asyncPipeline: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    resumeBtn: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    copyEmail: string;
    copied: string;
    quickDispatchTitle: string;
    quickDispatchBadge: string;
    statusAvailable: string;
    replyTime: string;
    inquiryTypeLabel: string;
    inquiryOpt1: string;
    inquiryOpt2: string;
    inquiryOpt3: string;
    inquiryOpt4: string;
    messagePlaceholder: string;
    sendingEmail: string;
    successSentTitle: string;
    successSentDesc: string;
    fallbackConfigNotice: string;
    fallbackEmailBtn: string;
    sendAnotherBtn: string;
    errorTitle: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    backToTop: string;
  };
  simulator: {
    badge: string;
    title: string;
    subtitle: string;
    controllerModel: string;
    statusRunning: string;
    statusStopped: string;
    statusEmergency: string;
    btnStart: string;
    btnStop: string;
    btnSensor: string;
    btnEstop: string;
    btnReset: string;
    unitsProduced: string;
    pressure: string;
    scanTime: string;
    efficiency: string;
    conveyorLabel: string;
    pistonLabel: string;
    sensorLabel: string;
    emergencyBanner: string;
  };
  caseStudy: {
    badge: string;
    modalTitle: string;
    tabChallenge: string;
    tabArchitecture: string;
    tabMetrics: string;
    viewLive: string;
    viewGithub: string;
    close: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      skills: "Habilidades",
      contact: "Contato",
      commands: "Comandos",
      talk: "Falar Comigo",
      switchLang: "EN",
      switchLangTitle: "Mudar idioma para Inglês",
    },
    hero: {
      badgeLocation: "Rio de Janeiro, BR",
      badgeRole: "Software & Creative Engineer",
      titleLine1: "Engenharia &",
      titleLine2: "Design Fluido",
      subtitleGreeting: "Olá, sou ",
      subtitleName: "Lucas Bezerra",
      subtitleText:
        ". Combino o rigor analítico da automação industrial com a engenharia de software full stack e design de alta fidelidade para conceber experiências digitais cinematográficas e escaláveis.",
      exploreBtn: "Explorar Projetos",
      contactBtn: "Entrar em Contato",
      terminalBtn: "Terminal CLI",
      terminalActive: "Ativo",
      scrollDown: "Rolar para baixo",
      statsNext: "Next.js 16",
      statsNextSub: "App Router & RSC",
      statsFps: "60 FPS",
      statsFpsSub: "GSAP + Lenis Smooth",
      statsFull: "Full Stack",
      statsFullSub: "Node, APIs & Docker",
      statsUi: "UI / UX",
      statsUiSub: "Design Systems & Figma",
    },
    about: {
      badge: "[01 // Filosofia de Engenharia]",
      title: "Do chão de fábrica à alta fidelidade digital.",
      subtitle:
        "Minha trajetória une a precisão cirúrgica da Automação Industrial com o dinamismo da Engenharia de Software contemporânea.",
      card1Date: "Firjan SENAI • 2022",
      card1Title: "Automação Industrial",
      card1Desc:
        "Formação técnica de base que consolidou raciocínio lógico, tolerância zero a falhas, instrumentação de processos e arquitetura resiliente.",
      card2Date: "Anhanguera • Prev. 2027",
      card2Title: "Engenharia de Software",
      card2Desc:
        "Aprofundamento contínuo em algoritmos, arquitetura orientada a serviços, microsserviços, escalabilidade web e engenharia de software full stack.",
      card3Date: "Creative Development",
      card3Title: "Design & Microinterações",
      card3Desc:
        "Domínio de Figma, Tailwind CSS e GSAP para entregar interfaces ricas, tipografia escultural, microinterações a 60fps e acessibilidade exemplar.",
      tabFlow: "Arquitetura do Fluxo Industrial",
      tabSimulator: "Playground CLP (Simulador)",
      labBadge: "[INTERAÇÃO // CHÃO DE FÁBRICA ➔ CLOUD]",
      labTitle: "Laboratório & Visualizador",
      flowBadge: "[Pipeline Integrado • Engenharia de Automação ➔ Nuvem]",
      flowTitle: "Da Instrumentação de Campo à Experiência Digital Reativa",
      pipelineStatus: "Status do Pipeline: Ativo",
      stageLabel: "ETAPA",
      stage1Name: "Chão de Fábrica & CLP",
      stage1Subtitle: "Base Firjan SENAI (2022)",
      stage1Specs: [
        "Modbus / Redes Industriais",
        "Lógica Ladder & Automação",
        "Tolerância Zero a Falhas",
      ],
      stage1TelemetryLabel: "Sinal I/O",
      stage1TelemetryValue: "4-20mA Estável",
      stage2Name: "Gateway API & Broker",
      stage2Subtitle: "Node.js & Infraestrutura",
      stage2Specs: [
        "Pipelines Assíncronos",
        "Orquestração Docker",
        "APIs RESTful Escaláveis",
      ],
      stage2TelemetryLabel: "Throughput",
      stage2TelemetryValue: "< 1.5ms Latência",
      stage3Name: "Interface Reativa 60 FPS",
      stage3Subtitle: "Next.js 16 & Creative Dev",
      stage3Specs: [
        "GSAP + Lenis Smooth",
        "Design System & Figma",
        "Acessibilidade & Micro-UX",
      ],
      stage3TelemetryLabel: "Taxa de Quadro",
      stage3TelemetryValue: "60 FPS Custo Zero",
      flowTrailLabel: "FLUXO ARQUITETURAL:",
      flowTrailStep1: "Sinais Físicos",
      flowTrailStep2: "Gateway Assíncrono",
      flowTrailStep3: "Interface Web 60 FPS",
      flowTrailFooter: "Engenharia de precisão com experiência do usuário em nível global",
    },
    projects: {
      badge: "[02 // Trabalhos Selecionados]",
      title: "Projetos em Produção",
      subtitle:
        "Aplicações reais combinando arquitetura limpa, alta performance e acabamento visual de padrão internacional.",
      viewCaseStudy: "Ver Case Study",
      accessPlatform: "Acessar Plataforma",
      repository: "Repositório",
      online: "Online",
      statusActive: "Operacional",
      uptime: "Uptime",
      performance: "Performance",
      trafficFlow: "Fluxo de Dados",
      responseTime: "Taxa de resposta",
      catalogActive: "Catálogo Ativo",
      asyncPipeline: "Pipeline Assíncrono",
    },
    skills: {
      badge: "[03 // Arsenal Tecnológico]",
      title: "Stack & Competências",
      subtitle:
        "Ferramental refinado ao longo de anos de desenvolvimento, do hardware ao front-end moderno.",
    },
    contact: {
      badge: "[04 // Contato Direto]",
      title: "Vamos construir algo extraordinário juntos?",
      subtitle:
        "Disponível para projetos desafiadores, posições de engenharia de software e consultoria técnica.",
      resumeBtn: "Currículo Executivo (PDF)",
      formName: "Seu Nome",
      formEmail: "Seu E-mail",
      formMessage: "Sua Mensagem ou Proposta",
      formSubmit: "Enviar Mensagem",
      formSending: "Enviando...",
      formSuccess: "Mensagem enviada com sucesso! Responderei em breve.",
      copyEmail: "Copiar E-mail",
      copied: "Copiado!",
      quickDispatchTitle: "Despacho Rápido de Mensagem",
      quickDispatchBadge: "Canal Direto",
      statusAvailable: "Disponível para novos projetos & contratação",
      replyTime: "Resposta em < 24h",
      inquiryTypeLabel: "Tipo de Proposta",
      inquiryOpt1: "Oportunidade CLT / PJ (Full Stack / Front-end)",
      inquiryOpt2: "Desenvolvimento de Projeto Web & UI/UX",
      inquiryOpt3: "Consultoria Técnica & Integração de APIs",
      inquiryOpt4: "Bate-papo Profissional / Networking",
      messagePlaceholder: "Descreva brevemente o projeto, escopo ou detalhes da oportunidade...",
      sendingEmail: "Enviando e-mail real...",
      successSentTitle: "E-mail Enviado com Sucesso!",
      successSentDesc:
        "Sua mensagem foi entregue diretamente na caixa de entrada de Lucas (lucasbezerracontact0@gmail.com). Em breve você receberá um retorno!",
      fallbackConfigNotice:
        "Aviso: Para envio de e-mail 100% automático no servidor, configure RESEND_API_KEY ou SMTP em .env.local.",
      fallbackEmailBtn: "Abrir no seu E-mail",
      sendAnotherBtn: "Enviar outra mensagem",
      errorTitle: "Falha no envio do e-mail",
    },
    footer: {
      rights: "Lucas Bezerra de Menezes Cabral. Todos os direitos reservados.",
      builtWith: "Desenvolvido com Next.js 16, GSAP, Web Audio API e Tailwind CSS.",
      backToTop: "Voltar ao Início",
    },
    simulator: {
      badge: "[TELEMETRIA & CLP INTERATIVO]",
      title: "Simulador de Célula Industrial",
      subtitle:
        "Experimente operar um controlador lógico programável (CLP) com esteira rolante, atuador pneumático e parada de emergência em tempo real.",
      controllerModel: "CLP LC-8000 PRO • INDUSTRIAL CORE",
      statusRunning: "LINHA EM OPERAÇÃO",
      statusStopped: "LINHA EM STANDBY",
      statusEmergency: "PARADA DE EMERGÊNCIA ATIVA!",
      btnStart: "Iniciar Esteira (S1)",
      btnStop: "Parar Linha (S2)",
      btnSensor: "Acionar Peça / Sensor (B1)",
      btnEstop: "E-STOP (Emergência)",
      btnReset: "Resetar Alarme",
      unitsProduced: "Peças Processadas",
      pressure: "Pressão Pneumática",
      scanTime: "Tempo de Varredura",
      efficiency: "Eficiência (OEE)",
      conveyorLabel: "Esteira Transportadora",
      pistonLabel: "Pistão Estampador",
      sensorLabel: "Sensor Fotoelétrico",
      emergencyBanner: "SISTEMA BLOQUEADO // DESATIVE A PARADA DE EMERGÊNCIA PARA RETOMAR O FLUXO",
    },
    caseStudy: {
      badge: "ESTUDO DE CASO DE ENGENHARIA",
      modalTitle: "Arquitetura & Decisões Técnicas",
      tabChallenge: "O Desafio",
      tabArchitecture: "Arquitetura & Stack",
      tabMetrics: "Métricas & Resultados",
      viewLive: "Acessar Plataforma",
      viewGithub: "Ver Código",
      close: "Fechar",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      commands: "Commands",
      talk: "Get in Touch",
      switchLang: "PT",
      switchLangTitle: "Mudar idioma para Português",
    },
    hero: {
      badgeLocation: "Rio de Janeiro, BR",
      badgeRole: "Software & Creative Engineer",
      titleLine1: "Engineering &",
      titleLine2: "Fluid Design",
      subtitleGreeting: "Hello, I'm ",
      subtitleName: "Lucas Bezerra",
      subtitleText:
        ". Combining the analytical rigor of industrial automation with modern full stack software engineering and high-fidelity design to craft cinematic, scalable digital experiences.",
      exploreBtn: "Explore Projects",
      contactBtn: "Get in Touch",
      terminalBtn: "Terminal CLI",
      terminalActive: "Active",
      scrollDown: "Scroll Down",
      statsNext: "Next.js 16",
      statsNextSub: "App Router & RSC",
      statsFps: "60 FPS",
      statsFpsSub: "GSAP + Lenis Smooth",
      statsFull: "Full Stack",
      statsFullSub: "Node, APIs & Docker",
      statsUi: "UI / UX",
      statsUiSub: "Design Systems & Figma",
    },
    about: {
      badge: "[01 // Engineering Philosophy]",
      title: "From the factory floor to high-fidelity digital.",
      subtitle:
        "My journey connects the surgical precision of Industrial Automation with the dynamism of modern Software Engineering.",
      card1Date: "Firjan SENAI • 2022",
      card1Title: "Industrial Automation",
      card1Desc:
        "Foundational technical training establishing sharp logic, zero tolerance for failures, process instrumentation, and resilient architecture.",
      card2Date: "Anhanguera • Est. 2027",
      card2Title: "Software Engineering",
      card2Desc:
        "Continuous advancement in distributed algorithms, service-oriented architecture, microservices, cloud scalability, and full stack software design.",
      card3Date: "Creative Development",
      card3Title: "Design & Microinteractions",
      card3Desc:
        "Mastery of Figma, Tailwind CSS, and GSAP to deliver sculptured typography, rich interfaces, 60fps microinteractions, and uncompromising accessibility.",
      tabFlow: "Industrial Architecture Flow",
      tabSimulator: "PLC Playground (Simulator)",
      labBadge: "[INTERACTION // SHOP FLOOR ➔ CLOUD]",
      labTitle: "Laboratory & Visualizer",
      flowBadge: "[Integrated Pipeline • Automation Engineering ➔ Cloud]",
      flowTitle: "From Field Instrumentation to Reactive Digital Experience",
      pipelineStatus: "Pipeline Status: Active",
      stageLabel: "STAGE",
      stage1Name: "Shop Floor & PLC",
      stage1Subtitle: "Firjan SENAI Foundation (2022)",
      stage1Specs: [
        "Modbus / Industrial Fieldbus",
        "Ladder Logic & Automation",
        "Zero-Tolerance Failure Policy",
      ],
      stage1TelemetryLabel: "I/O Signal",
      stage1TelemetryValue: "4-20mA Stable",
      stage2Name: "Gateway API & Broker",
      stage2Subtitle: "Node.js & Infrastructure",
      stage2Specs: [
        "Asynchronous Pipelines",
        "Docker Orchestration",
        "Scalable RESTful APIs",
      ],
      stage2TelemetryLabel: "Throughput",
      stage2TelemetryValue: "< 1.5ms Latency",
      stage3Name: "60 FPS Reactive Interface",
      stage3Subtitle: "Next.js 16 & Creative Dev",
      stage3Specs: [
        "GSAP + Lenis Smooth",
        "Design System & Figma",
        "Accessibility & Micro-UX",
      ],
      stage3TelemetryLabel: "Frame Rate",
      stage3TelemetryValue: "Zero-Drop 60 FPS",
      flowTrailLabel: "ARCHITECTURAL FLOW:",
      flowTrailStep1: "Physical Signals",
      flowTrailStep2: "Async Gateway",
      flowTrailStep3: "60 FPS Web Interface",
      flowTrailFooter: "Precision engineering with global-standard user experience",
    },
    projects: {
      badge: "[02 // Selected Works]",
      title: "Projects in Production",
      subtitle:
        "Real-world applications combining clean architecture, high throughput, and international design standards.",
      viewCaseStudy: "Case Study",
      accessPlatform: "Live Demo",
      repository: "Repository",
      online: "Online",
      statusActive: "Operational",
      uptime: "Uptime",
      performance: "Performance",
      trafficFlow: "Data Pipeline",
      responseTime: "Response Time",
      catalogActive: "Active Catalog",
      asyncPipeline: "Async Pipeline",
    },
    skills: {
      badge: "[03 // Technical Arsenal]",
      title: "Stack & Capabilities",
      subtitle:
        "A refined toolkit developed across years of engineering, bridging hardware to modern web front-ends.",
    },
    contact: {
      badge: "[04 // Direct Contact]",
      title: "Let's build something extraordinary together.",
      subtitle:
        "Available for high-impact software engineering roles, challenging projects, and technical consulting.",
      resumeBtn: "Executive Resume (PDF)",
      formName: "Your Name",
      formEmail: "Your E-mail",
      formMessage: "Your Message or Proposal",
      formSubmit: "Send Message",
      formSending: "Sending...",
      formSuccess: "Message sent successfully! I will get back to you shortly.",
      copyEmail: "Copy E-mail",
      copied: "Copied!",
      quickDispatchTitle: "Quick Message Dispatch",
      quickDispatchBadge: "Direct Channel",
      statusAvailable: "Available for new projects & hiring",
      replyTime: "Reply in < 24h",
      inquiryTypeLabel: "Inquiry Type",
      inquiryOpt1: "Full-Time / Contract Role (Full Stack / Front-end)",
      inquiryOpt2: "Web Project & Creative UI/UX Development",
      inquiryOpt3: "Technical Consulting & API Integration",
      inquiryOpt4: "Professional Networking / Inquiry",
      messagePlaceholder: "Briefly describe your project, timeline, or opportunity details...",
      sendingEmail: "Sending real email...",
      successSentTitle: "Email Sent Successfully!",
      successSentDesc:
        "Your message has been delivered directly to Lucas's inbox (lucasbezerracontact0@gmail.com). You'll receive a response soon!",
      fallbackConfigNotice:
        "Note: For 100% automated server delivery, configure RESEND_API_KEY or SMTP in .env.local.",
      fallbackEmailBtn: "Open in your Email",
      sendAnotherBtn: "Send another message",
      errorTitle: "Failed to send email",
    },
    footer: {
      rights: "Lucas Bezerra de Menezes Cabral. All rights reserved.",
      builtWith: "Engineered with Next.js 16, GSAP, Web Audio API, and Tailwind CSS.",
      backToTop: "Back to Top",
    },
    simulator: {
      badge: "[TELEMETRY & INTERACTIVE PLC]",
      title: "Industrial Cell Simulator",
      subtitle:
        "Experience operating a real-time programmable logic controller (PLC) controlling a conveyor, pneumatic stamping actuator, and emergency stop.",
      controllerModel: "PLC LC-8000 PRO • INDUSTRIAL CORE",
      statusRunning: "LINE IN OPERATION",
      statusStopped: "LINE IN STANDBY",
      statusEmergency: "EMERGENCY STOP TRIGGERED!",
      btnStart: "Start Conveyor (S1)",
      btnStop: "Stop Line (S2)",
      btnSensor: "Feed Part / Sensor (B1)",
      btnEstop: "E-STOP (Emergency)",
      btnReset: "Reset Alarm",
      unitsProduced: "Processed Units",
      pressure: "Pneumatic Pressure",
      scanTime: "Scan Cycle Time",
      efficiency: "Efficiency (OEE)",
      conveyorLabel: "Conveyor Belt",
      pistonLabel: "Stamping Cylinder",
      sensorLabel: "Photoelectric Sensor",
      emergencyBanner: "SYSTEM LOCKED // RELEASE EMERGENCY STOP TO RESUME PRODUCTION",
    },
    caseStudy: {
      badge: "ENGINEERING CASE STUDY",
      modalTitle: "Architecture & Technical Decisions",
      tabChallenge: "The Challenge",
      tabArchitecture: "Architecture & Stack",
      tabMetrics: "Metrics & Results",
      viewLive: "Live Demo",
      viewGithub: "View Source",
      close: "Close",
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language;
      if (saved === "pt" || saved === "en") {
        queueMicrotask(() => {
          setLanguageState(saved);
        });
      }
    } catch {
      // Ignora erro em ambientes restritos
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("portfolio_lang", lang);
    } catch {
      // Ignora erro em ambientes restritos
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
}
