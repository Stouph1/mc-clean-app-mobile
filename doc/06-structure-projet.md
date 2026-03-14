# McClean - Structure du Projet

## Arborescence prevue

```
mc-clean-app-mobile/
├── doc/                          # Documentation du projet
├── app/                          # Ecrans (Expo Router - file-based routing)
│   ├── (auth)/                   # Ecrans d'authentification
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (client)/                 # Ecrans client
│   │   ├── (tabs)/               # Navigation par onglets
│   │   │   ├── home.tsx          # Accueil / services
│   │   │   ├── bookings.tsx      # Mes reservations
│   │   │   ├── loyalty.tsx       # Carte de fidelite
│   │   │   └── profile.tsx       # Mon profil
│   │   ├── service/[id].tsx      # Detail d'un service
│   │   ├── booking/new.tsx       # Nouvelle commande
│   │   ├── booking/[id].tsx      # Detail d'une commande
│   │   ├── quote/new.tsx         # Demande de devis
│   │   ├── quote/[id].tsx        # Detail d'un devis
│   │   ├── payment/[id].tsx      # Paiement
│   │   └── map.tsx               # Carte zone d'intervention
│   ├── (admin)/                  # Ecrans administrateur
│   │   ├── (tabs)/
│   │   │   ├── dashboard.tsx     # Tableau de bord
│   │   │   ├── orders.tsx        # Gestion commandes
│   │   │   ├── schedule.tsx      # Planning
│   │   │   └── settings.tsx      # Parametres
│   │   ├── order/[id].tsx        # Detail commande
│   │   ├── quote/[id].tsx        # Gestion devis
│   │   ├── users.tsx             # Gestion utilisateurs
│   │   ├── services.tsx          # Gestion services
│   │   ├── zones.tsx             # Gestion zones
│   │   └── loyalty-config.tsx    # Config fidelite
│   ├── _layout.tsx               # Layout racine
│   └── index.tsx                 # Redirection selon le role
├── src/
│   ├── components/               # Composants reutilisables
│   │   ├── ui/                   # Boutons, inputs, cartes...
│   │   ├── booking/              # Composants lies aux commandes
│   │   ├── loyalty/              # Composants carte de fidelite
│   │   └── map/                  # Composants cartographie
│   ├── hooks/                    # Hooks personnalises
│   ├── lib/                      # Configuration (Supabase, Stripe...)
│   ├── services/                 # Logique metier / appels API
│   ├── stores/                   # State management (Zustand)
│   ├── types/                    # Types TypeScript
│   ├── i18n/                     # Internationalisation
│   │   ├── index.ts              # Configuration i18next
│   │   ├── locales/
│   │   │   ├── fr/               # Traductions francaises
│   │   │   └── en/               # Traductions anglaises
│   │   └── types.ts              # Types des cles de traduction
│   ├── utils/                    # Fonctions utilitaires
│   └── constants/                # Constantes (couleurs, config...)
├── assets/                       # Images, fonts, icones
├── supabase/                     # Config Supabase
│   ├── migrations/               # Migrations SQL
│   ├── functions/                # Edge Functions
│   └── seed.sql                  # Donnees de test
├── __tests__/                    # Tests
├── app.json                      # Configuration Expo
├── eas.json                      # Configuration EAS Build
├── package.json
└── tsconfig.json
```

## Choix techniques complementaires

| Besoin | Librairie |
|--------|-----------|
| Navigation | Expo Router (file-based) |
| State management | Zustand (leger, simple) |
| Formulaires | React Hook Form + Zod (validation) |
| UI Components | Tamagui ou NativeWind (TailwindCSS pour RN) |
| Requetes API | TanStack Query (React Query) |
| Icones | Lucide React Native |
| Animations | React Native Reanimated |
| Carte | react-native-maps |
| QR Code | react-native-qrcode-svg |
| Internationalisation | i18next + react-i18next + expo-localization |
| Stockage local | AsyncStorage + MMKV |
| Tests | Jest + React Native Testing Library + Detox |
