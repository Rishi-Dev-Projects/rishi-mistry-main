export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  image: string;
  tags: string[];
  featured?: boolean;
  colSpanDesktop?: string;
  year?: string;
  role?: string;
  highlights?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  points: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    percent: number;
    iconName: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Rishi Mistry",
  role: "IT Student & Web Developer",
  institution: "N.G. Patel Polytechnic",
  location: "Gujarat, India",
  email: "rishimistry33@gmail.com",
  socials: {
    github: "https://github.com/rishimistry",
    linkedin: "https://www.linkedin.com/in/mistry-rishi-044801354",
    instagram: "https://www.instagram.com/rishi_mistry",
  },
  profileImage: "https://i.ibb.co/8DNpG4Dy/snapedit-1741190364532.png",
  bio: "I am an Information Technology student and web developer based in India, currently pursuing my Diploma at N.G. Patel Polytechnic. I engineer clean, responsive, and aesthetically refined digital experiences from the ground up.",
  stats: [
    { number: "4+", label: "Live Production Builds" },
    { number: "3+", label: "Years Coding Journey" },
    { number: "8+", label: "Core Tech Stacks" },
    { number: "100%", label: "Commitment to Craft" },
  ],
  interests: [
    "Modern Web Architecture",
    "Database Engineering & SQL",
    "Computer Networking",
    "Artificial Intelligence Systems",
    "Responsive Mobile UI",
    "Cloud Infrastructure & Vercel",
  ],
  roadmap: [
    "Advanced Professional Certifications",
    "End-to-End Full-Stack Applications",
    "Open-Source Community Contributions",
    "Real-World Client Partnerships",
    "Developer Ecosystem Networking",
    "Mastering High-Scale Systems",
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "sangam-furniture",
    title: "Sangam Furniture",
    description:
      "A premium furniture store platform highlighting modern collections with an elegant UI, clean product catalog presentation, and responsive layouts across all screen sizes.",
    liveUrl: "https://sangam-furniture.vercel.app/",
    image: "https://i.ibb.co/6RzLTksw/Screenshot-2026-01-04-122725.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    featured: true,
    colSpanDesktop: "lg:col-span-7",
    year: "2026",
    role: "Frontend Architecture & UI Design",
    highlights: ["E-Commerce Catalog", "Fluid Mobile UI", "Edge Speed"],
  },
  {
    id: "shree-madhav-furniture",
    title: "Shree Madhav Furniture",
    description:
      "Full-stack furniture store and inventory management platform featuring dynamic product listings, order processing, and backend data workflows.",
    liveUrl: "https://shreemadhavfurniture.com/",
    image: "https://i.ibb.co/4ZbTCf9K/Screenshot-2026-05-28-155954.png",
    tags: ["Python", "Flask", "JavaScript", "HTML5", "CSS3"],
    colSpanDesktop: "lg:col-span-5",
    year: "2026",
    role: "Full-Stack Web Application",
    highlights: ["Inventory Workflow", "Order Handling", "Dynamic Catalog"],
  },
  {
    id: "buildpro",
    title: "BuildPro Construction",
    description:
      "A high-conversion construction enterprise website showcasing commercial services, client feedback, project portfolios, and responsive lead inquiry funnels.",
    liveUrl: "https://probuild-beta.vercel.app/",
    image: "https://i.ibb.co/spWSrGrP/Screenshot-2025-04-06-131349.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    colSpanDesktop: "lg:col-span-6",
    year: "2025",
    role: "Commercial Enterprise Web Platform",
    highlights: ["Lead Inquiry Funnel", "Project Portfolio", "Fast Loading"],
  },
  {
    id: "brandoji",
    title: "Brandoji Digital Agency",
    description:
      "Digital marketing agency platform featuring service showcases (SEO, PPC, Social Media), interactive sections, and high-conversion client communication channels.",
    liveUrl: "https://brandoji.vercel.app/",
    image: "https://i.ibb.co/RGJVxx9W/Screenshot-2025-04-06-133035.png",
    tags: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"],
    colSpanDesktop: "lg:col-span-6",
    year: "2025",
    role: "Creative Direction & Frontend",
    highlights: ["Interactive Modules", "Service Matrices", "Client Conversion"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "diploma-it",
    degree: "Diploma in Information Technology",
    institution: "N.G. Patel Polytechnic, Isroli",
    period: "2024 — Present",
    points: [
      "Mastering programming languages, data structures, and web technologies.",
      "Active participation in technical workshops and hands-on laboratory projects.",
      "Strengthening core competencies in database management, SQL, and networking.",
    ],
  },
  {
    id: "hsc-science",
    degree: "Higher Secondary Education (HSC)",
    institution: "Jay Ambe Vidhyabhavan",
    period: "2022 — 2024",
    points: [
      "Completed higher secondary education with a primary academic focus in Science.",
      "Cultivated analytical problem-solving and mathematical reasoning fundamentals.",
    ],
  },
  {
    id: "schooling",
    degree: "Secondary & Primary Schooling",
    institution: "Sincerite English Medium School",
    period: "2012 — 2022",
    points: [
      "Built strong English language fluency and academic foundations.",
      "Participated in regional technical events and extracurricular activities.",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    iconName: "Code",
    skills: [
      { name: "HTML5 & Semantic Web", level: "Advanced", percent: 95, iconName: "FileHtml" },
      { name: "CSS3 & Tailwind CSS", level: "Advanced", percent: 90, iconName: "PaintBrush" },
      { name: "JavaScript (ES6+)", level: "Advanced", percent: 90, iconName: "FileJs" },
      { name: "React & Next.js", level: "Proficient", percent: 75, iconName: "Atom" },
    ],
  },
  {
    title: "Backend & Database",
    iconName: "HardDrives",
    skills: [
      { name: "Python Programming", level: "Advanced", percent: 90, iconName: "TerminalWindow" },
      { name: "Flask Web Framework", level: "Proficient", percent: 80, iconName: "TreeStructure" },
      { name: "Node.js Runtimes", level: "Proficient", percent: 80, iconName: "Cpu" },
      { name: "MySQL & Relational DBs", level: "Proficient", percent: 80, iconName: "Database" },
    ],
  },
  {
    title: "Tools & Infrastructure",
    iconName: "Wrench",
    skills: [
      { name: "Git Version Control", level: "Proficient", percent: 85, iconName: "GitBranch" },
      { name: "GitHub Repositories", level: "Proficient", percent: 85, iconName: "GithubLogo" },
      { name: "Command Line & Bash", level: "Solid", percent: 75, iconName: "Terminal" },
      { name: "Vercel Deployments", level: "Advanced", percent: 90, iconName: "CloudArrowUp" },
    ],
  },
];

