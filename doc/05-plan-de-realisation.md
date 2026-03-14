# McClean - Plan de Realisation

## Phase 1 - Fondations (Semaines 1-3)

### Setup du projet
- [ ] Initialiser le projet Expo (React Native)
- [ ] Configurer TypeScript
- [ ] Configurer ESLint + Prettier
- [ ] Mettre en place la structure de dossiers
- [ ] Configurer la navigation (React Navigation)
- [ ] Creer le theme UI (couleurs, typographie, composants de base)
- [ ] Configurer GitHub + CI de base

### Internationalisation
- [ ] Configurer i18next + react-i18next + expo-localization
- [ ] Creer les fichiers de traduction FR et EN
- [ ] Mettre en place la detection automatique de la langue
- [ ] Ajouter le selecteur de langue dans les parametres

### Backend
- [ ] Creer le projet Supabase
- [ ] Definir et creer le schema de base de donnees
- [ ] Configurer l'authentification (email, Google, Apple)
- [ ] Mettre en place les Row Level Security policies
- [ ] Creer les Edge Functions de base

## Phase 2 - Parcours Client (Semaines 4-7)

### Authentification
- [ ] Ecran d'inscription / connexion
- [ ] Sign in with Apple
- [ ] Sign in with Google
- [ ] Ecran de profil utilisateur
- [ ] Ecran de consentement RGPD

### Catalogue et commande
- [ ] Page d'accueil avec les services
- [ ] Detail d'un service
- [ ] Formulaire de commande (service, date, adresse)
- [ ] Selection de creneau dans le planning
- [ ] Confirmation de commande

### Devis
- [ ] Formulaire de demande de devis
- [ ] Liste des devis (en attente, accepte, refuse)
- [ ] Detail d'un devis avec possibilite d'accepter/refuser

### Carte et localisation
- [ ] Affichage de la zone d'intervention sur carte
- [ ] Verification de l'adresse dans la zone couverte
- [ ] Autocompletion d'adresse

## Phase 3 - Paiement et Fidelite (Semaines 8-10)

### Paiement
- [ ] Integration Stripe (setup compte Stripe)
- [ ] Ecran de paiement (carte, Apple Pay, Google Pay)
- [ ] 3D Secure / SCA
- [ ] Historique des paiements et factures
- [ ] Webhooks Stripe -> Supabase pour confirmation

### Carte de fidelite
- [ ] Ecran carte de fidelite (points, progression)
- [ ] Logique d'accumulation de points
- [ ] Affichage des recompenses disponibles
- [ ] Application des recompenses lors d'une commande
- [ ] QR code du client

## Phase 4 - Espace Administrateur (Semaines 11-14)

### Dashboard
- [ ] Tableau de bord avec KPIs
- [ ] Liste des commandes avec filtres et statuts
- [ ] Detail d'une commande (accepter, planifier, terminer)

### Gestion
- [ ] Gestion du planning (creneaux, disponibilites)
- [ ] Gestion des devis (creer, envoyer, suivre)
- [ ] Gestion des services (ajouter, modifier, supprimer)
- [ ] Gestion des utilisateurs
- [ ] Configuration de la carte de fidelite
- [ ] Gestion des zones d'intervention

### Notifications
- [ ] Configuration des notifications push
- [ ] Envoi de notifications aux clients
- [ ] Notifications automatiques (confirmation, rappel, promo)

## Phase 5 - Tests et Publication (Semaines 15-17)

### Tests
- [ ] Tests unitaires (Jest)
- [ ] Tests d'integration (API)
- [ ] Tests E2E (Detox)
- [ ] Tests d'accessibilite
- [ ] Tests sur differents appareils et tailles d'ecran
- [ ] Beta test avec un groupe restreint (TestFlight + Google Play Internal)

### Conformite
- [ ] Rediger la politique de confidentialite (FR + EN)
- [ ] Rediger les CGU et CGV (FR + EN)
- [ ] Rediger les mentions legales
- [ ] Remplir la Data Safety Section (Google Play)
- [ ] Remplir les App Privacy Details (App Store)
- [ ] Verifier la conformite RGPD complete

### Publication
- [ ] Creer les assets stores (icone, screenshots FR + EN, description FR + EN)
- [ ] Soumettre sur l'App Store
- [ ] Soumettre sur le Google Play Store
- [ ] Configurer le monitoring (Sentry)
- [ ] Configurer les alertes

## Phase 6 - Post-lancement

- [ ] Suivi des metriques et retours utilisateurs
- [ ] Corrections de bugs prioritaires
- [ ] Ameliorations basees sur les retours
- [ ] Optimisation des performances si necessaire

## Points d'attention

1. **Commencer simple** : MVP avec commande + paiement + fidelite, puis enrichir
2. **Tester tot** : impliquer le gerant de McClean des la phase 2 pour les retours
3. **Securite d'abord** : RGPD et securite des paiements ne sont pas des options
4. **UX mobile** : chaque ecran doit etre utilisable d'une main, rapidement
5. **Performance** : temps de chargement < 2 secondes sur chaque ecran
