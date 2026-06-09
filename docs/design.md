# DESIGN — Plateforme web accompagnement alimentaire

## Direction artistique

Site épuré, naturel, rassurant. Inspiré du monde du bien-être et de la nutrition. Pas trop clinique, pas trop coloré. L'objectif est de donner confiance au visiteur et de mettre en valeur le professionnel.

## Couleurs

```css
/* Primaires */
--color-primary: #4A7C59;       /* Vert sauge — couleur principale */
--color-primary-light: #6B9E78; /* Vert clair — hover, accents */
--color-primary-dark: #2E5E3A;  /* Vert foncé — titres, CTA */

/* Neutres */
--color-bg: #F9F6F1;            /* Fond principal — blanc cassé chaud */
--color-surface: #FFFFFF;       /* Cartes, formulaires */
--color-border: #E5E0D8;        /* Bordures légères */
--color-text: #2C2C2C;          /* Texte principal */
--color-text-muted: #7A7A7A;    /* Texte secondaire, labels */

/* Accent */
--color-accent: #C9763A;        /* Terracotta — boutons CTA, badges */
--color-accent-light: #F0E6DC;  /* Fond accent léger */

/* États */
--color-success: #4A7C59;
--color-error: #C0392B;
--color-warning: #E67E22;
--color-pending: #F0A500;
```

## Typographie

```css
/* Titres */
font-family: 'Playfair Display', serif;   /* Élégant, naturel */

/* Corps de texte et UI */
font-family: 'Inter', sans-serif;         /* Lisible, moderne */

/* Tailles */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 24px;
--text-2xl: 32px;
--text-3xl: 48px;
```

## Espacements

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

## Composants UI

### Boutons
```css
/* Primaire */
background: var(--color-accent);
color: white;
border-radius: 6px;
padding: 12px 24px;
font-weight: 600;

/* Secondaire */
background: transparent;
border: 1.5px solid var(--color-primary);
color: var(--color-primary);
border-radius: 6px;
padding: 12px 24px;
```

### Cartes
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06);
```

### Formulaires
```css
/* Input */
border: 1.5px solid var(--color-border);
border-radius: 8px;
padding: 10px 14px;
font-size: var(--text-base);
background: var(--color-surface);

/* Focus */
border-color: var(--color-primary);
outline: none;
box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.15);
```

## Layout

### Site public
- Max-width contenu : `1200px`
- Navigation : fixe en haut, fond blanc, ombre légère au scroll
- Hero section : pleine largeur, image de fond avec overlay vert doux
- Sections en alternance fond blanc / fond `--color-bg`
- Footer : fond `--color-primary-dark`, texte blanc

### Back-office
- Sidebar gauche fixe : `260px`, fond `--color-primary-dark`
- Contenu principal : fond `--color-bg`
- Header : `64px`, fond blanc, bordure bottom
- Tables : lignes alternées blanc / `#F9F6F1`

## Pages publiques

### Page d'accueil
- Hero : titre + sous-titre + bouton CTA "Prendre rendez-vous"
- Section "À propos" : photo + texte de présentation
- Section "Prestations" : 3-4 cartes
- Section "Dernières recettes" : grille 3 colonnes
- Section "Témoignages" (futur)
- CTA final : "Demander un rendez-vous"

### Page recettes / articles
- Grille 3 colonnes desktop, 2 tablette, 1 mobile
- Carte : image, catégorie badge, titre, date
- Filtre par type de contenu

### Page rendez-vous
- Calendrier des disponibilités
- Formulaire : prénom, nom, email, téléphone, message optionnel
- Confirmation inline après soumission

## Responsive

- **Mobile** : < 768px — navigation burger, 1 colonne
- **Tablette** : 768px - 1024px — 2 colonnes
- **Desktop** : > 1024px — layout complet

## Icônes

Librairie : `lucide-react`
