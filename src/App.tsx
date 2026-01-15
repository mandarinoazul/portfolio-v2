import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Mail, Code, Cpu, Server, Database, ExternalLink, Download, MessageSquare, Briefcase, Bot, Globe } from 'lucide-react';

// --- DATOS DEL PERFIL ---
const EXPERIENCE = [
  {
    role: "Zoho Support & Operations",
    company: "Coronados International / IDT Corporation",
    period: "2023 - Presente",
    desc: "Optimización de procesos operativos y soporte técnico de nivel CRM. Automatización de flujos de trabajo para mejorar la eficiencia del equipo.",
  },
  {
    role: "Tech Support & Purchasing Manager",
    company: "Lumac Investment",
    period: "2020 - 2023",
    desc: "Gestión integral de infraestructura TI y logística de compras técnicas. Resolución de incidencias críticas de hardware y software.",
  },
  {
    role: "Desarrollador de Software (Formación)",
    company: "ITLA",
    period: "2020 - Presente",
    desc: "Especialización en desarrollo Backend (C#/.NET), Frontend (React), diseño de Bases de Datos y Arquitectura de Software.",
  }
];

// --- PROYECTOS DESTACADOS (TUS 4 ESTRELLAS) ---
const FEATURED_PROJECTS = [

  {
    title: "Nexum",
    desc: "Plataforma web moderna diseñada para la conexión de servicios. Enfoque en arquitectura escalable y una experiencia de usuario (UX) fluida.",
    tech: ["React", "Web App", "Frontend"],
    link: "https://github.com/mandarinoazul/Nexum",
    image: "/project-nexum.png",
    icon: <Globe />
  },
  {
    title: "Chatfire",
    desc: "Aplicación de mensajería en tiempo real. Implementa autenticación segura y sincronización instantánea de datos utilizando la potencia de Firebase.",
    tech: ["React", "Firebase", "Real-time DB"],
    link: "https://github.com/mandarinoazul/chatfire",
    image: "/project-chatfire.png",
    icon: <MessageSquare />
  },
  {
    title: "Discord AI Bot",
    desc: "Bot inteligente para Discord potenciado por IA. Capaz de interactuar con usuarios, responder preguntas complejas y automatizar tareas de moderación.",
    tech: ["Node.js/Python", "Discord.js", "OpenAI API"],
    link: "https://github.com/mandarinoazul/discord-ai-bot",
    image: "/project-discord.png",
    icon: <Bot />
  },
  {
    title: "Empresa II",
    desc: "Sistema integral de gestión empresarial. Manejo de inventarios, facturación y reportes administrativos diseñado para optimizar el flujo de trabajo corporativo.",
    tech: ["C#", ".NET", "SQL Server"],
    link: "https://github.com/mandarinoazul/Empresa-II",
    image: "/project-empresa.png",
    icon: <Briefcase />
  }
];

const SKILLS = [
  { name: "React / JS", icon: <Code />, level: 80 },
  { name: "C# / .NET", icon: <Server />, level: 75 },
  { name: "IoT / Arduino", icon: <Cpu />, level: 70 },
  { name: "SQL / Mongo", icon: <Database />, level: 65 },
];

const Portfolio = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const [repos, setRepos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  // Fetch a GitHub
  useEffect(() => {
    fetch('https://api.github.com/users/mandarinoazul/repos')
      .then(res => res.json())
      .then(data => {
        const sorted = Array.isArray(data) ? data.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()) : [];
        setRepos(sorted);
      })
      .catch(err => console.error("Error fetching repos:", err));
  }, []);

  const filteredRepos = activeTab === 'All' 
    ? repos 
    : repos.filter(repo => repo.language === activeTab || (activeTab === 'IoT' && repo.topics?.includes('arduino')));

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-20">
            {/* Fondo abstracto */}
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center" />
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
          >
            Daniel Cabrera
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-8"
          >
            Full Stack Developer | IoT Enthusiast
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex gap-6">
              <a href="https://github.com/mandarinoazul" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition transform hover:scale-110"><Github size={32}/></a>
              <a href="mailto:danieleduardocabreraramirez@gmail.com" className="hover:text-blue-400 transition transform hover:scale-110"><Mail size={32}/></a>
            </div>

            {/* BOTÓN DESCARGAR CV */}
            <a 
              href="/cv-daniel.pdf" 
              download="Daniel_Cabrera_CV.pdf"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              <Download size={18} />
              <span>Descargar CV</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* --- EXPERIENCIA Y SKILLS --- */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        {/* Experience Column */}
        <div>
          <h2 className="text-3xl font-bold mb-8 border-b-4 border-blue-500 inline-block pb-1">Experiencia</h2>
          <div className="space-y-8">
            {EXPERIENCE.map((job, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-blue-500 hover:bg-slate-800 transition shadow-lg backdrop-blur-sm group"
              >
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{job.role}</h3>
                <p className="text-blue-300 text-sm mb-3 font-mono">{job.company} | {job.period}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{job.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Column */}
        <div>
           <h2 className="text-3xl font-bold mb-8 border-b-4 border-emerald-500 inline-block pb-1">Habilidades</h2>
           <div className="grid grid-cols-2 gap-4 mb-10">
              {SKILLS.map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 1)" }}
                  className="bg-slate-800/50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-700 shadow-sm cursor-default hover:border-emerald-500/50 transition"
                >
                  <div className="text-emerald-400 p-3 bg-emerald-400/10 rounded-full mb-1">{skill.icon}</div>
                  <span className="font-medium text-slate-200">{skill.name}</span>
                </motion.div>
              ))}
           </div>
           
           <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-xl">
              <h3 className="text-lg font-semibold mb-3 text-blue-200">Sobre Mí</h3>
              <p className="text-slate-400 italic leading-relaxed">
                "Soy un profesional ambicioso que combina la lógica de programación con una sólida experiencia operativa. Me apasiona resolver problemas complejos y entregar soluciones de software que superen las expectativas."
              </p>
           </div>
        </div>
      </div>

      {/* --- PROYECTOS DESTACADOS (MANUAL - TUS 4 TOP) --- */}
      <div className="bg-slate-950 py-20 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Proyectos Destacados</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Una selección de mis desarrollos más completos, abarcando desde sistemas de gestión empresarial hasta integraciones con Inteligencia Artificial.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {FEATURED_PROJECTS.map((project, index) => (
               <motion.div 
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition shadow-2xl group flex flex-col"
             >
               {/* Imagen del proyecto */}
               <div className="h-56 bg-slate-800 overflow-hidden relative">
                 <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition z-10"/>
                 <img 
                   src={project.image}
                   alt={project.title}
                   className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none'; 
                     e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-800');
                     e.currentTarget.parentElement!.innerHTML += '<span class="text-slate-500 text-sm">Vista previa no disponible</span>';
                   }}
                 />
                 <div className="absolute top-4 right-4 z-20 bg-slate-900/80 p-2 rounded-full text-blue-400 backdrop-blur-md">
                   {project.icon}
                 </div>
               </div>
               
               <div className="p-8 flex-grow flex flex-col">
                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition">{project.title}</h3>
                 <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                   {project.desc}
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-900/20 text-blue-300 rounded-full text-xs font-mono border border-blue-900/30">
                        {t}
                      </span>
                    ))}
                 </div>
                 <div className="mt-auto pt-4 border-t border-slate-800/50">
                   <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-semibold hover:text-blue-400 transition">
                     <Github size={18} /> Ver Código Fuente &rarr;
                   </a>
                 </div>
               </div>
             </motion.div>
            ))}
          </div>

          {/* --- REPOSITORIOS AUTOMÁTICOS (EL RESTO) --- */}
          <div className="text-center mb-10 pt-10 border-t border-slate-800">
            <h3 className="text-xl font-bold mb-4 text-slate-400">Otros Repositorios en GitHub</h3>
            
            <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
              {['All', 'JavaScript', 'C#', 'Python', 'HTML'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-slate-700 text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-slate-300 border border-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRepos.length > 0 ? filteredRepos.map((repo) => (
              <motion.a 
                href={repo.html_url}
                target="_blank"
                key={repo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition group flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-200 group-hover:text-blue-400 transition truncate w-3/4">{repo.name}</h3>
                  <ExternalLink className="text-slate-600 group-hover:text-white transition" size={16}/>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {repo.description || "Sin descripción disponible."}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                   <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                     {repo.language || "Code"}
                   </span>
                   <span className="text-xs text-slate-600">
                      {new Date(repo.updated_at).toLocaleDateString()}
                   </span>
                </div>
              </motion.a>
            )) : (
              <p className="col-span-3 text-center text-slate-500">Cargando repositorios...</p>
            )}
          </div>
        </div>
      </div>
      
      <footer className="py-8 text-center text-slate-600 text-sm bg-slate-950">
        <p>&copy; {new Date().getFullYear()} Daniel Cabrera. Built with React & Tailwind.</p>
      </footer>

    </div>
  );
};

export default Portfolio;