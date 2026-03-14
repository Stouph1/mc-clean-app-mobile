# McClean - Deploiement et Haute Disponibilite

## Publication sur les stores

### Apple App Store

1. **Prerequis**
   - Compte Apple Developer (99 EUR/an)
   - Mac pour les builds (ou CI cloud comme EAS Build d'Expo)
   - Certificats et profils de provisioning (geres automatiquement par Expo/EAS)

2. **Processus de publication**
   - Build de production via `eas build --platform ios`
   - Soumission via `eas submit --platform ios`
   - Revue par Apple (1 a 3 jours en general)
   - Publication automatique ou manuelle apres approbation

3. **Mises a jour**
   - Mises a jour critiques (code JS) : OTA via EAS Update (instantane, sans repasser par la revue)
   - Mises a jour natives (nouvelles permissions, SDK) : nouvelle soumission requise

### Google Play Store

1. **Prerequis**
   - Compte Google Play Developer (25 USD, frais unique)
   - Signature de l'app (geree par Google Play App Signing)

2. **Processus de publication**
   - Build de production via `eas build --platform android`
   - Soumission via `eas submit --platform android`
   - Revue par Google (quelques heures a 2 jours)
   - Publication progressive recommandee (10% -> 50% -> 100%)

3. **Mises a jour**
   - Meme strategie OTA que iOS pour le code JS
   - Mises a jour natives : nouvelle soumission

## Strategie de haute disponibilite

### Backend (Supabase)

| Aspect | Solution |
|--------|----------|
| **Hebergement** | Supabase Cloud (AWS sous-jacent) |
| **Base de donnees** | PostgreSQL avec replicas automatiques (plan Pro) |
| **Backups** | Sauvegardes automatiques quotidiennes (7 jours, extensible) |
| **Uptime** | SLA 99.9% sur le plan Pro |
| **Scaling** | Auto-scaling des connexions et du compute |
| **CDN** | Supabase Storage utilise un CDN pour les fichiers statiques |
| **Region** | Choisir eu-west (Irlande ou Francfort) pour la proximite et la conformite RGPD |

### Paiement (Stripe)

- SLA 99.99% garanti par Stripe
- Webhooks avec retry automatique en cas d'echec
- Mode offline : mettre les paiements en file d'attente si le backend est temporairement indisponible

### Application mobile

- **Cache local** : donnees essentielles cachees sur le telephone (SQLite / AsyncStorage)
- **Mode hors ligne degrade** : consultation de l'historique et des infos de base meme sans connexion
- **Retry automatique** : les requetes echouees sont reessayees automatiquement
- **OTA Updates** : corrections deployees instantanement sans passage par les stores

## Monitoring et alertes

| Outil | Usage |
|-------|-------|
| **Supabase Dashboard** | Monitoring base de donnees, requetes, auth |
| **Stripe Dashboard** | Suivi des paiements, litiges, echecs |
| **Sentry** | Tracking des erreurs et crashs de l'app mobile |
| **EAS Insights** | Metriques de l'app (crashes, usage, adoption des updates) |

### Alertes a configurer

- Erreur 5xx sur l'API > seuil
- Taux d'echec de paiement anormal
- Crash rate de l'app > 1%
- Espace de stockage base de donnees > 80%
- Certificats SSL proches de l'expiration

## Pipeline CI/CD

```
Code push (GitHub)
    |
    v
Tests automatises (Jest + Detox)
    |
    v
Build (EAS Build)
    |
    +---> Staging (test interne)
    |         |
    |         v
    |     Validation manuelle
    |         |
    v         v
Publication Store    ou    OTA Update (EAS Update)
```

### Outils CI/CD

- **GitHub Actions** : pipeline d'integration continue
- **EAS Build** : builds cloud pour iOS et Android
- **EAS Submit** : soumission automatisee aux stores
- **EAS Update** : mises a jour OTA pour le code JavaScript

## Estimation des couts mensuels (demarrage)

| Service | Cout |
|---------|------|
| Supabase Pro | ~25 USD/mois |
| Apple Developer | ~8 EUR/mois (99 EUR/an) |
| Stripe | 1.4% + 0.25 EUR par transaction (Europe) |
| Sentry (plan gratuit) | 0 |
| EAS (plan gratuit) | 0 (builds limites) |
| Domaine | ~12 EUR/an |
| **Total fixe** | **~35 EUR/mois** |

Les couts augmentent progressivement avec le nombre d'utilisateurs et de transactions.
Supabase et EAS proposent des plans qui scalent de maniere previsible.
