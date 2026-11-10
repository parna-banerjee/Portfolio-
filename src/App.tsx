import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import SkillTree from "./SkillTree"
type Project = {
  id: string
  title: string
  kicker: string
  tags: string[]
  accent: string
  metric: string
  summary: string
  bullets: string[]
  built: string[]
  links: ProjectLink[]
}

type ProjectLink = {
  label: string
  href: string
}

type LevelTeaserProps = {
  href: string
  text: string
}

const projects: Project[] = [
  {
    id: "01",
    title: "AutoPulse",
    kicker: "BOSS LEVEL",
    tags: ["Node.js", "React", "AI", "PostgreSQL", "Supabase"],
    accent: "pink",
    metric: "95% ACCURACY · <5S",
    summary:
      "A family health-record platform that turns medical paperwork into structured, shareable data.",
    bullets: [
      "10+ REST APIs with role-based access",
      "Gemini Vision OCR → clean JSON",
      "Streaming AI assistant via SSE",
      "30-min QR sharing + Recharts trends",
    ],
    built: [
      "Prescription and lab-report extraction",
      "Time-boxed secure sharing",
      "Live AI responses",
      "Multi-profile family records",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/parna-banerjee" },
      { label: "Live Demo", href: "https://vercel.com" },
    ],
  },
  {
    id: "02",
    title: "Canteen Management",
    kicker: "SIDE QUEST",
    tags: ["Node.js", "React", "MongoDB", "Express"],
    accent: "yellow",
    metric: "50+ ITEMS · 15+ ORDERS",
    summary:
      "A faster campus food-ordering flow with vendor tools and secure pickup.",
    bullets: [
      "JWT role-based authentication",
      "Slot booking + OTP pickup flow",
      "2+ vendors and 50+ menu items",
      "Vendor sales dashboard",
    ],
    built: [
      "Customer ordering flow",
      "OTP-based order handoff",
      "Menu and availability controls",
      "Vendor performance view",
    ],
    links: [{ label: "GitHub", href: "https://github.com/parna-banerjee" }],
  },
]

const skills = [
  {
    title: "Languages",
    icon: "{ }",
    items: [
      ["Java", "Procurement"],
      ["C", "DSA practice"],
      ["JavaScript", "AutoPulse"],
    ],
  },
  {
    title: "Frameworks",
    icon: "< />",
    items: [
      ["Node.js", "AutoPulse"],
      ["Express.js", "Canteen"],
      ["React.js", "Projects + internship"],
      ["Spring Boot", "Procurement"],
    ],
  },
  {
    title: "Databases",
    icon: "[DB]",
    items: [
      ["SQL", "Procurement"],
      ["MongoDB", "Canteen"],
      ["Redis", "API caching"],
      ["PostgreSQL", "AutoPulse"],
    ],
  },
  {
    title: "Tools",
    icon: "++",
    items: [
      ["Git", "Projects + internship"],
      ["GitHub", "Projects + internship"],
      ["AWS S3", "File storage"],
      ["Vercel", "AutoPulse"],
      ["Postman", "15+ APIs"],
    ],
  },
  {
    title: "CS Fundamentals",
    icon: "01",
    items: [
      ["DSA", "250+ problems"],
      ["OOPs", "Java systems"],
      ["Networks", "SSE streaming"],
      ["OS", "Coursework"],
      ["DBMS", "Data modeling"],
    ],
  },
]

const achievements = [
  ["WORK", "Infosys Springboard Virtual Internship", "Backend · Jul–Sep 2026"],
  ["250+", "LeetCode Problems", "Consistency unlocked"],
  ["CERT", "Infosys Certifications", "Java · Full Stack React · Agile"],
  ["IITB", "IIT Bombay", "PHP & MySQL"],
  ["AI", "Anthropic Claude Code", "101 · Code in Action"],
]

function PixelIcon({
  name,
}: {
  name: "github" | "linkedin" | "mail" | "code" | "arrow" | "download" | "close"
}) {
  const paths: Record<string, React.ReactNode> = {
    github: (
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.8-4.7 5 .4.3.7 1 .7 1.9v2.8c0 .4.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
    ),
    linkedin: (
      <path d="M5 8H2v14h3V8Zm.3-4.3A1.8 1.8 0 1 0 1.7 3.7a1.8 1.8 0 0 0 3.6 0ZM22 14c0-4.2-2.2-6.2-5.2-6.2-2.4 0-3.5 1.3-4.1 2.2V8H9.6v14h3.1v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22H22v-8Z" />
    ),
    mail: (
      <>
        <path
          d="M3 5h18v14H3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m4 7 8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    ),
    code: (
      <path d="m8 5-7 7 7 7 2-2-5-5 5-5-2-2Zm8 0-2 2 5 5-5 5 2 2 7-7-7-7Z" />
    ),
    arrow: <path d="M4 10h11V5l6 7-6 7v-5H4v-4Z" />,
    download: <path d="M10 3h4v9h4l-6 6-6-6h4V3Zm-6 17h16v2H4v-2Z" />,
    close: <path d="m5 3 7 7 7-7 2 2-7 7 7 7-2 2-7-7-7 7-2-2 7-7-7-7 2-2Z" />,
  }
  return (
    <svg className="pixel-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function ParnaSprite({
  large = false,
  wave = false,
}: {
  large?: boolean
  wave?: boolean
}) {
  return (
    <svg
      className={`parna-sprite ${large ? "large" : ""} ${wave ? "wave" : ""}`}
      viewBox="0 0 80 96"
      role="img"
      aria-label="Pixel art avatar of Parna with brown hair, headphones, and a pink handheld game console"
    >
      <g shapeRendering="crispEdges">
        <path
          fill="#2de2c6"
          d="M8 8h16v4H8zM4 12h4v16H4zM8 28h12v4H8z"
          opacity=".7"
        />
        <path
          fill="#3a2057"
          d="M24 12h32v4H24zM16 16h48v12H16zM12 28h56v28H12z"
        />
        <path
          fill="#5e342a"
          d="M24 16h32v4H24zM20 20h40v28H20zM16 28h8v24h-8zM56 28h8v24h-8z"
        />
        <path
          fill="#b69cff"
          d="M12 28h8v20h-8zM60 28h8v20h-8zM16 24h12v4H16zM52 24h12v4H52z"
        />
        <path fill="#f3b58f" d="M24 24h32v28H24z" />
        <path fill="#5e342a" d="M24 24h8v8h-8zM32 20h24v8H32zM52 24h8v20h-8z" />
        <path fill="#1a1033" d="M28 36h4v4h-4zM48 36h4v4h-4z" />
        <path fill="#ff4fa3" d="M36 44h8v4h-8z" />
        <path fill="#2a1744" d="M24 52h32v8H24zM20 60h40v24H20z" />
        <path fill="#ff4fa3" d="M24 60h32v20H24z" />
        <path fill="#ffd84d" d="M28 64h20v8H28z" />
        <path fill="#1a1033" d="M28 72h8v4h-8zM48 68h4v4h-4zM44 72h4v4h-4z" />
        <path
          fill="#f3b58f"
          d="M12 60h8v20h-8zM60 60h8v20h-8z"
          className="sprite-arm"
        />
        <path fill="#2a1744" d="M24 84h12v8H20v-4h4zM44 84h12v4h4v4H44z" />
      </g>
    </svg>
  )
}

function PixelButton({
  children,
  href,
  variant = "primary",
  onClick,
  icon,
  disabled = false,
  download = false,
}: {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary" | "ghost"
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  download?: boolean
}) {
  const props = {
    className: `pixel-btn ${variant}`,
    onClick,
    "aria-disabled": disabled || undefined,
  }
  if (href)
    return (
      <a {...props} href={href} download={download || undefined}>
        {children}
        {icon}
      </a>
    )
  return (
    <button {...props} type="button" disabled={disabled}>
      {children}
      {icon}
    </button>
  )
}

function SectionTitle({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string
  title: string
  note: string
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
    </div>
  )
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [level, setLevel] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState("All")
  
  const [formSent, setFormSent] = useState(false)
  const [banner, setBanner] = useState("")
  const [secret, setSecret] = useState(false)
  const previousLevel = useRef(1)

  const filteredProjects = useMemo(
    () => projects.filter((p) => filter === "All" || p.tags.includes(filter)),
    [filter],
  )

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      setScrollProgress(progress)
      const sections = [
        ...document.querySelectorAll<HTMLElement>("main > section"),
      ]
      let active = 1
      sections.forEach((section, i) => {
        if (window.scrollY >= section.offsetTop - window.innerHeight * 0.45)
          active = Math.max(1, Math.min(i, 5))
      })
      setLevel(active)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (level > previousLevel.current) {
      setBanner(`LEVEL ${String(level).padStart(2, "0")} · +100 XP`)
      const timer = window.setTimeout(() => setBanner(""), 1900)
      previousLevel.current = level
      return () => window.clearTimeout(timer)
    }
    previousLevel.current = level
  }, [level])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSelectedProject(null)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [selectedProject])

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let pos = 0
    const key = (e: KeyboardEvent) => {
      pos = e.key === sequence[pos] ? pos + 1 : 0
      if (pos === sequence.length) {
        setSecret(true)
        setBanner("SECRET ACHIEVEMENT UNLOCKED!")
        window.setTimeout(() => setBanner(""), 2600)
        pos = 0
      }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [])

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return
    let last = 0
    const move = (e: PointerEvent) => {
      if (Date.now() - last < 70) return
      last = Date.now()
      const spark = document.createElement("span")
      spark.className = "cursor-spark"
      spark.style.left = `${e.clientX}px`
      spark.style.top = `${e.clientY}px`
      document.body.appendChild(spark)
      window.setTimeout(() => spark.remove(), 500)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [])

  const blip = () => {
    if (!soundOn) return
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "square"
    osc.frequency.value = 440
    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  }

  const navigate = () => {
    setMenuOpen(false)
    blip()
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    blip()
  }

  return (
    <div
      className="app"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button, a")) blip()
      }}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="hud">
        <a href="#home" className="player-mark" onClick={navigate}>
          <span className="mini-avatar">
            <ParnaSprite />
          </span>
          <span>
            <small>PLAYER</small>
            <strong>PARNA</strong>
          </span>
        </a>
        <div className="level-block">
          <span>LEVEL {String(level).padStart(2, "0")}</span>
          <div
            className="xp-track"
            aria-label={`Experience ${Math.round(scrollProgress * 100)}%`}
          >
            <i style={{ width: `${scrollProgress * 100}%` }} />
          </div>
          <small>XP {Math.round(scrollProgress * 999)}/999</small>
        </div>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {[
            "About",
            "Experience",
            "Skills",
            "Missions",
            "Achievements",
            "Contact",
          ].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={navigate}>
              {item}
            </a>
          ))}
        </nav>
        <div className="hud-actions">
          <button
            className="sound-toggle"
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            aria-label={`${soundOn ? "Mute" : "Turn on"} interface sounds`}
          >
            SFX {soundOn ? "ON" : "OFF"}
          </button>
          <a className="resume-mini" href="/parna-banerjee-resume.txt" download>
            <PixelIcon name="download" /> RESUME
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      {banner && (
        <div className="level-banner" role="status">
          {banner}
        </div>
      )}
      {secret && (
        <div className="coin-rain" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties}>
              $
            </i>
          ))}
        </div>
      )}

      <main id="main">
        <section id="home" className="hero level-section">
          <div className="grid-sky" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-copy reveal">
            <p className="press-start">
              PRESS START <span>_</span>
            </p>
            <h1>
              HI, I’M <em>PARNA.</em>
              <br />I BUILD SYSTEMS
              <br />
              THAT <strong>SHIP.</strong>
            </h1>
            <p className="type-line">
              A software engineer passionate about building technology that solves real problems. I combine backend engineering, database design, and full-stack development to create scalable applications, streamline workflows, and deliver meaningful user experiences.
            </p>
            <div className="hero-actions">
              <PixelButton href="#about" icon={<PixelIcon name="arrow" />}>
                START
              </PixelButton>
            </div>
          </div>
          <div className="hero-console reveal">
            <div className="console-label">
              <span>PLAYER 01</span>
              <i />
            </div>
            <div className="console-screen">
              <div className="code-cloud" aria-hidden="true">
                <span>API</span>
                <span>JAVA</span>
                <span>NODE</span>
                <span>AI</span>
              </div>
              <ParnaSprite large />
              <div className="ground-pixels" />
            </div>
            <div className="console-controls">
              <i />
              <div>
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>
          </div>
          
          <a href="#about" className="scroll-prompt">
            SCROLL TO PLAY <span>↓</span>
          </a>
        </section>

        <section id="about" className="content-section about-section">
          <SectionTitle
            eyebrow="LEVEL 01 · ORIGIN STORY"
            title="PLAYER PROFILE"
            note="The human behind the systems."
          />
          <div className="profile-grid">
            <div className="profile-frame reveal">
              <div className="profile-screen">
                <ParnaSprite large />
                <span>READY!</span>
              </div>
              <div className="profile-caption">
                <b>PARNA_BANERJEE</b>
                <span>BACKEND / FULL-STACK</span>
              </div>
            </div>
            <div className="character-sheet pixel-card reveal">
              <div className="sheet-header">
                <span>CHARACTER SHEET</span>
                <i>ACTIVE</i>
              </div>
              <dl>
                <div>
                  <dt>ROLE</dt>
                  <dd>Software Engineer</dd>
                </div>
                <div>
                  <dt>EDUCATION</dt>
                  <dd>
                    B.Tech Computer Science
                    <br />
                    <small>
                      Atria Institute of Technology · Bangalore
                      <br />
                      2023–Present · CGPA 8.8
                    </small>
                  </dd>
                </div>
                <div>
                  <dt>FOCUS</dt>
                  <dd>
                    Java / Spring Boot · Node / React
                    <br />
                    REST APIs · AI applications
                  </dd>
                </div>
              </dl>
              <blockquote>
                “CS student who builds scalable software and turns complex ideas into practical solutions.
                  Focused on backend engineering, clean APIs, and full-stack development.
                  Passionate about creating technology that solves real world problems.”
              </blockquote>
            </div>
          </div>
          <LevelTeaser href="#experience" text="EXPERIENCE" />
        </section>

        <section id="experience" className="content-section experience-section">
          <SectionTitle
            eyebrow="LEVEL 02 · PROFESSIONAL QUEST"
            title="EXPERIENCE"
          />
          <article className="experience-card pixel-card reveal">
            <div className="experience-rail">
              <span className="company-mark">IS</span>
              <div className="timeline-line">
                <i />
                <span>JUL</span>
                <b />
                <span>SEP</span>
              </div>
              <small>2026</small>
            </div>
            <div className="experience-main">
              <div className="experience-header">
                <div>
                  <p className="eyebrow">
                    INFOSYS SPRINGBOARD INTERNSHIP
                  </p>
                  <h3>Backend Developer Intern</h3>
                  <p>Enterprise Procurement Management System</p>
                </div>
                <span className="experience-status">QUEST COMPLETED</span>
              </div>
              <div
                className="experience-metrics"
                aria-label="Internship impact"
              >
                <div>
                  <strong>15+</strong>
                  <span>REST APIs</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>ROLE PORTALS</span>
                </div>
                <div>
                  <strong>7+</strong>
                  <span>ENTITIES</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>ORDER STAGES</span>
                </div>
              </div>
              <div className="experience-details">
                <div>
                  <h4>MISSION</h4>
                  <p>
                    Built an end-to-end procurement workflow connecting users,
                    administrators, and suppliers—from request creation through
                    approvals, fulfillment, and reporting.
                  </p>
                  <div className="tag-list">
                    {[
                      "Java",
                      "Spring Boot",
                      "JPA",
                      "Hibernate",
                      "MySQL",
                      "React",
                    ].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4>DELIVERED</h4>
                  <ul>
                    <li>Role-based User, Admin, and Supplier portals</li>
                    <li>Automated approvals and transactional email alerts</li>
                    <li>CSV reporting with React operational dashboards</li>
                    <li>Five-stage order tracking across the full lifecycle</li>
                  </ul>
                </div>
              </div>
              <div className="experience-footer">
                <span>JAVA BACKEND</span>
                <span>FULL-STACK DELIVERY</span>
                <span>ENTERPRISE WORKFLOWS</span>
              </div>
            </div>
          </article>
          <LevelTeaser href="#skills" text="SKILLS" />
        </section>

        <section id="skills" className="content-section skills-section">
          <SectionTitle
            eyebrow="LEVEL 03 · LOADOUT"
            title="SKILL TREE"
            note="Real tools, tied to real work. Tap a skill to inspect."
          />
               <SkillTree
       skills={skills}
       hub={<ParnaSprite />}
       
     />
          <LevelTeaser href="#missions" text="MISSIONS" />
        </section>

        <section id="missions" className="content-section missions-section">
          <SectionTitle
            eyebrow="LEVEL 04 · FEATURED WORK"
            title="MISSIONS"
            note="Selected builds. Numbers first, implementation details included."
          />
          <div className="filter-row reveal" aria-label="Filter projects">
            {["All", "Node.js", "React", "AI"].map((item) => (
              <button
                type="button"
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="project-stack">
            {filteredProjects.map((project) => (
              <article
                className={`project-card pixel-card reveal ${project.accent}`}
                key={project.id}
              >
                <div className="project-visual">
                  <div className="project-screen">
                    <div className="fake-browser">
                      <i />
                      <i />
                      <i />
                      <span>
                        {project.title.toLowerCase().replace(" ", "-")}.app
                      </span>
                    </div>
                    {project.id === "01" && (
                      <div className="health-ui">
                        <aside>
                          <b>AP</b>
                          <i />
                          <i />
                          <i />
                        </aside>
                        <main>
                          <div className="ui-title" />
                          <div className="health-cards">
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="chart">
                            {[3, 5, 4, 8, 6, 10, 9].map((h, i) => (
                              <b key={i} style={{ height: `${h * 7}%` }} />
                            ))}
                          </div>
                        </main>
                      </div>
                    )}
                    {project.id === "02" && (
                      <div className="food-ui">
                        <aside>
                          <b>CANTEEN</b>
                          <i />
                          <i />
                          <i />
                        </aside>
                        <main>
                          <div className="ui-title" />
                          <div className="menu-ui">
                            {[1, 2, 3, 4].map((n) => (
                              <div key={n}>
                                <b />
                                <span>
                                  <i />
                                  <i />
                                </span>
                              </div>
                            ))}
                          </div>
                        </main>
                      </div>
                    )}
                  </div>
                  <span className="quest-hover">QUEST AVAILABLE</span>
                </div>
                <div className="project-content">
                  <div className="project-topline">
                    <span>MISSION {project.id}</span>
                    <mark>{project.kicker}</mark>
                  </div>
                  <h3>{project.title}</h3>
                  <strong className="project-metric">{project.metric}</strong>
                  <p>{project.summary}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <PixelButton onClick={() => setSelectedProject(project)}>
                      MISSION BRIEF <PixelIcon name="arrow" />
                    </PixelButton>
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.label}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <LevelTeaser href="#achievements" text="ACHIEVEMENTS" />
        </section>

        <section
          id="achievements"
          className="content-section achievements-section"
        >
          <SectionTitle
            eyebrow="LEVEL 05 · PROGRESS"
            title="TROPHY ROOM"
            note="Proof of practice, learning, and consistency."
          />
          <div className="achievement-layout">
            <div
              className="trophy-case reveal"
              aria-label="Pixel trophy illustration"
            >
              <div className="trophy-shine" />
              <div className="trophy">
                <i />
                <b />
                <span />
              </div>
              <p>5 / 5 UNLOCKED</p>
            </div>
            <div className="achievement-list">
              {achievements.map(([icon, title, description], index) => (
                <article
                  className="achievement pixel-card reveal"
                  style={
                    { "--delay": `${index * 90}ms` } as React.CSSProperties
                  }
                  key={title}
                >
                  <span>{icon}</span>
                  <div>
                    <small>ACHIEVEMENT UNLOCKED</small>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <b>✓</b>
                </article>
              ))}
              {secret && (
                <article className="achievement secret pixel-card">
                  <span>???</span>
                  <div>
                    <small>SECRET ACHIEVEMENT</small>
                    <h3>Code Breaker</h3>
                    <p>You found the Konami code.</p>
                  </div>
                  <b>✓</b>
                </article>
              )}
            </div>
          </div>
          <LevelTeaser href="#contact" text="CONTACT" />
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="contact-shell pixel-card reveal">
            <div className="contact-copy">
              <p className="eyebrow">FINAL LEVEL · LET’S BUILD</p>
              <h2>
                READY FOR THE
                <br />
                <em>NEXT QUEST?</em>
              </h2>
              <p>
                I’m looking for backend and full-stack opportunities where clean
                engineering meets real user impact.
              </p>
              <div className="contact-links">
                <a href="mailto:parnabanerje22@gmail.com">
                  <PixelIcon name="mail" />
                  <span>
                    <small>EMAIL</small>parnabanerje22@gmail.com
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/parna-banerjee-42820a302"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PixelIcon name="linkedin" />
                  <span>
                    <small>LINKEDIN</small>parna-banerjee
                  </span>
                </a>
                <a
                  href="https://github.com/parna-banerjee"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PixelIcon name="github" />
                  <span>
                    <small>GITHUB</small>parna-banerjee
                  </span>
                </a>
                <a
                  href="https://leetcode.com/u/parnabanerjee"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PixelIcon name="code" />
                  <span>
                    <small>LEETCODE</small>parnabanerjee
                  </span>
                </a>
              </div>
              <PixelButton
                href="/parna-banerjee-resume.txt"
                download
                variant="secondary"
                icon={<PixelIcon name="download" />}
              >
                DOWNLOAD RESUME
              </PixelButton>
            </div>
            <div className="dialog-side">
              <div className="dialog-mascot">
                <ParnaSprite large wave />
                <span>LET’S TALK!</span>
              </div>
              {formSent ? (
                <div className="success-state" role="status">
                  <span>✓</span>
                  <h3>QUEST ACCEPTED!</h3>
                  <p>
                    I’ll reply soon. Your message is ready to send via email.
                  </p>
                  <a href="mailto:parnabanerje22@gmail.com?subject=Portfolio%20quest">
                    OPEN EMAIL APP →
                  </a>
                </div>
              ) : (
                <form onSubmit={submitForm}>
                  <label>
                    YOUR NAME
                    <input name="name" required placeholder="Enter name" />
                  </label>
                  <label>
                    EMAIL
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </label>
                  <label>
                    MESSAGE
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the quest..."
                    />
                  </label>
                  <button className="pixel-btn primary" type="submit">
                    SEND QUEST <PixelIcon name="arrow" />
                  </button>
                </form>
              )}
            </div>
          </div>
          <footer>
            <span>DESIGNED & BUILT BY PARNA · 2026</span>
            <a href="#home">BACK TO TOP ↑</a>
            <span>PRESS ↑ ↑ ↓ ↓ ← → ← → B A</span>
          </footer>
        </section>
      </main>

      <div
        className="walking-sprite"
        style={{ left: `${Math.min(94, 2 + scrollProgress * 92)}%` }}
        aria-hidden="true"
      >
        <ParnaSprite />
      </div>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setSelectedProject(null)
          }
        >
          <div
            className="mission-modal pixel-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-title"
          >
            <div className="modal-header">
              <span>MISSION BRIEFING · {selectedProject.id}</span>
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedProject(null)}
                aria-label="Close mission briefing"
              >
                <PixelIcon name="close" />
              </button>
            </div>
            <div className="modal-body">
              <p className="eyebrow">{selectedProject.kicker}</p>
              <h2 id="mission-title">{selectedProject.title}</h2>
              <strong>{selectedProject.metric}</strong>
              <div className="modal-grid">
                <div>
                  <h3>OBJECTIVE</h3>
                  <p>{selectedProject.summary}</p>
                  <h3>TECH</h3>
                  <div className="tag-list">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>WHAT I BUILT</h3>
                  <ul>
                    {selectedProject.built.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>RESULTS</h3>
                  <ul>
                    {selectedProject.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-links">
                {selectedProject.links.map((link) => (
                  <PixelButton
                    key={link.label}
                    href={link.href}
                    icon={<PixelIcon name="arrow" />}
                  >
                    {link.label}
                  </PixelButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LevelTeaser({ href, text }: LevelTeaserProps) {
  return (
    <a className="level-teaser reveal" href={href}>
      <span>NEXT LEVEL</span>
      <strong>{text} ↓</strong>
    </a>
  )
}

export default App
