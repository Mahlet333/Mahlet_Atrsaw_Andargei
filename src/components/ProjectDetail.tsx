import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, Github, ExternalLink, FileText, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TemptationStory from './TemptationStory';
import MFFStory from './MFFStory';
import AfternoonNapStory from './AfternoonNapStory';
import FeedrStory from './FeedrStory';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === parseInt(id || ''));

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-50">
        <h1 className="text-4xl text-oxford-700 font-serif">Project not found</h1>
      </div>
    );
  }

  const renderContent = () => {
    if (project.id === 5) return <FeedrStory />;
    if (project.id === 10) return <TemptationStory />;
    if (project.id === 8) return <MFFStory />;
    if (project.id === 11) return <AfternoonNapStory />;
    
    return (
      <>
        <div className="prose prose-lg max-w-none text-ink-900 mb-8 prose-headings:text-oxford-700 prose-p:text-ink-900 prose-ul:text-ink-900 prose-li:text-ink-900 prose-strong:text-oxford-700 prose-h3:text-oxford-700 prose-h2:text-oxford-700 prose-h1:text-oxford-700 prose-a:text-oxford-700 prose-code:text-ink-900 prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {project.detailedDescription}
          </ReactMarkdown>
        </div>
        {project.id === 7 && (
          <div className="my-8">
            <a
              href="https://drive.google.com/file/d/15-jbV9KA9-xIa_DefHYw010WY9Gaac5q/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-cream-100 border border-parchment-400 hover:border-oxford-700 transition-all duration-300 group hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <FileText size={40} className="text-oxford-700" />
                <div>
                  <h4 className="text-xl font-bold text-oxford-700 group-hover:text-parchment-500 transition-colors font-serif">View Project Details</h4>
                  <p className="text-ink-700">Click to open the full project document in Google Drive.</p>
                </div>
              </div>
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-cream-50 text-ink-900 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-oxford-700 hover:text-parchment-500 transition-colors mb-8 group font-serif"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        <div className="relative mb-8">
          <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover rounded-2xl shadow-lg border border-parchment-400" style={{ maxHeight: '500px' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-cream-50/50 to-transparent rounded-2xl"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-oxford-700 mb-2 font-serif">{project.title}</h1>
            <h2 className="text-lg sm:text-xl text-ink-700">{project.subtitle}</h2>
          </div>
        </div>

        <div className="bg-cream-100 border border-parchment-400 rounded-2xl p-6 sm:p-10 mb-8">
          {renderContent()}
        </div>
        
        {/* Technologies */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-oxford-700 font-serif">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map(tech => (
              <span key={tech} className="px-4 py-2 text-sm rounded-full font-medium bg-cream-200 text-oxford-700 border border-parchment-400">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-700 hover:text-oxford-700 transition-colors group">
              <Github size={24} />
              <span className="text-lg">GitHub</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-700 hover:text-oxford-700 transition-colors group">
              <ExternalLink size={24} />
              <span className="text-lg">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 