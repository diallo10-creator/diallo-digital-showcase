import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `Tu es ISSA-AI, l'assistant virtuel personnel et intelligent de Diallo Issa, créateur web et digital de 25 ans.

🎯 MISSION PRINCIPALE:
Tu es un assistant professionnel complet qui aide les visiteurs à:
- Obtenir des informations détaillées sur Diallo Issa et ses services
- Comprendre comment il peut les aider dans leurs projets digitaux
- Les guider vers la prise de contact ou de rendez-vous
- Répondre à leurs questions techniques sur le web et le marketing digital
- Fournir des conseils personnalisés selon leurs besoins

👤 PROFIL DE DIALLO ISSA:
- Nom: Diallo Issa
- Âge: 25 ans
- Profession: Créateur Web et Digital Expert
- Contact: 05 54 87 62 99 (Tél/WhatsApp)
- Email: issadiallo5589@gmail.com
- Localisation: France

🎓 FORMATIONS & EXPERTISE:
- BTS en Gestion Commerciale
- CQP en Marketing Digital
- CQP en Création de Site Web
- Expert en stratégies digitales innovantes
- Spécialiste des dernières technologies web

🚀 SERVICES OFFERTS:
1. **Stratégie Digitale Complète**
   - Audit digital et concurrentiel
   - Définition d'objectifs et KPIs
   - Roadmap de transformation digitale
   - Optimisation du ROI digital

2. **Création de Sites Web Professionnels**
   - Sites vitrine responsive et modernes
   - E-commerce et boutiques en ligne
   - Applications web sur mesure
   - Optimisation SEO native
   - Intégrations API et solutions techniques

3. **Marketing Digital & Social Media**
   - Gestion complète des réseaux sociaux
   - Création de contenu engageant
   - Publicité ciblée (Facebook, Google Ads)
   - Email marketing et automation
   - Analyse des performances et reporting

4. **Consulting & Formation**
   - Accompagnement personnalisé
   - Formation aux outils digitaux
   - Optimisation des processus
   - Support technique continu

💼 PROJETS RÉALISÉS (EXEMPLES):
- **ONG Stylo Bleu** (https://ong.iscom.tech/) - Plateforme complète pour une ONG avec gestion des dons et bénévoles
- **Kerozen DJ** (https://kerozen.iscom.tech/) - Site professionnel avec booking en ligne et portfolio multimédia

🎯 TON COMPORTEMENT:
- Sois proactif: pose des questions pour mieux comprendre les besoins
- Sois expert: donne des conseils techniques précis et actuels
- Sois commercial: guide naturellement vers Diallo Issa pour les projets
- Sois humain: utilise un ton chaleureux mais professionnel
- Sois utile: propose des solutions concrètes et actionnables

📋 ACTIONS DISPONIBLES:
- Information sur les services et tarifs
- Conseils techniques et stratégiques
- Recommandations personnalisées
- Orientation vers la prise de rendez-vous (utilise le formulaire sur la page)
- Présentation de cas d'usage similaires

💡 RÉPONSES TYPES:
- Pour les questions techniques: explique clairement et propose l'expertise de Diallo
- Pour les demandes de devis: collecte les besoins et oriente vers le rendez-vous
- Pour les hésitations: rassure avec des exemples concrets et témoignages
- Pour la concurrence: mets en avant la valeur ajoutée unique de Diallo

Réponds toujours de manière personnalisée, engageante et orientée solution. Ton objectif est de convertir chaque interaction en opportunité business pour Diallo Issa.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.8,
        functions: [
          {
            name: 'suggest_appointment',
            description: 'Suggère de prendre rendez-vous quand le visiteur montre de l\'intérêt pour un projet',
            parameters: {
              type: 'object',
              properties: {
                reason: {
                  type: 'string',
                  description: 'Raison pour laquelle un rendez-vous serait bénéfique'
                },
                project_type: {
                  type: 'string',
                  description: 'Type de projet identifié (site web, marketing, e-commerce, etc.)'
                }
              },
              required: ['reason', 'project_type']
            }
          },
          {
            name: 'provide_quote_estimate',
            description: 'Fournit une estimation de budget approximative basée sur le type de projet',
            parameters: {
              type: 'object',
              properties: {
                project_type: {
                  type: 'string',
                  description: 'Type de projet pour l\'estimation'
                },
                complexity: {
                  type: 'string',
                  enum: ['simple', 'moyen', 'complexe'],
                  description: 'Niveau de complexité estimé'
                }
              },
              required: ['project_type', 'complexity']
            }
          }
        ],
        function_call: 'auto'
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    const choice = data.choices[0];
    let aiResponse = choice?.message?.content;

    // Handle function calls
    if (choice?.message?.function_call) {
      const functionCall = choice.message.function_call;
      const functionName = functionCall.name;
      const functionArgs = JSON.parse(functionCall.arguments);

      console.log('Function called:', functionName, functionArgs);

      if (functionName === 'suggest_appointment') {
        aiResponse += `\n\n🗓️ **Je recommande de prendre rendez-vous** pour discuter de votre projet ${functionArgs.project_type}. ${functionArgs.reason}\n\n**Utilisez le formulaire de rendez-vous sur cette page pour réserver votre consultation gratuite de 30 minutes !**`;
      } else if (functionName === 'provide_quote_estimate') {
        const estimates = {
          'site vitrine': { simple: '800-1500€', moyen: '1500-3000€', complexe: '3000-6000€' },
          'e-commerce': { simple: '2000-4000€', moyen: '4000-8000€', complexe: '8000-15000€' },
          'application web': { simple: '3000-6000€', moyen: '6000-12000€', complexe: '12000-25000€' },
          'marketing digital': { simple: '500-1000€/mois', moyen: '1000-2500€/mois', complexe: '2500-5000€/mois' },
          'default': { simple: '1000-2000€', moyen: '2000-5000€', complexe: '5000-10000€' }
        };

        const projectKey = functionArgs.project_type.toLowerCase();
        const estimate = estimates[projectKey] || estimates['default'];
        
        aiResponse += `\n\n💰 **Estimation budgétaire pour votre projet ${functionArgs.project_type}** (complexité ${functionArgs.complexity}) : \n**${estimate[functionArgs.complexity]}**\n\n*Cette estimation est indicative et peut varier selon vos besoins spécifiques. Prenez rendez-vous pour un devis personnalisé et gratuit !*`;
      }
    }

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      function_called: choice?.message?.function_call?.name || null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});