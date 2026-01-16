import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Radar,
  Database,
  Code,
} from "lucide-react";

export default function Index() {
  const highlights = [
    {
      icon: Radar,
      title: "OSINT Intelligence",
      description:
        "Advanced open-source intelligence gathering, threat actor tracking, and digital footprint analysis",
      animId: "highlight_card_osint",
    },
    {
      icon: Database,
      title: "Digital Forensics",
      description:
        "Evidence collection, preservation, and analysis with law enforcement standards",
      animId: "highlight_card_crime",
    },
    {
      icon: Code,
      title: "Secure Development",
      description:
        "Secure web & mobile applications with OWASP principles and secure coding practices",
      animId: "highlight_card_dev",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative bg-[#E9EDF1]">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-[#2F80ED]/10 via-transparent to-[#7E8A97]/10"
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>

      <div className="relative z-10">
        <section className="container mx-auto max-w-7xl px-4 py-20 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 md:space-y-8"
            >
              <motion.div variants={textVariants} className="space-y-2">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2F80ED]/30 bg-[#2F80ED]/10 w-fit"
                >
                  <Lock className="w-4 h-4 text-[#2F80ED]" />
                  <span className="text-sm font-semibold text-[#2F80ED]">
                    Cyber Investigator
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A222C] leading-tight"
                >
                  Dharam
                  <br />
                  <span className="bg-gradient-to-r from-[#2F80ED] to-[#7E8A97] bg-clip-text text-transparent">
                    Kathiriya
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl md:text-2xl font-semibold text-[#2F80ED]"
                >
                  OSINT Specialist & Cybercrime Analyst
                </motion.p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-[#6C757D] leading-relaxed max-w-xl"
              >
                Dedicated cybersecurity professional specializing in OSINT
                investigations, cybercrime analysis, and digital forensics.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#2F80ED] text-white font-semibold hover:shadow-lg hover:shadow-[#2F80ED]/30 transition-all duration-300"
                >
                  View Case Studies
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-[#2F80ED] text-[#2F80ED] font-semibold hover:bg-[#2F80ED]/5 transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D2D8DE]"
              >
                <div>
                  <p className="text-2xl font-bold text-[#2F80ED]">2+</p>
                  <p className="text-xs text-[#6C757D]">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#7E8A97]">3</p>
                  <p className="text-xs text-[#6C757D]">Certifications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2F80ED]">10+</p>
                  <p className="text-xs text-[#6C757D]">Cases Analyzed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Restored Visual Element (Old GOOD one) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full h-80 md:h-96 rounded-2xl border-2 border-[#2F80ED]/30 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2F80ED]/5 via-transparent to-[#7E8A97]/5" />

              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(47,128,237,0.5), transparent)",
                  opacity: 0.1,
                }}
              />

              <motion.div
                animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl opacity-50"
              >
                🔍
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-4 rounded-2xl border border-[#2F80ED]/50"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                className="absolute inset-0 rounded-2xl border border-[#7E8A97]/30"
              />
            </motion.div>

          </div>
        </section>
      </div>
    </div>
  );
}
