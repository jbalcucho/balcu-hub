# Balcu Hub

Portal web del ecosistema Balcu Apps: vitrina pública de proyectos y panel admin para gestionar publicaciones (cuentos, demos, lanzamientos).

**Stack:** Next.js 15 · Neon Postgres · Prisma · NextAuth (Google) · Vercel

---

## Qué incluye

| Ruta | Descripción |
|------|-------------|
| `/` | Vitrina pública: proyectos + feed de publicaciones |
| `/publicaciones/[slug]` | Detalle interno o redirect a URL externa |
| `/admin` | Dashboard (solo admin) |
| `/admin/publications` | CRUD de publicaciones |
| `/admin/login` | Login con Google |

---

## Setup local

### Requisitos

- Node.js 20+
- Cuenta [Neon](https://neon.tech) (Postgres)
- Google OAuth credentials (mismo flujo que RotaTuDisfraz)

### Pasos

```bash
git clone https://github.com/jbalcucho/balcu-hub.git
cd balcu-hub
npm install
cp .env.example .env.local   # completa variables
npm run db:deploy            # aplica migraciones
npm run db:seed              # datos iniciales (cuentos Chacachon, etc.)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Deploy en Vercel

1. Push del repo a GitHub (`github.com/jbalcucho/balcu-hub`).
2. Importar en [Vercel](https://vercel.com/new) → seleccionar el repo.
3. Agregar variables de entorno (las de `.env.example`).
4. En **Google Cloud Console**, agregar redirect URI de producción:
   - `https://TU-PROYECTO.vercel.app/api/auth/callback/google`
5. Deploy. Luego ejecutar migraciones contra Neon prod:

```bash
npm run db:deploy
npm run db:seed
```

(con `DATABASE_URL` apuntando a la base de prod)

---

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Neon pooler (runtime) |
| `DIRECT_URL` | Neon directo (migraciones) |
| `NEXTAUTH_URL` | URL del sitio (`http://localhost:3000` o Vercel) |
| `NEXTAUTH_SECRET` | Secreto aleatorio largo |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth |
| `ADMIN_EMAIL` | **Solo esta cuenta** puede entrar al admin |

---

## Proyectos (registry)

Los proyectos se definen en `data/registry.json` (sincronizado con `../registry.md` del ecosistema). Las publicaciones viven en Postgres y pueden:

- Enlazar a contenido externo (cuentos HTML en Chacachon, RotaTuDisfraz live)
- Tener contenido interno en el hub (`/publicaciones/[slug]`)

---

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Desarrollo local |
| `npm run build` | Build producción |
| `npm run db:migrate` | Nueva migración (dev) |
| `npm run db:deploy` | Aplicar migraciones |
| `npm run db:seed` | Datos iniciales |
| `npm run db:studio` | Prisma Studio |

---

## Repo Git

Repositorio independiente dentro del workspace `balcu-apps/`. Remote sugerido:

`github.com/jbalcucho/balcu-hub`
