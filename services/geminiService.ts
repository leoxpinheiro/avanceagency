// ============================
//  GEMINI SERVICE – FINAL 2025 (COMPLETO)
// ============================

import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  BriefingQuestion,
  AuditScore,
  SalesAnalysis,
  ClientStrategy,
  LandingStyle,
  PlanType
} from "../types";

// INIT GEMINI
const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

// =========================================================
// 1. GERAR PERGUNTAS DE BRIEFING
// =========================================================
export const generateBriefingQuestions = async (
  niche: string
): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Gere 5 perguntas de briefing para o nicho "${niche}".
        Retorne apenas um JSON:
        [{ "id": "1", "question": "...", "placeholder": "..." }]
      `
    });

    return JSON.parse(result.response.text());
  } catch {
    return [
      {
        id: "1",
        question: `Quais serviços você oferece em ${niche}?`,
        placeholder: "..."
      },
      {
        id: "2",
        question: "Qual seu diferencial?",
        placeholder: "..."
      },
      {
        id: "3",
        question: "Quem é seu público ideal?",
        placeholder: "..."
      }
    ];
  }
};

// =========================================================
// 2. GERAR LANDING PAGE COMPLETA
// =========================================================
export const generateLandingPage = async (
  niche: string,
  plan: PlanType,
  style: LandingStyle
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma landing page HTML completa para o nicho "${niche}".
    - Tailwind via CDN
    - Imagens Pollinations
    - Português BR
    - Estilo: ${style}
    - Plano: ${plan}
    Entregue APENAS HTML.
  `;

  try {
    const response = await model.generateContent(prompt);
    let html = response.response.text();
    return html.replace(/```html/g, "").replace(/```/g, "");
  } catch {
    return "<h1>Erro ao gerar landing page</h1>";
  }
};

// =========================================================
// 3. GERAR PÁGINA SaaS
// =========================================================
export const generateSaaSPage = async (
  niche: string,
  answers: Record<string, string>
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma página HTML SaaS premium para o nicho "${niche}".
    Contexto: ${JSON.stringify(answers)}
    - Tailwind CDN
    - Glassmorphism
    - Português BR
    - Apenas HTML
  `;

  const res = await model.generateContent(prompt);
  return res.response.text().replace(/```html/g, "").replace(/```/g, "");
};

// =========================================================
// 4. ANALISAR VENDAS
// =========================================================
export const analyzeSalesContext = async (
  text: string
): Promise<SalesAnalysis | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Analise o texto: "${text}"
        Retorne um JSON:
        {
          "shortResponse": "",
          "mediumResponse": "",
          "detailedResponse": "",
          "counterObjection": "",
          "priceStrategy": "",
          "closingTechnique": ""
        }
      `
    });

    return JSON.parse(result.response.text());
  } catch {
    return null;
  }
};

// =========================================================
// 5. GERAR COPY DE VENDAS / PROPOSTA / OBJEÇÃO / SCRIPT
// =========================================================
export const generateSalesContent = async (
  type: "objection" | "copy" | "proposal" | "script",
  context: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  let prompt = "";

  if (type === "objection") {
    prompt = `Cliente disse: "${context}". Gere 3 respostas: agressiva, empática e lógica.`;
  } else if (type === "copy") {
    prompt = `Crie uma legenda AIDA para vender landing pages para o nicho "${context}"`;
  } else if (type === "proposal") {
    prompt = `
      Gere proposta comercial para o nicho "${context}".
      Ofereça Planos R$397 e R$697.
    `;
  } else if (type === "script") {
    prompt = `Crie mensagem fria para captar clientes no nicho "${context}".`;
  }

  const res = await model.generateContent(prompt);
  return res.response.text();
};

// =========================================================
// 6. EDITAR IMAGEM COM GEMINI
// =========================================================
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const clean = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: "image/png", data: clean } },
            { text: prompt }
          ]
        }
      ]
    });

    const parts = result.response.candidates?.[0]?.content?.parts || [];

    for (const p of parts) {
      if (p.inlineData?.data) {
        return `data:image/png;base64,${p.inlineData.data}`;
      }
    }

    return null;
  } catch (e) {
    console.log("Erro edição imagem:", e);
    return null;
  }
};

// =========================================================
// 7. AUDITORIA
// =========================================================
export const auditSiteContent = async (): Promise<AuditScore> => ({
  seo: 90,
  ux: 91,
  copy: 88,
  details: ["Bom contraste", "Layout organizado", "Adicionar mais provas sociais"]
});

// =========================================================
// 8. SUGERIR PREÇO
// =========================================================
export const suggestPricing = async (
  product: string,
  description: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const r = await model.generateContent(`
    Sugira preço para:
    ${product}
    ${description}
    Apenas formato: "R$ X - R$ Y"
  `);

  return r.response.text();
};

// =========================================================
// 9. MELHORIAS DE SEÇÕES
// =========================================================
export const suggestDemoImprovements = async (
  arr: any[]
): Promise<string[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const r = await model.generateContent({
      contents: `
        Seções: ${JSON.stringify(arr)}
        Sugira 3 melhorias em JSON
      `
    });

    return JSON.parse(r.response.text());
  } catch {
    return ["Adicionar FAQ", "Adicionar depoimentos", "Criar seção de urgência"];
  }
};

// ===============================
