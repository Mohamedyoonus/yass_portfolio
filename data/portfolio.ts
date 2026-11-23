/* ==========================================================================
   ✏️  EDIT THIS FILE TO UPDATE THE PORTFOLIO
   Every section of the site is rendered from this object.
   Wrap words in **double asterisks** to make them bold.
   ========================================================================== */

import type { IconName } from "@/components/icons";

export type Social = { name: string; url: string; icon: IconName };

export type Skill = {
  title: string;
  icon: IconName;
  blurb: string;
  items: string[];
};

export type Project = {
  title: string;
  category: string; // used for the filter buttons
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  colors: [string, string]; // gradient for the generated cover
  domain?: string; // shown in the mock browser bar
  image?: string; // optional screenshot in /public, e.g. "/projects/zayit.png"
  featured?: boolean;
};

export type Experience = {
  type: "work" | "education";
  role: string;
  company: string;
  location?: string;
  period: string;
  description?: string;
  highlights?: string[];
  tags?: string[];
};

export type Certification = { title: string; issuer: string; date: string };

export const portfolio = {
  // ---- Basics -------------------------------------------------------------
  name: "Mohamed Yoonus M",
  logo: "Yoonus",
  role: "Full Stack Developer",
  roles: ["Full Stack Developer", "Next.js Developer", "FastAPI Engineer", "Flutter Developer"],
  bio: "I build enterprise ERP products end to end — React and Next.js front-ends, FastAPI and MongoDB back-ends, and Flutter mobile apps — from API design and role-based access control to production support.",
  location: "Ramanathapuram, Tamil Nadu, India",
  email: "yoonusy655@gmail.com",
  available: true,
  availabilityText: "Open to new opportunities",
  resumeUrl: "/resume.pdf", // drop resume.pdf into /public, or set "" to hide the button

  // Background-removed portrait shown in the hero (set to null to show the code card instead).
  // `mask` is a small silhouette of the same photo, used to tint it with the site's colors.
  photo: { src: "/me.webp", mask: "/me-mask.png", width: 1942, height: 2753 } as {
    src: string;
    mask?: string;
    width: number;
    height: number;
  } | null,

  // Optional: a Formspree / Getform endpoint so the contact form sends
  // messages directly. Leave "" to open the visitor's email app instead.
  formEndpoint: "",

  socials: [
    { name: "GitHub", url: "https://github.com/Mohamedyoonus", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-yoonus-11288b248", icon: "linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/_yoonu_z/", icon: "instagram" },
    { name: "Email", url: "mailto:yoonusy655@gmail.com", icon: "mail" },
  ] satisfies Social[],

  // ---- Hero ---------------------------------------------------------------
  codeCard: {
    filename: "developer.ts",
    location: "Tamil Nadu, India",
    stack: ["React", "Next.js", "FastAPI"],
    loves: ["clean code", "creative design"],
  },
  // Floating tags over the hero image. Empty = none (keeps the photo clean).
  // Example: { icon: "package", title: "Enterprise ERP", subtitle: "inventory · procurement · finance" }
  heroBadges: [] as { icon: IconName; title: string; subtitle: string }[],

  marquee: [
    "React.js", "Next.js", "JavaScript", "TypeScript", "FastAPI", "Python", "Node.js", "Express.js",
    "MongoDB", "MySQL", "Supabase", "Flutter", "Dart", "Material-UI", "Tailwind CSS", "Framer Motion",
    "Socket.io", "JWT", "REST APIs", "Figma", "Git",
  ],

  // ---- About --------------------------------------------------------------
  about: [
    "I'm a **Full Stack Developer** building enterprise ERP products at VMA Soft Smart Software with AI Solutions. I work on web modules for store and outlet inventory operations — raw material and finished goods requests, stock issues, receipts, returns and wastage tracking — backed by **FastAPI and MongoDB**.",
    "I've worked across the full development cycle: designing REST APIs, implementing **role-based access control**, building a **Flutter Android app** for the Purchase-to-Pay workflow, testing with Postman and Swagger, and supporting features in production.",
    "I hold a **Master of Computer Applications** (with honors) from Jamal Mohamed College, Tiruchirappalli, where I also published a research paper on AI applications. I love crafting digital experiences with **clean code and creative design** — from client sites like Chalzart and Zayit Academy to full-stack apps like MediCare.",
  ],
  currently: "Building ERP modules at VMA Soft Smart Software",
  stats: [
    { value: 1, suffix: "+", label: "Year of industry experience" },
    { value: 4, suffix: "", label: "ERP modules & apps delivered" },
    { value: 5, suffix: "+", label: "Web projects shipped" },
    { value: 5, suffix: "+", label: "Happy freelance clients" },
  ],

  // ---- Skills ---------------------------------------------------------------
  skills: [
    {
      title: "Frontend",
      icon: "code",
      blurb: "Responsive, animated, component-driven interfaces.",
      items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Material-UI", "Framer Motion", "HTML & CSS"],
    },
    {
      title: "Backend & APIs",
      icon: "server",
      blurb: "Secure REST services with clean validation.",
      items: ["FastAPI (Python)", "REST API Design", "JWT Authentication", "Pydantic", "Node.js", "Express.js", "Socket.io"],
    },
    {
      title: "Databases",
      icon: "database",
      blurb: "Data models for inventory, procurement and finance.",
      items: ["MongoDB", "MySQL", "Supabase", "PostgreSQL", "Role-Based Access Control"],
    },
    {
      title: "Mobile",
      icon: "smartphone",
      blurb: "Android apps connected to real business workflows.",
      items: ["Flutter", "Dart", "Android", "REST Integration"],
    },
    {
      title: "ERP Domain",
      icon: "package",
      blurb: "Procurement, finance and inventory workflows, end to end.",
      items: [
        "Purchase Order", "GRN", "Accounts Payable", "Outgoing Payments",
        "RM / FG Requests", "Stock Issue & Receipt", "Returns", "Wastage Tracking",
      ],
    },
    {
      title: "Tools & Design",
      icon: "wrench",
      blurb: "Testing, collaboration and UI/UX design.",
      items: ["Git", "GitHub", "Postman", "Swagger / OpenAPI", "VS Code", "Figma", "Adobe XD", "Responsive Design"],
    },
  ] satisfies Skill[],

  // ---- Projects -----------------------------------------------------------
  projects: [
    {
      title: "Zayit Academy",
      category: "Web App",
      description: "Website and admin CMS for an art academy in Bangalore — 14 pages for classes, enrollment, events and a store, plus a Supabase-backed admin panel to manage content, enrollments and enquiries.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
      live: "https://www.zayitacademy.com",
      colors: ["#7d8f69", "#d4b483"],
      domain: "zayitacademy.com",
      image: "/projects/zayit.png",
      featured: true,
    },
    {
      title: "Chalzart",
      category: "Web App",
      description: "Live e-commerce platform for personalised art services — custom portraits, murals and wearable art — with a booking flow, online gallery and smooth animations, currently in production.",
      tags: ["React", "Vite", "Material UI", "Framer Motion", "React Router"],
      github: "https://github.com/Mohamedyoonus/ChalzArt",
      live: "https://www.chalzart.in",
      colors: ["#a8743f", "#d4a24c"],
      domain: "chalzart.in",
      image: "/projects/chalzart.png",
    },
    {
      title: "Store & Outlet ERP",
      category: "ERP",
      description: "Enterprise inventory modules where outlets raise raw-material and finished-goods requests, stores issue materials against them, and both sides track receipts, returns and reports.",
      tags: ["React.js", "FastAPI", "MongoDB", "JWT", "RBAC"],
      colors: ["#8b5cf6", "#22d3ee"],
      domain: "erp / store-module",
      featured: true,
    },
    {
      title: "Purchase-to-Pay App",
      category: "Mobile",
      description: "Flutter Android app covering the full Purchase-to-Pay flow — PO creation, GRN matching, accounts-payable invoices and outgoing payments — with AI-powered invoice scanning.",
      tags: ["Flutter", "Dart", "FastAPI", "AI Invoice Scanning"],
      colors: ["#10b981", "#22d3ee"],
      domain: "erp / purchase-to-pay",
      featured: true,
    },
    {
      title: "MediCare",
      category: "Web App",
      description: "MERN healthcare management system with role-based access for admins, doctors and patients, real-time appointment booking and online payments through Stripe and Razorpay.",
      tags: ["React", "Express", "Node.js", "MongoDB", "Stripe", "Razorpay"],
      github: "https://github.com/Mohamedyoonus/Healthcare-Management-System",
      live: "https://healthcare-management-system-gamma.vercel.app/",
      colors: ["#3b82f6", "#06b6d4"],
      domain: "medicare",
      image: "/projects/medicare.png",
    },
    {
      title: "Shopy",
      category: "Web App",
      description: "An e-commerce storefront where shoppers browse categories, search products, and manage a wishlist and cart — with an animated, polished UI. Best viewed on desktop.",
      tags: ["React", "MUI", "Framer Motion"],
      github: "https://github.com/Mohamedyoonus/E-com_Web",
      live: "https://shopy-olive.vercel.app/",
      colors: ["#0ea5e9", "#1e3a5f"],
      domain: "shopy",
      image: "/projects/shopy.png",
    },
    {
      title: "Streamix Chat",
      category: "Web App",
      description: "A full-stack real-time chat application with authentication and instant messaging over Socket.io, built with separate frontend and backend services for scalable messaging.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "JavaScript"],
      github: "https://github.com/Mohamedyoonus/chat_app",
      live: "https://chat-app-4lju.vercel.app/login",
      colors: ["#a855f7", "#ec4899"],
      domain: "streamix",
      image: "/projects/chat.png",
    },
    {
      title: "Wastage & Returns App",
      category: "ERP",
      description: "A standalone application to capture wastage entries and process warehouse returns, with role-based access for Admin, Manager and Staff users.",
      tags: ["React.js", "FastAPI", "MongoDB"],
      colors: ["#f59e0b", "#ef4444"],
      domain: "erp / wastage-returns",
    },
  ] satisfies Project[],

  // ---- Experience & education ---------------------------------------------
  experience: [
    {
      type: "work",
      role: "Full Stack Developer",
      company: "VMA Soft Smart Software with AI Solutions",
      period: "2025 — Present",
      description: "Building enterprise ERP products for inventory, procurement and finance.",
      highlights: [
        "**Store Module** — receive outlet requests, issue materials against them, receive returns and view overall reports",
        "**Outlet Manager Module** — workflows for outlets to raise RM and FG requests, receive stock, return items and record wastage",
        "**Wastage & Warehouse Returns App** — a separate application to capture wastage entries and process warehouse returns",
        "Built **FastAPI** services with REST endpoints, Pydantic validation and JWT authentication, backed by **MongoDB** collections for inventory, procurement and finance",
        "Implemented **role-based access control** across Admin, Manager and Staff roles",
        "Built a **Flutter Android app** for Purchase-to-Pay (PO creation, GRN matching, AP invoices, outgoing payments) and an **AI-powered invoice scanning** feature",
        "Tested APIs with Postman and Swagger, fixed QA-reported production issues, and took part in code reviews and sprint discussions",
      ],
      tags: ["React.js", "Next.js", "FastAPI", "MongoDB", "Flutter"],
    },
    {
      type: "work",
      role: "MERN Stack Intern",
      company: "CodTech IT Solutions",
      location: "Remote",
      period: "Apr 2025 — May 2025",
      description: "Built full-stack web applications using MongoDB, Express.js, React.js and Node.js, with REST API integration and responsive UI components.",
      highlights: ["Optimized application performance by **40%**"],
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "GitHub"],
    },
    {
      type: "work",
      role: "Freelance Developer",
      company: "Self-employed",
      location: "Remote",
      period: "Jan 2025 — May 2025",
      description: "Designed and built responsive web interfaces for clients using React and Material-UI.",
      highlights: ["Integrated smooth animations and micro-interactions with **Framer Motion**"],
      tags: ["React.js", "JavaScript", "Material-UI", "Tailwind CSS", "Framer Motion"],
    },
    {
      type: "work",
      role: "UI/UX Design Intern",
      company: "iLife Technologies",
      period: "2022",
      description: "Designed and prototyped digital interfaces in Adobe XD for client-facing web applications.",
      tags: ["Adobe XD", "Prototyping", "UI Design"],
    },
    {
      type: "education",
      role: "Master of Computer Applications (MCA)",
      company: "Jamal Mohamed College (Autonomous), Tiruchirappalli",
      period: "2023 — 2025",
      highlights: [
        "Graduated with **honors**",
        "Published a **research paper on AI applications**",
        "Lead developer for the college tech fest",
      ],
    },
    {
      type: "education",
      role: "B.Sc. Computer Science",
      company: "Jamal Mohamed College (Autonomous), Tiruchirappalli",
      period: "2020 — 2023",
      highlights: ["Specialized in web technologies", "Class representative for the CS department"],
    },
  ] satisfies Experience[],

  certifications: [
    { title: "Full Stack Development Training", issuer: "Maskan Technologies Pvt. Ltd.", date: "Jul 2024 – May 2025" },
    { title: "MEAN Stack Web Development", issuer: "Jamal Mohamed College", date: "Jun 2024" },
    { title: "Cyber Security", issuer: "Microsoft CyberShikshaa via ICT Academy", date: "Dec 2022" },
  ] satisfies Certification[],
};

export type Portfolio = typeof portfolio;
