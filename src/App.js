import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
          if (isVisible) {
            setVisibleSections(prev => new Set([...prev, section]));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Morning Field Cafe",
      year: "2024",
      role: "Full-Stack Developer & Designer",
      description: "A serene digital cafe experience featuring an interactive menu, ambient atmosphere, and peaceful design. Built with React and modern web technologies to create an immersive coffee shop experience.",
      tags: ["React", "JavaScript", "UI/UX"],
      image: "/images/hero-image.jpg",
      link: "https://morning-field-cafe-j5dgjaglc-jackies-projects-ede21082.vercel.app/#visit"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const FadeIn = ({ children, delay = 0 }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      if (hasAnimated) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [hasAnimated]);

    return (
      <div
        ref={ref}
        className={`transition-all duration-300 ease-out ${
          hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-sm tracking-wider font-light hover:opacity-60 transition-opacity"
          >
            JACKIE WHITE
          </button>
          <div className="flex gap-12">
            {['Work', 'About', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm tracking-wide font-light transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'opacity-100' 
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 md:px-16">
        <div className="max-w-5xl w-full">
          <p className="text-sm tracking-widest text-gray-400 mb-8 font-light">
            DEVELOPER × DESIGNER
          </p>
          <h1 className="text-6xl md:text-8xl font-light leading-[1.1] mb-12 tracking-tight">
            Crafting digital<br />
            experiences with<br />
            precision & care
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('work')}
              className="group flex items-center gap-2 text-sm tracking-wide font-light hover:opacity-60 transition-opacity"
            >
              VIEW SELECTED WORK
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-8 md:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <p className="text-sm tracking-widest text-gray-400 mb-4 font-light">SELECTED WORK</p>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">Projects</h2>
          </div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <a 
                key={idx} 
                href={project.link} 
                target={project.link !== '#' ? '_blank' : '_self'}
                rel={project.link !== '#' ? 'noopener noreferrer' : ''}
                className="block group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-8 bg-gray-50">
                  <div className="aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                <FadeIn delay={0}>
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-7">
                      <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="md:col-span-5 space-y-6">
                      <div>
                        <p className="text-xs tracking-widest text-gray-400 mb-2 font-light">ROLE</p>
                        <p className="font-light">{project.role}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest text-gray-400 mb-2 font-light">YEAR</p>
                        <p className="font-light">{project.year}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest text-gray-400 mb-2 font-light">DISCIPLINE</p>
                        <div className="flex gap-3">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-sm font-light">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 md:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <p className="text-sm tracking-widest text-gray-400 mb-4 font-light">ABOUT</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">Background</h2>
            </div>
            
            <div className="md:col-span-7 space-y-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800">
                I am passionate about creating innovative solutions to complex problems, as well as designing captivating user experiences.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                My expertise spans across multiple programming languages and technologies, including Python, Java, JavaScript, CSS, and HTML. I have experience in both front-end and back-end development. Throughout my career, I have worked on a wide range of projects, from small-scale applications to enterprise-level systems.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                I pride myself on my ability to deliver high-quality code that meets both functional and non-functional requirements. I am also skilled in agile development methodologies, and have experience working in cross-functional teams.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                In addition to my technical skills, I am a strong communicator and enjoy working closely with others to understand their needs and deliver solutions that exceed their expectations. I am a quick learner and am always eager to learn new technologies and tools that can help improve my work.
              </p>

              <div className="pt-8 space-y-6">
                <div>
                  <p className="text-xs tracking-widest text-gray-400 mb-3 font-light">EXPERTISE</p>
                  <div className="grid grid-cols-2 gap-4 text-sm font-light">
                    <div>
                      <p>Python & Java</p>
                      <p>JavaScript & TypeScript</p>
                      <p>HTML & CSS</p>
                    </div>
                    <div>
                      <p>Front-end Development</p>
                      <p>Back-end Development</p>
                      <p>Agile Methodologies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 md:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <p className="text-sm tracking-widest text-gray-400 mb-4 font-light">GET IN TOUCH</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                Let's work<br />together
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                I'm always interested in hearing about new projects and opportunities.
              </p>
            </div>
            
            <div className="md:col-span-7 flex justify-start items-center gap-8">
              <a
                href="mailto:jacquelinekwhite@gmail.com"
                className="group p-6 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Mail size={32} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
              
              <a
                href="https://linkedin.com/in/jacquelinekwhite"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Linkedin size={32} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
              
              <a
                href="https://github.com/jackiewhite"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Github size={32} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-400 font-light">
          <p>© 2025 Jackie White</p>
          <p className="tracking-wider">PORTFOLIO</p>
        </div>
      </footer>
    </div>
  );
}