import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import featureRace from "@/assets/feature-race.jpg";
import featureReaction from "@/assets/feature-reaction.jpg";
import featureTetris from "@/assets/feature-tetris.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HTML Creations / Signal Lab — Games, Tools & Experiments" },
      {
        name: "description",
        content:
          "A live shelf of 32 browser games, tools, quizzes and experiments built with plain HTML, CSS and JavaScript. Enter the lab.",
      },
      { property: "og:title", content: "HTML Creations / Signal Lab" },
      {
        property: "og:description",
        content:
          "32 browser games, tools, quizzes and experiments built with plain HTML, CSS and JavaScript.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BASE = "https://24-25ht.github.io/HTML/";

type Group = {
  name: string;
  icon: string;
  desc: string;
  links: [string, string][];
};

const GROUPS: Group[] = [
  {
    name: "Applets",
    icon: "✦",
    desc: "Small tools for everyday use.",
    links: [
      ["Al-Quran", "Quran Explorer.html"],
      ["Qatar Prayers", "Qatar Prayers.html"],
      ["BN Dictionary", "app.html"],
      ["Random Picker", "Random Outcome.html"],
      ["Typing Test", "sptyping test.html"],
      ["Weather", "Weather v1.1.html"],
      ["World Clock", "digital clogk.html"],
      ["Calculator", "June Chalenge and Extras/Calculator By A.K. V 2.4.html"],
    ],
  },
  {
    name: "Games",
    icon: "⌁",
    desc: "Quick-play classics and experiments.",
    links: [
      ["Car Game", "Car Game.html"],
      ["Ping Pong", "ping pong new.html"],
      ["Chess", "chess.html"],
      ["BattleShip", "BattleShip.html"],
      ["Snake Game", "snake game new.html"],
      ["Tetris", "tetris.html"],
      ["Space Invaders", "Space Invaders.html"],
      ["Tug of War", "tug of war.html"],
      ["Memory Card Game", "Memory Card Games/Memory Cards Game 2/index.html"],
      ["2048", "June Chalenge and Extras/2048 By A.K. v 1.1.html"],
      ["Dots & Boxes", "June Chalenge and Extras/Dots & Boxes Games.html"],
      ["4 In a Row", "4 in a row.html"],
      ["Tic Tac Toe", "June Chalenge and Extras/Tic Tac Toe By A.K. 1.1.html"],
      ["Whack a Mole", "whack a mole.html"],
      ["Reaction Test", "reactin inf.html"],
      ["Simon", "simon_fruit.html"],
    ],
  },
  {
    name: "Guessing",
    icon: "?",
    desc: "A little logic, luck and deduction.",
    links: [
      ["Guess The Number", "guess the num.html"],
      ["Hangman", "Hangman Game/index.html"],
      ["Guess The Word", "June Chalenge and Extras/guess the word game by a.k..html"],
      ["Word Scramble", "June Chalenge and Extras/word scramble By A.K..html"],
    ],
  },
  {
    name: "Quizzes",
    icon: "◎",
    desc: "Test what you know.",
    links: [
      ["Prophet Childhood Quiz", "Prophet (S.) quiz.html"],
      ["Coding Quiz", "June Chalenge and Extras/Quiz By A.K..html"],
      ["Eid Al-Adha Quiz", "Eid Al-Adha Quiz By A.K. v 1.1.html"],
    ],
  },
  {
    name: "Pages",
    icon: "▤",
    desc: "A few useful pages to browse.",
    links: [["Recipe Pages", "Recipie pages.html"]],
  },
];

const FEATURED = [
  {
    status: "01 / popular now",
    title: "Neon Rush",
    copy: "The main event. A fast, bright arcade run through a tunnel of light.",
    cta: "Launch game",
    href: "Car Game.html",
    art: featureRace,
  },
  {
    status: "02 / reflex check",
    title: "Reaction Test",
    copy: "One tap, one number. Find out how fast your brain really is.",
    cta: "Try it",
    href: "reactin inf.html",
    art: featureReaction,
  },
  {
    status: "03 / endless stack",
    title: "Tetris",
    copy: "Blocks fall, lines clear, speed climbs. The classic, rebuilt in the browser.",
    cta: "Preview",
    href: "tetris.html",
    art: featureTetris,
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.links.length, 0);

const url = (path: string) => BASE + encodeURI(path);

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return y;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-8% 0px -12% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

function Ticker({ reverse = false }: { reverse?: boolean }) {
  const words = ["games", "tools", "quizzes", "experiments", "signal lab", "html · css · js"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-secondary/40 py-3">
      <div
        className={`flex w-max shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground"
          >
            {word}
            <i className="inline-block h-1.5 w-1.5 rotate-45 bg-acid shadow-[0_0_12px_var(--acid)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const scrollY = useScrollY();
  const progress = useScrollProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [clock, setClock] = useState({ time: "--:--:--", date: "" });
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock({
        time: new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Qatar",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now),
        date: new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Qatar",
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(now),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return GROUPS.map((group) => ({
      ...group,
      links: group.links.filter(
        ([label]) =>
          (!term || label.toLowerCase().includes(term)) &&
          (filter === "all" || group.name === filter),
      ),
    })).filter((group) => group.links.length > 0);
  }, [query, filter]);

  const shown = results.reduce((n, g) => n + g.links.length, 0);

  return (
    <div className="grain-overlay relative min-h-screen overflow-x-hidden bg-background font-display text-foreground">
      {/* ambient neon field */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 14%, color-mix(in oklab, var(--neon-pink) 16%, transparent), transparent 30%), radial-gradient(circle at 12% 62%, color-mix(in oklab, var(--neon-cyan) 14%, transparent), transparent 28%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${-(scrollY * 0.12)}px)`,
        }}
      />

      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full origin-left bg-acid shadow-[0_0_18px_var(--acid)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-[min(1240px,calc(100%-40px))] items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="skew-tag grid h-8 w-8 place-items-center bg-acid font-mono text-xs text-acid-foreground shadow-[5px_5px_0_var(--neon-pink)]">
              {"</>"}
            </span>
            <span className="text-[13px] font-extrabold uppercase tracking-[0.09em]">
              HTML Creations <span className="text-neon-cyan">/ Signal Lab</span>
            </span>
          </a>
          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
            <i className="h-1.5 w-1.5 animate-flicker rounded-full bg-acid shadow-[0_0_0_4px_color-mix(in_oklab,var(--acid)_14%,transparent),0_0_12px_var(--acid)]" />
            system online
          </span>
        </div>
      </header>

      <main className="mx-auto w-[min(1240px,calc(100%-40px))]">
        {/* HERO */}
        <section className="relative grid border-b border-border lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="relative py-16 lg:py-24 lg:pr-12">
            <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan">
              <span className="h-px w-9 bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)]" />
              Independent web experiments / 001
            </p>
            <h1
              className="max-w-[820px] text-[clamp(3rem,8.5vw,6.6rem)] font-extrabold leading-[0.86] tracking-[-0.075em]"
              style={{ transform: `translateY(${scrollY * -0.08}px)` }}
            >
              <span className="block">Useful things.</span>
              <span className="text-glow-cyan block text-neon-cyan">Made with</span>
              <span
                className="text-glow-pink block text-neon-pink"
                style={{ transform: `translateX(${Math.min(scrollY * 0.06, 70)}px)` }}
              >
                code.
              </span>
            </h1>
            <p className="mt-7 max-w-[460px] text-[15px] leading-[1.75] text-muted-foreground">
              A live shelf of small tools, games, quizzes and digital experiments. Enter the lab.
              Find something unexpected.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#directory"
                className="skew-tag bg-acid px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-acid-foreground transition-all hover:shadow-[0_0_28px_var(--acid)]"
              >
                Browse {TOTAL} projects
              </a>
              <a
                href={url("Car Game.html")}
                target="_blank"
                rel="noopener"
                className="skew-tag border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-all hover:border-neon-pink hover:text-neon-pink"
              >
                Play featured ↗
              </a>
            </div>
            <span className="absolute bottom-0 left-0 h-px w-2/3 bg-neon-pink shadow-[0_0_24px_var(--neon-pink)]" />
          </div>

          <aside className="relative flex flex-col justify-between gap-10 overflow-hidden border-t border-border py-10 lg:border-l lg:border-t-0 lg:pl-9">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-32 top-8 h-64 w-64 animate-orbit rounded-full border border-neon-pink shadow-[0_0_0_18px_color-mix(in_oklab,var(--neon-pink)_5%,transparent),0_0_40px_color-mix(in_oklab,var(--neon-pink)_25%,transparent)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-5 top-0 h-full w-px animate-scan bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
            />
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Index / <b className="font-normal text-acid">{String(TOTAL).padStart(3, "0")}</b>{" "}
              active projects
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Local signal · Doha, Qatar
              </div>
              <div className="text-glow-acid mt-2 font-mono text-[38px] tracking-[-0.06em] text-acid">
                {clock.time}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{clock.date}</div>
            </div>
            <p className="max-w-[230px] text-xs leading-[1.75] text-muted-foreground">
              <strong className="mb-2 block text-[13px] text-foreground">Keep exploring.</strong>
              Every project opens in a new tab. The collection is always in motion.
            </p>
          </aside>
        </section>

        <Ticker />

        {/* FEATURED */}
        <section className="py-16">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neon-pink">
                  Curated signal
                </p>
                <h2 className="text-2xl tracking-[-0.06em]">What's in rotation</h2>
              </div>
              <span className="font-mono text-[11px] uppercase text-muted-foreground">
                three picks
              </span>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {FEATURED.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <article className="aurora-bloom group relative flex h-full flex-col overflow-hidden border border-border bg-card shadow-[var(--shadow-neon)] transition-transform duration-500 hover:-translate-y-2">
                  <div className="relative z-10 overflow-hidden border-b border-border">
                    <img
                      src={item.art}
                      alt={`${item.title} artwork`}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="h-52 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-acid">
                        {item.status}
                      </span>
                      <h3 className="mt-3 text-[34px] leading-[0.95] tracking-[-0.07em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-[1.65] text-muted-foreground">
                        {item.copy}
                      </p>
                    </div>
                    <a
                      href={url(item.href)}
                      target="_blank"
                      rel="noopener"
                      className="mt-6 self-start bg-acid px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-acid-foreground transition-all hover:bg-neon-cyan hover:shadow-[0_0_22px_var(--neon-cyan)]"
                    >
                      {item.cta} ↗
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Ticker reverse />

        {/* DIRECTORY */}
        <section id="directory" className="scroll-mt-24 py-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <label className="relative w-full max-w-[620px] flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 w-[17px] -translate-y-1/2 text-neon-cyan"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the signal lab…"
                  autoComplete="off"
                  className="w-full border border-border bg-card py-4 pl-12 pr-16 text-foreground shadow-[inset_0_-2px_var(--neon-cyan)] outline-none transition-colors placeholder:text-muted-foreground focus:border-neon-cyan"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  /
                </span>
              </label>
              <span className="font-mono text-[11px] uppercase text-muted-foreground">
                {shown} {shown === 1 ? "project" : "projects"}
              </span>
            </div>

            <nav className="mt-6 flex flex-wrap gap-2">
              {["all", ...GROUPS.map((g) => g.name)].map((name) => (
                <button
                  key={name}
                  onClick={() => setFilter(name)}
                  className={`border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${
                    filter === name
                      ? "border-acid bg-acid text-acid-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--acid)_35%,transparent)]"
                      : "border-border text-muted-foreground hover:border-acid hover:text-acid"
                  }`}
                >
                  {name === "all" ? "All signals" : name}
                </button>
              ))}
            </nav>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {results.map((group, index) => (
              <Reveal key={group.name} delay={index * 90}>
                <article className="group relative h-full overflow-hidden border border-border bg-gradient-to-br from-card to-secondary shadow-[var(--shadow-neon)] transition-all duration-500 hover:-translate-y-1.5 hover:border-neon-cyan/60">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_45%,color-mix(in_oklab,var(--neon-cyan)_18%,transparent)_50%,transparent_55%)] transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <div className="flex items-start justify-between gap-4 border-b border-border p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center border border-acid/40 bg-acid/10 text-base text-acid">
                        {group.icon}
                      </span>
                      <div>
                        <h2 className="text-lg tracking-[-0.05em]">{group.name}</h2>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{group.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-neon-pink">
                      0{index + 1} / {String(group.links.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="grid gap-0.5 p-3 sm:grid-cols-2">
                    {group.links.map(([label, path]) => (
                      <a
                        key={label}
                        href={url(path)}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center justify-between gap-2 border-l border-transparent px-3 py-2.5 text-xs font-bold text-foreground transition-all hover:border-l-neon-cyan hover:bg-neon-cyan/8 hover:text-neon-cyan"
                      >
                        <span className="truncate">{label}</span>
                        <span className="font-mono text-sm text-muted-foreground transition-transform">
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {shown === 0 && (
            <div className="border border-dashed border-border px-5 py-20 text-center text-muted-foreground">
              <strong className="block text-foreground">No signal found.</strong>
              Try a different query or clear the current filter.
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto flex w-[min(1240px,calc(100%-40px))] flex-wrap justify-between gap-4 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        <span>HTML / CSS / JS · Signal Lab</span>
        <a
          href="https://github.com/24-25ht/HTML"
          target="_blank"
          rel="noopener"
          className="text-neon-cyan hover:text-glow-cyan"
        >
          Source archive ↗
        </a>
      </footer>
    </div>
  );
}
