# BESOIN — Plateforme web accompagnement alimentaire

## Contexte

Plateforme web pour un professionnel indépendant spécialisé dans l'accompagnement alimentaire. Il travaille seul. La plateforme a deux espaces :

- **Espace public** : site vitrine accessible aux visiteurs
- **Back-office** : espace privé réservé au professionnel

## Acteurs

- **Professionnel** : gère tout le back-office
- **Visiteur** : consulte le site, peut demander un RDV
- **Client** : personne suivie, pas de compte dans le MVP

## EPIC

1. Site vitrine public
2. Publication de contenus (recettes, articles, ateliers, conseils)
3. Prise de rendez-vous
4. Gestion des clients
5. Suivi des consultations
6. Gestion du planning
7. Suivi administratif simple
8. Sécurité et conformité RGPD

## User Stories

### US-001 — Demander un rendez-vous

**En tant que** visiteur non connecté  
**Je veux** soumettre une demande de rendez-vous depuis le site  
**Afin de** prendre contact avec le professionnel pour débuter un suivi

**Règles métier :**
- Le visiteur peut soumettre sans créer de compte
- Nom, prénom et email ou téléphone obligatoires
- Le visiteur sélectionne un créneau parmi les disponibilités
- Un créneau déjà accepté n'est pas affiché
- La demande est créée avec le statut `pending`
- Un email de confirmation est envoyé via Resend

**Scénario :**
```gherkin
Scenario: Soumettre une demande sur un créneau disponible
  Given je suis un visiteur non connecté
  And le créneau "Mardi 15 juin à 14h00" est disponible
  When je sélectionne ce créneau et saisis mes informations
  And je valide le formulaire
  Then ma demande est enregistrée dans Firestore avec le statut "pending"
  And le professionnel reçoit une notification
  And je reçois un email de confirmation via Resend

Scenario: Créneau déjà réservé non affiché
  Given le créneau "Mardi 15 juin à 14h00" est au statut "accepted"
  When un visiteur accède à la page de prise de rendez-vous
  Then ce créneau n'apparaît pas dans la liste
```

---

### US-002 — Ajouter une note de consultation

**En tant que** professionnel connecté  
**Je veux** ajouter une note de consultation à la fiche d'un client  
**Afin de** conserver l'historique du suivi, des recommandations et des objectifs

**Règles métier :**
- Le professionnel doit être authentifié via Firebase Auth
- La note est liée à un document client existant dans Firestore
- La note peut être associée à un rendez-vous (optionnel)
- Contenu obligatoire, minimum 10 caractères
- Notes strictement privées — Firestore Rules bloquent tout accès externe
- Date et heure enregistrées automatiquement

**Scénario :**
```gherkin
Scenario: Ajouter une note à une fiche client
  Given je suis connecté au back-office
  And la fiche client "Jean Dupont" existe dans Firestore
  When je clique sur "Ajouter une note" et saisis le contenu
  And je valide le formulaire
  Then la note est enregistrée dans la sous-collection Firestore du client
  And elle est invisible sur le site public

Scenario: Note liée à un rendez-vous
  Given je suis sur la fiche client "Jean Dupont"
  And un rendez-vous passé existe pour ce client
  When j'ajoute une note et je la lie à ce rendez-vous
  Then la note affiche la référence du rendez-vous associé
```

## Priorisation MVP

| Priorité | Fonctionnalité |
|---|---|
| P1 | Connexion administrateur |
| P1 | Back-office sécurisé |
| P1 | Site vitrine public |
| P1 | Gestion des contenus |
| P1 | Demande de rendez-vous |
| P1 | Validation des rendez-vous |
| P1 | Gestion des clients |
| P1 | Notes de consultation |
| P2 | Notifications email |
| P2 | Tableau de bord |
| P2 | Gestion avancée du planning |
| P2 | Suivi administratif simple |
| P3 | Espace client avec compte |
| P3 | SMS / WhatsApp |
| P3 | Newsletter automatisée |
| P3 | Synchronisation Google Calendar |
