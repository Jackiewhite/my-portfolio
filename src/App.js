
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

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
      className={`transition-all duration-500 ease-out ${
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms`, willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(prev => {
        const next = window.scrollY > 50;
        return prev === next ? prev : next;
      });

      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(prev => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Twill",
      year: "2026",
      role: "Full-Stack Developer & Designer",
      description: "A curated job board connecting technical talent with fashion's most innovative companies. Built for engineers, designers, and data people who want to work at the intersection of style and software.",
      tags: ["Next.js", "Supabase", "TypeScript"],
      image: `${process.env.PUBLIC_URL}/twill-screenshot.png`,
      imageClass: "object-top",
      link: "https://twillcareers.com"
    },
    {
      title: "Brunette Coquette",
      year: "2026",
      role: "Shopify Developer & Designer",
      description: "A boutique e-commerce experience built on a custom Shopify Liquid theme. Designed and developed the storefront from the ground up — from product merchandising and a cream editorial palette to responsive layouts, custom sections, and a polished mobile shopping flow.",
      tags: ["Shopify", "Liquid", "UI/UX"],
      image: `${process.env.PUBLIC_URL}/brunette-coquette-screenshot.png`,
      imageClass: "object-top",
      link: "https://brunettecoquette.com"
    },
    {
      title: "Morning Field Cafe",
      year: "2025",
      role: "Full-Stack Developer & Designer",
      description: "A serene digital cafe experience featuring an interactive menu, ambient atmosphere, and peaceful design. Built with React and modern web technologies to create an immersive coffee shop experience.",
      tags: ["React", "JavaScript", "UI/UX"],
      image: "/images/hero-image.jpg",
      link: "https://morning-field-cafe-j5dgjaglc-jackies-projects-ede21082.vercel.app/#visit"
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3f5] text-gray-900">
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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-black/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-xs tracking-wider font-light hover:opacity-60 transition-opacity"
          >
            JACKIE WHITE
          </button>
          <div className="flex gap-8">
            {['Work', 'About', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-xs tracking-wide font-light transition-all duration-300 ${
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
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden bg-gradient-to-b from-white via-[#f7f8fa] to-[#f2f3f5]">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.9),transparent_60%)]" />
        <div className="relative max-w-4xl w-full animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-light leading-[1.1] mb-6 tracking-tight">
            Hi, I'm <span className="font-serif italic">Jackie.</span>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10">
            I'm a software engineer and designer based in Austin, Texas, building thoughtful products from the first idea all the way to the last deploy.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('work')}
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-6 py-3 text-xs tracking-wide font-light hover:bg-gray-700 transition-colors"
            >
              VIEW SELECTED WORK
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center rounded-full border border-gray-200 px-6 py-3 text-xs tracking-wide font-light text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-widest text-gray-400 mb-3 font-light">SELECTED WORK</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Projects</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-14">
            {projects.map((project, idx) => (
              <FadeIn key={idx} delay={(idx % 2) * 80}>
                <a
                  href={project.link}
                  target={project.link !== '#' ? '_blank' : '_self'}
                  rel={project.link !== '#' ? 'noopener noreferrer' : ''}
                  className="block group cursor-pointer"
                >
                  <div className="relative overflow-hidden mb-5 bg-black/5 rounded-md">
                    <div className="aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.imageClass || ''}`}
                      />
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={16} className="text-gray-900" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs tracking-widest text-gray-300 font-light tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs tracking-widest text-gray-400 font-light">{project.year}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight group-hover:opacity-50 transition-opacity duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs tracking-wide text-gray-400 font-light mb-3">{project.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-light px-3 py-1 border border-gray-200 rounded-full text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-xs tracking-widest text-gray-400 mb-3 font-light">ABOUT</p>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">Background</h2>
            </div>

            <div className="md:col-span-7 space-y-6">
              <p className="text-base md:text-lg font-light leading-relaxed text-gray-800">
                I'm a software engineer and designer, and I'm happiest when I get to do both. I like owning a project end to end, from the first rough idea to the last deploy, and I tend to obsess over the small details most people never consciously notice but always feel.
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-600">
                Lately, most of my energy goes into my own products. I built Twill, a job board for tech roles in fashion, entirely on my own with Next.js, React, TypeScript, and Supabase, and used the Vercel AI SDK to add job matching and summaries that are live today.
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-600">
                Before going out on my own, I spent four years as an engineer at General Motors, building internal tools and full-stack applications used by tens of thousands of suppliers. It taught me how to work inside big, complicated systems and still ship things people rely on day to day, mostly across Java, Spring Boot, Angular, and TypeScript, with a lot of time spent on test automation.
              </p>

              <div className="pt-8 space-y-6">
                <div>
                  <p className="text-xs tracking-widest text-gray-400 mb-3 font-light">EXPERTISE</p>
                  <div className="grid grid-cols-2 gap-4 text-sm font-light">
                    <div>
                      <p>Java & Spring Boot</p>
                      <p>JavaScript & TypeScript</p>
                      <p>React & Next.js</p>
                      <p>SQL & PostgreSQL</p>
                    </div>
                    <div>
                      <p>Test Automation</p>
                      <p>AI/LLM Integration</p>
                      <p>Full Stack Development</p>
                      <p>Shopify & Liquid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-xs tracking-widest text-gray-400 mb-3 font-light">GET IN TOUCH</p>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                Let's work<br />together
              </h2>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                I'm always interested in hearing about new projects and opportunities.
              </p>
            </div>
            
            <div className="md:col-span-7 flex justify-start items-center gap-8">
              <a
                href="mailto:jacquelinekwhite@gmail.com"
                className="group p-4 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Mail size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
              
              <a
                href="https://linkedin.com/in/jacquelinekwhite"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Linkedin size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
              
              <a
                href="https://github.com/jackiewhite"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-gray-200 rounded-full hover:border-gray-900 transition-all hover:scale-110"
              >
                <Github size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-gray-400 font-light">
          <p>© 2026 Jackie White</p>
          <p className="tracking-wider">PORTFOLIO</p>
        </div>
      </footer>
    </div>
  );
}