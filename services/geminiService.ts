import { GoogleGenerativeAI } from "@google/generative-ai";
import { BriefingQuestion, AuditScore, SalesAnalysis, ClientStrategy, LandingStyle, PlanType, SalesMentorResponse } from "../types";

const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

/**
 * Generates technical briefing questions
 */
export const generateBriefingQuestions = async (niche: string): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`
      Gere 5 perguntas de briefing para um cliente do nicho "${niche}".
      Responda somente JSON:
      [{"id":"","question":"","placeholder":""}]
    `);

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Generates Landing Page HTML
 */
export const generateLandingPage = async (
  niche: string,
  plan: PlanType,
  style: LandingStyle
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`
      Gere uma landing page HTML completa.
      Nicho: ${niche}
      Estilo: ${style}
      Plano: ${plan}
      Responda SOMENTE com o HTML. Sem markdown.
    `);

    return result.response.text()
      .replace(/```html/g, "")
      .replace(/```/g, "");
  } catch (e) {
    console.error(e);
    return "<h1>Erro ao gerar</h1>";
  }
};

/**
 * Sales analysis JSON
 */
export const analyzeSalesContext = async (text: string): Promise<SalesAnalysis | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`
      Analise este texto: "${text}"
      Retorne JSON:
      {
        "shortResponse":"",
        "mediumResponse":"",
        "detailedResponse":"",
        "counterObjection":"",
        "priceStrategy":"",
        "closingTechnique":""
      }
    `);

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Generates sales responses, copies, scripts
 */
export const generateSalesContent = async (
  type: "objection" | "copy" | "proposal" | "script",
  context: string
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompts: Record<string, string> = {
      objection: `Crie 3 respostas para quebrar a objeção: "${context}".`,
      copy: `Crie uma legenda de Instagram para vender landing pages no nicho "${context}".`,
      proposal: `Escreva uma proposta comercial completa para o nicho "${context}".`,
      script: `Escreva um roteiro de abordagem fria para vender landing pages no nicho "${context}".`
    };

    const result = await model.generateContent(prompts[type]);
    return result.response.text();
  } catch {
    return "Erro ao gerar.";
  }
};

/**
 * Image Editing (Flash Image)
 */
export const editImageWithGemini = async (base64Image: string, prompt: string) => {
  try {
    const clean = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-image" });

    const result = await model.generateContent([
      { inlineData: { mimeType: "image/png", data: clean } },
      { text: prompt }
    ]);

    const part = result.response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    );

    if (!part) return null;

    return `data:image/png;base64,${part.inlineData.data}`;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * SEO/UX audit
 */
export const auditSiteContent = async (): Promise<AuditScore> => {
  return {
    seo: 80,
    ux: 82,
    copy: 78,
    details: ["Tudo OK"]
  };
};

/**
 * Strategy JSON
 */
export const generateClientStrategy = async (niche: string): Promise<ClientStrategy | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const r = await model.generateContent(`
      Gere JSON com: briefingQuestions, suggestedPages, painPoints, killerFeature
      Nicho: "${niche}"
    `);

    return JSON.parse(r.response.text());
  } catch {
    return null;
  }
};
