# Garantie Plus

Socle SaaS pour la vente et la gestion de garanties TV.

## Stack cible

- Next.js App Router
- TypeScript strict
- PostgreSQL + Prisma
- Auth par sessions sécurisées et rôles
- Wallet prépayé avec opérations idempotentes et atomiques
- Certificats PDF régénérables

## Démarrage

1. Copier `.env.example` vers `.env`
2. Installer les dépendances avec `npm install`
3. Générer Prisma avec `npm run prisma:generate`
4. Lancer les migrations avec `npm run prisma:migrate`
5. Démarrer l'app avec `npm run dev`

## Variables d'environnement Vercel

- `DATABASE_URL`: URL PostgreSQL poolée utilisée par l'application
- `DIRECT_URL`: URL PostgreSQL non poolée utilisée par Prisma pour les migrations
- `AUTH_SECRET`: secret long et aléatoire pour les sessions
- `APP_URL`: URL publique de l'application, par exemple `https://garantie-plus.vercel.app`

## Rôles

- `super_admin`
- `admin`
- `sub_admin`
- `reseller`

## Modules métier

- `admin`: pilotage plateforme, resellers, finance, certificats
- `reseller`: vente, clients, activation de garanties
- `wallet`: top-up, débits, annulations, audit
- `warranties`: plans, souscriptions, suivi du cycle de vie
- `certificates`: génération, régénération, journal d'événements

Le détail de l’architecture est dans `docs/architecture.md`.
