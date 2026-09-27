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

## Mobile navigation update

The mobile navigation has been updated to remain fixed to the viewport while scrolling, with a stronger frosted-glass treatment, safe-area support, a raised center action, and a vertical ellipsis menu in the top header. The menu supports outside-click and Escape-key closing and prevents background scrolling while open.

## UI update — glossy mobile navigation and interactions

The latest UI revision keeps the bottom navigation fixed to the viewport and adds a raised center Bot action plus a Menu action. Public links use clean buttons/icons; destination URLs are intentionally not rendered as long text on the public UI. The three-dot/top menu opens with a slide/fade/blur transition, supports Escape/outside-click closing, and contains Light/Dark appearance controls.

Interactive controls receive a subtle electric-blue click glow and touch particles. Cards expose additional details through animated `VIEW DETAILS` controls, and page content uses staggered slide-up reveal animations. Reduced-motion preferences are respected.

The public UI also includes icon-only social buttons so long WhatsApp/Instagram/YouTube/Telegram URLs do not create horizontal overflow.

## Admin panel deployment checklist

The admin panel requires a real hosted PostgreSQL database. Vercel does not provide a permanent PostgreSQL database automatically.

Set these Vercel Project Environment Variables for **Production, Preview and Development** as appropriate:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

### First admin login on Vercel

The login endpoint automatically creates the first administrator from `ADMIN_USERNAME` and `ADMIN_PASSWORD` when the database contains no administrator. This means you do not have to run the seed command on Vercel just to create the first login.

After the first administrator exists, changing `ADMIN_PASSWORD` in Vercel does **not** overwrite the database password. Use the Admin → Settings password-change screen to change it.

### Database initialization

Before first use, run locally against the hosted database:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
```

If the database is already initialized and the first-admin bootstrap is used, the login can create the admin automatically, but the other CMS seed content still requires `npm run db:seed` or equivalent database initialization.

### If `/admin` redirects to login

Check that the login request returns `200`, then check the browser's cookies for `dr_honey_session`. Also verify `AUTH_SECRET` is set and that the deployment is using the same environment variables as the database connection.

### If login returns 500/400

Check the Vercel function logs. The most common cause is a missing/invalid `DATABASE_URL`, an unavailable PostgreSQL database, or missing `ADMIN_USERNAME` / `ADMIN_PASSWORD`.


## Vercel admin recovery / fixed bootstrap login

For the supplied recovery account, set these **exact values** in Vercel Project Settings → Environment Variables (Production + Preview if needed):

- `ADMIN_USERNAME=DRHONEY05`
- `ADMIN_PASSWORD=DRHONEY05TECHX804X05`
- `ADMIN_FORCE_SYNC=true`

Also set a real PostgreSQL `DATABASE_URL`, a 32+ character `AUTH_SECRET`, and `NEXT_PUBLIC_SITE_URL`. Do **not** put the password into Git or the source ZIP.

The production build now runs `prisma migrate deploy` before `next build`, so the Prisma schema is applied during a Vercel build when the database is reachable. The login endpoint can bootstrap the first admin automatically. With `ADMIN_FORCE_SYNC=true`, the environment credentials can also recover a stale bootstrap password for the same username.

After you successfully log in, you can change the password from **Admin → Settings**. For maximum security, set `ADMIN_FORCE_SYNC=false` after recovery so changing the Vercel environment password no longer synchronizes the database account.

### If login still fails

Open `/admin/login` and inspect the network response for `/api/admin/login`. The endpoint now returns a non-secret diagnostic code such as `ADMIN_BACKEND_UNAVAILABLE`, `AUTH_SECRET_INVALID`, `ADMIN_ENV_MISSING`, or `INVALID_CREDENTIALS`. Check the Vercel Function Logs and the corresponding environment variable.

## Hero artwork update

The hero now uses a clean transparent character cutout at `public/hero-character.png` (and the legacy `public/hero-reference.webp` has been replaced with the same transparent artwork). The artwork contains no website text, so the HTML/UI copy is rendered only once by the page. Desktop and mobile hero layout keeps the character on the right and the headline/copy on the left so text does not sit over the character's face or hair. The fixed top three-dot menu remains above the hero area.

## Mobile Reviews
The bottom-right navigation item is now **Reviews** instead of Menu. The top-right three-dot menu remains the site navigation menu. `/reviews` provides a glassmorphism review form with 1–5 star ratings and optional area selection (Website, Services, Projects, Bot, Contact, Other). Reviews are stored in PostgreSQL through `/api/reviews` and displayed on the public page.
