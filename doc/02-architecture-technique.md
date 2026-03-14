# McClean - Architecture Technique

## Stack technologique recommandee

### Application mobile - React Native (Expo)

**Pourquoi React Native avec Expo :**
- Un seul code source pour iOS et Android
- Expo simplifie le build, le deploiement et les mises a jour OTA (Over-The-Air)
- Large ecosysteme de librairies
- Performances proches du natif
- Cout de developpement reduit vs deux apps natives separees

**Alternative envisageable :** Flutter (Dart) - aussi cross-platform, bonnes performances.
React Native est prefere ici pour l'ecosysteme JavaScript plus large et la facilite de trouver
des developpeurs si besoin.

### Backend - Supabase (Backend-as-a-Service)

**Pourquoi Supabase :**
- Base de donnees PostgreSQL hebergee
- Authentification integree (email, Google, Apple)
- API REST et temps reel auto-generees
- Stockage de fichiers (photos avant/apres)
- Row Level Security (RLS) pour la securite des donnees
- Plan gratuit genereux pour demarrer, scaling progressif
- Open source, pas de vendor lock-in total

**Alternative envisageable :** Firebase (Google) - plus mature mais moins flexible sur le SQL,
et lock-in plus fort.

### Paiement - Stripe

**Pourquoi Stripe :**
- Conforme PSD2 / SCA (reglementation europeenne)
- Supporte carte bancaire, Apple Pay, Google Pay, SEPA
- SDK React Native disponible (@stripe/stripe-react-native)
- Gestion des factures et remboursements
- Dashboard pour le suivi des paiements
- Webhooks pour synchroniser avec le backend

### Notifications push - Expo Notifications + Supabase Edge Functions

- Expo gere l'envoi de notifications push iOS et Android
- Supabase Edge Functions pour la logique de declenchement

### Cartographie - React Native Maps + Geocoding

- Affichage de la zone d'intervention
- Verification que l'adresse du client est dans la zone couverte

### Internationalisation - i18next + react-i18next

- Detection automatique de la langue du telephone via expo-localization
- Francais (defaut) et anglais
- Changement de langue dans les parametres de l'app
- Contenus editables (services, recompenses) stockes en FR et EN en base

## Architecture globale

```
+------------------+       +------------------+       +------------------+
|                  |       |                  |       |                  |
|   App Mobile     | <---> |    Supabase      | <---> |     Stripe       |
|  (React Native   |       |  (PostgreSQL +   |       |   (Paiements)    |
|    + Expo)       |       |   Auth + API)    |       |                  |
|                  |       |                  |       +------------------+
+------------------+       +------------------+
                                   |
                           +-------+-------+
                           |               |
                    Edge Functions    Storage
                    (Notifications,   (Photos,
                     Webhooks)        Factures)
```

### Messagerie - Integration WhatsApp / Chat in-app

- Lien direct vers WhatsApp Business (06 83 48 30 94) pour le contact rapide
- Possibilite d'un chat in-app en phase ulterieure

## Structure de la base de donnees (tables principales)

| Table | Description |
|-------|-------------|
| `users` | Comptes utilisateurs (clients + admin) |
| `services` | Catalogue des services proposes (noms FR + EN) |
| `bookings` | Commandes / reservations |
| `quotes` | Devis demandes et envoyes |
| `payments` | Historique des paiements (lie a Stripe) |
| `loyalty_stamps` | Tampons de fidelite par client (cycle de 5) |
| `loyalty_rewards` | Paliers de recompenses : -30 EUR au 3e, lavage offert au 5e |
| `loyalty_history` | Historique des recompenses utilisees |
| `availability` | Creneaux disponibles dans le planning |
| `zones` | Zones geographiques d'intervention (IDF / 94 par defaut) |
| `notifications` | Historique des notifications envoyees |

## Environnements

| Environnement | Usage |
|---------------|-------|
| `development` | Developpement local, Supabase local (Docker) |
| `staging` | Tests avant mise en production |
| `production` | Application live sur les stores |
