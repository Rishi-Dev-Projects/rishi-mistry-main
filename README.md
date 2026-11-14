# Rishi Mistry — Personal Portfolio Website (Next.js App Router)

Source code for the personal portfolio website of **Rishi Mistry**, Information Technology student and web developer.

🔗 **Live Deployment:** [rishi-mistry.vercel.app](https://rishi-mistry.vercel.app)

---

## 📌 Architecture & Stack

Migrated to **Next.js 15 (App Router)** with **TypeScript**, **Tailwind CSS**, and **Framer Motion**:

- **Framework:** Next.js 15 (React Server Components + isolated client leaf components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 with Obsidian Dark Palette & Double-Bezel hardware tokens
- **Typography:** `Plus Jakarta Sans` & `JetBrains Mono`
- **Iconography:** `@phosphor-icons/react` (Lightweight, consistent SVG vector primitives)
- **Motion & Micro-interactions:** Framer Motion spring physics & CSS custom beziers
- **Forms & Email:** `@emailjs/browser` (Asynchronous delivery with live feedback)
- **Deployment:** Vercel

---

## 🗂️ Project Structure

```
├── legacy-vanilla/        # Complete backup of previous static HTML/CSS/JS site
├── src/
│   ├── app/
│   │   ├── globals.css    # Ambient background grid, typography imports, scrollbars
│   │   ├── layout.tsx     # Root metadata, fonts, ambient grid, navbar, footer
│   │   └── page.tsx       # Landing page composing all section components
│   ├── components/
│   │   ├── Navbar.tsx     # Floating glass island navigation with mobile drawer
│   │   ├── Hero.tsx       # Asymmetric hero, focus typewriter, rishi.config.ts terminal
│   │   ├── About.tsx      # 12-column asymmetric Bento Grid (Profile, stats, roadmap)
│   │   ├── Projects.tsx   # Selected work showcase with aspect-ratio frames & live links
│   │   ├── Education.tsx  # Academic timeline with glowing emerald node track
│   │   ├── Skills.tsx     # Categorized skills matrix with animated progress bars
│   │   ├── Contact.tsx    # Direct contact tiles + interactive EmailJS form
│   │   ├── Footer.tsx     # Live IST clock & smooth back-to-top button
│   │   └── ui/
│   │       ├── BentoCard.tsx # Double-bezel machined hardware container
│   │       ├── Button.tsx    # Nested CTA button with trailing icon circle
│   │       └── Eyebrow.tsx   # Status dot & pill tag
│   └── lib/
│       ├── data.ts        # Typed project data, skills, education, and personal info
│       └── utils.ts       # cn() utility helper with clsx and tailwind-merge
├── tailwind.config.ts     # Obsidian/Emerald design tokens & double-bezel shadows
├── next.config.mjs        # Remote image optimization rules for i.ibb.co
└── package.json           # Scripts and dependencies
```

---

## 🚀 Development & Deployment

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```
