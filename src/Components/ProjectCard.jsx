import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ project, isLarge, index }) {
  // Bepaal thema op basis van index voor variatie
  // Gebruik vaste classes in plaats van template strings voor Tailwind compatibility
  const themes = [
    { 
      id: "indigo",
      color: "#6366f1", 
      hoverText: "group-hover:text-indigo-400", 
      hoverBorder: "hover:border-indigo-500/50", 
      shadow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]",
      tag: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      glow: "bg-indigo-500/5"
    },
    { 
      id: "cyan",
      color: "#06b6d4", 
      hoverText: "group-hover:text-cyan-400", 
      hoverBorder: "hover:border-cyan-500/50", 
      shadow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]",
      tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "bg-cyan-500/5"
    },
    { 
      id: "rose",
      color: "#f43f5e", 
      hoverText: "group-hover:text-rose-400", 
      hoverBorder: "hover:border-rose-500/50", 
      shadow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.25)]",
      tag: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      glow: "bg-rose-500/5"
    },
    { 
      id: "amber",
      color: "#f59e0b", 
      hoverText: "group-hover:text-amber-400", 
      hoverBorder: "hover:border-amber-500/50", 
      shadow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]",
      tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "bg-amber-500/5"
    }
  ];
  
  const theme = themes[index % themes.length];
  const hudType = index % 3;

  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        rotateX: -2,
        rotateY: 2,
        transition: { duration: 0.1 }
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.id}`}
        className={`group flex flex-col h-full bg-(--surface) rounded-2xl overflow-hidden border border-white/5 ${theme.hoverBorder} smooth-transition ${theme.shadow} relative`}
      >
        {/* Subtle Theme Glow - Always visible but faint */}
        <div className={`absolute inset-0 ${theme.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />

        {/* HUD Elements - High Variety per card */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20`}>
          {hudType === 0 && (
            <>
              {/* Rugged Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4" style={{ borderColor: theme.color }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-1 border-r-1 opacity-50" style={{ borderColor: theme.color }} />
              {/* Tech Dots */}
              <div className="absolute top-4 right-4 flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.color }} />)}
              </div>
            </>
          )}
          {hudType === 1 && (
            <>
              {/* Bracket HUD */}
              <div className="absolute top-0 left-0 w-full h-full border-x-2 border-white/5" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-12" style={{ backgroundColor: theme.color }} />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-12" style={{ backgroundColor: theme.color }} />
              {/* Crosshair corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l opacity-40" style={{ borderColor: theme.color }} />
            </>
          )}
          {hudType === 2 && (
            <>
              {/* Grid Overly Overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
              <div className="absolute top-0 left-0 w-full h-1 border-t border-dashed border-white/20" />
              {/* Coordinate label */}
              <div className="absolute bottom-4 left-4 font-mono text-[6px] text-white/30">
                POS_X: {index * 12}.22<br/>POS_Y: {index * 7}.88
              </div>
            </>
          )}
          
          {/* Global Tech Label */}
          <div className="absolute top-2 right-4 text-[6px] font-mono text-white/20 uppercase tracking-[0.4em] group-hover:text-white/60 transition-all">
            DATA_LINK_ESTABLISHED // {project.id.toUpperCase()}
          </div>
        </div>

        {/* Thumbnail met overlay */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-video md:aspect-auto md:h-full' : 'aspect-video'} z-10`}>
          <motion.img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Sfeer-overlay die matcht met thema */}
          <div className="absolute inset-0 bg-gradient-to-t from-(--bg) via-transparent to-transparent opacity-80" />
          
          {/* Subtle Glance Indicator - Less "cringy" than a huge button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10">
             <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white/40 text-xs">VIEW</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 relative z-10">
          {/* Abstracte HUD-lijn boven titel */}
          <div className={`w-12 h-[3px] mb-6 transition-all duration-500 group-hover:w-24 group-hover:opacity-100 opacity-60`} style={{ backgroundColor: theme.color }} />
          
          <h3 className={`text-2xl font-black text-white mb-3 tracking-tight transition-colors duration-300 ${theme.hoverText}`}>
            {project.title}
          </h3>
          <p className="text-sm text-(--muted) line-clamp-2 leading-relaxed mb-6 font-medium">
            {project.tagline}
          </p>

          {/* Tags - Color coded per card */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm border ${theme.tag} transition-all duration-300`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}