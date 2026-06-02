import { siteConfig } from "../siteConfig";
import ProjectOrbit from "../Components/ProjectOrbit";
import projectData from "../Data/projectdata.json";
import PageTransition from "../Components/PageTransition";
import { motion } from "framer-motion";

export default function Home() {
  const projects = projectData.projects.filter(p => p.category !== "game-jam");

  // Framer Motion variant for container staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Framer Motion variant for individual items with more "OOMPH"
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      filter: "blur(10px)",
      rotateX: 10
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12,
        duration: 0.8
      } 
    }
  };

  return (
    <PageTransition>
      <div>
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
        {/* Animated Background HUD Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scanline" />
          
          {/* HUD Corner Brackets */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
            <div className="hud-corner hud-corner-tl" />
          </div>
          <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
            <div className="hud-corner hud-corner-tr" />
          </div>
          <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20">
            <div className="hud-corner hud-corner-bl" />
          </div>
          <div className="absolute bottom-10 right-10 w-32 h-32 opacity-20">
            <div className="hud-corner hud-corner-br" />
          </div>

          {/* Abstract Wireframe Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
          
          {/* Informatie */}
          <motion.div 
            className="container mx-auto flex flex-col items-center text-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Profielfoto */}
            <motion.img
              variants={itemVariants}
              src={siteConfig.aboutImage}
              alt={siteConfig.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-(--accent) shadow-lg mb-6 floating"
            />

            {/* Naam en rol */}
            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl font-black mb-4 tracking-tighter uppercase glitch-text"
              data-text={siteConfig.name}
            >
              {siteConfig.name}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-xl md:text-2xl font-mono text-(--accent-secondary) mb-6 uppercase tracking-widest"
            >
              &gt; {siteConfig.role}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-(--muted) max-w-xl">
              {siteConfig.tagline}
            </motion.p>
          </motion.div>
        </section>

        {/* Projecten Sectie */}
        <section id="projects" className="py-24 px-4 bg-(--bg)">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-(--text) mb-8 text-center"
            >
              Mijn Projecten
            </motion.h2>

            {/* 3D Coverflow Project Orbit */}
            <ProjectOrbit projects={projects} />
          </div>
        </section>
        
      </div>
    </PageTransition>
  );
}