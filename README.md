# 🌍 NomadAI - Client

![NomadAI Banner](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop)

> **Your personal Agentic AI travel assistant. Discover, plan, and experience the world effortlessly.**

🔗 **[Live Demo](https://assignment-04-client.vercel.app)** | 🔗 **[Backend API](https://assignment-04-server.vercel.app)**

---

## ✨ Features

- 🤖 **Agentic AI Planner**: Generate detailed, day-by-day travel itineraries based on destination, budget, and travel style.
- 💬 **Interactive AI Chat**: Talk directly to Nomad, the intelligent travel assistant, to tweak plans, ask for recommendations, or learn about destinations.
- 🔐 **Secure Authentication**: Robust email/password authentication using Better Auth, complete with secure cross-origin sessions.
- 🎨 **Premium UI/UX**: Built with a sleek, modern design system using Tailwind CSS and `shadcn/ui`. Fully responsive and accessible.
- 🌓 **Dark Mode Support**: Seamless transition between light and dark themes.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
Assignment-04-client/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Login and Register pages
│   │   ├── ai-assistant/   # Public AI chat page
│   │   ├── dashboard/      # Protected dashboard and AI planner
│   │   ├── explore/        # Destination exploration
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Navbar, Footer, Sidebar
│   │   └── ui/             # shadcn/ui components (buttons, inputs, etc.)
│   ├── lib/                # Utility functions and configurations
│   │   ├── auth-client.ts  # Better Auth client config
│   │   └── utils.ts        # Tailwind utility class merger
│   └── styles/             # Global CSS and Tailwind directives
├── next.config.ts          # Next.js config (including API proxy rewrites)
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

1. **Clone the repository** (if applicable) and navigate to the client folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---
*Built with ❤️ by Mdnazmusshakib.*
