# Dalil - Assistant Islamique Français

Dalil est un assistant islamique éducatif qui fournit des réponses basées sur le Coran et la Sunnah authentique selon la méthodologie salafiya.

## 🚀 Fonctionnalités

- **Réponses authentiques** : Basées sur le Coran et la Sunnah
- **IA avancée** : Intégration OpenAI avec prompt spécialisé salafiya
- **Système de questions** : Limites par plan d'abonnement
- **Interface moderne** : Design responsive et accessible
- **Authentification** : Gestion des utilisateurs avec Supabase

## 🛠️ Configuration

### 1. Installation
```bash
npm install
```

### 2. Configuration des variables d'environnement
Copiez `.env.example` vers `.env` et configurez :

```env
# Supabase (requis)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (optionnel - pour IA avancée)
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 3. Configuration OpenAI (Recommandée)

Pour activer les réponses IA avancées :

1. Créez un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Générez une clé API dans la section "API Keys"
3. Ajoutez du crédit à votre compte OpenAI
4. Ajoutez la clé dans votre fichier `.env`
5. Redémarrez le serveur

**⚠️ Note de sécurité** : En production, utilisez un backend pour sécuriser votre clé API OpenAI.

### 4. Démarrage
```bash
npm run dev
```

## 🎯 Modes de fonctionnement

### Mode de base (sans OpenAI)
- Réponses prédéfinies par sujet
- Réponses contextuelles (Salam, prière, jeûne, etc.)
- Fonctionnel mais limité

### Mode IA avancée (avec OpenAI)
- Réponses personnalisées et détaillées
- Compréhension contextuelle avancée
- Maintien de la ligne salafiya via prompt spécialisé
- Références authentiques aux sources islamiques

## 📚 Méthodologie

Dalil suit strictement la méthodologie salafiya :
- Sources : Coran et Sunnah authentique
- Compréhension des Salaf as-Salih
- Références aux savants reconnus
- Pas de fatwa personnelle - redirection vers des savants qualifiés

## 🔧 Technologies

- **Frontend** : React + TypeScript + Tailwind CSS
- **Backend** : Supabase (Auth + Database)
- **IA** : OpenAI GPT-4 avec prompt spécialisé
- **Déploiement** : Netlify

## 📝 Contribution

Les contributions sont les bienvenues ! Assurez-vous de respecter la méthodologie islamique authentique dans toute modification.

## 📄 Licence

Ce projet est développé dans un but éducatif pour la communauté musulmane.
