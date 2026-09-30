# Lucas Cabral — Portfolio & Engineering Showcase

[![CI Pipeline](https://github.com/Lucas-cabral1/PORTIFOLIO/actions/workflows/ci.yml/badge.svg)](https://github.com/Lucas-cabral1/PORTIFOLIO/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP Motion](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat&logo=greensock)](https://gsap.com/)

> **Software Engineer & Creative Developer** sediado no Rio de Janeiro, Brasil.  
> Unindo o rigor analítico da automação industrial de missão crítica (CLPs, redes e telemetria) com a excelência da engenharia de software full stack moderna e interfaces web cinematográficas (60/120 FPS).

---

## ⚡ Destaques Técnicos da Aplicação

- **Motion & Performance 60/120 FPS**:
  - Integração profunda entre **GSAP 3** e **Lenis Virtual Scroll** com sincronização via ticker requestAnimationFrame.
  - Efeito 3D tilt nos cards com reflexo especular de luz baseado nas coordenadas do cursor.
  - Linha condutora de circuito industrial (*GSAP Circuit Rail*) com scrub dinâmico ao longo da página.
  - Visualizador interativo de pipeline de automação (*Chão de Fábrica ➔ Edge/IoT ➔ Cloud*).

- **Terminal Interativo no Hero (CLI)**:
  - Console Unix emulado com histórico de comandos (`↑` / `↓`), auto-complete (`Tab`), efeito *Matrix Rain* em canvas HTML5 e comandos (`bio`, `skills`, `projects`, `ping`, `resume`, `theme`, `matrix`, `reboot`).

- **Sound Design Háptico (Web Audio API)**:
  - Síntese de áudio procedural sem arquivos `.mp3`: micro-cliques mecânicos, acordes de confirmação e alertas sonoros com controle de mudo e persistência em `localStorage`.

- **Raycast-style Command Palette (`Ctrl + K`)**:
  - Menu de comando rápido com busca fuzzy, alternância de temas de iluminação neon (*Emerald*, *Cyan*, *Violet*, *Mono*) e widget de fuso horário do Rio de Janeiro.

- **Preloader Cinematográfico ("Industrial Boot")**:
  - Sequência de boot com telemetria, logs de sistema e barra de progresso numérica fluida (0% a 100%), memorizado via `sessionStorage` e com comando de replay (`lucas --reboot`).

- **Currículo Executivo & PDF de 1 Clique**:
  - Modal com visualização em alta fidelidade e botão para download direto do PDF de 1 página (`Lucas_Cabral_Curriculo.pdf`), além de estilização `@media print` sem poluição visual.

- **SEO de Elite & Metadados**:
  - Schema.org (JSON-LD) para Google Rich Snippets, OpenGraph dinâmico 1200x630 (`next/og`), Twitter Card, Favicon SVG dinâmico com anel esmeralda, `sitemap.ts` e `robots.ts`.

- **CI/CD & Segurança em Nível Enterprise**:
  - Pipeline automatizado no **GitHub Actions** (`.github/workflows/ci.yml`) para linting, checagem estática de tipos TypeScript e build de produção a cada push/pull request.
  - Headers HTTP de segurança no `next.config.ts` (HSTS, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options SAMEORIGIN).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Framework & Core** | Next.js 16 (App Router, Server Components & Turbopack), React 19, TypeScript |
| **Estilização & UI** | Tailwind CSS v4, Lucide React, Glassmorphism & Obsidian Dark Theme |
| **Animações & Motion**| GSAP 3 (ScrollTrigger, Flip, Timeline), Lenis Scroll, HTML5 Canvas |
| **Áudio & Som** | Web Audio API (OscillatorNodes procedurais) |
| **DevOps & Qualidade**| ESLint 9, GitHub Actions CI/CD, Next Security Headers |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 20+ instalado
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Lucas-cabral1/PORTIFOLIO.git

# Acesse o diretório
cd PORTIFOLIO

# Instale as dependências
npm install
```

### Comandos Disponíveis
```bash
# Iniciar servidor de desenvolvimento (Turbopack)
npm run dev

# Executar linter
npm run lint

# Verificação de tipos TypeScript
npx tsc --noEmit

# Compilação para produção
npm run build

# Iniciar servidor de produção
npm start
```

---

## 📄 Licença

Desenvolvido por **Lucas Bezerra de Menezes Cabral**.  
Todos os direitos reservados.
