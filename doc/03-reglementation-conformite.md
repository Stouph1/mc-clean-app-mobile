# McClean - Reglementation et Conformite

## RGPD (Reglement General sur la Protection des Donnees) - Europe

Le RGPD est **obligatoire** pour toute application traitant des donnees personnelles
de residents europeens.

### Obligations a respecter

1. **Consentement explicite**
   - Demander le consentement avant toute collecte de donnees
   - Cases a cocher non pre-cochees pour les CGU et la politique de confidentialite
   - Consentement separe pour les notifications marketing

2. **Droit des utilisateurs**
   - Droit d'acces : le client peut consulter toutes ses donnees
   - Droit de rectification : le client peut modifier ses informations
   - Droit a l'effacement ("droit a l'oubli") : suppression du compte et des donnees
   - Droit a la portabilite : export des donnees au format standard (JSON/CSV)
   - Droit d'opposition : refus du marketing direct

3. **Minimisation des donnees**
   - Ne collecter que les donnees strictement necessaires au service
   - Pas de collecte de donnees "au cas ou"

4. **Securite des donnees**
   - Chiffrement des donnees en transit (HTTPS/TLS)
   - Chiffrement des donnees sensibles au repos
   - Mots de passe hashes (bcrypt/argon2 - gere par Supabase)
   - Logs d'acces aux donnees

5. **Politique de confidentialite**
   - Document clair et accessible dans l'app
   - Detaille : quelles donnees, pourquoi, combien de temps, qui y accede
   - Coordonnees du responsable du traitement

6. **Registre des traitements**
   - Documenter tous les traitements de donnees personnelles
   - Obligatoire meme pour les petites structures

### Implementation dans l'app

- Ecran de consentement au premier lancement
- Page "Mes donnees" dans le profil (consultation, export, suppression)
- Politique de confidentialite accessible depuis les parametres
- Gestion des preferences de notification (marketing vs transactionnel)

## PSD2 / DSP2 - Paiements en Europe

La directive europeenne sur les services de paiement impose :

1. **Authentification forte (SCA - Strong Customer Authentication)**
   - 3D Secure obligatoire pour les paiements en ligne
   - Stripe gere automatiquement le SCA

2. **Securite des transactions**
   - Ne jamais stocker les numeros de carte cote serveur
   - Utiliser les tokens Stripe (les donnees carte ne transitent jamais par notre backend)

## Regles Apple App Store

1. **Human Interface Guidelines** : respecter les standards de design Apple
2. **In-App Purchase** : les services physiques (nettoyage) ne sont PAS soumis a la commission Apple - le paiement via Stripe est autorise
3. **Politique de confidentialite** obligatoire
4. **App Tracking Transparency (ATT)** : demander l'autorisation avant tout tracking publicitaire
5. **Sign in with Apple** : obligatoire si l'app propose d'autres connexions sociales (Google)
6. **Age minimum** : declarer l'age minimum d'utilisation (17+ si paiement)

## Regles Google Play Store

1. **Material Design** : suivre les recommandations de design Google
2. **Data Safety Section** : declarer toutes les donnees collectees dans la fiche Play Store
3. **Politique de confidentialite** obligatoire
4. **Consentement des utilisateurs de l'UE** : message de consentement conforme requis
5. **Paiement** : comme Apple, les services physiques permettent un paiement externe (Stripe OK)

## Mentions legales et CGU

L'application doit inclure :

1. **Conditions Generales d'Utilisation (CGU)**
   - Regles d'utilisation de l'application
   - Responsabilites de chaque partie
   - Conditions d'annulation et de remboursement

2. **Conditions Generales de Vente (CGV)**
   - Description des services
   - Tarification
   - Modalites de paiement
   - Delai de retractation (14 jours pour les services non executes - droit EU)

3. **Mentions legales**
   - Raison sociale de l'entreprise (a confirmer avec le gerant)
   - Numero SIRET (a confirmer avec le gerant)
   - Adresse du siege (a confirmer - departement 94, Val-de-Marne)
   - Coordonnees de contact :
     - Email : mcclean.idf94@gmail.com
     - Telephone : 06 83 48 30 94
     - Instagram : @mcclean_idf
   - Hebergeur des donnees (Supabase / AWS region Europe)

## Accessibilite

- Respecter les normes WCAG 2.1 niveau AA minimum
- Tailles de texte ajustables
- Contraste suffisant
- Compatibilite lecteur d'ecran (VoiceOver iOS, TalkBack Android)
- Navigation possible sans gestes complexes

## Checklist avant publication

- [ ] Politique de confidentialite redigee et accessible
- [ ] CGU et CGV redigees
- [ ] Mentions legales presentes
- [ ] Consentement RGPD implemente
- [ ] Gestion des droits utilisateurs (acces, suppression, export)
- [ ] 3D Secure active sur Stripe
- [ ] Sign in with Apple implemente
- [ ] Data Safety Section remplie (Google Play)
- [ ] App Privacy remplie (App Store Connect)
- [ ] Tests d'accessibilite effectues
- [ ] Registre des traitements documente
