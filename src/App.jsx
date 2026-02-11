import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Moon, Sun, ArrowUp, Send } from 'lucide-react';

// ============================================================================
// HOOKS & UTILITIES
// ============================================================================

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [options]);

  return [ref, isInView];
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// COMPONENTS
// ============================================================================

const Timeline = ({ events, darkMode }) => (
  <div className="relative">
    <div 
      className={`absolute left-8 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : ''}`}
      style={{ backgroundColor: darkMode ? '' : '#d4ccb0' }}
    />
    <div className="space-y-8">
      {events.map((event, idx) => (
        <FadeIn key={idx} delay={idx * 100}>
          <div className="relative pl-20">
            <div 
              className={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                darkMode ? 'bg-slate-600 border-gray-800' : ''
              }`}
              style={{
                backgroundColor: darkMode ? '' : '#d4ccb0',
                borderColor: darkMode ? '' : '#fffce0'
              }}
            />
            <div 
              className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-lg ${
                darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'backdrop-blur-sm'
              }`}
              style={{ 
                backgroundColor: darkMode ? '' : '#fff8d0',
                borderColor: darkMode ? '' : '#d4ccb0'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <span 
                  className={`text-sm px-2 py-1 rounded ${
                    darkMode ? 'bg-slate-600/20 text-slate-500' : 'text-gray-800'
                  }`}
                  style={{ backgroundColor: darkMode ? '' : '#f0e8c0' }}
                >
                  {event.date}
                </span>
              </div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.location}</p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{event.description}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
);

const SEOHead = () => {
  useEffect(() => {
    document.title = "Anas KARTAOUI - AI & Cybersecurity Student";
  }, []);
  return null;
};

// ============================================================================
// MAIN PORTFOLIO
// ============================================================================

const Portfolio = () => {
  // States
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Effects
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  // Data
  const data = {
    name: "Anas KARTAOUI",
    title: "AI & Cybersecurity Student",
    school: "ENSICAEN",
    bio: "Computer science student specializing in artificial intelligence and cybersecurity. Passionate about building secure, intelligent systems and exploring the intersection of machine learning and security.",
    
    timeline: [
      {
        date: "2024",
        title: "Turtle Game AI Agent",
        location: "ENSICAEN",
        description: "Developed rational agent with A* pathfinding for autonomous gameplay."
      },
      {
        date: "2024",
        title: "RSS Reader Android App",
        location: "ENSICAEN",
        description: "Built offline-capable news reader with SQLite and image caching."
      },
      {
        date: "2024",
        title: "License to Kill - OS Project",
        location: "ENSICAEN",
        description: "Multi-process system with POSIX synchronization and shared memory."
      },
      {
        date: "2023",
        title: "Constraint Satisfaction Solver",
        location: "ENSICAEN",
        description: "Binary puzzle solver using CSP techniques and backtracking."
      },
      {
        date: "2022",
        title: "Started at ENSICAEN",
        location: "Caen, France",
        description: "Began Engineering Degree in Computer Science with focus on Cybersecurity."
      }
    ],

    projects: [
      {
        title: "Turtle Game AI Agent",
        description: "Rational agent implementation with pathfinding algorithms for autonomous gameplay.",
        github: "#",
        date: "2024"
      },
      {
        title: "RSS Reader Android App",
        description: "Offline-capable news reader with image caching for Le Monde newspaper.",
        github: "#",
        date: "2024"
      },
      {
        title: "License to Kill - OS Project",
        description: "Multi-process system with POSIX synchronization and shared memory management.",
        github: "#",
        date: "2024"
      },
      {
        title: "Constraint Satisfaction Solver",
        description: "Binary puzzle solver using CSP techniques and backtracking algorithms.",
        github: "#",
        date: "2023"
      }
    ],
    
    educationList: [
      {
        degree: "Engineering Degree in Computer Science",
        school: "ENSICAEN",
        location: "Caen, France",
        period: "2022 - Present",
        focus: "Cybersecurity & E-Payment Systems"
      }
    ],
    
    skills: {
      "Programming Languages": ["C/C++", "Python", "Java", "JavaScript/React"],
      "AI & ML": ["Search Algorithms", "Reinforcement Learning", "Q-Learning"],
      "Cybersecurity": ["Cryptographic Protocols", "Secure Systems"],
      "Software Engineering": ["Design Patterns", "Version Control (Git)", "Agile"]
    },
    
    contact: {
      email: "anas.kartaoui@ecole.ensicaen.fr",
      github: "https://github.com/anaskartaoui",
      linkedin: "https://linkedin.com/in/anaskartaoui"
    }
  };

  const navigation = [
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-900'
      }`}
      style={{ backgroundColor: darkMode ? '' : '#fffce0' }}
    >
      <SEOHead />

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 z-50">
        <div 
          className="h-full transition-all duration-150" 
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: darkMode ? '#475569' : '#d4ccb0'
          }} 
        />
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-50 ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'text-white'
          }`}
          style={{ backgroundColor: darkMode ? '' : '#8b7355' }}
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-md border-b ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : ''
        }`}
        style={{ 
          backgroundColor: darkMode ? '' : 'rgba(255, 252, 224, 0.8)',
          borderBottomColor: darkMode ? '' : '#d4ccb0'
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{data.name}</h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm transition-all duration-300 ${
                    activeSection === item.id ? 'text-slate-600 font-semibold' : 
                    darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:shadow-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'text-gray-700'
                }`}
                style={{ backgroundColor: darkMode ? '' : '#f0e8c0' }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'text-gray-700'}`}
                style={{ backgroundColor: darkMode ? '' : '#f0e8c0' }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div 
              className={`md:hidden mt-4 pb-4 space-y-2 ${darkMode ? 'bg-gray-800' : ''}`}
              style={{ backgroundColor: darkMode ? '' : '#fffce0' }}
            >
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all duration-300 ${
                    activeSection === item.id ? 
                    (darkMode ? 'bg-gray-700 text-slate-500 font-semibold' : 'text-slate-700 font-semibold') :
                    (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600')
                  }`}
                  style={{ 
                    backgroundColor: darkMode ? '' : (activeSection === item.id ? '#f0e8c0' : 'transparent')
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        
        {/* About */}
        {activeSection === 'about' && (
          <div className="space-y-10">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
                <p className={`text-lg mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.title}</p>
                <p className={`text-base ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{data.school}</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div 
                className={`p-6 border-l-4 ${darkMode ? 'border-slate-600 bg-gray-800/30' : ''}`}
                style={{ 
                  backgroundColor: darkMode ? '' : '#fff8d0',
                  borderLeftColor: darkMode ? '' : '#d4ccb0'
                }}
              >
                <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{data.bio}</p>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Timeline */}
        {activeSection === 'timeline' && (
          <div className="space-y-8">
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">My Journey</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.timeline.length} milestones</p>
              </div>
            </FadeIn>
            <Timeline events={data.timeline} darkMode={darkMode} />
          </div>
        )}

        {/* Projects */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8">Projects</h2>
            </FadeIn>
            <div className="space-y-8">
              {data.projects.map((project, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <div 
                    className={`p-6 border transition-all duration-300 hover:shadow-lg ${
                      darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'backdrop-blur-sm'
                    }`}
                    style={{ 
                      backgroundColor: darkMode ? '' : '#fff8d0',
                      borderColor: darkMode ? '' : '#d4ccb0'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <a href={project.github} className={`transition-all duration-300 hover:opacity-70 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Github size={20} />
                      </a>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{project.date}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {activeSection === 'education' && (
          <div className="space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8">Education</h2>
            </FadeIn>
            {data.educationList.map((edu, idx) => (
              <FadeIn key={idx} delay={100}>
                <div 
                  className={`p-6 border transition-all duration-300 hover:shadow-lg ${
                    darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'backdrop-blur-sm'
                  }`}
                  style={{ 
                    backgroundColor: darkMode ? '' : '#fff8d0',
                    borderColor: darkMode ? '' : '#d4ccb0'
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className={`text-lg mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.school}</p>
                  <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.location}</p>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{edu.period}</p>
                  <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Focus: {edu.focus}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Contact */}
        {activeSection === 'contact' && (
          <div className="space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8">Contact</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              <FadeIn delay={100}>
                <div 
                  className={`p-8 border transition-all duration-300 hover:shadow-lg ${
                    darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'backdrop-blur-sm'
                  }`}
                  style={{ 
                    backgroundColor: darkMode ? '' : '#fff8d0',
                    borderColor: darkMode ? '' : '#d4ccb0'
                  }}
                >
                  <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${data.contact.email}`} className={`flex items-center gap-3 transition-all duration-300 hover:opacity-70 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Mail size={24} />
                      <span>{data.contact.email}</span>
                    </a>
                    <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 transition-all duration-300 hover:opacity-70 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Github size={24} />
                      <span>GitHub</span>
                    </a>
                    <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 transition-all duration-300 hover:opacity-70 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Linkedin size={24} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div 
                  className={`p-8 border transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'backdrop-blur-sm'
                  }`}
                  style={{ 
                    backgroundColor: darkMode ? '' : '#fff8d0',
                    borderColor: darkMode ? '' : '#d4ccb0'
                  }}
                >
                  <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your Name"
                      required
                      className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-300 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-slate-600' : 
                        'text-gray-900 placeholder-gray-500'
                      }`}
                      style={{ 
                        backgroundColor: darkMode ? '' : '#fffef0',
                        borderColor: darkMode ? '' : '#d4ccb0'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Your Email"
                      required
                      className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-300 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-slate-600' : 
                        'text-gray-900 placeholder-gray-500'
                      }`}
                      style={{ 
                        backgroundColor: darkMode ? '' : '#fffef0',
                        borderColor: darkMode ? '' : '#d4ccb0'
                      }}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Your Message"
                      required
                      rows="4"
                      className={`w-full px-4 py-2 border rounded-lg outline-none resize-none transition-all duration-300 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-slate-600' : 
                        'text-gray-900 placeholder-gray-500'
                      }`}
                      style={{ 
                        backgroundColor: darkMode ? '' : '#fffef0',
                        borderColor: darkMode ? '' : '#d4ccb0'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg ${
                        formStatus === 'sending' 
                          ? 'cursor-not-allowed text-white' 
                          : darkMode 
                            ? 'bg-slate-700 hover:bg-slate-800 text-white'
                            : 'text-white'
                      }`}
                      style={{
                        backgroundColor: formStatus === 'sending' ? '#6b7280' : (darkMode ? '' : '#8b7355')
                      }}
                    >
                      {formStatus === 'sending' ? 'Sending...' : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                    {formStatus === 'success' && (
                      <p className={`text-sm text-center ${darkMode ? 'text-slate-500' : 'text-green-700'}`}>
                        ✓ Message sent successfully!
                      </p>
                    )}
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer 
        className={`border-t mt-16 transition-colors ${
          darkMode ? 'bg-gray-800/80 backdrop-blur-md border-gray-700' : ''
        }`}
        style={{ 
          backgroundColor: darkMode ? '' : 'rgba(255, 252, 224, 0.8)',
          borderTopColor: darkMode ? '' : '#d4ccb0'
        }}
      >
        <div className={`max-w-5xl mx-auto px-6 py-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© {new Date().getFullYear()} {data.name}. Built with React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;