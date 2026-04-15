# Comic Author Discovery Platform - Noir Gallery

A full-stack Nuxt 4 application for comic book authors to showcase their work and connect with readers.

## Features Implemented

### Design System
- **Unified Design Token System**: Comprehensive CSS custom properties for colors, typography, spacing, shadows, and transitions
- **Tailwind Integration**: All tokens exposed via Tailwind CSS classes
- **Noir Gallery Aesthetic**: Dark cinematic theme with electric yellow and neon purple accents

### Authentication System
- Session-based authentication with secure HTTP-only cookies
- User registration with pen name creation
- Login/logout functionality
- Role-based access (AUTHOR, ADMIN)

### Author Features
- **Dashboard**: Author overview with quick book creation
- **Book Management**: 
  - Create book drafts from Amazon URLs
  - Edit book metadata (title, synopsis, genre, cover image)
  - Publish/unpublish books
  - View all books with status indicators
- **Profile**: Author profile management (placeholder)

### Public Pages
- **Homepage**: Hero section, genre browser, featured authors, new releases
- **Authors Directory**: Browse all approved authors
- **Author Profile**: Individual author pages with book collections
- **Books Collection**: Browse all published books
- **Genre Pages**: Filter books by genre

### Admin Features
- Admin authentication
- Author moderation (approve/suspend)
- Book moderation capabilities

### API Routes
- `/api/auth/login` - User login
- `/api/auth/logout` - User logout
- `/api/auth/me` - Get current user
- `/api/auth/register` - User registration
- `/api/genres` - List all genres
- `/api/authors` - List all authors
- `/api/authors/[slug]` - Get author by slug
- `/api/books` - List all books
- `/api/dashboard/books` - Author's books (GET/POST)
- `/api/dashboard/books/[id]` - Single book (GET/PATCH)
- `/api/dashboard/books/[id]/publish` - Publish book

## Project Structure

```
comic-platform/
├── app/
│   ├── components/
│   │   ├── book/         # BookCard component
│   │   └── layout/       # Header, Footer, Dashboard shell
│   ├── composables/
│   │   ├── useAuth.ts    # Authentication composable
│   │   └── useDesignTokens.ts  # Design token access
│   ├── layouts/
│   │   ├── default.vue   # Public site layout
│   │   ├── dashboard.vue # Author dashboard layout
│   │   └── admin.vue     # Admin panel layout
│   ├── middleware/
│   │   ├── auth.ts       # Auth route protection
│   │   └── admin.ts      # Admin route protection
│   ├── pages/
│   │   ├── index.vue     # Homepage
│   │   ├── login.vue     # Login page
│   │   ├── join.vue      # Registration page
│   │   ├── authors/      # Author pages
│   │   ├── books/        # Book pages
│   │   └── dashboard/    # Dashboard pages
│   └── utils/            # Utilities
├── assets/
│   └── css/
│       ├── tokens.css    # Design token definitions
│       └── main.css      # Main stylesheet
├── server/
│   ├── api/              # API routes
│   │   ├── auth/         # Auth endpoints
│   │   ├── authors/      # Author endpoints
│   │   ├── books/        # Book endpoints
│   │   ├── dashboard/    # Dashboard endpoints
│   │   └── genres/       # Genre endpoints
│   └── utils/
│       ├── auth.ts       # Auth utilities
│       ├── db.ts         # Prisma client
│       ├── password.ts   # Password hashing
│       ├── session.ts    # Session management
│       └── slug.ts       # Slug generation
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── nuxt.config.ts        # Nuxt configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

## Tech Stack

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: bcryptjs + custom session management
- **Validation**: Zod
- **Security**: nuxt-security module

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Initialize database:
```bash
npx prisma db push
npm run seed
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Design Token System

The project uses a comprehensive design token system defined in `assets/css/tokens.css`:

### Colors
- Surface scale (9 levels): `--color-surface-dim` to `--color-surface-bright`
- Primary (Electric Yellow): `--color-primary`
- Secondary (Neon Purple): `--color-secondary`
- Tertiary (Warm Gold): `--color-tertiary`
- Content colors: `--color-on-surface`, `--color-on-surface-variant`
- Utility colors: `--color-outline`, `--color-error`

### Typography
- Font families: `--font-headline`, `--font-body`
- Sizes: `--text-display-lg`, `--text-headline-md`, `--text-body-md`, etc.
- Line heights: `--leading-display`, `--leading-body`
- Letter spacing: `--tracking-display`, `--tracking-body`

### Spacing & Layout
- Spacing scale: `--space-1` (0.25rem) to `--space-32` (8rem)
- Border radius: `--radius-sm`, `--radius-md`, etc.
- Shadows: `--shadow-sm`, `--shadow-lg`, `--glow-primary`
- Transitions: `--ease-cinematic`, `--duration-normal`
- Z-index: `--z-dropdown`, `--z-modal`, etc.

## Authentication Flow

1. User registers with email, password, and pen name
2. Account is created with PENDING status
3. User logs in and receives session cookie
4. Protected routes check session via middleware
5. Author dashboard allows book management
6. Books must be completed before publishing

## Next Steps for Production

1. **Database**: Switch from SQLite to PostgreSQL
2. **Image Upload**: Implement file upload for avatars and covers
3. **Email**: Add email verification and notifications
4. **Search**: Implement full-text search for books/authors
5. **Analytics**: Add click tracking and view analytics
6. **SEO**: Add meta tags and sitemap generation
7. **Testing**: Add unit and integration tests
8. **Deployment**: Configure for Vercel/Netlify deployment

## License

MIT
