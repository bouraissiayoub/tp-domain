# ARCHITECTURE — Plateforme web accompagnement alimentaire

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Backend / API | Firebase Cloud Functions (Node.js) |
| Base de données | Firestore |
| Authentification | Firebase Auth (email/password) |
| Stockage fichiers | Firebase Storage |
| Emails | Resend |
| Hébergement | Firebase Hosting |
| Monitoring | Sentry |
| CI/CD | GitHub Actions |

## Structure du projet

```
/
├── app/                        # Next.js App Router
│   ├── (public)/               # Routes publiques (site vitrine)
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── prestations/        # Page prestations
│   │   ├── contact/            # Page contact
│   │   ├── recettes/           # Liste des recettes
│   │   ├── articles/           # Liste des articles
│   │   └── rendez-vous/        # Formulaire de demande RDV
│   └── (admin)/                # Routes back-office (protégées)
│       ├── dashboard/          # Tableau de bord
│       ├── clients/            # Gestion des clients
│       ├── rendez-vous/        # Gestion des RDV
│       ├── contenus/           # Gestion des contenus
│       └── planning/           # Gestion du planning
├── components/                 # Composants réutilisables
├── lib/
│   ├── firebase.ts             # Config Firebase
│   ├── auth.ts                 # Helpers Auth
│   └── firestore.ts            # Helpers Firestore
├── functions/                  # Firebase Cloud Functions
│   ├── appointments.ts         # Logique RDV
│   ├── notifications.ts        # Envoi emails Resend
│   └── clients.ts              # Logique clients
└── middleware.ts               # Protection routes admin
```

## Collections Firestore

```
clients/
  {clientId}/
    name, email, phone, createdAt
    notes/
      {noteId}/ content, createdAt, appointmentId?

appointments/
  {appointmentId}/
    clientName, email, phone, slotId, status (pending/accepted/refused), createdAt

availabilities/
  {slotId}/
    date, time, isAvailable

contents/
  {contentId}/
    title, type (recette/article/atelier/conseil/actualite), body, status (draft/published), publishedAt

consultations/
  {consultationId}/
    clientId, appointmentId, notes, recommendations, objectives, createdAt
```

## Flux de données

- **Visiteur → Firebase Hosting → Cloud Functions → Firestore** : lecture des contenus publiés, dépôt demande RDV
- **Professionnel → Firebase Auth → back-office → Cloud Functions → Firestore** : toutes les opérations CRUD
- **Cloud Functions → Resend → client** : emails automatiques (confirmation, refus RDV)
- **Upload → Firebase Storage → Firestore** : stockage fichiers, URL persistée en base

## Sécurité

- Routes admin protégées par middleware Next.js (vérification token Firebase)
- Firestore Security Rules : lecture/écriture restreinte au professionnel authentifié
- Données clients et notes jamais exposées publiquement
