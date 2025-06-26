import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog'; // Assuming you create this data file
import { ArrowLeft, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('BlogDetail rendered with id:', id);
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-50 text-ink-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-oxford-700 mb-4">Blog post not found</h1>
          <p className="text-xl text-ink-700 mb-8">The post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-oxford-700 hover:bg-oxford-800 text-cream-50 rounded-lg transition-colors font-serif"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-ink-900 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-oxford-700 hover:text-parchment-500 transition-colors mb-8 group font-serif"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        <main>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold text-oxford-700 mb-4 font-serif">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-lg text-ink-700">
              <span>{post.date}</span>
              <span>•</span>
              <span className="px-3 py-1 bg-cream-200 text-oxford-700 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>

          <div className="w-full h-64 sm:h-96 bg-cream-200 rounded-2xl mb-8 overflow-hidden border border-parchment-400">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <article className="bg-cream-100 border border-parchment-400 rounded-2xl p-6 sm:p-10 mb-8">
            <div className="prose prose-lg max-w-none text-ink-900 prose-headings:text-oxford-700 prose-p:text-ink-900 prose-ul:text-ink-900 prose-li:text-ink-900 prose-strong:text-oxford-700 prose-h3:text-oxford-700 prose-h2:text-oxford-700 prose-h1:text-oxford-700 prose-a:text-oxford-700 prose-code:text-ink-900 prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto">
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
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <div className="mt-16 border-t border-parchment-400 pt-8">
            <h2 className="text-2xl font-bold text-oxford-700 mb-6 flex items-center gap-3 font-serif">
              <MessageSquare className="w-6 h-6" />
              Join the Conversation
            </h2>
            <form className="flex flex-col sm:flex-row items-start gap-4">
              <textarea
                placeholder="Share your thoughts on this post..."
                className="w-full sm:flex-grow h-24 p-4 bg-cream-100 border border-parchment-400 rounded-lg focus:ring-2 focus:ring-oxford-500 focus:outline-none transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="px-8 py-3 bg-oxford-700 hover:bg-oxford-800 text-cream-50 rounded-lg font-semibold transition-colors font-serif"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogDetail; 