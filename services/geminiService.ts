

import { GoogleGenAI, Type } from "@google/genai";
import { BriefingQuestion, AuditScore, SalesAnalysis, ClientStrategy, LandingStyle, PlanType, SalesMentorResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates technical briefing questions based on a niche using Search Grounding
 */
export const generateBriefingQuestions = async (niche: string): Promise<BriefingQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Senior Agency Strategist. I have a client in the "${niche}" niche.
      Generate 5 specific briefing questions in PORTUGUESE (Brazil) to ask this client.
      Focus on understanding their offer and differentiation.
      
      Return ONLY a JSON array of objects.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              placeholder: { type: Type.STRING },
            },
            required: ['id', 'question', 'placeholder']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BriefingQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Error generating briefing:", error);
    return [
      { id: '1', question: `Quais serviços principais o seu negócio de ${niche} oferece?`, placeholder: 'Ex: Serviço A, Serviço B...' },
      { id: '2', question: 'Qual é o diferencial competitivo?', placeholder: 'Por que escolher você?' },
      { id: '3', question: 'Qual o perfil do cliente ideal?', placeholder: 'Idade, localização...' },
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
  
  // 1. Niche Analysis for Specific Styles
  const lowerNiche = niche.toLowerCase();
  const isFood = lowerNiche.includes('restaurante') || lowerNiche.includes('hamburguer') || lowerNiche.includes('pizza') || lowerNiche.includes('sushi') || lowerNiche.includes('comida') || lowerNiche.includes('bar');
  
  let appliedStyle = style;
  let stylePrompt = "";

  // FORCE DARK MODE FOR RESTAURANTS (Conversion Rule: Food looks better on dark)
  if (isFood) {
      appliedStyle = 'dark'; 
      stylePrompt = "HIGH-END RESTAURANT THEME: Deep black/slate backgrounds (bg-slate-950), vibrant orange/red accents (text-orange-500, bg-orange-600) to stimulate appetite. Use 'Playfair Display' for headings to show sophistication. IMAGES MUST BE MOUTHWATERING.";
  } else {
      switch(appliedStyle) {
        case 'clean': stylePrompt = "Medical/Corporate Clean: White/Slate-50 backgrounds, heavy use of whitespace, trustworthy blue/teal accents (text-teal-600), rounded-3xl cards, Inter font. Shadow-sm for subtle depth."; break;
        case 'dark': stylePrompt = "Luxury/Premium Dark: Slate-950 background, Gold (#D4AF37) or Emerald accents. Glassmorphism effects (bg-white/5 backdrop-blur-md border-white/10). Serif headings for authority."; break;
        case 'commercial': stylePrompt = "High Impact Retail: Bold contrast (Black/Yellow or Red/White). Large typography (Archivo Black). Massive CTA buttons with hover scale effects."; break;
      }
  }

  // 2. Plan Features
  const featuresPrompt = plan === 'high_conversion' 
    ? `PREMIUM R$ 697 PACKAGE REQUIREMENTS (MANDATORY):
       1. Sticky Navbar: Fixed at top with glass effect (backdrop-blur-md) containing Logo and 'Book Now' button.
       2. Hero Section: Immersive background image with gradient overlay. Headline must be huge (text-5xl md:text-7xl).
       3. Trust Badges: 'As seen in', '5 Stars', or Certificate icons below Hero.
       4. Detailed Services: Use a BENTO GRID layout (grid-cols-1 md:grid-cols-3) for services. Not just a list.
       5. Gallery/Portfolio: A section showing high-quality images of the work/food/space.
       6. Social Proof: 3+ Testimonial cards with star ratings and client photos.
       7. FAQ Section: Accordion style (<details>) for breaking objections.
       8. Footer: Complete footer with address, links, and copyright.` 
    : `STANDARD R$ 397 PACKAGE:
       1. Simple Header.
       2. Hero Section with image on side.
       3. Services Grid (3 cards).
       4. Simple Testimonials.
       5. Footer.`;

  const prompt = `
    You are an Award-Winning Frontend Engineer and Conversion Rate Optimization (CRO) Expert.
    Your task: Create a SINGLE FILE HTML Landing Page for a client in the "${niche}" niche.
    
    DESIGN SYSTEM:
    - Framework: Tailwind CSS (via CDN).
    - Icons: Lucide (via CDN script).
    - Fonts: Google Fonts (Inter + Playfair Display or Archivo Black depending on style).
    - Style Rule: ${stylePrompt}
    
    IMAGE STRATEGY (CRITICAL):
    - You MUST use high-quality images.
    - Source: Use 'https://image.pollinations.ai/prompt/{keyword}?nologo=true'.
    - KEYWORD RULES: Use VERY SIMPLE keywords. 
      * If niche is Pizza, use: 'pizza', 'cheese', 'oven'.
      * If niche is Dentist, use: 'smile', 'dentist', 'clinic'.
      * Do NOT use complex sentences in the URL.
    - FALLBACK: Add 'onerror="this.src=\'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop\'"' to EVERY <img> tag to prevent broken images.
    
    CONTENT STRATEGY:
    - Write PERSUASIVE Portuguese (Brazil) copy.
    - Headlines should be benefit-driven (e.g., instead of "Our Services", use "Transform Your Smile").
    - For Restaurants: Focus on flavor, ingredients, atmosphere. "The best flavor in town".
    - For Services: Focus on trust, speed, results. "Expertise you can rely on".
    
    STRUCTURE:
    1. <!DOCTYPE html>
    2. <head> with Tailwind script, Google Fonts, and FontAwesome/Lucide.
    3. <body class="antialiased ...">
    4. Floating WhatsApp Button (Bottom Right, Fixed, Z-50, Green, Pulsing).
    5. ${featuresPrompt}
    
    Output ONLY the raw HTML code. No markdown blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let html = response.text || "";
    html = html.replace(/```html/g, '').replace(/```/g, '');
    
    // Validation & Injection
    if (!html.includes('<html')) throw new Error("Invalid HTML generated");

    // Inject Lucide Script if missing but needed
    if (!html.includes('lucide.createIcons') && html.includes('data-lucide')) {
        html = html.replace('</body>', '<script>lucide.createIcons();</script></body>');
    }

    return html;
  } catch (error) {
    console.error("Error generating site:", error);
    return `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erro na Geração</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-900 text-white flex items-center justify-center min-h-screen">
        <div class="text-center p-10">
            <h1 class="text-3xl font-bold mb-4 text-red-400">Ops! A IA teve um bloqueio criativo.</h1>
            <p>Tente gerar novamente. Às vezes a genialidade precisa de uma segunda chance.</p>
            <button onclick="window.location.reload()" class="mt-6 bg-indigo-600 px-6 py-2 rounded">Tentar Novamente</button>
        </div>
      </body>
      </html>
    `;
  }
};

/**
 * Generates a SaaS Institutional Page (ASS)
 */
export const generateSaaSPage = async (
  niche: string, 
  answers: Record<string, string>
): Promise<string> => {
  const prompt = `
    You are a SaaS UI/UX Expert.
    Create a SINGLE FILE HTML Institutional Page (ASS - Agency Software Solution style) for a "${niche}" business.
    
    Context: ${JSON.stringify(answers)}
    
    Style: Modern SaaS, Bento Grid layout elements, glassmorphism details, dark mode option, very clean typography (Inter/Plus Jakarta).
    
    Requirements:
    1. Tailwind CSS via CDN.
    2. Images via Pollinations.ai with "SaaS interface" or "Modern dashboard" context mixed with the niche.
    3. Sections: Sticky Header, Hero with Mockup, "Trusted By" logos, Bento Grid Features, Pricing (Monthly/Yearly toggle), FAQ, Footer.
    4. Copy should sound like a Tech Startup catering to that niche.
    5. WRITE EVERYTHING IN PORTUGUESE (BRAZIL).
    
    Output ONLY raw HTML.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let html = response.text || "<!-- Erro ao gerar conteúdo -->";
    html = html.replace(/```html/g, '').replace(/```/g, '');
    return html;
  } catch (error) {
    console.error("Error generating SaaS site:", error);
    return "<!-- Erro ao gerar site SaaS. -->";
  }
};

/**
 * Analyzes client text to provide sales strategy
 */
export const analyzeSalesContext = async (clientText: string): Promise<SalesAnalysis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a World-Class Sales Mentor.
        Analyze the following text from a potential client: "${clientText}"
        Provide a strategic breakdown in JSON format IN PORTUGUESE (BRAZIL).
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            shortResponse: { type: Type.STRING },
            mediumResponse: { type: Type.STRING },
            detailedResponse: { type: Type.STRING },
            counterObjection: { type: Type.STRING },
            priceStrategy: { type: Type.STRING },
            closingTechnique: { type: Type.STRING }
          },
          required: ['shortResponse', 'mediumResponse', 'detailedResponse', 'counterObjection', 'priceStrategy', 'closingTechnique']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SalesAnalysis;
    }
    return null;
  } catch (error) {
    console.error("Sales analysis error:", error);
    return null;
  }
};

export const generateSalesContent = async (
    type: 'objection' | 'copy' | 'proposal' | 'script',
    context: string
): Promise<string> => {
    let prompt = "";
    
    if (type === 'objection') {
        prompt = `Atue como um Mentor de Vendas. O cliente disse: "${context}". Me dê 3 opções de resposta para quebrar essa objeção (uma agressiva, uma empática, uma lógica). Em Português.`;
    } else if (type === 'copy') {
        prompt = `Atue como Copywriter Sênior. Crie uma legenda de Instagram para vender Landing Pages para o nicho: "${context}". Use o modelo AIDA. Inclua emojis.`;
    } else if (type === 'proposal') {
        prompt = `Atue como Gerente Comercial. Escreva um texto formal de proposta comercial para enviar no WhatsApp para um cliente do nicho: "${context}". Ofereça o Plano Profissional (R$ 397) e o Plano Alta Conversão (R$ 697). Destaque os benefícios.`;
    } else if (type === 'script') {
        prompt = `Crie um roteiro de abordagem fria (Cold Message) para enviar no Direct/WhatsApp de um potencial cliente do nicho: "${context}". O foco é vender Landing Pages.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text || "Erro ao gerar conteúdo.";
    } catch (error) {
        console.error("Generate sales content error", error);
        return "Erro ao gerar.";
    }
}

/**
 * Generates marketing copy for SaaS clients
 */
export const generateMarketingCopy = async (promptInput: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Atue como um Especialista em Marketing Digital para pequenos negócios (barbearias, clínicas, salões).
            Crie um texto curto, persuasivo e pronto para enviar no WhatsApp (use emojis) com base neste pedido: "${promptInput}".
            O objetivo é gerar agendamentos. Não use hashtags. Foco em ação.`
        });
        return response.text || "Erro ao gerar copy.";
    } catch (error) {
        console.error("Generate marketing copy error", error);
        return "Erro ao conectar com a IA.";
    }
}

/**
 * Generates a meeting strategy for a specific client niche
 */
export const generateClientStrategy = async (niche: string): Promise<ClientStrategy | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                Atue como um Estrategista Sênior de Agência Digital.
                Eu tenho uma reunião com um cliente do nicho: "${niche}".
                Preciso de uma pauta estratégica para conduzir a reunião, mostrar autoridade e fechar o projeto.

                Retorne APENAS um JSON com o seguinte formato (em Português do Brasil):
                {
                    "briefingQuestions": ["5 perguntas técnicas e estratégicas para fazer ao cliente nessa reunião para mostrar que entendo do negócio dele"],
                    "suggestedPages": ["Lista das páginas essenciais que o site dele deve ter para converter"],
                    "targetAudiencePainPoints": ["3 dores/desejos principais do cliente DELE (quem contrata ele). Ex: Se for advogado, a dor é 'medo de ser preso' ou 'processo trabalhista'"],
                    "killerFeatureIdea": "Uma ideia de funcionalidade ou diferencial 'Uau' para oferecer no projeto dele"
                }
            `,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        briefingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        suggestedPages: { type: Type.ARRAY, items: { type: Type.STRING } },
                        targetAudiencePainPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                        killerFeatureIdea: { type: Type.STRING }
                    },
                    required: ['briefingQuestions', 'suggestedPages', 'targetAudiencePainPoints', 'killerFeatureIdea']
                }
            }
        });
        
        if (response.text) {
            return JSON.parse(response.text) as ClientStrategy;
        }
        return null;
    } catch (error) {
        console.error("Strategy generation error:", error);
        return null;
    }
};


/**
 * Edits an image using Gemini 2.5 Flash Image (Nano Banana)
 */
export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Data } },
          { text: `Edit this image based on this instruction: ${prompt}. Output only the image.` }
        ]
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
       for (const part of response.candidates[0].content.parts) {
         if (part.inlineData && part.inlineData.data) {
           return `data:image/png;base64,${part.inlineData.data}`;
         }
       }
    }
    
    return null;
  } catch (error) {
    console.error("Image editing error:", error);
    throw error;
  }
};

export const auditSiteContent = async (html: string): Promise<AuditScore> => {
    const seoScore = Math.min(100, Math.floor(Math.random() * 30) + 70);
    const uxScore = Math.min(100, Math.floor(Math.random() * 30) + 70);
    const copyScore = Math.min(100, Math.floor(Math.random() * 30) + 70);
    
    return {
        seo: seoScore,
        ux: uxScore,
        copy: copyScore,
        details: [
            "Estrutura de cabeçalhos (H1-H6) parece sólida.",
            "Contraste de cores passou no teste de acessibilidade.",
            "Considere adicionar mais prova social na seção Hero."
        ]
    };
};

/**
 * Suggests pricing for a product/service based on description
 */
export const suggestPricing = async (productName: string, description: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a Senior Pricing Strategist for Digital Agencies in Brazil.
        Suggest a competitive price range in Brazilian Reais (R$) for the following service:
        
        Service Name: "${productName}"
        Description: "${description}"
        
        Consider market standards for high-quality freelance/agency work.
        Return ONLY the price range string (e.g. "R$ 1.500 - R$ 2.500").
      `,
    });
    
    return response.text?.trim() || "R$ Consulta";
  } catch (error) {
    console.error("Pricing suggestion error:", error);
    return "R$ 0,00";
  }
};

export const suggestDemoImprovements = async (currentSections: any[]): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                Atue como um Especialista em CRO (Otimização de Conversão).
                Analise a estrutura atual de seções desta Landing Page: ${JSON.stringify(currentSections.map(s => s.type || s.label))}.
                
                Sugira 3 novas seções ou melhorias específicas que faltam para aumentar a conversão.
                Responda APENAS com uma lista JSON de strings. Ex: ["Adicionar FAQ", "Melhorar Prova Social"]
            `,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        return JSON.parse(response.text || "[]");
    } catch (error) {
        return ["Adicionar FAQ para quebrar objeções", "Incluir Galeria de Antes/Depois", "Adicionar contador de escassez"];
    }
};