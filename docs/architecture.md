# Architecture cible

## Intentions

Le projet est structuré pour séparer clairement :

- les parcours de plateforme (`super_admin`, `admin`, `sub_admin`)
- les parcours revendeurs (`reseller`)
- le noyau métier transactionnel (`wallet`, `warranties`, `certificates`)
- l’infrastructure technique (`auth`, `db`, `api`, `ui`)

## Structure projet

```text
.
|-- docs/
|-- prisma/
|   |-- schema.prisma
|   `-- seed.ts
|-- src/
|   |-- app/
|   |   |-- (platform)/
|   |   |   |-- admin/
|   |   |   |-- reseller/
|   |   |   `-- layout.tsx
|   |   |-- api/
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- shell/
|   |   `-- ui/
|   |-- lib/
|   |   |-- auth/
|   |   |-- config/
|   |   |-- db.ts
|   |   `-- utils.ts
|   `-- modules/
|       |-- certificates/
|       |-- wallet/
|       `-- warranties/
`-- package.json
```

## Découpage fonctionnel

### Admin

- gestion des partenaires revendeurs
- alimentation des wallets
- supervision des ventes et certificats
- opérations manuelles d’ajustement

### Reseller

- création de clients
- vente d’une garantie depuis le wallet prépayé
- consultation des certificats
- gestion des ventes et annulations

### Wallet

Le wallet doit rester le point de vérité financier. Chaque mouvement :

- possède une `idempotencyKey`
- est journalisé avec le solde avant/après
- s’exécute dans une transaction Prisma
- peut référencer la vente ou l’événement qui l’a déclenché

### Certificats

Le certificat PDF est modélisé comme un artefact régénérable :

- un certificat courant par garantie
- un numéro unique
- une version incrémentale
- un historique d’événements de génération/régénération

## Sécurité

- sessions persistées avec jeton hashé en base
- cookies `HttpOnly`, `Secure`, `SameSite=Lax`
- contrôle d’accès centralisé par rôles et permissions
- routes métier côté serveur
- validation d’entrées avec `zod`

## Prochaines étapes naturelles

1. brancher l’auth réelle
2. implémenter les actions serveur pour vendre une garantie
3. générer le PDF de certificat
4. ajouter les dashboards connectés à PostgreSQL
