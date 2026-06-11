import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3cb35d12-7c9a-4bbf-91eb-38a2ff420fbd/files/37c871cb-22e5-48de-bed8-5fd096270873.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Globe",
    title: "Веб-разработка",
    desc: "Корпоративные сайты, порталы, интернет-магазины и SaaS-платформы с современным UX",
    tags: ["React", "Vue", "Node.js"],
  },
  {
    icon: "Smartphone",
    title: "Мобильные приложения",
    desc: "Нативные и кросс-платформенные приложения для iOS и Android любой сложности",
    tags: ["iOS", "Android", "React Native"],
  },
  {
    icon: "Monitor",
    title: "Десктопные приложения",
    desc: "Профессиональные решения для Windows и macOS — от учётных систем до автоматизации",
    tags: ["Windows", "macOS", "Electron"],
  },
  {
    icon: "Headphones",
    title: "Поддержка и доработка",
    desc: "Сопровождение, рефакторинг и масштабирование уже существующих продуктов",
    tags: ["24/7", "DevOps", "Аудит"],
  },
  {
    icon: "Building2",
    title: "Интеграция с государственными системами",
    desc: "Подключение и настройка обязательных государственных систем для торговых, производственных и логистических компаний.",
    tags: ["ГИС МТ (Честный знак)", "Меркурий", "ЭДО", "Логистика"],
  },
  {
    icon: "BarChart2",
    title: "Системы аналитики",
    desc: "Настройка BI-систем, сквозная аналитика, дашборды и отчёты для принятия решений.",
    tags: ["BI-системы", "Сквозная аналитика", "Дашборды"],
  },
  {
    icon: "ShoppingCart",
    title: "Оборудование и ПО",
    desc: "Поставки кассового и торгового оборудования, лицензионного программного обеспечения.",
    tags: ["Онлайн-кассы и ФН", "Сканеры, ТСД, принтеры", "Лицензионное ПО"],
  },
  {
    icon: "Settings2",
    title: "Автоматизация бизнеса",
    desc: "Внедрение CRM и ERP-систем, автоматизация документооборота и складского учёта.",
    tags: ["Битрикс24", "amoCRM", "ERP", "WMS"],
  },
  {
    icon: "Layers",
    title: "Комплексные решения",
    desc: "Стратегия цифровизации, аудит бизнес-процессов и подбор IT-систем под задачи вашей компании.",
    tags: ["Цифровизация", "Аудит процессов", "Интеграция IT"],
  },
];

const ADVANTAGES = [
  { icon: "UserCheck", title: "Индивидуальный подход", desc: "Вникаем в задачи бизнеса, а не просто пишем код" },
  { icon: "Clock", title: "Честные сроки", desc: "Называем реальные даты и соблюдаем их" },
  { icon: "BarChart3", title: "Прозрачное ценообразование", desc: "Смета с подробной разбивкой до старта работ" },
  { icon: "Shield", title: "Техническая поддержка", desc: "Остаёмся на связи после запуска продукта" },
];

const TEAM = [
  { name: "Строкин Кирилл Андреевич", role: "Генеральный директор", share: null },
  { name: "Абаимов Вячеслав Вячеславович", role: "Учредитель", share: "34%" },
  { name: "Коваль Антон Геннадьевич", role: "Учредитель", share: "33%" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "services", "about", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-x-hidden">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
        />
      </div>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-background font-oswald font-bold text-lg btn-glow"
              style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }}
            >
              А
            </div>
            <div>
              <div className="font-oswald font-semibold text-lg text-white tracking-wide leading-none">
                АСК ПРОФ
              </div>
              <div className="text-xs text-muted-foreground leading-none mt-0.5">
                Разработка ПО
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-cyan active"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:flex btn-glow text-background font-semibold text-sm px-5 py-2.5 rounded-lg"
          >
            Оставить заявку
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass-strong mx-4 mt-2 rounded-xl p-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left text-white font-medium py-2 border-b border-white/10 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="btn-glow text-background font-semibold text-sm px-5 py-3 rounded-lg mt-2 text-center"
            >
              Оставить заявку
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="hero"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,10,22,0.3) 0%, rgba(6,10,22,0.7) 60%, rgba(6,10,22,1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up"
            style={{ border: "1px solid rgba(0,212,255,0.3)" }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-sm text-cyan font-medium">Владивосток · Действующее предприятие с 2025</span>
          </div>

          <h1 className="font-oswald font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-up delay-200 opacity-0">
            <span className="text-white">Современные </span>
            <span className="text-gradient-animated">IT-решения</span>
            <br />
            <span className="text-white">для вашего бизнеса</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-400 opacity-0">
            Разрабатываем веб-сервисы, мобильные приложения и корпоративное ПО.
            Честные сроки, прозрачные цены и поддержка после запуска.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-600 opacity-0">
            <button
              onClick={() => scrollTo("#contacts")}
              className="btn-glow text-background font-bold text-base px-8 py-4 rounded-xl w-full sm:w-auto"
            >
              Узнать стоимость проекта
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="glass border border-white/20 hover:border-cyan/40 text-white font-semibold text-base px-8 py-4 rounded-xl w-full sm:w-auto transition-all duration-300 hover:bg-white/5"
            >
              Наши услуги
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-up delay-800 opacity-0">
            {[
              { num: "4", label: "Направления" },
              { num: "20+", label: "Разработчиков" },
              { num: "2025", label: "Год основания" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="font-oswald font-bold text-3xl text-gradient">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-0.5 h-12 bg-gradient-to-b from-cyan to-transparent animate-pulse" />
          <span className="text-xs text-muted-foreground">Прокрутите вниз</span>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a, i) => (
              <div
                key={a.title}
                className="reveal glass card-hover rounded-2xl p-6 border border-white/5"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,102,255,0.2))" }}
                >
                  <Icon name={a.icon} size={22} className="text-cyan" />
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
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">
              — Что мы делаем —
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              Наши <span className="text-gradient">услуги</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="reveal glass-strong card-hover rounded-2xl p-8 group cursor-default"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #00d4ff22, #8b5cf622)", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    <Icon name={s.icon} size={26} className="text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-oswald font-semibold text-xl text-white mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            background: "rgba(0,212,255,0.1)",
                            border: "1px solid rgba(0,212,255,0.2)",
                            color: "#00d4ff",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2 text-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Обсудить задачу</span>
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
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">
              — Кто мы —
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              О <span className="text-gradient">компании</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="reveal glass rounded-2xl p-8 border border-white/5">
                <h3 className="font-oswald font-semibold text-2xl text-white mb-4">
                  История и миссия
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ООО «АСК ПРОФ» основана в 2025 году во Владивостоке командой разработчиков,
                  объединённых общей целью — помогать бизнесу расти с помощью технологий.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы создаём современное программное обеспечение: от небольших веб-сервисов
                  до масштабных корпоративных платформ. Наш подход — глубокое погружение
                  в задачи клиента и прозрачная коммуникация на каждом этапе.
                </p>
              </div>

              <div
                className="reveal glass rounded-2xl p-6 border animate-border-glow"
                style={{ borderColor: "rgba(0,212,255,0.3)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="BadgeCheck" size={22} className="text-cyan" />
                  <span className="font-semibold text-white">Надёжность и прозрачность</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-cyan flex-shrink-0" />
                    Действующее предприятие, зарегистрировано в декабре 2025
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-cyan flex-shrink-0" />
                    Судебных споров и задолженностей не выявлено
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-cyan flex-shrink-0" />
                    Работаем в соответствии с законодательством РФ
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-cyan flex-shrink-0" />
                    Субъект малого предпринимательства (микро)
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 opacity-60">
                  По данным на 10.06.2026
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="reveal glass rounded-2xl p-8 border border-white/5">
                <h3 className="font-oswald font-semibold text-2xl text-white mb-6">Команда</h3>
                <div className="space-y-4">
                  {TEAM.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/5"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-oswald font-bold text-background text-sm flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                      {member.share && (
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                          style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}
                        >
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
                  Реквизиты
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "ИНН", value: "2543196462" },
                    { label: "ОГРН", value: "1252500026316" },
                    { label: "Статус", value: "Действующая" },
                    { label: "Адрес", value: "690002, г. Владивосток, пр-кт Красного Знамени, д. 59, пом. 12, оф. 505" },
                  ].map((r) => (
                    <div key={r.label} className="flex gap-3">
                      <span className="text-muted-foreground w-14 flex-shrink-0">{r.label}</span>
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
            <div className="inline-block font-oswald text-cyan text-sm font-semibold tracking-widest uppercase mb-4">
              — Связаться с нами —
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white">
              <span className="text-gradient">Контакты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            <div className="reveal glass-strong rounded-2xl p-8">
              <h3 className="font-oswald font-semibold text-2xl text-white mb-6">Оставьте заявку</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    placeholder="email@company.ru"
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Описание задачи</label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите о вашем проекте..."
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none transition-colors text-sm resize-none"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-glow w-full text-background font-bold text-base py-4 rounded-xl mt-2"
                >
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className="space-y-5 reveal">
              {[
                {
                  icon: "MapPin",
                  title: "Адрес",
                  value: "690002, г. Владивосток\nпр-кт Красного Знамени, д. 59\nпом. 12, офис 505",
                },
                {
                  icon: "Mail",
                  title: "Email",
                  value: "info@askprof.ru",
                },
                {
                  icon: "Phone",
                  title: "Телефон",
                  value: "Уточните при обращении",
                },
              ].map((c) => (
                <div key={c.title} className="glass rounded-2xl p-6 flex gap-4 border border-white/5 card-hover">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,102,255,0.15))" }}
                  >
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
                <div className="text-xs text-muted-foreground">
                  ИНН 2543196462 · ОГРН 1252500026316
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025–2026 ООО «АСК ПРОФ» · Все права защищены
          </div>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-xs text-muted-foreground hover:text-cyan transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}