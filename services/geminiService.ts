// ============================
//  GEMINI SERVICE – FINAL 2025
// ============================

import { GoogleGenerativeAI } from "@google/generative-ai";
import { BriefingQuestion, AuditScore, SalesAnalysis, ClientStrategy, LandingStyle, PlanType } from "../types";

// INIT GEMINI
const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

// =========================================================
// 1. GERAR PERGUNTAS DE BRIEFING
// =========================================================
export const generateBriefingQuestions = async (niche: string): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Gere 5 perguntas de briefing para um cliente do nicho "${niche}".
        Responda APENAS um JSON ARRAY no formato:
        [
          { "id": "1", "question": "...", "placeholder": "..." }
        ]
      `
    });

    return JSON.parse(result.response.text());
  } catch {
    return [
      { id: "1", question: `Quais serviços você oferece em ${niche}?`, placeholder: "..." },
      { id: "2", question: "Qual seu diferencial?", placeholder: "..." },
      { id: "3", question: "Quem é seu público ideal?", placeholder: "..." }
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
    Você é um Expert em Landing Pages.
    Gere uma LANDING PAGE HTML COMPLETA para o nicho: "${niche}".

    - Tailwind CSS via CDN
    - Imagens via Pollinations.ai
    - Texto totalmente em português Brasil
    - Layout moderno
    - Estilo: ${style}
    - Plano: ${plan}

    ENTREGUE APENAS O HTML SEM MARCAÇÃO DE CÓDIGO.
  `;

  try {
    const response = await model.generateContent(prompt);
    let html = response.response.text();

    html = html.replace(/```html/g, "").replace(/```/g, "");

    if (!html.includes("<html")) {
      throw new Error("HTML inválido");
    }

    return html;
  } catch {
    return `<h1>Erro ao gerar a página</h1>`;
  }
};

// =========================================================
// 3. GERAR PÁGINA SaaS (IMPORTANTE: NOME CORRETO generateSaaSPage)
// =========================================================
export const generateSaaSPage = async (
  niche: string,
  answers: Record<string, string>
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma página institucional SaaS HTML completa para o nicho "${niche}".
    Contexto adicional: ${JSON.stringify(answers)}

    - Tailwind CSS via CDN
    - HTML único
    - Estilo SaaS premium
    - Tudo em português Brasil
  `;

  const res = await model.generateContent(prompt);
  return res.response.text().replace(/```html/g, "").replace(/```/g, "");
};

// =========================================================
// 4. ANALISAR TEXTO DE VENDAS
// =========================================================
export const analyzeSalesContext = async (text: string): Promise<SalesAnalysis | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: `
        Analise este texto de cliente: "${text}"

        Responda um JSON:
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
// 5. EDITAR IMAGEM COM GEMINI 2.0 – CORRIGIDO!!!
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
            { text: `Edite esta imagem conforme: ${prompt}. Retorne apenas a imagem base64.` }
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
  } catch (err) {
    console.error("Erro ao editar imagem", err);
    return null;
  }
};

// =========================================================
// 6. AUDITORIA DE SITE (FAKE SCORE)
// =========================================================
export const auditSiteContent = async (): Promise<AuditScore> => {
  return {
    seo: 85,
    ux: 92,
    copy: 88,
    details: ["Bom contraste", "Layout limpo", "Adicionar mais prova social"]
  };
};

// =========================================================
// 7. SUGERIR PREÇO
// =========================================================
export const suggestPricing = async (
  product: string,
  description: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const r = await model.generateContent(`
    Sugira um preço para:
    Nome: ${product}
    Descrição: ${description}

    Retorne apenas algo como: "R$ 500 - R$ 900"
  `);
  return r.response.text();
};

// =========================================================
// 8. MELHORIAS DE LANDING PAGE
// =========================================================
export const suggestDemoImprovements = async (sections: any[]): Promise<string[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const r = await model.generateContent({
      contents: `
        Analise estas seções: ${JSON.stringify(sections)}
        Sugira 3 melhorias. Responda em JSON ["a", "b", "c"].
      `
    });

    return JSON.parse(r.response.text());
  } catch {
    return ["Adicionar FAQ", "Incluir depoimentos", "Criar seção de urgência"];
  }
};

// =========================================================
// END OF FILE
// =========================================================
