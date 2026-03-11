import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projectData from "../Data/projectdata.json";
import PageTransition from "../Components/PageTransition";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectData.projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <PageTransition>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Project niet gevonden</h1>
          <Link to="/" className="text-(--accent) hover:underline">Terug naar home</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pb-20">
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--bg) to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold text-(--text) mb-2">{project.title}</h1>
              <p className="text-xl text-(--accent) font-medium">{project.tagline}</p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Over het Project</h2>
              <div className="prose prose-invert max-w-none text-(--muted) leading-relaxed">
                {project.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Placeholder Content as requested */}
            <section className="bg-(--surface) p-8 rounded-2xl border border-(--bordercolor) relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-(--accent)/5 blur-3xl group-hover:bg-(--accent)/10 transition-colors" />
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-(--accent) to-(--accent-secondary) bg-clip-text text-transparent">Technische Uitdagingen & Oplossingen</h3>
              <p className="text-(--muted) mb-6">
                Tijdens de ontwikkeling van {project.title} stuitte ik op verschillende technische uitdagingen, 
                vooral op het gebied van performance optimalisatie en user interface design. 
                Door gebruik te maken van geavanceerde technieken in Unity en C#, heb ik een soepele ervaring weten te creëren.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-(--bg) rounded-lg border border-(--bordercolor)">
                  <h4 className="font-bold mb-2">Architectuur</h4>
                  <p className="text-sm text-(--muted)">Implementatie van een schaalbaar component-based systeem voor maximale flexibiliteit.</p>
                </div>
                <div className="p-4 bg-(--bg) rounded-lg border border-(--bordercolor)">
                  <h4 className="font-bold mb-2">User Experience</h4>
                  <p className="text-sm text-(--muted)">Focus op intuïtieve controls en visuele feedback om de immersion te verhogen.</p>
                </div>
              </div>
            </section>

            {/* Youtube Embed */}
            {project.youtube && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Video Demonstratie</h2>
                <div className="aspect-video rounded-2xl overflow-hidden border border-(--bordercolor) shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.youtube.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            {/* Screenshots Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots?.map((src, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden border border-(--bordercolor)"
                  >
                    <img src={src} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-auto" />
                  </motion.div>
                ))}
                {/* Extra placeholder images as requested */}
                <div className="rounded-xl overflow-hidden border border-(--bordercolor) bg-(--surface) flex items-center justify-center aspect-video">
                  <img src="https://picsum.photos/seed/placeholder1/800/450" alt="Placeholder" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden border border-(--bordercolor) bg-(--surface) flex items-center justify-center aspect-video">
                  <img src="https://picsum.photos/seed/placeholder2/800/450" alt="Placeholder" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-(--surface) p-6 rounded-2xl border border-(--bordercolor) shadow-lg">
              <h3 className="text-lg font-bold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-(--muted)">Rol</span>
                  <p className="font-medium">{project.projectRole || "Developer"}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-(--muted)">Timeline</span>
                  <p className="font-medium">{project.timeline || "Nader te bepalen"}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-(--muted)">Technieken</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {project.git && (
                  <a 
                    href={project.git} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block w-full text-center py-3 bg-(--text) text-(--bg) font-bold rounded-lg hover:bg-(--accent) hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    Bekijk op GitHub
                  </a>
                )}
                {project.itch && (
                  <a 
                    href={project.itch} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block w-full text-center py-3 border-2 border-(--accent-secondary) text-(--accent-secondary) font-bold rounded-lg hover:bg-(--accent-secondary) hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-(--accent-secondary)/10"
                  >
                    Bekijk op Itch.io
                  </a>
                )}
                <Link 
                  to="/" 
                  className="block w-full text-center py-3 text-(--muted) hover:text-(--text) transition-colors text-sm"
                >
                  ← Terug naar overzicht
                </Link>
              </div>
            </section>

            {/* Extra placeholder info section */}
            <section className="bg-(--surface) p-6 rounded-2xl border border-(--bordercolor)">
              <h3 className="text-lg font-bold mb-3 italic text-(--accent)">"Inspiratie"</h3>
              <p className="text-sm text-(--muted) italic">
                "Goede interactie is onzichtbaar. Mijn doel is niet om knoppen te maken, maar om ervaringen te creëren 
                waarin de gebruiker vergeet dat er een interface is."
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
