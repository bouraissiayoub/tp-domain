# CONVENTIONS

## Langage
Tout le code est en **TypeScript**. Pas de `any`.

## Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `AppointmentCard.tsx` |
| Fonctions / variables | camelCase | `getUserById` |
| Fichiers non-composants | kebab-case | `firebase-config.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Collections Firestore | camelCase | `appointments`, `clients` |

## Structure des fichiers

```
components/        # Composants réutilisables
app/               # Pages Next.js App Router
lib/               # Helpers, config (firebase, auth, firestore)
functions/         # Cloud Functions Firebase
types/             # Types TypeScript globaux
docs/              # ARCHITECTURE.md, BESOIN.md, DESIGN.md, CONVENTIONS.md
```

## Composants

- Un composant par fichier
- Props typées avec `interface`
- Pas de logique métier dans les composants — déléguer à `lib/`

```ts
interface AppointmentCardProps {
  id: string
  clientName: string
  date: string
  status: 'pending' | 'accepted' | 'refused'
}
```

## Commits

Format : `type(scope): message court`

```
feat(rdv): add appointment request form
fix(auth): redirect to login on expired token
chore(deps): update firebase sdk
docs: update BESOIN.md
```

Types : `feat` `fix` `chore` `docs` `refactor` `style` `test`

## CSS / Style

- Tailwind CSS uniquement
- Variables design définies dans `DESIGN.md`
- Pas de style inline sauf cas exceptionnel

## Firestore

- Toujours typer les documents
- Jamais d'accès direct à Firestore dans les composants — passer par `lib/firestore.ts`

## Variables d'environnement

Toutes dans `.env.local`, jamais commitées.

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
RESEND_API_KEY=
```
