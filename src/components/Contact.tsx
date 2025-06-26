import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, MessageSquare, User, Globe, MapPin, Linkedin, Github, Twitter, Zap, Terminal, Wifi, Signal } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Simulate terminal boot sequence with user-friendly language
    const bootSequence = [
      'Initializing communication system...',
      'Establishing secure connection...',
      'Loading contact interface...',
      'System ready for messages.',
      '> _'
    ];

    let index = 0;
    const typeNextLine = () => {
      if (index < bootSequence.length) {
        setIsTyping(true);
        let charIndex = 0;
        const currentLine = bootSequence[index];
        const typeChar = () => {
          if (charIndex < currentLine.length) {
            setCurrentCommand(currentLine.substring(0, charIndex + 1));
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            setTerminalLines(prev => [...prev, currentLine]);
            setCurrentCommand('');
            setIsTyping(false);
            index++;
            setTimeout(typeNextLine, 500);
          }
        };
        typeChar();
      }
    };

    const timer = setTimeout(typeNextLine, 1000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add transmission simulation with user-friendly language
    const transmissionSteps = [
      'Processing your message...',
      'Establishing secure connection...',
      'Sending message...',
      'Waiting for confirmation...',
      'Message sent successfully!'
    ];

    for (let i = 0; i < transmissionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setTerminalLines(prev => [...prev, `> ${transmissionSteps[i]}`]);
    }
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setTerminalLines([]);
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-cream-50 text-ink-900 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header - Responsive */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 relative text-ink-900">
            <span className="oxford-heading">Contact Me</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-700 max-w-2xl mx-auto px-4">
            I'd love to hear from you! Fill out the form below or reach out via email or social media.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
          {/* Contact Form Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-parchment-400 p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-oxford-700 text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-parchment-400 bg-cream-100 text-ink-900 focus:outline-none focus:ring-2 focus:ring-parchment-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-oxford-700 text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-parchment-400 bg-cream-100 text-ink-900 focus:outline-none focus:ring-2 focus:ring-parchment-400"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-oxford-700 text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-parchment-400 bg-cream-100 text-ink-900 focus:outline-none focus:ring-2 focus:ring-parchment-400"
                    placeholder="Type your message here..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-oxford-700 text-cream-50 font-semibold border border-parchment-400 hover:bg-oxford-800 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-cream-50 mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-oxford-700 mb-4">Thank you!</h2>
                <p className="text-ink-700">Your message has been sent. I'll get back to you soon.</p>
              </div>
            )}
          </div>
          {/* Contact Info & Socials */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-6 mt-8 md:mt-0">
            <div className="w-full bg-cream-100 rounded-xl border border-parchment-400 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="text-oxford-700" size={18} />
                <span className="text-oxford-700 font-semibold">Email:</span>
              </div>
              <a href="mailto:ma7030@nyu.edu" className="text-ink-900 hover:underline break-all">ma7030@nyu.edu</a>
            </div>
            <div className="w-full bg-cream-100 rounded-xl border border-parchment-400 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-oxford-700 font-semibold">Find me on:</span>
              </div>
              <div className="flex gap-4 mt-2">
                <a href="https://linkedin.com/in/mahletatrsawandargei" target="_blank" rel="noopener noreferrer" className="text-oxford-700 hover:text-parchment-400 transition-colors">
                  <Linkedin size={22} />
                </a>
                <a href="https://github.com/mahletatrsawandargei" target="_blank" rel="noopener noreferrer" className="text-oxford-700 hover:text-parchment-400 transition-colors">
                  <Github size={22} />
                </a>
                {/* Add more socials as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;