import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Tag, Feather, Scroll, Sparkles, Brain, Heart, Send, CheckCircle, XCircle } from 'lucide-react';
import { blogPosts, blogFilters } from '../data/blog';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const riverRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  // Debug logging
  console.log('Blog component rendered');
  console.log('blogPosts:', blogPosts);
  console.log('blogFilters:', blogFilters);

  useEffect(() => {
    try {
      setIsVisible(true);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (err) {
      console.error('Error in Blog useEffect:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, []);

  // Error boundary
  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-ink-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Check if data is available
  if (!blogPosts || !blogFilters) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink-700 mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oxford-700 mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      setSubscribeMessage('Please enter a valid email address.');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
      return;
    }

    setSubscribeStatus('submitting');
    setSubscribeMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubscribeStatus('success');
    setSubscribeMessage("Thanks for subscribing! You're on the list.");
    setEmail('');

    setTimeout(() => {
      setSubscribeStatus('idle');
      setSubscribeMessage('');
    }, 5000);
  };

  const filteredPosts = selectedTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedTag);

  console.log('filteredPosts:', filteredPosts);
  console.log('selectedTag:', selectedTag);
  console.log('isVisible:', isVisible);
  console.log('Component state:', { selectedTag, isVisible, scrollY, isMobile, error });

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
      {/* Debug test - remove this after fixing */}
      {/* <div className="bg-red-500 text-white p-4 mb-4">
        Blog component is rendering! Posts count: {filteredPosts.length}
      </div> */}
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Flowing Header - Responsive */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="font-serif text-oxford-700 text-5xl mb-4 sm:mb-6">
            Stream of Consciousness
          </h1>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed px-4 text-ink-900">
            Thoughts, insights, and reflections from the intersection of technology, creativity, and human experience
          </p>
        </div>

        {/* Floating Tag Bubbles - Responsive */}
        <div className="flex justify-center mb-12 sm:mb-16 px-4">
          <div className="bg-cream-100 p-2 rounded-2xl flex items-center flex-wrap gap-2 border border-parchment-400">
            {blogFilters.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTag(id)}
                className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 touch-button justify-center font-serif border ${selectedTag === id ? 'bg-oxford-700 text-cream-50 border-parchment-400' : 'bg-cream-100 text-oxford-700 border-oxford-100 hover:bg-cream-200'}`}
              >
                {Icon && <Icon size={16} className="text-oxford-700" />}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Flowing Blog Stream - Responsive */}
        <div ref={riverRef} className="blog-river space-y-8 sm:space-y-12 flow-root">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink-700 text-lg">No blog posts found.</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => {
              const Icon = post.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={post.id}
                  className="bg-cream-50 border border-parchment-400 rounded-2xl p-6 sm:p-8 shadow-md mb-8 relative"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cream-200 border border-parchment-400">
                      <Icon size={24} className="text-oxford-700" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-oxford-700 mb-2 font-serif">{post.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-ink-700">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="prose text-ink-900 text-sm sm:text-base leading-relaxed mb-4 prose-headings:text-oxford-700 prose-p:text-ink-900 prose-ul:text-ink-900 prose-li:text-ink-900 prose-strong:text-oxford-700 prose-h3:text-oxford-700 prose-h2:text-oxford-700 prose-h1:text-oxford-700 prose-a:text-oxford-700 prose-code:text-ink-900" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }} />
                  <div className="relative z-10 pointer-events-auto">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center font-semibold transition-colors duration-300 group text-oxford-700 hover:text-parchment-500 cursor-pointer pointer-events-auto"
                    >
                      <span className="hover:underline pointer-events-auto">Read More</span>
                      <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 pointer-events-auto" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Newsletter Section - Responsive */}
        <div className="mt-16 sm:mt-24 py-12 sm:py-16 px-4">
          <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 text-center border border-parchment-400">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-oxford-700 mb-4 font-serif">
                Join the Stream
              </h3>
              <p className="text-ink-700 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                Get notified when new thoughts flow into the stream. No spam, just authentic insights.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeStatus === 'submitting' || subscribeStatus === 'success'}
                  className="flex-1 px-4 py-3 rounded-lg bg-cream-50 border border-parchment-400 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-oxford-700 transition-all duration-300 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={subscribeStatus === 'submitting' || subscribeStatus === 'success'}
                  className="px-6 py-3 bg-oxford-700 rounded-lg font-medium text-cream-50 hover:bg-oxford-800 transition-all duration-300 touch-button disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center border border-parchment-400"
                >
                  {subscribeStatus === 'submitting' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-oxford-700 mr-2"></div>
                      Subscribing...
                    </>
                  ) : subscribeStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} className="mr-2 text-parchment-400" />
                      Success!
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
              {subscribeStatus === 'error' && (
                <p className="mt-4 text-red-400 flex items-center justify-center gap-2">
                  <XCircle size={16} /> {subscribeMessage}
                </p>
              )}
               {subscribeStatus === 'success' && (
                <p className="mt-4 text-green-600 flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {subscribeMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;