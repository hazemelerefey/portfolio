# Portfolio Project Structure Map

> **Purpose**: This file maps the entire system so edits are fast and safe.  
> **Architecture**: Hub-and-spoke — `portfolioData` is the single data hub, consumed by ~30 components.

---

## 1. Data Flow Overview

```
┌──────────────────────────────────────────────────────────┐
│  src/data/portfolio.ts          ← SINGLE SOURCE OF TRUTH │
│  Exports: portfolioData (PortfolioData)                   │
│  Sections: personal, projects, experiences, education,    │
│            achievements, techStack, hardSkills, softSkills,│
│            tools, blogs, gallery                          │
└──────────┬──────────────────────────┬────────────────────┘
           │                          │
    ┌──────▼──────┐          ┌────────▼────────────┐
    │  Pages      │          │  /api/chat/route.ts │
    │  (9 pages)  │          │  Builds LLM prompt  │
    │  import     │          │  from portfolioData  │
    │  directly   │          └─────────────────────┘
    └──────┬──────┘
           │
    ┌──────▼──────────────────────────────────────┐
    │  ~30 Components import portfolioData        │
    │  Each reads only its needed sections        │
    └─────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────┐
  │  i18n Layer (separate from portfolioData)    │
  │  messages/en.json + messages/id.json         │
  │  → 14 components use useTranslations()       │
  │  Covers: UI chrome (nav, buttons, labels)    │
  └──────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────┐
  │  API Routes (server-side, env-var driven)    │
  │  /api/github-stats    ← GITHUB_TOKEN         │
  │  /api/wakatime-stats  ← WAKATIME_API_KEY     │
  │  /api/kaggle-stats    ← KAGGLE_USERNAME/TOKEN│
  │  /api/contact         ← EMAIL_USER/APP_PASS  │
  │  /api/gallery         ← public/gallery/ dir  │
  └──────────────────────────────────────────────┘
```

---

## 2. portfolioData Sections → Which Components Use Them

When you edit a section of `portfolioData`, this table tells you every file that will be affected:

| Section | Used By |
|---|---|
| `personal.name` | HeroVisual, Footer, ChatBot, Lanyard, IdentitySequence |
| `personal.title` | HeroVisual, Lanyard, IdentitySequence |
| `personal.subtitle` | HeroVisual, StackFeatureSection |
| `personal.bio` | AboutSection (indirect) |
| `personal.avatar` | Lanyard, IdentitySequence |
| `personal.email` | Footer, BlogBento, ProjectContact |
| `personal.phone` | ProjectContact |
| `personal.location` | Footer, BlogBento |
| `personal.resumeUrl` | NavigationShortcuts |
| `personal.website` | — |
| `personal.languages` | — |
| `personal.socialLinks` | Footer, SocialCorner, BlogBento |
| `projects` | Home page, Projects page, ProjectDetail, ProjectPageContent, StatsSection, AboutMeHub, ProjectStats |
| `experiences` | Experience page, AboutSection (story-* IDs), ExperienceMarquee, ExperienceTabsSection, AboutMeHub |
| `education` | ExperienceTabsSection |
| `achievements` | Achievements page, CertificateHeroScroll |
| `techStack` | Skills page, ProjectStats, BrandScroller, TechStack component |
| `hardSkills` | Skills page, HardSkills component |
| `softSkills` | Skills page, SoftSkills, HorizontalScrollCarousel |
| `tools` | Skills page, ToolsSection, ProjectStats, BrandScroller |
| `blogs` | Home page (StatsSection), Blog page, BentoHero, ImpactSection |
| `gallery` | Gallery page, FocusGrid, BentoHero |

---

## 3. Page → Component Map

Each page and what it renders (in visual order top-to-bottom):

### Home (`src/app/page.tsx`)
```
LoadingScreen (first visit only)
└── HeroVisual                    ← reads personal.*
    DeferredMount:
    ├── ExpertiseSection
    ├── AboutSection              ← reads experiences (story-* IDs)
    ├── StatsSection (top)        ← reads blogs, projects
    ├── StatsSection (bottom)
    ├── CTASection
    └── SocialCorner              ← reads personal.socialLinks
```

### Projects (`src/app/projects/page.tsx`)
```
HeroParallax                     ← reads projects
LogoTimeline                     ← reads techStack
DeferredMount:
├── ProjectContact               ← reads personal
└── ProjectStats                 ← reads projects, techStack, tools
```

### Project Detail (`src/app/projects/[slug]/page.tsx`)
```
ProjectPageContent               ← reads projects (filtered by slug)
├── ProjectDetail
└── TechStack                    ← reads techStack, tools
```

### Experience (`src/app/experience/page.tsx`)
```
InnovativeExperienceHero
ExperienceMarquee                ← reads experiences
ExperienceStickyScroll           ← reads experiences
Timeline                         ← reads experiences
ExperienceTabsSection            ← reads education, experiences
```

### Skills (`src/app/skills/page.tsx`)
```
SplineScene
TextPressure
KineticTechGrid                  ← reads techStack
ArchedTechIconsInteractive       ← reads techStack
HorizontalScrollCarousel         ← reads softSkills
HardSkills                       ← reads hardSkills
ToolsSection                     ← reads tools
```

### Achievements (`src/app/achievements/page.tsx`)
```
FallingText (dynamic)
CertificateHeroScroll            ← reads achievements
```

### Contact (`src/app/contact/page.tsx`)
```
Lanyard (dynamic)                ← reads personal.name, .avatar, .title
DynamicScrollVelocity (dynamic)
```

### Gallery (`src/app/gallery/page.tsx`)
```
ManifestoHero
CleanFilmGrid                    ← reads gallery (from API)
ImpactSection
```

### Blog (`src/app/blog/page.tsx`)
```
BentoHero                        ← reads blogs, projects, gallery
BlogCard                         ← reads blogs (mapped)
FlowingMenu
MarqueeClosing
```

### Blog Detail (`src/app/blog/[slug]/page.tsx`)
```
BlogContent                      ← reads blogs (filtered by slug)
```

### Resume (`src/app/resume/page.tsx`)
```
PdfViewer                        ← loads /resume.pdf
```

---

## 4. Navigation & Layout

### Provider Tree (outer → inner)
```
ThemeProvider (next-themes, dark default)
└── I18nProvider (next-intl, en/id)
    └── SmoothScrollProvider (Lenis)
        └── ThemeAwareClickSpark
            └── ArcPreloaderWrapper → LoadingScreen
                └── ConditionalNavigation
                    ├── Navbar (always, except detail pages)
                    ├── {children} (page content)
                    ├── Footer (always, except detail pages)
                    └── BackToTop (always, except detail pages)
                └── ChatBot (global, headless)
```

### Route → Layout Behavior

| Route | Navbar | Footer | BackToTop |
|---|---|---|---|
| `/` (home) | ✅ | ✅ | ✅ |
| `/projects` | ✅ | ✅ | ✅ |
| `/projects/[slug]` | ❌ | ❌ | ❌ |
| `/experience` | ✅ | ✅ | ✅ |
| `/skills` | ✅ | ✅ | ✅ |
| `/achievements` | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ |
| `/gallery` | ✅ | ✅ | ✅ |
| `/blog` | ✅ | ✅ | ✅ |
| `/blog/[slug]` | ❌ | ❌ | ❌ |
| `/resume` | ✅ | ✅ | ✅ |

---

## 5. i18n Translation Map

**Locales**: `en` (English, default)
**Framework**: `next-intl`  
**Config files**: `src/i18n/settings.ts`, `src/i18n/request.ts`, `src/lib/i18n.ts`

### Translation Namespaces → Components

| Namespace | Used By |
|---|---|
| `navigation` | Navbar, Footer, NavigationShortcuts |
| `navigation.menu` | Navbar |
| `footer` | Footer |
| `footer.marquee` | Footer |
| `about` | AboutSection, IdentitySequence |
| `blog` | Blog page, BentoHero, BlogCard |
| `projects` | ProjectDetail, ProjectPageContent |
| `projectHeader` | HeroParallax |
| `chatbot` | ChatBot |
| `ctaSection` | CTASection |
| `common` | AboutSection, ProjectPageContent |
| `technical.github` | GitHubStats |
| `technical.wakatime` | WakaTimeCard |

---

## 6. API Routes & Environment Variables

| Route | Method | Env Vars | Purpose |
|---|---|---|---|
| `/api/chat` | POST | `GROQ_API_KEY`, `GEMINI_API_KEY` | Chatbot (reads portfolioData for context) |
| `/api/contact` | POST | `EMAIL_USER`, `EMAIL_APP_PASSWORD` | Send contact emails via Gmail SMTP |
| `/api/github-stats` | GET | `GITHUB_TOKEN` | GitHub follower/repo/star counts |
| `/api/github-languages` | GET | `GITHUB_TOKEN` | Language distribution across repos |
| `/api/wakatime-stats` | GET | `WAKATIME_API_KEY` | Coding activity (languages, editors, time) |
| `/api/wakatime` | GET | `WAKATIME_API_KEY` | Duplicate of wakatime-stats (legacy) |
| `/api/kaggle-stats` | GET | `KAGGLE_USERNAME`, `KAGGLE_API_TOKEN` | Datasets and notebooks |
| `/api/gallery` | GET | — | Reads `public/gallery/` filesystem |
| `/api/downloadlanyard` | GET | — | Downloads 3D lanyard assets from GitHub |

---

## 7. Public Assets Map

```
public/
├── Hazem_light.webp             ← Logo (light mode) — used in layout.tsx icons
├── Hazem_dark.webp              ← Logo (dark mode) — used in layout.tsx icons
├── favicon.svg                 ← Browser favicon
├── resume.pdf                  ← Resume PDF (loaded by Resume page)
│
├── about/
│   └── profile.jpg             ← Profile photo (used by personal.avatar)
│
├── certificate/                ← Certificate images (40 files: .jpg, .webp, .pdf)
│   └── Referenced by achievements[].image
│
├── project/                    ← Project screenshots (20+ files: .webp, .png)
│   ├── Referenced by projects[].image
│   └── parallax/               ← Parallax effect images
│
├── gallery/                    ← Gallery images (25 .webp files)
│   └── Served by /api/gallery route
│
├── experience/                 ← Experience section images (6 .webp files)
│   └── Referenced by experiences[].image
│
├── journey/                    ← Journey timeline images (15 .webp files)
│
├── assets/                     ← Company/org logos (23 .webp files)
│   └── Referenced by experiences[].logo
│
├── feature/icons/              ← Feature/skill icons (8 .webp files)
│
└── lanyard/                    ← 3D lanyard assets (card.glb, images)
    └── Downloaded by /api/downloadlanyard
```

---

## 8. Edit Quick Reference

### "I want to change..."

| What to change | Where to edit |
|---|---|
| **Name / title / bio / contact** | `src/data/portfolio.ts` → `personal` section |
| **Projects list** | `src/data/portfolio.ts` → `projects` section + `public/project/` images |
| **Work experience** | `src/data/portfolio.ts` → `experiences` section + `public/experience/` images |
| **Education** | `src/data/portfolio.ts` → `education` section |
| **Certificates** | `src/data/portfolio.ts` → `achievements` section + `public/certificate/` images |
| **Tech stack / skills / tools** | `src/data/portfolio.ts` → `techStack`, `hardSkills`, `softSkills`, `tools` |
| **Blog posts** | `src/data/portfolio.ts` → `blogs` section |
| **Gallery images** | `public/gallery/` directory (auto-scanned by API) |
| **Social links** | `src/data/portfolio.ts` → `personal.socialLinks` |
| **Hero section layout** | `src/components/sections/HeroVisual.tsx` |
| **About section** | `src/components/sections/AboutSection.tsx` |
| **Navbar / menu items** | `src/components/layout/Navbar.tsx` |
| **Footer** | `src/components/layout/Footer.tsx` |
| **Chatbot behavior** | `src/components/layout/ChatBot.tsx` |
| **Chatbot LLM config** | `src/app/api/chat/route.ts` + env vars |
| **UI text / labels** | `messages/en.json` (and `messages/id.json`) |
| **Theme colors** | `tailwind.config.ts` + `src/styles/globals.css` |
| **Site metadata (title, OG)** | `src/app/layout.tsx` |
| **Logo / favicon** | `public/Hazem_light.webp`, `public/Hazem_dark.webp`, `public/favicon.svg` |
| **Profile photo** | `public/about/profile.jpg` |
| **Resume PDF** | `public/resume.pdf` |
| **Loading screen** | `src/components/layout/LoadingScreen.tsx` |
| **Page-specific components** | `src/components/sections/` or `src/components/ui/` |

### Critical files to be careful with

| File | Why |
|---|---|
| `src/data/portfolio.ts` | 2900+ lines, monolithic data — any syntax error breaks the entire site |
| `src/app/layout.tsx` | Root layout — changes affect every page |
| `messages/en.json` | Missing translation keys cause runtime errors |
| `src/components/layout/ConditionalNavigation.tsx` | Controls which pages show nav/footer |

---

## 9. Key Libraries

| Library | Purpose |
|---|---|
| `next` 16.x | React framework (App Router) |
| `react` 19.x | UI runtime |
| `next-intl` | Internationalization |
| `next-themes` | Dark/light mode |
| `framer-motion` | Animations |
| `gsap` + ScrollTrigger | Scroll animations |
| `three` + R3F + drei | 3D scenes |
| `lenis` | Smooth scrolling |
| `shadcn/ui` | UI components |
| `tailwindcss` 3.x | Utility CSS |
| `nodemailer` | Contact form emails |
| `react-pdf` | Resume viewer |
| `tsparticles` | Particle effects |
| `matter-js` | 2D physics |

---

## 10. Architecture Audit (2026-08-09)

### Fixed Issues

| Issue | Severity | Status |
|---|---|---|
| Chat route destructured `experience` (should be `experiences`) and `skills` (should be `hardSkills`) — chatbot had empty knowledge | 🔴 CRITICAL | ✅ Fixed |
| STRUCTURE.md documented `LLM_API_KEY`/`LLM_API_URL` — actual vars are `GROQ_API_KEY`/`GEMINI_API_KEY` | 🔴 CRITICAL | ✅ Fixed |
| proxy.ts exported `proxy` instead of `middleware`, was never invoked | 🔴 CRITICAL | ✅ Fixed (renamed to middleware.ts) |
| Chat route references portfolio data as the source of truth for education details | ⚠️ WARNING | ✅ Fixed (uses verified portfolio data) |

### Remaining Issues

| # | Issue | Severity | Details |
|---|---|---|---|
| 1 | **Chat route hardcoded fallbacks** | ⚠️ WARNING | Lines 58-70 contain fallback strings that override portfolioData when sections are empty. |
| 2 | **4 unused i18n namespaces** | ⚠️ WARNING | `hero`, `expertise`, `gallery`, `stats` are defined in en.json/id.json but never used by any component. Dead weight in every translation file. |
| 3 | **7 unused component files** | ⚠️ WARNING | `AboutMeHub.tsx`, `ExperienceTabsSection.tsx`, `SoftSkills.tsx`, `SkillsClosing.tsx`, `BlogBento.tsx`, `BlogPortalFooter.tsx`, `FocusGrid.tsx` — never imported anywhere. |
| 4 | **downloadlanyard is a GET that writes to disk** | ⚠️ WARNING | No rate limiting, no auth. Anyone can hit it repeatedly to fill disk (DoS vector). |
| 5 | **wakatime-stats returns hardcoded mock data on failure** | ⚠️ WARNING | Users see stale fake dates ("May 03, 2026") instead of an error message when the API fails. |
| 6 | **kaggle-stats has hardcoded notebooks/competitions** | ⚠️ WARNING | Only datasets/models come from the API. Notebooks and competitions are static. |
| 7 | **Duplicate wakatime routes** | ⚠️ WARNING | Both `/api/wakatime` and `/api/wakatime-stats` exist. Only the latter is documented. |
| 8 | **contact route doesn't fail fast on missing env vars** | ⚠️ WARNING | `EMAIL_USER` and `EMAIL_APP_PASSWORD` default to `''` — produces confusing SMTP errors instead of failing clearly. |
| 9 | **10 unreferenced project images** | ℹ️ INFO | Old project images still in `public/project/` for projects that were removed from portfolio.ts. |
| 10 | **1 unreferenced certificate** | ℹ️ INFO | `Generative AI.pdf` exists in `public/certificate/` but isn't referenced in achievements. |
| 11 | **desktop.ini in public/certificate/** | ℹ️ INFO | Windows system artifact. Should be in `.gitignore`. |
| 12 | **5 duplicate-format project images** | ℹ️ INFO | `.png` alongside `.webp` for the same projects — only `.webp` versions are used. |

### Verified OK

| Check | Status |
|---|---|
| portfolio.ts bracket balance | ✅ Depth = 0 |
| portfolio.ts syntax (Node parse) | ✅ Valid JS (TS type annotations stripped) |
| All `@/data/portfolio` imports | ✅ 41 files, all correct named imports |
| No duplicate top-level keys | ✅ All keys unique |
| No circular dependencies | ✅ Clean dependency graph |
| Error pages | ✅ error.tsx, global-error.tsx, not-found.tsx all properly implemented |
| i18n namespace coverage | ✅ All used namespaces exist in en.json |
| Public asset coverage | ✅ Profile photo, resume PDF, active project images all present |
