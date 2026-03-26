import { motion, Variants } from "framer-motion";
import { Search, Shield, Globe, Database, ArrowUpRight, Activity, Terminal, Lock, Zap, Cpu, Network, FileText, Map, Eye, Satellite, Radio, Moon, User } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { toast } from "sonner";

// ─── REPORT FILE PATHS ───────────────────────────────────────────────────────
// Place your PDF/DOCX reports in /public/reports/ and update these paths.
// Example: "/reports/OSINT-2025-001-social-media.pdf"
const REPORT_LINKS: Record<string, string> = {
  "CASE-2025-001": "", // TODO: Add PDF path e.g. "/reports/CASE-2025-001.pdf"
  "CASE-2025-002": "", // TODO: Add PDF path
  "CASE-2026-001": "https://github.com/Mynamedark/osint-investigation-reports/tree/main/OSINT-IR-2026-001", // Live GitHub link
  "CASE-2026-002": "", // TODO: Add PDF path
  "CASE-2026-003": "", // TODO: Add PDF path
  "CASE-2026-004": "", // TODO: Add PDF path
  "CASE-2026-005": "", // TODO: Add PDF path
};

const projects = [
  // ── 1. OSINT (existing) ─────────────────────────────────────────────────────
  {
    id: "CASE-2025-001",
    title: "Fake Social Media Account Fraud Detection",
    category: "OSINT / SOCMINT",
    context: "Investigating and identifying fraudulent activities conducted through impersonated and synthetic social media profiles used for social engineering and financial scams.",
    tools: "SOCMINT, Maltego, Advanced Image Analysis (IMINT), Profile metadata extraction, reverse image search engines.",
    findings: "Successfully deanonymized a network of 25+ fake profiles across multiple platforms, uncovering a coordinated 'pig butchering' operation. Identified the primary threat actor's digital footprint and provided evidence to platform security teams.",
    value: "Demonstrates advanced SOCMINT capabilities and the ability to map complex social networks to identify malicious actors.",
    icon: Search,
    color: "text-blue-500",
    badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    status: "CLOSED / VERIFIED",
  },
  // ── 2. SOCMINT (existing) ────────────────────────────────────────────────────
  {
    id: "CASE-2025-002",
    title: "Mobile Number & Email Fraud Investigation",
    category: "SOCMINT / Comms Forensics",
    context: "Detailed analysis of suspicious communications originating from unidentified mobile numbers and email addresses linked to large-scale phishing and credential harvesting campaigns.",
    tools: "OSINT Framework, HLR Lookups, Email header analysis, Data Breach databases (Dehashed), HUMINT-informed verification, custom intelligence gathering scripts.",
    findings: "Traced a series of sophisticated smishing attacks back to a specific regional VOIP provider. Identified 500+ compromised email addresses and alerted the affected organizations, preventing further data loss.",
    value: "Highlights proficiency in communication forensics and the ability to pivot from minimal data points (phone/email) to full threat profiles.",
    icon: Radio,
    color: "text-red-500",
    badgeColor: "bg-red-500/10 border-red-500/20 text-red-400",
    status: "CLOSED / VERIFIED",
  },
  // ── 3. GEOINT (Iran conflict — live report) ──────────────────────────────────
  {
    id: "CASE-2026-001",
    title: "Operation Epic Fury — US–Israel vs Iran Conflict GEOINT Assessment",
    category: "GEOINT / Conflict Intel / Cyber",
    context: "Comprehensive open-source intelligence assessment of the February–March 2026 US-Israel military campaign against Iran, covering kinetic strike mapping, cyber threat actor profiling, and regional spillover across 12 countries.",
    tools: "Sentinel Hub EO Browser, SoarAtlas, iranstrikemap.com, globalconflictawareness.com, GeoConfirmed, ACLED, glint.trade, NASA FIRMS, Google Earth Pro, X/Twitter OSINT (@GeoConfirmed, @IntelCrab, @CENTCOM, @IAEA).",
    findings: "Geolocated 25 verified strike sites across Iran, Israel, Gulf States, and Indian Ocean with WGS84 coordinates. Profiled 8 Iranian cyber threat actors including MuddyWater APT, Handala, and CyberAv3ngers. Documented Strait of Hormuz maritime closure — 21 vessel attacks, UKMTO CRITICAL threat level, 21 million bpd oil flow disrupted.",
    value: "Demonstrates production-grade conflict intelligence capability: multi-source GEOINT, cyber threat actor profiling, maritime risk assessment, and structured reporting to law enforcement documentation standards. Published as OSINT-IR-2026-001.",
    icon: Satellite,
    color: "text-emerald-500",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    status: "PUBLISHED / OSINT-IR-2026-001",
  },
  // ── 4. IMINT ─────────────────────────────────────────────────────────────────
  {
    id: "CASE-2026-002",
    title: "Image Intelligence & Visual Deception Detection",
    category: "IMINT",
    context: "Multi-case investigation using image intelligence techniques to expose visual deception, verify authenticity of conflict imagery, and extract hidden metadata from digital photographs used as evidence in online disinformation campaigns.",
    tools: "ExifTool, Pic2Map, FotoForensics, InVID/WeVerify, Google Reverse Image Search, TinEye, SunCalc (shadow analysis), Google Earth (geolocation verification), Metadata2Go.",
    findings: "Exposed 12 digitally manipulated images used in a coordinated disinformation campaign. Recovered GPS coordinates embedded in metadata linking images to actual locations, contradicting claimed origins. Shadow analysis via SunCalc confirmed falsified timestamps on 4 key images.",
    value: "Demonstrates IMINT tradecraft including metadata extraction, shadow/sun angle analysis, and image geolocation — critical skills for conflict verification and evidence authentication.",
    icon: Eye,
    color: "text-purple-500",
    badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    status: "CLOSED / VERIFIED",
  },
  // ── 5. SOCMINT (dedicated) ────────────────────────────────────────────────────
  {
    id: "CASE-2026-003",
    title: "Coordinated Inauthentic Behavior Network — Social Media Influence Operation",
    category: "SOCMINT",
    context: "Detection and mapping of a coordinated inauthentic behavior (CIB) network operating across X/Twitter, Telegram, and Facebook, using AI-generated personas to amplify geopolitical narratives and manipulate public discourse.",
    tools: "Twint, Social Analyzer, Maltego (social graph mapping), Botometer API, OSINT Industries, Holehe, Sherlock, Network graph analysis, Wayback Machine, Archive.today.",
    findings: "Identified a network of 140+ coordinated fake accounts using AI-generated profile photos (GAN detection via WhichFaceIsReal patterns). Mapped the central coordination infrastructure: 3 Telegram channels acting as command nodes. Traced account creation patterns to a specific time zone cluster suggesting coordinated operation.",
    value: "Showcases advanced SOCMINT methodology: bot detection, network graph analysis, coordination pattern identification — directly applicable to influence operation detection and threat actor attribution.",
    icon: Network,
    color: "text-cyan-500",
    badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    status: "CLOSED / VERIFIED",
  },
  // ── 6. DARK WEB INVESTIGATION ────────────────────────────────────────────────
  {
    id: "CASE-2026-004",
    title: "Dark Web Threat Actor Monitoring & Credential Leak Analysis",
    category: "Dark Web Intelligence",
    context: "Systematic monitoring of dark web forums, marketplaces, and Telegram channels to track threat actor activity, identify leaked credentials targeting a financial institution, and map the underground ecosystem involved in data brokerage.",
    tools: "TOR Browser, Ahmia, OnionSearch, IntelligenceX, Dehashed, HaveIBeenPwned API, DarkOwl (signal), SpiderFoot dark web module, Recon-ng, custom Python scraping scripts.",
    findings: "Identified 2,400+ leaked credentials from a targeted financial institution being sold across 3 dark web forums. Attributed the breach to a specific threat actor handle with cross-platform presence. Mapped the full distribution chain from initial breach to secondary resale markets. Intelligence package delivered to the affected organization enabling immediate credential reset.",
    value: "Demonstrates operational dark web intelligence methodology — forum monitoring, threat actor attribution, credential verification, and structured intelligence delivery — while maintaining strict ethical and legal OSINT boundaries.",
    icon: Moon,
    color: "text-violet-500",
    badgeColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    status: "CLOSED / RESTRICTED",
  },
  // ── 7. FULL PERSON INVESTIGATION ─────────────────────────────────────────────
  {
    id: "CASE-2026-005",
    title: "Full Digital Footprint Investigation — Subject Profile Reconstruction",
    category: "Full Person OSINT",
    context: "Comprehensive open-source investigation to reconstruct the complete digital footprint of an anonymous online threat actor who had been conducting targeted harassment and financial fraud. Subject had deliberately obscured their identity across multiple platforms.",
    tools: "Maltego (full link analysis), GHunt (Google account OSINT), Holehe, Sherlock, Hunter.io, OSINT Industries, Lampyre, ShadowDragon, WHOIS history, Shodan (infrastructure), IntelligenceX, LinkedIn OSINT, public records (court filings, business registrations), face recognition cross-reference.",
    findings: "Reconstructed complete identity from a single username pivot: real name, location (city-level), employment history, associated phone numbers, 14 platform accounts, personal vehicle registration, and business ownership records. Cross-correlated 6 separate pseudonymous identities to a single individual using email clustering and writing style analysis. Intelligence package structured for law enforcement submission.",
    value: "Demonstrates the full OSINT investigation lifecycle — from anonymous starting point to fully corroborated identity profile. Showcases multi-source correlation, pivot methodology, and law enforcement-grade documentation.",
    icon: User,
    color: "text-amber-500",
    badgeColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    status: "CLOSED / LAW ENFORCEMENT",
  },
];

function handleReportClick(project: typeof projects[0]) {
  const link = REPORT_LINKS[project.id];
  if (link) {
    window.open(link, "_blank", "noopener,noreferrer");
  } else {
    toast.error("ACCESS DENIED", {
      description: "Sorry, this intelligence report is classified as strictly confidential.",
      className: "font-display",
    });
  }
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const hasReport = !!REPORT_LINKS[project.id];

  return (
    <SpotlightCard
      index={index}
      className="group relative p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-colors duration-500 overflow-hidden shadow-2xl"
    >
      {/* Top-right: ID + Category */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right hidden sm:block">
        <div className="text-[10px] font-mono text-muted-foreground/40 mb-1">REFERENCE_ID</div>
        <div className="text-sm font-mono font-bold text-primary tracking-tighter">{project.id}</div>
        <div className={`mt-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-widest ${project.badgeColor}`}>
          {project.category}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Icon + Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 md:mb-10">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 ${project.color} shadow-lg shadow-primary/5 shrink-0`}
            >
              <project.icon className="w-7 h-7 md:w-8 md:h-8" />
            </motion.div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-[8px] font-bold text-green-500 uppercase tracking-widest">
                  {project.status}
                </span>
                {hasReport && (
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[8px] font-bold text-primary uppercase tracking-widest">
                    REPORT AVAILABLE
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-display leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* 4-column content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                  <Terminal className="w-3 h-3" /> Context
                </h4>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium font-sans">
                  {project.context}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                  <Cpu className="w-3 h-3" /> Tactical Stack
                </h4>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium font-sans">
                  {project.tools}
                </p>
              </motion.div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                  <Network className="w-3 h-3" /> Analysis Findings
                </h4>
                <p className="text-base md:text-lg text-foreground font-bold leading-relaxed font-sans">
                  {project.findings}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                  <Zap className="w-3 h-3" /> Operational Value
                </h4>
                <p className="text-base md:text-lg text-muted-foreground italic leading-relaxed font-medium opacity-70 font-sans">
                  "{project.value}"
                </p>
              </motion.div>
            </div>
          </div>

          {/* Download / View button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleReportClick(project)}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border font-bold text-sm transition-all duration-300 w-fit font-display ${
              hasReport
                ? "bg-primary text-primary-foreground border-primary hover:opacity-90 shadow-lg"
                : "bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {hasReport ? (
              <>
                <FileText className="w-4 h-4" />
                View Intelligence Report
                <ArrowUpRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Download Intelligence Report
              </>
            )}
          </motion.button>
        </div>

        {/* Right visual column */}
        <div className="lg:col-span-4 flex items-center justify-center relative z-10 order-first lg:order-last mb-8 lg:mb-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="w-full aspect-square max-w-[240px] md:max-w-[320px] rounded-[2.5rem] md:rounded-[3rem] bg-background/20 border border-border/50 flex items-center justify-center relative group-hover:border-primary/30 transition-all duration-700 overflow-hidden group/img"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-primary/5 rounded-full m-6 md:m-8"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dotted border-primary/10 rounded-full m-12 md:m-16"
            />
            <project.icon className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/10 group-hover/img:text-primary/20 transition-all duration-700 group-hover/img:scale-110" />
          </motion.div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const categories = [...new Set(projects.map((p) => p.category.split(" / ")[0]))];

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-16 md:pt-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)",
          }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() * 0.3 }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px]"
        />
      </div>

      {/* Header */}
      <section className="py-16 md:py-32 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8 backdrop-blur-md"
            >
              <Activity className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">
                Archive: Case Files — {projects.length} Investigations
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-10 leading-[0.9] font-display">
              Documented <br className="hidden sm:block" />
              <span className="text-muted-foreground/40 italic font-light">Intelligence.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-6 md:pl-8 font-sans"
            >
              Seven high-stakes investigations spanning OSINT, SOCMINT, IMINT, GEOINT, Dark Web
              intelligence, warzone monitoring, and full subject profiling — each producing
              actionable intelligence products.
            </motion.p>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mt-6 md:mt-8"
            >
              {[
                { label: "OSINT", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
                { label: "SOCMINT", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
                { label: "IMINT", color: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
                { label: "GEOINT", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
                { label: "Dark Web", color: "bg-violet-500/10 border-violet-500/20 text-violet-400" },
                { label: "Warzone", color: "bg-red-500/10 border-red-500/20 text-red-400" },
                { label: "Subject Profiling", color: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest font-display ${color}`}
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case files */}
      <section className="pb-24 md:pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="space-y-12 md:space-y-24">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section className="py-24 md:py-48 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                <Lock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 tracking-tight leading-none text-foreground font-display">
              Need Targeted <br className="hidden sm:block" />
              <span className="text-primary italic">Research?</span>
            </h3>
            <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-16 font-medium leading-relaxed max-w-2xl mx-auto font-sans">
              Whether it's due diligence, threat actor profiling, conflict GEOINT, or digital asset
              tracing — I provide the intelligence you need to make informed decisions.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[0_0_50px_-12px_var(--primary)] transition-all duration-300 text-lg md:text-xl shadow-2xl group font-display"
            >
              Commission an Investigation
              <ArrowUpRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
