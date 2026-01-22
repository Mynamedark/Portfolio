import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  category: string;
  issuedDate: string;
  description: string;
  icon: string;
  color: string;
  verificationUrl: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  highlight: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpa?: string;
  description: string;
  highlights?: string[];
  relevantCoursework?: string[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
  findings: string[];
}

const ADMIN_PASSWORD = "Dk_2652005";

// Default Skills Data
const DEFAULT_SKILLS: Skill[] = [
  { id: 1, name: "Open Source Intelligence (OSINT)", category: "OSINT & Investigation", proficiency: 95 },
  { id: 2, name: "Cyber Crime Investigation", category: "OSINT & Investigation", proficiency: 90 },
  { id: 3, name: "Digital Evidence Collection", category: "OSINT & Investigation", proficiency: 88 },
  { id: 4, name: "Threat Intelligence Analysis", category: "OSINT & Investigation", proficiency: 85 },
  { id: 5, name: "Social Engineering Detection", category: "OSINT & Investigation", proficiency: 87 },
  { id: 6, name: "Secure Web Development", category: "Technical & Development", proficiency: 90 },
  { id: 7, name: "Database Design & SQL", category: "Technical & Development", proficiency: 88 },
  { id: 8, name: "API Security", category: "Technical & Development", proficiency: 87 },
  { id: 9, name: "Authentication Systems", category: "Technical & Development", proficiency: 89 },
  { id: 10, name: "OWASP Security Practices", category: "Technical & Development", proficiency: 92 },
];

// Default Experience Data
const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: 1,
    title: "OSINT & Cyber Crime Investigation",
    organization: "Independent",
    period: "2025 – Present",
    location: "Remote",
    description: "Leading independent investigations into cybercrime and threat intelligence",
    responsibilities: [
      "Conducted advanced OSINT on threat actors and fake profiles",
      "Analyzed phishing, impersonation, and online fintech fraud patterns",
      "Correlated emails, usernames, IPs, and domains across open sources",
      "Supported documentation for law enforcement standards",
      "Studied roles of Cyber Crime Cells & CERT-In in India",
      "Built comprehensive threat intelligence reports",
    ],
    skills: ["OSINT", "Investigation", "Threat Analysis", "Documentation"],
    highlight: "Specialized in tracing digital footprints and threat actor attribution",
  },
  {
    id: 2,
    title: "Web & Application Development",
    organization: "Various Projects",
    period: "2023 – 2024",
    location: "Remote/On-site",
    description: "Developed secure web and mobile applications with focus on security",
    responsibilities: [
      "Designed secure web & mobile applications from ground up",
      "Implemented robust authentication and validation mechanisms",
      "Built access control systems and permission hierarchies",
      "Designed SQL-backed systems minimizing injection risks",
      "Integrated APIs securely with proper rate limiting",
      "Handled sensitive data with encryption and secure storage",
      "Applied OWASP security practices throughout development",
      "Conducted security code reviews and testing",
    ],
    skills: ["Web Development", "Mobile Development", "SQL", "Security", "API Design"],
    highlight: "Built production-grade applications with security as first-class citizen",
  },
];

// Default Education Data
const DEFAULT_EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Uka Tarsadia University",
    period: "2022 – 2025",
    location: "Gujarat, India",
    gpa: "3.8/4.0",
    description: "Comprehensive computer science education with strong focus on cybersecurity, application development, and software engineering principles.",
    highlights: [
      "Specialization in Cybersecurity & Application Development",
      "Focus on Secure Coding Practices & OWASP Standards",
      "Hands-on experience with Digital Forensics Tools",
      "Research Projects in Network Security & Cryptography",
    ],
    relevantCoursework: [
      "Cybersecurity Fundamentals",
      "Network Security & Cryptography",
      "Web Application Security",
      "Database Design & SQL",
      "Secure Software Development",
      "Digital Forensics & Investigation",
      "Incident Response & Threat Analysis",
      "API Security & Authentication",
      "Systems Administration",
      "Linux & Unix Systems",
    ],
  },
];

// Default Projects Data
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "OSINT Threat Actor Attribution",
    category: "OSINT Investigation",
    date: "2024",
    description: "Comprehensive OSINT investigation tracking threat actor infrastructure, communication patterns, and attribution analysis.",
    tags: ["OSINT", "Threat Analysis", "Attribution"],
    findings: [
      "Identified 15+ infrastructure assets",
      "Correlated multiple communication channels",
      "Produced detailed attribution report",
    ],
  },
  {
    id: 2,
    title: "Phishing Campaign Analysis",
    category: "Cybercrime Investigation",
    date: "2024",
    description: "Analysis of sophisticated phishing campaign targeting financial institutions with focus on attack infrastructure and victim impact.",
    tags: ["Phishing", "Fraud Analysis", "Email Forensics"],
    findings: [
      "Traced email infrastructure",
      "Identified phishing domain network",
      "Supported law enforcement documentation",
    ],
  },
  {
    id: 3,
    title: "Secure Web Application Development",
    category: "Secure Development",
    date: "2023-2024",
    description: "Design and implementation of a secure web application with comprehensive authentication, encryption, and OWASP compliance.",
    tags: ["Web Development", "Security", "Backend"],
    findings: [
      "Zero critical vulnerabilities",
      "Full OWASP Top 10 compliance",
      "Advanced authentication system",
    ],
  },
  {
    id: 4,
    title: "Digital Evidence Collection & Preservation",
    category: "Digital Forensics",
    date: "2024",
    description: "Forensic investigation involving collection, preservation, and analysis of digital evidence from multiple sources.",
    tags: ["Forensics", "Evidence", "Investigation"],
    findings: [
      "Preserved evidence integrity",
      "Generated expert reports",
      "Timeline reconstruction",
    ],
  },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState("certificates");

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Helper function to get items currently displayed on website
  const getWebsiteItems = (type: string): any[] => {
    const saved = localStorage.getItem(type);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Helper function to filter out items already on website
  const filterOutExisting = (items: any[], type: string): any[] => {
    const websiteItems = getWebsiteItems(type);
    
    if (type === "skills") {
      return items.filter(item => 
        !websiteItems.some(w => w.name === item.name && w.category === item.category)
      );
    } else if (type === "experiences") {
      return items.filter(item => 
        !websiteItems.some(w => w.title === item.title && w.organization === item.organization)
      );
    } else if (type === "education") {
      return items.filter(item => 
        !websiteItems.some(w => w.degree === item.degree && w.institution === item.institution)
      );
    } else if (type === "projects") {
      return items.filter(item => 
        !websiteItems.some(w => w.title === item.title)
      );
    }
    return items;
  };

  // Load data on mount
  useEffect(() => {
    const authToken = localStorage.getItem("admin_token");
    if (authToken === "authenticated") {
      setIsAuthenticated(true);
    }

    const loadData = () => {
      const saved = localStorage.getItem("certifications");
      if (saved) setCertifications(JSON.parse(saved));

      const savedSkills = localStorage.getItem("skills");
      setSkills(savedSkills ? JSON.parse(savedSkills) : DEFAULT_SKILLS);

      const savedExp = localStorage.getItem("experiences");
      setExperiences(savedExp ? JSON.parse(savedExp) : DEFAULT_EXPERIENCES);

      const savedEdu = localStorage.getItem("education");
      setEducation(savedEdu ? JSON.parse(savedEdu) : DEFAULT_EDUCATION);

      const savedProj = localStorage.getItem("projects");
      setProjects(savedProj ? JSON.parse(savedProj) : DEFAULT_PROJECTS);
    };

    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("certifications", JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_token", "authenticated");
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setPasswordError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  // Certificate operations
  const addCertificate = (cert: Omit<Certification, "id">) => {
    const newCert = {
      ...cert,
      id: Math.max(0, ...certifications.map((c) => c.id)) + 1,
    };
    setCertifications([...certifications, newCert]);
  };

  const deleteCertificate = (id: number) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  // Skill operations
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = {
      ...skill,
      id: Math.max(0, ...skills.map((s) => s.id)) + 1,
    };
    setSkills([...skills, newSkill]);
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  // Experience operations
  const addExperience = (exp: Omit<Experience, "id">) => {
    const newExp = {
      ...exp,
      id: Math.max(0, ...experiences.map((e) => e.id)) + 1,
    };
    setExperiences([...experiences, newExp]);
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  // Education operations
  const addEducation = (edu: Omit<Education, "id">) => {
    const newEdu = {
      ...edu,
      id: Math.max(0, ...education.map((e) => e.id)) + 1,
    };
    setEducation([...education, newEdu]);
  };

  const deleteEducation = (id: number) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  // Project operations
  const addProject = (proj: Omit<Project, "id">) => {
    const newProj = {
      ...proj,
      id: Math.max(0, ...projects.map((p) => p.id)) + 1,
    };
    setProjects([...projects, newProj]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full"
        >
          <div className="p-8 border-b border-border flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus
              />
            </div>

            {passwordError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-destructive/20 border border-destructive/30"
              >
                <p className="text-sm font-semibold text-destructive">
                  {passwordError}
                </p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold"
            >
              Login
            </motion.button>

            {/* <p className="text-xs text-muted-foreground text-center mt-4">
              Default password: admin@123
            </p> */}
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "certificates", label: "Certificates" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              ⚙️
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {activeTab === "certificates" && (
          <AdminCertificates
            items={certifications}
            onAdd={addCertificate}
            onDelete={deleteCertificate}
          />
        )}
        {activeTab === "skills" && (
          <AdminSkills 
            items={filterOutExisting(skills, "skills")} 
            onAdd={addSkill} 
            onDelete={deleteSkill} 
          />
        )}
        {activeTab === "experience" && (
          <AdminExperience
            items={filterOutExisting(experiences, "experiences")}
            onAdd={addExperience}
            onDelete={deleteExperience}
          />
        )}
        {activeTab === "education" && (
          <AdminEducation
            items={filterOutExisting(education, "education")}
            onAdd={addEducation}
            onDelete={deleteEducation}
          />
        )}
        {activeTab === "projects" && (
          <AdminProjects
            items={filterOutExisting(projects, "projects")}
            onAdd={addProject}
            onDelete={deleteProject}
          />
        )}
      </main>
    </div>
  );
}

// Certificate Admin Component
function AdminCertificates({
  items,
  onAdd,
  onDelete,
}: {
  items: Certification[];
  onAdd: (cert: Omit<Certification, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    category: "",
    issuedDate: new Date().getFullYear().toString(),
    description: "",
    icon: "🏆",
    color: "from-blue-500 to-cyan-500",
    verificationUrl: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.category) {
      alert("Please fill in required fields");
      return;
    }
    onAdd(formData);
    setFormData({
      title: "",
      issuer: "",
      category: "",
      issuedDate: new Date().getFullYear().toString(),
      description: "",
      icon: "🏆",
      color: "from-blue-500 to-cyan-500",
      verificationUrl: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Certificates</h2>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Certificate
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Issuer"
              value={formData.issuer}
              onChange={(e) =>
                setFormData({ ...formData, issuer: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Issued Date"
              value={formData.issuedDate}
              onChange={(e) =>
                setFormData({ ...formData, issuedDate: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              maxLength={2}
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-center text-2xl"
            />
            <select
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
              <option value="from-purple-500 to-pink-500">Purple to Pink</option>
              <option value="from-orange-500 to-red-500">Orange to Red</option>
            </select>
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <input
            type="url"
            placeholder="Verification URL (optional)"
            value={formData.verificationUrl}
            onChange={(e) =>
              setFormData({ ...formData, verificationUrl: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors font-semibold"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No certificates yet.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.issuer} • {item.category}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => onDelete(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Skills Admin Component
function AdminSkills({
  items,
  onAdd,
  onDelete,
}: {
  items: Skill[];
  onAdd: (skill: Omit<Skill, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 80,
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      alert("Please fill in all fields");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", category: "", proficiency: 80 });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add new skills that are not yet displayed on the website
          </p>
        </div>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Programming, Security)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Proficiency: {formData.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.proficiency}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  proficiency: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">All default skills are already on the website. Add new skills above.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.proficiency}%` }}
                  />
                </div>
              </div>
              <motion.button
                onClick={() => onDelete(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors ml-4"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Experience Admin Component
function AdminExperience({
  items,
  onAdd,
  onDelete,
}: {
  items: Experience[];
  onAdd: (exp: Omit<Experience, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    period: "",
    location: "",
    description: "",
    highlight: "",
    skills: "" as any,
    responsibilities: "" as any,
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organization) {
      alert("Please fill in required fields");
      return;
    }
    onAdd({
      title: formData.title,
      organization: formData.organization,
      period: formData.period,
      location: formData.location,
      description: formData.description,
      highlight: formData.highlight,
      skills: (formData.skills as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      responsibilities: (formData.responsibilities as string)
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setFormData({
      title: "",
      organization: "",
      period: "",
      location: "",
      description: "",
      highlight: "",
      skills: "",
      responsibilities: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add new experience entries that are not yet displayed on the website
          </p>
        </div>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Organization"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Period (e.g., 2020 - 2022)"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <input
            type="text"
            placeholder="Highlight (key achievement)"
            value={formData.highlight}
            onChange={(e) =>
              setFormData({ ...formData, highlight: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            placeholder="Skills (comma-separated: Security, Development, etc)"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <textarea
            placeholder="Responsibilities (one per line)"
            value={formData.responsibilities}
            onChange={(e) =>
              setFormData({ ...formData, responsibilities: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">All default experiences are already on the website. Add new experiences above.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-primary">{item.organization}</p>
                  {item.period && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.period}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Education Admin Component
function AdminEducation({
  items,
  onAdd,
  onDelete,
}: {
  items: Education[];
  onAdd: (edu: Omit<Education, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    location: "",
    gpa: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.degree || !formData.institution) {
      alert("Please fill in required fields");
      return;
    }
    onAdd({
      degree: formData.degree,
      institution: formData.institution,
      period: formData.period,
      location: formData.location,
      gpa: formData.gpa,
      description: formData.description,
      highlights: [],
      relevantCoursework: [],
    });
    setFormData({
      degree: "",
      institution: "",
      period: "",
      location: "",
      gpa: "",
      description: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Education</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add new education entries that are not yet displayed on the website
          </p>
        </div>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Degree (e.g., Bachelor of Computer Application)"
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
          <input
            type="text"
            placeholder="Institution/University"
            value={formData.institution}
            onChange={(e) =>
              setFormData({ ...formData, institution: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Period (e.g., 2022 - 2025)"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <input
            type="text"
            placeholder="GPA (optional)"
            value={formData.gpa}
            onChange={(e) =>
              setFormData({ ...formData, gpa: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">All default education entries are already on the website. Add new entries above.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{item.degree}</h3>
                <p className="text-sm text-primary">{item.institution}</p>
                {item.period && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.period}
                  </p>
                )}
                {item.gpa && (
                  <p className="text-xs text-muted-foreground">
                    GPA: {item.gpa}
                  </p>
                )}
              </div>
              <motion.button
                onClick={() => onDelete(item.id)}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Projects Admin Component
function AdminProjects({
  items,
  onAdd,
  onDelete,
}: {
  items: Project[];
  onAdd: (proj: Omit<Project, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    tags: "",
    findings: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please fill in required fields");
      return;
    }
    onAdd({
      title: formData.title,
      category: formData.category,
      date: formData.date,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      findings: formData.findings
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    });
    setFormData({
      title: "",
      category: "",
      date: "",
      description: "",
      tags: "",
      findings: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add new projects that are not yet displayed on the website
          </p>
        </div>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., OSINT Investigation, Development)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Date (e.g., 2024, 2023-2024)"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            required
          />
          <textarea
            placeholder="Tags (comma-separated: OSINT, Security, etc)"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <textarea
            placeholder="Key Findings (one per line)"
            value={formData.findings}
            onChange={(e) =>
              setFormData({ ...formData, findings: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">All default projects are already on the website. Add new projects above.</p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-primary">{item.category}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
