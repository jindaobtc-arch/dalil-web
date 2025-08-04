export const getDalilResponse = async (question: string): Promise<string> => {
  // Simulate Dalil's Islamic assistant response
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const islamicResponses = [
    `Bismillah.

Cette question touche à un sujet important dans notre religion. D'après le Coran, Allah (soubhanahu wa ta'ala) dit dans la sourate Al-Baqarah (2:185) : "Allah veut pour vous la facilité, Il ne veut pas la difficulté pour vous."

Les savants reconnus comme Sheikh Ibn Baz (rahimahu Allah) ont expliqué que dans de telles situations, il faut revenir aux sources authentiques du Coran et de la Sunnah.

Pour une réponse plus détaillée et adaptée à votre situation spécifique, je recommande de consulter un savant reconnu ou des sources fiables comme IslamQA.info.

Qu'Allah vous facilite et vous guide sur le droit chemin.`,

    `Bismillah.

Cette question nécessite une approche basée sur les enseignements du Prophète (salla Allah alayhi wa sallam). Dans un hadith rapporté par l'Imam Bukhari, le Prophète (paix et bénédictions sur lui) a dit : "Les actions ne valent que par les intentions."

Les savants de la Salaf, comme Sheikh Al-Albani (rahimahu Allah), ont souligné l'importance de vérifier l'authenticité des sources avant d'appliquer tout enseignement.

Je n'ai pas trouvé de preuve spécifique et détaillée sur cet aspect précis. Je recommande de consulter un savant reconnu pour obtenir une réponse complète et adaptée.

Qu'Allah vous récompense pour votre recherche de la connaissance.`,

    `Bismillah.

Votre question est pertinente et mérite une réponse basée sur les sources authentiques. Le Coran nous enseigne dans la sourate An-Nisa (4:59) : "Ô vous qui croyez ! Obéissez à Allah, obéissez au Messager et à ceux d'entre vous qui détiennent l'autorité."

Sheikh Ibn Uthaymin (rahimahu Allah) a expliqué dans ses enseignements que dans de telles situations, la priorité doit être donnée à ce qui est le plus bénéfique pour la communauté musulmane.

Pour une fatwa précise sur votre cas particulier, il est préférable de s'adresser directement à un savant qualifié qui pourra examiner tous les détails de votre situation.

Baarak Allah fikoum.`
  ];

  return islamicResponses[Math.floor(Math.random() * islamicResponses.length)];
}