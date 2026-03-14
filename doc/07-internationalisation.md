# McClean - Internationalisation (i18n)

## Langues supportees

| Langue | Code | Statut |
|--------|------|--------|
| Francais | `fr` | Langue par defaut |
| Anglais | `en` | Secondaire |

## Solution technique : expo-localization + i18next

### Pourquoi i18next + react-i18next

- Standard de l'industrie pour la traduction dans les apps React
- Interpolation de variables, pluralisation, formatage de dates/nombres
- Detection automatique de la langue du telephone via `expo-localization`
- Fallback configurable (si une cle manque en anglais -> affiche en francais)
- Compatible avec les outils de traduction professionnels

### Librairies

| Package | Role |
|---------|------|
| `i18next` | Moteur de traduction |
| `react-i18next` | Integration React (hook `useTranslation`) |
| `expo-localization` | Detection de la langue du telephone |
| `intl-pluralrules` | Polyfill pour les regles de pluralisation |

## Organisation des fichiers de traduction

```
src/
└── i18n/
    ├── index.ts              # Configuration i18next
    ├── locales/
    │   ├── fr/
    │   │   ├── common.json   # Textes generiques (boutons, navigation)
    │   │   ├── auth.json     # Ecrans connexion/inscription
    │   │   ├── booking.json  # Commandes et reservations
    │   │   ├── loyalty.json  # Carte de fidelite
    │   │   ├── payment.json  # Paiement et factures
    │   │   ├── quote.json    # Devis
    │   │   ├── admin.json    # Espace administrateur
    │   │   └── legal.json    # CGU, politique de confidentialite
    │   └── en/
    │       ├── common.json
    │       ├── auth.json
    │       ├── booking.json
    │       ├── loyalty.json
    │       ├── payment.json
    │       ├── quote.json
    │       ├── admin.json
    │       └── legal.json
    └── types.ts              # Types TypeScript pour les cles
```

## Exemple de fichier de traduction

### `src/i18n/locales/fr/common.json`
```json
{
  "welcome": "Bienvenue sur McClean",
  "services": "Nos services",
  "book_now": "Reserver maintenant",
  "my_bookings": "Mes reservations",
  "my_loyalty_card": "Ma carte de fidelite",
  "profile": "Mon profil",
  "logout": "Deconnexion",
  "cancel": "Annuler",
  "confirm": "Confirmer",
  "save": "Enregistrer",
  "loading": "Chargement...",
  "error": "Une erreur est survenue",
  "retry": "Reessayer"
}
```

### `src/i18n/locales/en/common.json`
```json
{
  "welcome": "Welcome to McClean",
  "services": "Our services",
  "book_now": "Book now",
  "my_bookings": "My bookings",
  "my_loyalty_card": "My loyalty card",
  "profile": "My profile",
  "logout": "Log out",
  "cancel": "Cancel",
  "confirm": "Confirm",
  "save": "Save",
  "loading": "Loading...",
  "error": "An error occurred",
  "retry": "Retry"
}
```

## Regles de developpement

1. **Jamais de texte en dur dans les composants** : tout passe par `t('cle')`
2. **Langue par defaut = francais** : le fallback est toujours `fr`
3. **Detection automatique** : au premier lancement, l'app utilise la langue du telephone
4. **Changement manuel** : le client peut changer la langue dans les parametres de l'app
5. **Persistence** : le choix de langue est sauvegarde localement (AsyncStorage)
6. **Documents legaux** : CGU, CGV et politique de confidentialite doivent exister dans les deux langues
7. **Notifications push** : envoyees dans la langue preferee de l'utilisateur
8. **Emails transactionnels** : envoyes dans la langue preferee de l'utilisateur
9. **Contenu admin** : les descriptions de services sont saisies en FR et EN par l'admin

## Formatage localise

| Element | Francais | Anglais |
|---------|----------|---------|
| Date | 14/03/2026 | 03/14/2026 |
| Heure | 14h30 | 2:30 PM |
| Prix | 49,90 EUR | EUR 49.90 |
| Separateur milliers | 1 000 | 1,000 |
| Separateur decimal | 49,90 | 49.90 |

Utiliser `Intl.DateTimeFormat` et `Intl.NumberFormat` avec la locale active pour le formatage.

## Impact sur la base de donnees

Les contenus editables par l'admin (services, recompenses) doivent supporter les deux langues :

```sql
-- Exemple : table services avec colonnes traduites
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

L'API retourne le champ dans la langue demandee via un parametre `lang` ou le header `Accept-Language`.

## Impact sur les stores

- **App Store** : fiche en francais (marche principal) + fiche en anglais
- **Google Play** : idem, traductions dans la Google Play Console
- **Screenshots** : un jeu de captures d'ecran par langue
