import { getDalilAIResponse } from './openai-client';

export const getDalilResponse = async (question: string): Promise<string> => {
  // Vérifier si l'API OpenAI est configurée
  if (import.meta.env.VITE_OPENAI_API_KEY) {
    try {
      return await getDalilAIResponse(question);
    } catch (error) {
      console.error('Erreur API OpenAI, utilisation des réponses de fallback:', error);
      // Continuer avec les réponses de fallback en cas d'erreur
    }
  }

  // Réponses de fallback (système actuel amélioré)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerQuestion = question.toLowerCase();
  
  // Réponse au Salam
  if (lowerQuestion.includes('salam') || lowerQuestion.includes('السلام')) {
    return `Wa alaykum assalam wa rahmatullahi wa barakatuh, akhi/ukhti.

Qu'Allah vous bénisse pour ce noble salut. Je suis Dalil, votre assistant islamique, et je suis là pour vous aider avec vos questions sur notre belle religion.

Comment puis-je vous assister aujourd'hui dans votre quête de connaissance islamique ?

Baarak Allah fikoum.`;
  }

  // Réponses sur la prière
  if (lowerQuestion.includes('prière') || lowerQuestion.includes('salat') || lowerQuestion.includes('صلاة')) {
    return `Bismillah.

La prière (Salat) est le deuxième pilier de l'Islam et notre lien direct avec Allah (soubhanahu wa ta'ala). 

Le Prophète (salla Allah alayhi wa sallam) a dit : "La prière est le pilier de la religion" (rapporté par Al-Bayhaqi).

Pour des questions spécifiques sur les ablutions, les horaires, ou les conditions de la prière, je recommande de consulter des sources authentiques comme les ouvrages de Sheikh Ibn Baz ou Sheikh Al-Albani (rahimahumullah).

Si vous avez une question précise sur un aspect de la prière, n'hésitez pas à la reformuler.

Qu'Allah accepte vos prières.`;
  }

  // Réponses sur le jeûne
  if (lowerQuestion.includes('jeûne') || lowerQuestion.includes('ramadan') || lowerQuestion.includes('صيام')) {
    return `Bismillah.

Le jeûne (Sawm) est le quatrième pilier de l'Islam. Allah (soubhanahu wa ta'ala) dit dans le Coran : "Ô vous qui croyez ! Le jeûne vous est prescrit comme il a été prescrit à ceux qui vous ont précédés, afin que vous atteigniez la piété." (Al-Baqarah 2:183)

Le jeûne du Ramadan est obligatoire pour tout musulman pubère, sain d'esprit et en bonne santé. Les malades, les voyageurs, les femmes enceintes ou qui allaitent peuvent avoir des dispenses selon les conditions définies par les savants.

Pour des situations particulières, il est recommandé de consulter un savant qualifié.

Qu'Allah vous facilite dans votre jeûne.`;
  }

  // Réponses sur la Zakat
  if (lowerQuestion.includes('zakat') || lowerQuestion.includes('aumône') || lowerQuestion.includes('زكاة')) {
    return `Bismillah.

La Zakat est le troisième pilier de l'Islam et un droit des pauvres sur les biens des riches. Allah (soubhanahu wa ta'ala) dit : "Et dans leurs biens, il y a un droit bien déterminé pour le mendiant et le déshérité." (Adh-Dhariyat 51:19)

La Zakat est obligatoire sur :
- L'or et l'argent (2,5% après un an de possession)
- Les marchandises commerciales
- Les récoltes et fruits
- Le bétail

Le nisab (seuil minimum) et les taux varient selon le type de bien. Je recommande de consulter des guides détaillés ou un savant pour calculer précisément votre Zakat.

Qu'Allah accepte votre Zakat et vous récompense.`;
  }

  // Réponses sur le Hajj
  if (lowerQuestion.includes('hajj') || lowerQuestion.includes('pèlerinage') || lowerQuestion.includes('حج')) {
    return `Bismillah.

Le Hajj est le cinquième pilier de l'Islam, obligatoire une fois dans la vie pour celui qui en a les moyens physiques et financiers. Allah (soubhanahu wa ta'ala) dit : "Et c'est un devoir envers Allah pour les gens qui ont les moyens, d'aller faire le pèlerinage de la Maison." (Al-Imran 3:97)

Le Hajj comprend plusieurs rites essentiels : l'Ihram, le Tawaf, le Sa'i entre Safa et Marwa, la station à Arafat, et la lapidation des stèles.

Pour les détails pratiques et les conditions du Hajj, je recommande de consulter des guides spécialisés et des savants expérimentés dans les rites du pèlerinage.

Qu'Allah vous facilite l'accomplissement du Hajj.`;
  }

  // Réponses sur le mariage
  if (lowerQuestion.includes('mariage') || lowerQuestion.includes('nikah') || lowerQuestion.includes('époux') || lowerQuestion.includes('نكاح')) {
    return `Bismillah.

Le mariage en Islam est une Sunnah recommandée et une protection pour la chasteté. Le Prophète (salla Allah alayhi wa sallam) a dit : "Ô jeunes gens ! Que celui d'entre vous qui en a les moyens se marie, car cela préserve mieux le regard et la chasteté." (Bukhari et Muslim)

Le mariage islamique nécessite :
- Le consentement des deux époux
- La présence de témoins
- La dot (mahr) pour l'épouse
- La tutelle (wali) pour la femme selon l'avis majoritaire

Pour des questions spécifiques sur les conditions du mariage, les droits et devoirs des époux, consultez des savants qualifiés.

Qu'Allah vous bénisse dans votre union.`;
  }

  // Réponses sur l'éducation des enfants
  if (lowerQuestion.includes('enfant') || lowerQuestion.includes('éducation') || lowerQuestion.includes('parent')) {
    return `Bismillah.

L'éducation des enfants est une responsabilité majeure en Islam. Le Prophète (salla Allah alayhi wa sallam) a dit : "Chacun de vous est un berger et chacun est responsable de son troupeau." (Bukhari et Muslim)

Les parents doivent enseigner à leurs enfants :
- Les bases de la foi (Aqida)
- La prière dès l'âge de 7 ans
- La lecture du Coran
- Les bonnes manières islamiques
- Le respect des parents et des aînés

L'éducation doit allier fermeté et bienveillance, suivant l'exemple du Prophète (paix et bénédictions sur lui).

Qu'Allah vous aide dans l'éducation de vos enfants.`;
  }

  // Réponses générales variées
  const generalResponses = [
    `Bismillah.

Votre question touche à un aspect important de notre religion. Le Coran nous guide dans la sourate Al-Baqarah (2:185) : "Allah veut pour vous la facilité, Il ne veut pas la difficulté pour vous."

Dans de telles situations, il est essentiel de revenir aux sources authentiques : le Coran et la Sunnah du Prophète (salla Allah alayhi wa sallam).

Je vous encourage à consulter des savants reconnus comme Sheikh Ibn Baz, Sheikh Al-Albani, ou Sheikh Ibn Uthaymin (rahimahumullah) pour une réponse détaillée adaptée à votre situation.

Qu'Allah vous facilite et vous guide sur le droit chemin.`,

    `Bismillah.

Cette question mérite une réflexion basée sur les enseignements prophétiques. Dans un hadith authentique rapporté par Bukhari, le Prophète (salla Allah alayhi wa sallam) a dit : "Les actions ne valent que par les intentions, et chacun n'aura que ce qu'il a eu l'intention de faire."

Les savants de la Salaf ont toujours insisté sur l'importance de vérifier l'authenticité des sources avant d'appliquer tout enseignement religieux.

Pour une fatwa précise sur votre cas particulier, je recommande de consulter un savant qualifié qui pourra examiner tous les détails de votre situation.

Baarak Allah fikoum.`,

    `Bismillah.

Votre recherche de connaissance est louable. Allah (soubhanahu wa ta'ala) dit dans le Coran : "Et dis : Ô mon Seigneur, accroît mes connaissances !" (Ta-Ha 20:114)

Cette question nécessite une approche nuancée basée sur les principes islamiques. Le Prophète (paix et bénédictions sur lui) nous a enseigné à chercher la facilité dans la religion tout en respectant ses limites.

Je vous conseille de vous référer à des sources fiables comme IslamQA.info ou de consulter directement un imam ou savant de votre région pour une réponse personnalisée.

Qu'Allah vous récompense pour votre quête de savoir.`,

    `Bismillah.

Cette question soulève des points importants dans la jurisprudence islamique. Le Coran nous enseigne dans la sourate An-Nisa (4:59) : "Ô vous qui croyez ! Obéissez à Allah, obéissez au Messager et à ceux d'entre vous qui détiennent l'autorité."

Les savants contemporains comme Sheikh Salih Al-Fawzan ou Sheikh Abdul-Aziz Aal ash-Sheikh ont traité de sujets similaires dans leurs enseignements.

Pour une réponse complète et adaptée à votre contexte spécifique, il serait bénéfique de consulter un conseil de savants ou un centre islamique de confiance.

Qu'Allah vous guide vers ce qui est le mieux pour vous dans cette vie et dans l'au-delà.`
  ];

  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}