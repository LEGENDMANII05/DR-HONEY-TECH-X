# DR HONEY TECH X

Production-oriented Next.js + TypeScript + PostgreSQL + Prisma platform for WhatsApp Bot Development, AI, automation, websites and digital solutions.

## Included
- Responsive futuristic glass UI with electric-blue accent
- Public routes: `/`, `/about`, `/bot`, `/services`, `/projects`, `/promotions`, `/contact`
- PostgreSQL + Prisma models and migration
- Seeded services, project, bot, social links and SEO defaults
- Server-side admin authentication with HTTP-only signed session cookie
- Admin dashboard statistics from PostgreSQL
- Services, projects and promotions CRUD
- Contact form persisted to PostgreSQL
- Admin password change with bcrypt hashing
- robots.txt, sitemap.xml and metadata
- Vercel-compatible architecture

## Requirements
- Node.js 20+
- PostgreSQL 14+

## Setup
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `NEXT_PUBLIC_SITE_URL`.
3. Install packages: `npm install`.
4. Generate Prisma client: `npm run db:generate`.
5. Apply migrations: `npm run db:migrate` (development) or `npx prisma migrate deploy` (production).
6. Seed: `npm run db:seed`.
7. Start: `npm run dev`.

## Admin
Open `/admin/login`. Initial credentials are read only from environment variables during seed; they are never embedded in client code. Change the password from Admin > Settings after first login.

## Production
Run `npm run build` and `npm start`, or deploy to Vercel with a hosted PostgreSQL database. Set all environment variables in the Vercel project settings and run `npx prisma migrate deploy` as part of deployment/initial database setup.

## Storage
The Prisma `Media` model and `lib/storage` location provide the application boundary for persistent media. Do not use the Vercel local filesystem for permanent uploads. Add a persistent object-storage adapter and credentials through environment variables before enabling production uploads.

## Security
Secrets are environment-only. Passwords are bcrypt-hashed. Admin routes require server-side authentication. Public content queries filter to published records. Login uses an HTTP-only same-site session cookie and protected admin APIs reject unauthenticated requests.

## Notes
The existing bot is linked at `https://dr-honey-mini.vercel.app/`; this project does not rewrite it or invent a live-status API. Where no bot status API exists, the UI displays `LIVE STATUS UNAVAILABLE`.
