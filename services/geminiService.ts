import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import {
  BriefingQuestion,
  AuditScore,
  SalesAnalysis,
  ClientStrategy,
  LandingStyle,
  PlanType,
  SalesMentorResponse
} from "../types";

const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

/**
 * Generate briefing questions
 */
export const generateBriefingQuestions = async (niche: string): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              id: { type: SchemaType.STRING },
              question: { type: SchemaType.STRING },
              placeholder: { type: SchemaType.STRING }
            },
            required: ["id", "question", "placeholder"]
          }
        }
      }
    });

    const response = await model.generateContent(
      `Gere 5 perguntas de briefing para o nicho "${niche}".
      Responda APENAS com um JSON de objetos.`
    );

    return JSON.parse(response.response.text());
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Generate Landing Page HTML
 */
export const generateLandingPage = async (
  niche: string,
  plan: PlanType,
  style: LandingStyle
): Promise<string> => {
  const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash"
  });

  const prompt = `
    Você é um especialista em páginas de alta conversão.
    Gere um HTML completo e responsivo em Tailwind para o nicho "${niche}".

    IMPORTANTE:
    - NÃO use markdown.
    - Retorne APENAS o HTML puro.
  `;

  const response = await model.generateContent(prompt);
  let html = response.response.text();

  html = html.replace(/```html/g, "").replace(/```/g, "");

  if (!html.includes("<html")) throw new Error("HTML inválido gerado pela IA");

  return html;
};

/**
 * SaaS Page
 */
export const generateSaaSPage = async (
  niche: string,
  answers: Record<string, string>
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Gere uma página institucional SaaS moderna, com Tailwind,
    para o nicho: "${niche}".
    Conteúdo: ${JSON.stringify(answers)}

    Retorne APENAS HTML puro.
  `;

  const response = await model.generateContent(prompt);
  return response.response.text().replace(/```/g, "");
};

/**
 * Analyze sales context
 */
export const analyzeSalesContext = async (
  clientText: string
): Promise<SalesAnalysis | null> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            shortResponse: { type: SchemaType.STRING },
            mediumResponse: { type: SchemaType.STRING },
            detailedResponse: { type: SchemaType.STRING },
            counterObjection: { type: SchemaType.STRING },
            priceStrategy: { type: SchemaType.STRING },
            closingTechnique: { type: SchemaType.STRING }
          },
          required: [
            "shortResponse",
            "mediumResponse",
            "detailedResponse",
            "counterObjection",
            "priceStrategy",
            "closingTechnique"
          ]
        }
      }
    });

    const result = await model.generateContent(
      `Analise o texto a seguir e gere um JSON completo:
      "${clientText}"`
    );

    return JSON.parse(result.response.text());
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Generate simple sales content
 */
export const generateSalesContent = async (
  type: "objection" | "copy" | "proposal" | "script",
  context: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const promptMap = {
    objection: `Quebre essa objeção: "${context}". 3 respostas.`,
    copy: `Crie copy AIDA em PTBR para vender Landing Page para "${context}".`,
    proposal: `Crie proposta comercial premium para o nicho "${context}".`,
    script: `Crie um roteiro de abordagem fria para vender landing pages para "${context}".`
  };

  const response = await model.generateContent(promptMap[type]);
  return response.response.text()?.trim();
};

/**
 * Generate marketing copy
 */
export const generateMarketingCopy = async (promptInput: string): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const response = await model.generateContent(
    `Crie um texto curto e persuasivo para WhatsApp sobre:
     "${promptInput}"`
  );

  return response.response.text();
};

/**
 * Client strategy
 */
export const generateClientStrategy = async (
  niche: string
): Promise<ClientStrategy | null> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            briefingQuestions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            suggestedPages: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            targetAudiencePainPoints: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            killerFeatureIdea: { type: SchemaType.STRING }
          },
          required: [
            "briefingQuestions",
            "suggestedPages",
            "targetAudiencePainPoints",
            "killerFeatureIdea"
          ]
        }
      }
    });

    const response = await model.generateContent(`
      Gere estratégia para reunião do nicho "${niche}" em JSON.
    `);

    return JSON.parse(response.response.text());
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Edit image
 */
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string | null> => {
  const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  const response = await model.generateContent({
    contents: [
      { inlineData: { mimeType: "image/png", data: base64Data } },
      { text: prompt }
    ]
  });

  const parts = response.response.candidates?.[0]?.content.parts;
  if (!parts) return null;

  for (const part of parts) {
    if (part.inlineData?.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return null;
};

/**
 * Audit site
 */
export const auditSiteContent = async (html: string): Promise<AuditScore> => {
  return {
    seo: 90,
    ux: 87,
    copy: 92,
    details: [
      "Estrutura de títulos correta.",
      "Bom contraste.",
      "Adicionar mais prova social pode ajudar."
    ]
  };
};

/**
 * Pricing suggestion
 */
export const suggestPricing = async (
  productName: string,
  description: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const response = await model.generateContent(`
    Sugira um preço em reais para:
    Nome: ${productName}
    Descrição: ${description}
    Retorne APENAS algo como: "R$ 300 - R$ 600"
  `);

  return response.response.text().trim();
};

/**
 * Demo improvements
 */
export const suggestDemoImprovements = async (
  currentSections: any[]
): Promise<string[]> => {
  const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING }
      }
    }
  });

  const response = await model.generateContent(`
    Analise as seções: ${JSON.stringify(currentSections)}
    Sugira 3 melhorias em JSON.
  `);

  return JSON.parse(response.response.text());
};
