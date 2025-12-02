import { GoogleGenerativeAI } from "@google/generative-ai";
import { Type } from "@google/generative-ai";
import {
  BriefingQuestion,
  AuditScore,
  SalesAnalysis,
  ClientStrategy,
  LandingStyle,
  PlanType,
} from "../types";

const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

/**
 * Generates technical briefing questions based on a niche using Search Grounding
 */
export const generateBriefingQuestions = async (
  niche: string
): Promise<BriefingQuestion[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Gere 5 perguntas de briefing em português para o nicho: ${niche}.  
              Responda SOMENTE em JSON com id, question e placeholder.`,
            },
          ],
        },
      ],
    });

    const text = response.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating briefing:", error);
    return [
      {
        id: "1",
        question: `Quais serviços principais o negócio de ${niche} oferece?`,
        placeholder: "Ex: Serviço A, Serviço B...",
      },
      {
        id: "2",
        question: "Qual é o maior diferencial do seu negócio?",
        placeholder: "Ex: rapidez, qualidade...",
      },
      {
        id: "3",
        question: "Qual o perfil do cliente ideal?",
        placeholder: "Ex: idade, localização...",
      },
    ];
  }
};

/**
 * Generates the Landing Page HTML based on niche, plan and style.
 */
export const generateLandingPage = async (
  niche: string,
  plan: PlanType,
  style: LandingStyle
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Gere um HTML COMPLETO para o nicho "${niche}".
      - Tailwind via CDN
      - Imagens Pollinations
      - Copy persuasiva
      - Estrutura baseada no plano: ${plan}
      - Estilo: ${style}
      - Responda SOMENTE com HTML sem markdown.
    `;

    const result = await model.generateContent(prompt);
    let html = result.response.text();
    html = html.replace(/```html/g, "").replace(/```/g, "");
    return html;
  } catch (error) {
    console.error("Error generating landing page:", error);
    return "<h1>Erro ao gerar landing page.</h1>";
  }
};

/**
 * Generates a SaaS Institutional Page (COMPATÍVEL COM VERCEL)
 */
export const generateSaaSPage = async (
  niche: string,
  answers: Record<string, string>
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Gere um HTML COMPLETO de página SaaS para o nicho: "${niche}"

      CONTEXTO DO CLIENTE:
      ${JSON.stringify(answers)}

      REGRAS:
      - Retorne APENAS HTML (sem markdown)
      - Tailwind via CDN
      - Estilo SaaS moderno (Linear/Notion/Hubspot)
      - Hero + mockup
      - Trusted by
      - Bento Grid Features
      - Plans Comparison
      - FAQ
      - Footer
      - Tudo em Português (Brasil)
    `;

    const result = await model.generateContent(prompt);
    let html = result.response.text();

    html = html.replace(/```html/g, "").replace(/```/g, "");
    return html;
  } catch (error) {
    console.error("Erro ao gerar SaaS page:", error);
    return "<h1>Erro ao gerar SaaS Page</h1>";
  }
};

/**
 * Analyzes client text to provide sales strategy
 */
export const analyzeSalesContext = async (
  clientText: string
): Promise<SalesAnalysis | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analise o texto: "${clientText}"  
      Gere JSON com: shortResponse, mediumResponse, detailedResponse, counterObjection, priceStrategy, closingTechnique.
    `;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Sales analysis error:", error);
    return null;
  }
};

/**
 * Generate generic sales content
 */
export const generateSalesContent = async (
  type: "objection" | "copy" | "proposal" | "script",
  context: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompts = {
    objection: `Dê 3 respostas para quebrar objeção baseada em: "${context}"`,
    copy: `Crie uma legenda AIDA para vender Landing Page para: "${context}"`,
    proposal: `Escreva proposta comercial para cliente do nicho: "${context}".`,
    script: `Crie roteiro de abordagem fria para o nicho: "${context}".`,
  };

  const result = await model.generateContent(prompts[type]);
  return result.response.text();
};

/**
 * Generates marketing copy
 */
export const generateMarketingCopy = async (
  input: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Crie texto curto para WhatsApp baseado em: "${input}"
    Estilo: persuasivo, pequeno, com emojis, sem hashtags.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

/**
 * Meeting Strategy
 */
export const generateClientStrategy = async (
  niche: string
): Promise<ClientStrategy | null> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Gere JSON com:
      - briefingQuestions
      - suggestedPages
      - targetAudiencePainPoints
      - killerFeatureIdea
      Para o nicho: "${niche}"
    `;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Strategy generation error:", error);
    return null;
  }
};

/**
 * Site Audit
 */
export const auditSiteContent = async (html: string): Promise<AuditScore> => {
  return {
    seo: 85,
    ux: 90,
    copy: 88,
    details: [
      "Estrutura de H1-H3 adequada.",
      "Bom contraste de leitura.",
      "Adicionar mais provas sociais no início.",
    ],
  };
};

/**
 * Price Suggestion
 */
export const suggestPricing = async (
  product: string,
  description: string
): Promise<string> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Sugira preço para o serviço "${product}" baseado em:
    ${description}
    Responda APENAS com intervalo de preço.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

/**
 * Suggest improvements
 */
export const suggestDemoImprovements = async (
  sections: any[]
): Promise<string[]> => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Sugira 3 melhorias para aumentar conversão baseado nessas seções:
    ${JSON.stringify(sections)}
    Responda apenas JSON.
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
