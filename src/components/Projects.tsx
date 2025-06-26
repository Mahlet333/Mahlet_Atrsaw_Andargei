import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ExternalLink, Github, Brain, Code, Palette, Database, Smartphone, Globe, Award, Zap, Eye, Cpu } from 'lucide-react';
import { projects, filters } from '../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hexagonal grid positioning
  const getHexPosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const offsetX = row % 2 === 1 ? 150 : 0; // Offset every other row
    return {
      x: col * 300 + offsetX,
      y: row * 260
    };
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="font-serif text-oxford-700 mb-4 sm:mb-6 text-5xl">
            THE COLLECTION
          </h1>
          <p className="text-lg max-w-4xl mx-auto px-4 text-ink-900">
            A curated selection of projects spanning research, software, and creative expression
          </p>
        </div>
        <div className="flex justify-center mb-12 sm:mb-16 px-4">
          <div className="bg-cream-100 p-2 rounded-2xl flex items-center flex-wrap gap-2 border border-parchment-400">
            {filters.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 touch-button justify-center font-serif border ${activeFilter === id ? 'bg-oxford-700 text-cream-50 border-parchment-400' : 'bg-cream-100 text-oxford-700 border-oxford-100 hover:bg-cream-200'}`}
              >
                <Icon size={16} className="text-oxford-700" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative" ref={containerRef} style={{ perspective: '1200px' }}>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-32">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              const isHovered = hoveredProject === project.id;
              const isAnotherHovered = hoveredProject !== null && !isHovered;
              return (
                <div
                  key={project.id}
                  className="relative flex flex-col items-center group"
                  onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                  onMouseLeave={() => !isMobile && setHoveredProject(null)}
                  onTouchStart={() => isMobile && setHoveredProject(project.id)}
                  onTouchEnd={() => isMobile && setTimeout(() => setHoveredProject(null), 2000)}
                  style={{
                    zIndex: isHovered ? 20 : 1,
                  }}
                >
                  {/* Image Card Only */}
                  <div
                    className="w-64 h-64 sm:w-72 sm:h-72 relative bg-cream-50 border border-parchment-400 rounded-2xl shadow-md overflow-hidden group-hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${project.imageUrl})`,
                        backgroundSize:
                          project.id === 1 ? 'contain'
                          : project.id === 3 ? '120%'
                          : 'cover',
                        backgroundPosition:
                          project.id === 1 ? 'center bottom'
                          : project.id === 3 ? 'center bottom'
                          : [7, 11, 12, 14, 15, 16].includes(project.id) ? 'center bottom'
                          : 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 1.0
                      }}
                    />
                    
                    {/* Hover Description Card */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 transition-all duration-300">
                        <div className="text-center">
                          <h4 className="text-white font-bold text-lg mb-3">{project.title}</h4>
                          <p className="text-white/90 text-sm leading-relaxed line-clamp-4">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                              {project.category}
                            </span>
                            {project.technologies && project.technologies.slice(0, 2).map((tech, techIndex) => (
                              <span key={techIndex} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Title and Actions Below Card */}
                  <div className="w-full flex flex-col items-center mt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-oxford-700 mb-2 font-serif text-center truncate w-full px-2" title={project.title}>{project.title}</h3>
                    <div className="flex justify-center items-center gap-3 sm:gap-4">
                      <Link 
                        to={`/project/${project.id}`} 
                        className="px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-oxford-700 text-cream-50 border border-parchment-400 hover:bg-oxford-800 font-serif" 
                      >
                        Read More
                      </Link>
                      {(project.github || project.demo) && (
                        <>
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-oxford-700 hover:text-parchment-400 transition-colors touch-button p-2"
                            >
                              <Github size={18} className="sm:w-5 sm:h-5" />
                            </a>
                          )}
                          {project.demo && (
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-oxford-700 hover:text-parchment-400 transition-colors touch-button p-2"
                            >
                              <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-16 sm:mt-24 py-8 sm:py-12 px-4">
          <p className="text-lg mb-6 sm:mb-8 text-ink-900 font-serif">
            Interested in the story behind the work?
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-lg bg-oxford-700 text-cream-50 font-semibold font-serif border border-parchment-400 hover:bg-oxford-800 transition"
          >
            Explore the Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;