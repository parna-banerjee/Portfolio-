import { useState, type CSSProperties, type ReactNode } from "react"

type SkillGroup = { title: string; items: string[][] }

/* 1 = filled pixel. Each glyph is hand-drawn on a tiny grid. */
const CODE = [
  "...#...............#....#...",
  "..#..............#.......#..",
  ".#.............#..........#.",
  "#............#.............#",
  ".#.........#..............#.",
  "..#......#...............#..",
  "...#....#...............#...",
]
const BLOCKS = [
  "####.####",
  "####.####",
  "####.####",
  ".........",
  "####.####",
  "####.####",
  "####.####",
]
const DB = [
  ".#######.",
  "#########",
  ".#######.",
  ".........",
  ".#######.",
  "#########",
  ".#######.",
  ".........",
  ".#######.",
  "#########",
  ".#######.",
]
const HAMMER = [
  ".#######.",
  "#########",
  "#########",
  ".#######.",
  "...###...",
  "...###...",
  "...###...",
  "...###...",
  "...###...",
]
const BINARY = [
  ".##...#.",
  "#..#.##.",
  "#..#..#.",
  "#..#..#.",
  ".##..###",
]

/* x / y are percentages of the tree area. */
const META: Record<
  string,
  { glyph: string[]; color: string; x: number; y: number }
> = {
  Languages: { glyph: CODE, color: "var(--teal)", x: 50, y: 13 },
  Frameworks: { glyph: BLOCKS, color: "var(--pink)", x: 87, y: 41 },
  Databases: { glyph: DB, color: "var(--yellow)", x: 73, y: 86 },
  Tools: { glyph: HAMMER, color: "var(--lilac)", x: 27, y: 86 },
  "CS Fundamentals": { glyph: BINARY, color: "var(--pink)", x: 13, y: 41 },
}

function Glyph({ rows }: { rows: string[] }) {
  const w = rows[0].length
  return (
    <svg
      className="glyph"
      viewBox={`0 0 ${w} ${rows.length}`}
      style={{ "--w": w } as CSSProperties}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  )
}

export default function SkillTree({
  skills,
  hub,
}: {
  skills: SkillGroup[]
  hub: ReactNode
}) {
  const [active, setActive] = useState<string | null>(null)
  const groups = skills.filter((g) => META[g.title])
  const current = groups.find((g) => g.title === active) ?? null
  const currentMeta = current ? META[current.title] : null

  
      return (
    <div className="reveal">
    <div
      className={`skill-console pixel-card ${current ? "has-active" : ""}`}
      onKeyDown={(e) => e.key === "Escape" && setActive(null)}
    >
      <div className="skill-side">
        <div className="skill-side-inner" aria-live="polite">
          {current && currentMeta && (
            <article
              className="skill-detail"
              id="skill-detail"
              key={current.title}
              style={{ "--c": currentMeta.color } as CSSProperties}
            >
              <header>
                <span className="skill-detail-glyph">
                  <Glyph rows={currentMeta.glyph} />
                </span>
                <div>
                  <small>
                    CLASS {groups.indexOf(current) + 1}/{groups.length}
                  </small>
                  <h3>{current.title}</h3>
                </div>
                <button
                  type="button"
                  className="skill-close"
                  aria-label="Close class details"
                  onClick={() => setActive(null)}
                >
                  X
                </button>
              </header>
              <p className="skill-count">
                {current.items.length} SKILLS UNLOCKED
              </p>
              <ul>
                                {current.items.map(([name], i) => (
                  <li key={name} style={{ "--i": i } as CSSProperties}>
                    {name}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
      </div>
      

      <div className="skill-stage">
        <p className="skill-bar">
          <span>SELECT CLASS</span>
          <span className={current ? "" : "blink"}>
            {current ? current.title : "PRESS A NODE_"}
          </span>
        </p>
        <div className="skill-tree">
          <svg
            className="skill-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {groups.map((g) => (
              <line
                key={g.title}
                x1="50"
                y1="50"
                x2={META[g.title].x}
                y2={META[g.title].y}
                className={g.title === active ? "on" : ""}
                style={{ "--c": META[g.title].color } as CSSProperties}
              />
            ))}
          </svg>

                    <button
            type="button"
            className="skill-hub"
            aria-label="Tech stack. Close the open class and recenter the tree"
            title={current ? "Back to the full tree" : undefined}
            onClick={() => setActive(null)}
          >
            <span aria-hidden="true">{hub}</span>
            <span>TECH STACK</span>
          </button>

          {groups.map((g) => {
            const m = META[g.title]
            const on = g.title === active
            return (
              <button
                type="button"
                key={g.title}
                className={`skill-node ${on ? "on" : ""}`}
                style={
                  {
                    left: `${m.x}%`,
                    top: `${m.y}%`,
                    "--c": m.color,
                  } as CSSProperties
                }
                aria-pressed={on}
                aria-controls={on ? "skill-detail" : undefined}
                onClick={() => setActive(on ? null : g.title)}
              >
                <Glyph rows={m.glyph} />
                <span>{g.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
    </div>
  )
}