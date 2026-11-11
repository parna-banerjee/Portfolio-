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
  image?: string
  wip?: boolean
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
const WEB3FORMS_KEY = "78b71a45-8571-4873-9efd-58057cecfa69"
const projects: Project[] = [
  {
    id: "01",
    title: "AutoPulse",
    image: "/project/auto-pulse.png",
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
      { label: "GitHub", href: "https://github.com/parna-banerjee/AutoPulse" },
      { label: "Live Demo", href: "https://auto-pulse-flax.vercel.app/" },
    ],
  },
  {
    id: "02",
    title: "Canteen Management",
    image: "/project/canteenpe.png",
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
    links: [{ label: "GitHub", href: "https://github.com/parna-banerjee/CanteenPe_project" }],
  },

  {
    id: "03",
    title: "Othello",
    image: "/project/othello.png",
    wip: true,
    kicker: "IN PROGRESS",
    tags: ["Java", "React", "Google OAuth", "OTP", "AI"],
    accent: "teal",
    metric: "NOW BUILDING",
        summary:
      "A multiplayer Othello game with Java and React. Sign in with Google, invite friends by OTP and get AI move help.",
    bullets: [
      "Java backend with full Othello rules",
      "React board, lobby and friends list",
      "Google login and OTP game invites",
      "AI assistant for move suggestions",
    ],
    built: [
      "Othello game logic in Java",
      "React game board and interface",
      "Google login",
      "OTP-based game sharing",
      "Friends and game invites",
      "AI move assistant",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/parna-banerjee/othello" },
    ],
  },

  {
    id: "04",
    title: "Email Scheduler",
    image: "/project/email.png",
    kicker: "BACKEND QUEST",
    tags: ["Node.js", "Next.js", "BullMQ", "Redis", "PostgreSQL"],
    accent: "pink",
    metric: "NO CRON · RESTART-SAFE",
        summary:
      "Schedules emails to send at the exact time, survives restarts and enforces per-sender rate limits.",
    bullets: [
      "BullMQ delayed jobs, no cron",
      "Duplicate-proof scheduling in Postgres",
      "Hourly limits with overflow to next hour",
      "Google login, Slack alerts, search",
    ],
    built: [
      "Delayed-job scheduler that survives restarts",
      "Retries with backoff and clear job states",
      "Per-sender hourly caps and send throttling",
      "Elasticsearch search and a live queue dashboard",
      "Next.js dashboard with CSV recipient upload",
      "Slack OAuth alerts when a limit is hit",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/parna-banerjee/email-scheduler" },
      { label: "Live Demo", href: "https://email-service-frontend-alpha.vercel.app/" }
    ],
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

const SPRITE = [
  "........DHHHHHHD........",
  "......DHHhHHHHhHHD......",
  ".....DHHhHHHHHHhHHD.....",
  "....DHHHHhHHHHHHhHHD....",
  "....DHHHHHHHHHhHHHHD....",
  "....DHHHHHSSSSSSHHHD....",
  "....DHHHHSSSSSSSSHHD....",
  "....DHHSSSSSSSSSSHHD....",
  "....DhHSSESSSSESSHHD....",
  "....DhHSSESSSSESSHHD....",
  "....DHHSBSSSSSSBSHhD....",
  "....DHHSSSSMMSSSSHHD....",
  "....DhHHSSSSSSSSHHHD....",
  "....DHHHHHssssHHHHHD....",
  "...DHHttTTSSSSTTtUHHD...",
  "..DHHTTTTTTTTTTTTUUHHD..",
  ".DHHHTTTTTTTTTTTTUUHD...",
  ".DHHDSSTTtTTTTTTTVVDHD..",
  ".DD..SSTTTTTTtTTTVV..DD.",
  ".....SSTTTTTTTTTTVV.....",
  ".....SSppppppppppVV.....",
  "......PPPPPPPPPPPP......",
  ".....PPPPPPPPPPPPPP.....",
  "....PPPPPPPPPPPPPPPP....",
  "....PPPPPPp..pPPPPPP....",
  "....pqqqPPp..pPPqqqp....",
  "....pqqqPPp..pPPqqqp....",
  "....pppPPPp..pPPPppp....",
  "...pPPPPPPp..pPPPPPPp...",
  "...WWWWWWWW..WWWWWWWW...",
  "...wwwwwwww..wwwwwwww...",
]

const SPRITE_COLORS: Record<string, string> = {
  D: "#2b1410", // hair shadow
  H: "#4a2519", // hair
  h: "#6b3a27", // hair highlight
  S: "#e8b08a", // skin
  s: "#cf9270", // neck shadow
  V: "#e8b08a", // skin (waving arm)
  B: "#f08a8a", // blush
  E: "#1a1033", // eyes
  M: "#a0485a", // smile
  T: "#1c1530", // tee
  U: "#1c1530", // tee (waving sleeve)
  t: "#3d3160", // tee highlight
  P: "#d9c4a0", // cargo
  p: "#b89e78", // cargo shadow
  q: "#eadcc0", // cargo pocket
  W: "#f4efff", // sneaker
  w: "#c9bfe0", // sole
}

function spriteRects(keep: (c: string) => boolean) {
  return SPRITE.flatMap((row, y) =>
    [...row].map((c, x) =>
      c !== "." && keep(c) ? (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1"
          height="1"
          fill={SPRITE_COLORS[c]}
        />
      ) : null,
    ),
  )
}

function ParnaSprite({
  large = false,
  wave = false,
}: {
  large?: boolean
  wave?: boolean
}) {
  const isArm = (c: string) => c === "U" || c === "V"
  const isHair = (c: string) => c === "D" || c === "H" || c === "h"
  return (
    <svg
      className={`parna-sprite ${large ? "large" : ""} ${wave ? "wave" : ""}`}
      viewBox="0 0 24 31"
      role="img"
      aria-label="Pixel art avatar of Parna with shoulder-length wavy brown hair, a black tee, beige cargo pants and white sneakers"
    >
      <g shapeRendering="crispEdges">
        {spriteRects((c) => !isArm(c) && !isHair(c))}
        <g className="sprite-arm">{spriteRects(isArm)}</g>
        {spriteRects(isHair)}
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

function PixelTriangle({ dir }: { dir: "next" | "prev" }) {
  // 15 rows, widest row in the middle = a pointing triangle made of pixels
  const rows = Array.from({ length: 15 }, (_, y) => 8 - Math.abs(7 - y))
  const draw = () =>
    rows.map((w, y) => (
      <rect key={y} x={dir === "next" ? 0 : 8 - w} y={y} width={w} height="1" />
    ))
  return (
    <svg viewBox="0 0 9 16" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#3f3150" transform="translate(1 1)">
        {draw()}
      </g>
      <g fill="#ffd84d">{draw()}</g>
    </svg>
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

  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState<"next" | "prev">("next")
  
  const [formSent, setFormSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")
  const [banner, setBanner] = useState("")
  const [secret, setSecret] = useState(false)
  const previousLevel = useRef(1)

  const filteredProjects = useMemo(
    () => projects.filter((p) => filter === "All" || p.tags.includes(filter)),
    [filter],
  )
  const index = Math.min(slide, filteredProjects.length - 1)
  const current = filteredProjects[index] ?? projects[0]
    const go = (step: number) => {
    if (soundOn) {
      if (step > 0) {
        tone(523, 0.06)
        tone(784, 0.09, 0.06)
      } else {
        tone(784, 0.06)
        tone(523, 0.09, 0.06)
      }
    }
    setDir(step > 0 ? "next" : "prev")
    setSlide((index + step + filteredProjects.length) % filteredProjects.length)
  }
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

   const audioRef = useRef<AudioContext | null>(null)

  const tone = (freq: number, len = 0.08, delay = 0) => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!Ctx) return
    if (!audioRef.current) audioRef.current = new Ctx()
    const ctx = audioRef.current
    if (ctx.state === "suspended") void ctx.resume()
    const t = ctx.currentTime + delay
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "square"
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.04, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + len)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + len)
  }

  const navigate = () => {
    setMenuOpen(false)
  }
  

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setSending(true)
    setSendError("")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New message from your portfolio",
          from_name: "Portfolio contact form",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      })
      const result = await res.json()
      if (result.success) {
                setFormSent(true)
        if (soundOn) {
          tone(523, 0.08)
          tone(659, 0.08, 0.09)
          tone(784, 0.14, 0.18)
        }
      } else {
        setSendError(result.message || "Something went wrong. Please try again.")
      }
    } catch {
      setSendError("Network error. Please try again or email me directly.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="app"
            onClick={(e) => {
        if (!soundOn) return
        const clickable = (e.target as HTMLElement).closest(
          "button, a, input, textarea",
        )
        if (clickable) tone(660, 0.08)
        else tone(330, 0.05)
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
                        onClick={() => {
              const next = !soundOn
              setSoundOn(next)
              if (next) {
                tone(523, 0.07)
                tone(784, 0.1, 0.08)
              }
            }}
            aria-label={`${soundOn ? "Mute" : "Turn on"} interface sounds`}
          >
            SFX {soundOn ? "ON" : "OFF"}
          </button>
          <a className="resume-mini" href="/parna-banerjee-resume.pdf" download>
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
              <ol className="timeline">
                <li>
                  <i />
                  <b>JUL</b>
                  <small>2026</small>
                  <em>START</em>
                </li>
                <li>
                  <i />
                  <b>SEP</b>
                  <small>2026</small>
                  <em>COMPLETE</em>
                </li>
              </ol>
              <small className="rail-dates">JUL – SEP 2026</small>
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
         
                    <div className="reveal">
            <div
              className="mission-console"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(1)
                if (e.key === "ArrowLeft") go(-1)
              }}
            >
              <div className="mc-top">
                <span>MISSION SELECT</span>
                <span aria-live="polite">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(filteredProjects.length).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                className="mc-btn prev"
                onClick={() => go(-1)}
                disabled={filteredProjects.length < 2}
                aria-label="Previous mission"
              >
                <PixelTriangle dir="prev" />
              </button>

              <div className="mc-screen">
                <div className={`mc-slide ${dir}`} key={current.id}>
                  {[current].map((project) => (
              <article
                className={`project-card pixel-card ${project.accent}`}
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
                                        {project.image && (
                      <img
                        className="project-shot"
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                      />
                    )}
                    {!project.image && project.id === "01" && (
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
                    {!project.image && project.id === "02" && (
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
              </div>

              <button
                type="button"
                className="mc-btn next"
                onClick={() => go(1)}
                disabled={filteredProjects.length < 2}
                aria-label="Next mission"
              >
                <PixelTriangle dir="next" />
              </button>

              <div className="mc-dots">
                {filteredProjects.map((p, i) => (
                  <button
                    type="button"
                    key={p.id}
                    className={i === index ? "on" : ""}
                    aria-label={`Go to mission ${p.id}`}
                    aria-current={i === index}
                    onClick={() => {
                      setDir(i > index ? "next" : "prev")
                      setSlide(i)
                    }}
                  />
                ))}
              </div>
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
                href="/parna-banerjee-resume.pdf"
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
                     Your message just landed in my inbox. I’ll reply soon.
                  </p>
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
                      placeholder="player@mail.com"
                    />
                  </label>
                  <label>
                    MESSAGE
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the quest."
                    />
                  </label>
                                    {sendError && (
                    <p className="form-error" role="alert">
                      {sendError}
                    </p>
                  )}
                  <button
                    className="pixel-btn primary"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "SENDING..." : "SEND QUEST"}{" "}
                    <PixelIcon name="arrow" />
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
