import React from "react";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lucas-cabral.vercel.app";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Lucas Bezerra de Menezes Cabral",
        givenName: "Lucas",
        familyName: "Cabral",
        alternateName: ["Lucas Bezerra", "Lucas Cabral Dev"],
        gender: "Male",
        jobTitle: "Engenheiro de Software & UI/UX Developer",
        description:
          "Engenheiro de Software com base analítica em Automação Industrial (SENAI) e formação acadêmica em Engenharia de Software. Especialista em Next.js, TypeScript, GSAP e Tailwind CSS.",
        url: baseUrl,
        email: "lucasbezerracontact0@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rio de Janeiro",
          addressRegion: "RJ",
          addressCountry: "BR",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Anhanguera Educacional",
            department: "Engenharia de Software",
          },
          {
            "@type": "EducationalOrganization",
            name: "Firjan SENAI",
            department: "Automação Industrial",
          },
        ],
        knowsAbout: [
          "Software Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "GSAP Animations",
          "Tailwind CSS",
          "Node.js",
          "RESTful APIs",
          "Docker",
          "Automação Industrial",
          "Controladores Lógicos Programáveis (CLP)",
          "UI/UX Design",
          "Figma",
        ],
        sameAs: [
          "https://www.linkedin.com/in/lucas-bezerra-51030b303",
          "https://github.com/Lucvs1",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Lucas Cabral | Portfólio de Engenharia de Software",
        description:
          "Portfólio oficial de Lucas Cabral. Engenharia de precisão, alta performance e design fluido.",
        inLanguage: "pt-BR",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profile`,
        url: baseUrl,
        name: "Perfil Profissional de Lucas Cabral",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        mainEntity: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
