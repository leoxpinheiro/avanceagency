// =======================================================
// GEMINI SERVICE — VERSÃO FINAL 2025 (COMPATÍVEL COM VERCEL)
// =======================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  BriefingQuestion,
  AuditScore,
  SalesAnalysis,
  ClientStrategy,
  LandingStyle,
  PlanType
} from "../types";

// -----------------------------------------------
// 🔐 Inicialização do Gemini
// -----------------------------------------------
const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

// -----------------------------------------------
// 1. BRIEFING QUESTIONS
// -----------------------------------------------
export const generateBriefingQuestions = async (
  niche: string
): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Gere 5 perguntas para entender um cliente do nicho ${niche}.
        Retorne apenas JSON no formato:
        [{ "id": "1", "question": "", "placeholder": "" }]
      `
    });

    return JSON.parse(result.response.text());
  } catch (e) {
    return [
      { id: "1", question: `Quais serviços você oferece em ${niche}?`, placeholder: "..." },
      { id: "2", question: `Qual seu diferencial em ${niche}?`, placeholder: "..." },
    ];
  }
};

// -----------------------------------------------
// 2. LANDING PAGE GENERATOR
// -----------------------------------------------
export const generateLandingPage = async (
  niche: string,
  plan: PlanType,
  style: LandingStyle
): Promise<string> => {

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma landing page completa em HTML,
    Tailwind CDN, português do Brasil,
    nicho: "${niche}", plano: "${plan}", estilo: "${style}".

    Entregue APENAS HTML puro, sem Markdown.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().replace(/```html/g, "").replace(/```/g, "");
};

// -----------------------------------------------
// 3. SAAS PAGE GENERATOR
// -----------------------------------------------
export const generateSaaSPage = async (
  niche: string,
  answers: Record<string, string>
): Promise<string> => {

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma página SaaS premium em HTML para o nicho "${niche}".
    Contexto: ${JSON.stringify(answers)}
    Sem Markdown. Apenas HTML.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().replace(/```/g, "");
};

// -----------------------------------------------
// 4. SALES ANALYSIS
// -----------------------------------------------
export const analyzeSalesContext = async (
  text: string
): Promise<SalesAnalysis | null> => {

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Analise o texto: "${text}".
        Devolva um JSON:
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

// -----------------------------------------------
// 5. SALES CONTENT GENERATOR (OBJEÇÃO / COPY / PROPOSTA / SCRIPT)
// -----------------------------------------------
export const generateSalesContent = async (
  type: "objection" | "copy" | "proposal" | "script",
  context: string
): Promise<string> => {

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  let prompt = "";

  if (type === "objection") {
    prompt = `O cliente disse "${context}". Crie 3 respostas: lógica, empática e agressiva.`;
  }
  if (type === "copy") {
    prompt = `Crie uma legenda AIDA para o nicho "${context}" em português.`;
  }
  if (type === "proposal") {
    prompt = `
      Gere proposta comercial para o nicho "${context}".
      Ofereça planos R$397 e R$697.
    `;
  }
  if (type === "script") {
    prompt = `Crie mensagem fria (DM) para captar clientes do nicho "${context}".`;
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// -----------------------------------------------
// 6. MARKETING COPY GENERATOR ✔ (QUE FALTAVA!)
// -----------------------------------------------
export const generateMarketingCopy = async (
  text: string
): Promise<string> => {

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(`
    Gere uma copy curta, persuasiva e com emojis.
    Tema: ${text}
    Sem hashtags.
  `);

  return result.response.text();
};

// -----------------------------------------------
// 7. EDIT IMAGE
// -----------------------------------------------
export const editImageWithGemini = async (
  base64: string,
  prompt: string
): Promise<string | null> => {

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const clean = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

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
  } catch {
    return null;
  }
};

// -----------------------------------------------
// 8. SUGGEST PRICING
// -----------------------------------------------
export const suggestPricing = async (
  product: string,
  description: string
): Promise<string> => {

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const res = await model.generateContent(`
    Sugira preço para: ${product}
    ${description}
    Apenas formato: "R$ X - R$ Y"
  `);

  return res.response.text();
};

// -----------------------------------------------
// 9. DEMO IMPROVEMENTS
// -----------------------------------------------
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
    return ["Adicionar FAQ", "Mais provas sociais", "Adicionar CTA fixo"];
  }
};
