# McClean - Application Mobile

**"Redonnez vie a vos interieurs"**

Application mobile pour McClean, entreprise de nettoyage d'interieur de voiture, de canape et de tapis en Ile-de-France.

## Fonctionnalites

### Espace Client
- Catalogue des services avec tarifs (textile & voiture)
- Reservation en ligne avec choix de date et creneau
- Demande de devis pour services sur mesure
- Carte de fidelite digitale (-30€ au 3e passage, lavage offert au 5e)
- Paiement securise (Stripe)
- Historique des commandes
- Disponible en francais et anglais

### Espace Administrateur
- Tableau de bord (CA, commandes, clients)
- Gestion des commandes et du planning
- Creation et envoi de devis
- Suivi des paiements
- Gestion des utilisateurs et zones d'intervention

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Mobile | React Native + Expo (SDK 54) |
| Routing | Expo Router (file-based) |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Paiement | Stripe |
| State | Zustand |
| i18n | i18next + expo-localization |
| Formulaires | React Hook Form + Zod |
| Requetes | TanStack Query |

## Services et tarifs

### Textile & Ameublement
| Service | Prix |
|---------|------|
| Fauteuil | Sur devis |
| Moquette & Tapis | Sur devis |
| Canape 2 places | 55 € |
| Canape 3 places | 70 € |
| Canape +3 places | 90 € |

Options : anti-taches/anti-acariens (+10%), express 24h (+20%)

### Nettoyage interieur voiture

| Vehicule | Standard | Prestige |
|----------|----------|----------|
| Citadine | 50 € | 70 € |
| Berline | 60 € | 85 € |
| SUV/Break | 70 € | 100 € |

## Installation

```bash
# Cloner le repo
git clone https://github.com/Stouph1/mc-clean-app-mobile.git
cd mc-clean-app-mobile

# Installer les dependances
npm install --legacy-peer-deps

# Configurer l'environnement
cp .env.example .env
# Remplir EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY

# Lancer l'app
npx expo start
```


## Structure du projet

```
app/                  # Ecrans (Expo Router)
  (auth)/             # Login, inscription, mot de passe oublie
  (client)/(tabs)/    # Accueil, reservations, fidelite, profil
  (admin)/(tabs)/     # Dashboard, commandes, planning, parametres
src/
  components/         # Composants reutilisables
  constants/          # Theme (couleurs, spacing)
  i18n/               # Traductions FR/EN
  lib/                # Config Supabase
  services/           # Appels API
  stores/             # State Zustand
  types/              # Types TypeScript
supabase/
  migrations/         # Schema SQL
doc/                  # Documentation du projet
```

## Zone d'intervention

Ile-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95)

## Contact

- Instagram : @mcclean_idf
- Email : mcclean.idf94@gmail.com
- WhatsApp : 06 83 48 30 94
