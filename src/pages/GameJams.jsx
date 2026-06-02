import { motion } from "framer-motion";
import PageTransition from "../Components/PageTransition";
import ProjectOrbit from "../Components/ProjectOrbit";
import projectData from "../Data/projectdata.json";

export default function GameJams() {
  // Only select game jam projects
  const gameJamProjects = projectData.projects.filter(p => p.category === "game-jam");

  return (
    <PageTransition>
      <div className="py-24 px-4 bg-(--bg) min-h-screen">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-(--accent)">
              Game Jams
            </h1>
            <p className="text-lg text-(--muted) max-w-2xl mx-auto">
              Creatieve experimenten en games ontwikkeld onder extreme tijdsdruk. 
              Hier test ik mijn skills in rapid prototyping en game design.
            </p>
          </motion.div>

          {gameJamProjects.length > 0 ? (
            <ProjectOrbit projects={gameJamProjects} />
          ) : (
            <div className="text-center text-(--muted) py-12">
              Nog geen game jams toegevoegd.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
