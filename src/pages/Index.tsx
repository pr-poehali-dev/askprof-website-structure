import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { translations, type Lang } from "@/lib/i18n";

const HERO_IMG = "https://cdn.poehali.dev/projects/3cb35d12-7c9a-4bbf-91eb-38a2ff420fbd/files/37c871cb-22e5-48de-bed8-5fd096270873.jpg";

const SERVICE_ICONS = ["Globe", "Smartphone", "Monitor", "Headphones", "Building2", "BarChart2", "ShoppingCart", "Settings2", "Layers"];
const SERVICE_TAGS = [
  ["React", "Vue", "Node.js"],
  ["iOS", "Android", "React Native"],
  ["Windows", "macOS", "Electron"],
  ["24/7", "DevOps", "Audit"],
  ["ГИС МТ", "Меркурий", "ЭДО", "Логистика"],
  ["BI", "Analytics", "Dashboards"],
  ["POS", "Scanners", "Software"],
  ["Bitrix24", "amoCRM", "ERP", "WMS"],
  ["Digital", "Audit", "IT Integration"],
];
const ADV_ICONS = ["UserCheck", "Clock", "BarChart3", "Shield"];
const LANG_FLAGS: Record<Lang, string> = { ru: "🇷🇺", en: "🇬🇧", zh: "🇨🇳" };
const NAV_HREFS = ["#home", "#services", "#about", "#contacts"];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lang, setLang] = useState<Lang>("ru");
  const [langOpen, setLangOpen] = useState(false);

  const t = translations[lang];
  const navLabels = [t.nav.home, t.nav.services, t.nav.about, t.nav.contacts];
  const isZh = lang === "zh";
  const fontClass = isZh ? "font-[Noto_Sans_SC,sans-serif]" : "font-golos";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "services", "about", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-background overflow-x-hidden ${fontClass}`}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)" }} />
        <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
      </div>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "py-5"}`}>
        <div className="container mx-auto flex items-center justify-between px-6">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/3cb35d12-7c9a-4bbf-91eb-38a2ff420fbd/files/9322792d-fc51-4146-a6d1-b1dddd742d29.jpg" alt="АСК ПРОФ" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <div className="font-oswald font-semibold text-lg text-white tracking-wide leading-none">АСК ПРОФ</div>
              <div className="text-xs text-muted-foreground leading-none mt-0.5">IT Solutions</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_HREFS.map((href, i) => (
              <button key={href} onClick={() => scrollTo(href)}
                className={`nav-link text-sm font-medium transition-colors ${activeSection === href.replace("#", "") ? "text-cyan active" : "text-muted-foreground hover:text-white"}`}>
                {navLabels[i]}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Lang switcher */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="glass border border-white/15 hover:border-cyan/40 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all">
                <span>{LANG_FLAGS[lang]}</span>
                <span className="uppercase font-semibold">{lang}</span>
                <Icon name="ChevronDown" size={13} className="text-muted-foreground" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 glass-strong rounded-xl overflow-hidden border border-white/10 min-w-[110px]">
                  {(["ru", "en", "zh"] as Lang[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${lang === l ? "text-cyan" : "text-white"}`}>
                      <span>{LANG_FLAGS[l]}</span>
                      <span className="uppercase font-semibold">{l}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => scrollTo("#contacts")} className="btn-glow text-background font-semibold text-sm px-5 py-2.5 rounded-lg">
              {t.nav.cta}
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-strong mx-4 mt-2 rounded-xl p-4 flex flex-col gap-3">
            {NAV_HREFS.map((href, i) => (
              <button key={href} onClick={() => scrollTo(href)} className="text-left text-white font-medium py-2 border-b border-white/10 last:border-0">
                {navLabels[i]}
              </button>
            ))}
            <div className="flex gap-2 mt-1">
              {(["ru", "en", "zh"] as Lang[]).map((l) => (
                <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${lang === l ? "btn-glow text-background" : "glass border border-white/15 text-white"}`}>
                  {LANG_FLAGS[l]} {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo("#contacts")} className="btn-glow text-background font-semibold text-sm px-5 py-3 rounded-lg mt-1 text-center">
              {t.nav.cta}
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,10,22,0.3) 0%, rgba(6,10,22,0.7) 60%, rgba(6,10,22,1) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up" style={{ border: "1px solid rgba(0,212,255,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-sm text-cyan font-medium">{t.hero.badge}</span>
          </div>

          <h1 className="font-oswald font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-up delay-200 opacity-0">
            <span className="text-white">{t.hero.title1}</span>
            <span className="text-gradient-animated">{t.hero.titleGrad}</span>
            <br />
            <span className="text-white">{t.hero.title2}</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-400 opacity-0">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-600 opacity-0">
            <button onClick={() => scrollTo("#contacts")} className="btn-glow text-background font-bold text-base px-8 py-4 rounded-xl w-full sm:w-auto">
              {t.hero.btnPrimary}
            </button>
            <button onClick={() => scrollTo("#services")} className="glass border border-white/20 hover:border-cyan/40 text-white font-semibold text-base px-8 py-4 rounded-xl w-full sm:w-auto transition-all duration-300 hover:bg-white/5">
              {t.hero.btnSecondary}
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-up delay-800 opacity-0">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="font-oswald font-bold text-3xl text-gradient">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-0.5 h-12 bg-gradient-to-b from-cyan to-transparent animate-pulse" />
          <span className="text-xs text-muted-foreground">{t.hero.scrollHint}</span>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.advantages.map((a, i) => (
              <div key={i} className="reveal glass card-hover rounded-2xl p-6 border border-white/5" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,102,255,0.2))" }}>
                  <Icon name={ADV_ICONS[i]} size={22} className="text-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">{t.services.label}</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              {t.services.title}<span className="text-gradient">{t.services.titleGrad}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, i) => (
              <div key={i} className="reveal glass-strong card-hover rounded-2xl p-8 group cursor-default" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #00d4ff22, #8b5cf622)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Icon name={SERVICE_ICONS[i]} size={26} className="text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-oswald font-semibold text-xl text-white mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TAGS[i].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2 text-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{t.services.discuss}</span>
                  <Icon name="ArrowRight" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">{t.about.label}</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              {t.about.title}<span className="text-gradient">{t.about.titleGrad}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="reveal glass rounded-2xl p-8 border border-white/5">
                <h3 className="font-oswald font-semibold text-2xl text-white mb-4">{t.about.missionTitle}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t.about.mission1}</p>
                <p className="text-muted-foreground leading-relaxed">{t.about.mission2}</p>
              </div>
              <div className="reveal glass rounded-2xl p-6 border animate-border-glow" style={{ borderColor: "rgba(0,212,255,0.3)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="BadgeCheck" size={22} className="text-cyan" />
                  <span className="font-semibold text-white">{t.about.trustTitle}</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.about.trustItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-cyan flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-3 opacity-60">{t.about.trustDate}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="reveal glass rounded-2xl p-8 border border-white/5">
                <h3 className="font-oswald font-semibold text-2xl text-white mb-6">{t.about.teamTitle}</h3>
                <div className="space-y-4">
                  {t.team.map((member) => (
                    <div key={member.name} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-oswald font-bold text-background text-sm flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                      {member.share && (
                        <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}>
                          {member.share}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal glass rounded-2xl p-8 border border-white/5">
                <h3 className="font-oswald font-semibold text-xl text-white mb-5 flex items-center gap-2">
                  <Icon name="FileText" size={18} className="text-cyan" />
                  {t.about.reqTitle}
                </h3>
                <div className="space-y-3 text-sm">
                  {t.about.reqItems.map((r) => (
                    <div key={r.label} className="flex gap-3">
                      <span className="text-muted-foreground w-16 flex-shrink-0">{r.label}</span>
                      <span className="text-white font-medium">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">{t.contacts.label}</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              <span className="text-gradient">{t.contacts.titleGrad}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            <div className="reveal glass-strong rounded-2xl p-8">
              <h3 className="font-oswald font-semibold text-2xl text-white mb-6">{t.contacts.formTitle}</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: t.contacts.name, ph: t.contacts.namePh, type: "text" },
                  { label: t.contacts.email, ph: t.contacts.emailPh, type: "email" },
                  { label: t.contacts.phone, ph: t.contacts.phonePh, type: "tel" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input type={f.type} placeholder={f.ph}
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                ))}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contacts.message}</label>
                  <textarea rows={4} placeholder={t.contacts.messagePh}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm resize-none"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <button type="submit" className="btn-glow w-full text-background font-bold text-base py-4 rounded-xl mt-2">
                  {t.contacts.submit}
                </button>
              </form>
            </div>
            <div className="space-y-5 reveal">
              {[
                { icon: "MapPin", title: t.contacts.addrTitle, value: t.contacts.addrValue },
                { icon: "Mail", title: t.contacts.emailTitle, value: "ACK-PROF@ya.ru" },
                { icon: "Phone", title: t.contacts.phoneTitle, value: "+7 999 616-23-65" },
              ].map((c) => (
                <div key={c.title} className="glass rounded-2xl p-6 flex gap-4 border border-white/5 card-hover">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,102,255,0.15))" }}>
                    <Icon name={c.icon} size={20} className="text-cyan" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">{c.title}</div>
                    <div className="text-white font-medium text-sm whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass rounded-2xl p-6 border border-cyan/20 text-center">
                <div className="font-oswald font-bold text-2xl text-gradient mb-2">ООО «АСК ПРОФ»</div>
                <div className="text-xs text-muted-foreground">ИНН 2543196462 · ОГРН 1252500026316</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">{t.footer}</div>
          <div className="flex items-center gap-6">
            {NAV_HREFS.map((href, i) => (
              <button key={href} onClick={() => scrollTo(href)} className="text-xs text-muted-foreground hover:text-cyan transition-colors">
                {navLabels[i]}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}