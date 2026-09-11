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

type RailItem = {
  title: string;
  meta: string;
  glyph: string;
  accent: "cyan" | "pink" | "acid" | "orange";
  href?: string;
  art?: string;
  soon?: boolean;
};

type Rail = {
  key: string;
  label: string;
  note: string;
  tone: "cyan" | "pink" | "acid";
  reverse?: boolean;
  speed: number;
  items: RailItem[];
};

const RAILS: Rail[] = [
  {
    key: "latest",
    label: "Latest drops",
    note: "freshly pushed to the archive",
    tone: "cyan",
    speed: 42,
    items: [
      { title: "Quran Explorer", meta: "Applet", glyph: "✦", accent: "cyan", href: "Quran Explorer.html" },
      { title: "Qatar Prayers", meta: "Applet", glyph: "◍", accent: "acid", href: "Qatar Prayers.html" },
      { title: "Reaction Test", meta: "Game", glyph: "⚡", accent: "pink", href: "reactin inf.html", art: featureReaction },
      { title: "Simon", meta: "Game", glyph: "◉", accent: "orange", href: "simon_fruit.html" },
      { title: "BN Dictionary", meta: "Applet", glyph: "⌘", accent: "cyan", href: "app.html" },
      { title: "Weather v1.1", meta: "Applet", glyph: "☁", accent: "acid", href: "Weather v1.1.html" },
      { title: "Word Scramble", meta: "Guessing", glyph: "⁙", accent: "pink", href: "June Chalenge and Extras/word scramble By A.K..html" },
    ],
  },
  {
    key: "popular",
    label: "Most popular",
    note: "the ones everyone opens first",
    tone: "pink",
    reverse: true,
    speed: 52,
    items: [
      { title: "Car Game", meta: "Game · #1", glyph: "◈", accent: "pink", href: "Car Game.html", art: featureRace },
      { title: "Tetris", meta: "Game · #2", glyph: "▤", accent: "cyan", href: "tetris.html", art: featureTetris },
      { title: "Chess", meta: "Game · #3", glyph: "♞", accent: "acid", href: "chess.html" },
      { title: "2048", meta: "Game · #4", glyph: "⧉", accent: "orange", href: "June Chalenge and Extras/2048 By A.K. v 1.1.html" },
      { title: "Snake Game", meta: "Game · #5", glyph: "〜", accent: "cyan", href: "snake game new.html" },
      { title: "Space Invaders", meta: "Game · #6", glyph: "☄", accent: "pink", href: "Space Invaders.html" },
      { title: "Typing Test", meta: "Applet · #7", glyph: "⌨", accent: "acid", href: "sptyping test.html" },
    ],
  },
  {
    key: "upcoming",
    label: "Upcoming",
    note: "in the workshop, not live yet",
    tone: "acid",
    speed: 46,
    items: [
      { title: "Neon Pinball", meta: "Concept", glyph: "◎", accent: "pink", soon: true },
      { title: "Maze Runner", meta: "Prototype", glyph: "⌗", accent: "cyan", soon: true },
      { title: "Sudoku Solver", meta: "In progress", glyph: "▦", accent: "acid", soon: true },
      { title: "Flashcards", meta: "Planned", glyph: "❐", accent: "orange", soon: true },
      { title: "Physics Sandbox", meta: "Concept", glyph: "◌", accent: "cyan", soon: true },
      { title: "Rhythm Tap", meta: "Prototype", glyph: "♪", accent: "pink", soon: true },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.links.length, 0);

const url = (path: string) => BASE + encodeURI(path);

const ACCENT: Record<RailItem["accent"], { text: string; border: string; shadow: string; glow: string }> = {
  cyan: {
    text: "text-neon-cyan",
    border: "hover:border-neon-cyan",
    shadow: "group-hover/card:shadow-[0_0_36px_color-mix(in_oklab,var(--neon-cyan)_35%,transparent)]",
    glow: "var(--neon-cyan)",
  },
  pink: {
    text: "text-neon-pink",
    border: "hover:border-neon-pink",
    shadow: "group-hover/card:shadow-[0_0_36px_color-mix(in_oklab,var(--neon-pink)_35%,transparent)]",
    glow: "var(--neon-pink)",
  },
  acid: {
    text: "text-acid",
    border: "hover:border-acid",
    shadow: "group-hover/card:shadow-[0_0_36px_color-mix(in_oklab,var(--acid)_35%,transparent)]",
    glow: "var(--acid)",
  },
  orange: {
    text: "text-neon-orange",
    border: "hover:border-neon-orange",
    shadow: "group-hover/card:shadow-[0_0_36px_color-mix(in_oklab,var(--neon-orange)_35%,transparent)]",
    glow: "var(--neon-orange)",
  },
};

const TONE: Record<Rail["tone"], string> = {
  cyan: "text-neon-cyan",
  pink: "text-neon-pink",
  acid: "text-acid",
};

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
      { rootMargin: "-6% 0px -10% 0px" },
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

function RailCard({ item }: { item: RailItem }) {
  const a = ACCENT[item.accent];
  const inner = (
    <>
      <div className="relative h-[112px] overflow-hidden border-b border-border">
        {item.art ? (
          <img
            src={item.art}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover/card:scale-110 group-hover/card:opacity-100"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-500 group-hover/card:scale-110"
            style={{
              background: `radial-gradient(circle at 30% 25%, color-mix(in oklab, ${a.glow} 30%, transparent), transparent 62%), linear-gradient(140deg, var(--secondary), var(--background))`,
            }}
          />
        )}
        <span
          className={`absolute inset-0 grid place-items-center text-4xl ${a.text} drop-shadow-[0_0_18px_currentColor] transition-transform duration-500 group-hover/card:-translate-y-1`}
        >
          {item.glyph}
        </span>
        {item.soon && (
          <span className="absolute left-2 top-2 skew-tag border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            soon
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-extrabold tracking-[-0.01em]">{item.title}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {item.meta}
          </div>
        </div>
        <span className={`font-mono text-sm ${item.soon ? "text-muted-foreground" : a.text}`}>
          {item.soon ? "···" : "↗"}
        </span>
      </div>
    </>
  );

  const cls = `group/card block w-[230px] shrink-0 border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 ${a.border} ${a.shadow} ${
    item.soon ? "opacity-70 hover:opacity-100" : "hover:-translate-y-1.5"
  }`;

  if (!item.href) return <div className={cls}>{inner}</div>;
  return (
    <a className={cls} href={url(item.href)} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

function MobileRail({ rail }: { rail: Rail }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const speed = 26; // px per second
    const dir = rail.reverse ? -1 : 1;

    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!paused.current) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + dir * speed * dt;
        if (next >= half) next -= half;
        if (next < 0) next += half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      window.setTimeout(() => (paused.current = false), 2500);
    };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("pointerup", resume, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resume);
    };
  }, [rail.reverse]);

  const row = [...rail.items, ...rail.items];
  return (
    <div
      ref={ref}
      className="relative flex w-full gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {row.map((item, i) => (
        <RailCard key={`${rail.key}-m-${item.title}-${i}`} item={item} />
      ))}
    </div>
  );
}

function AutoRail({ rail }: { rail: Rail }) {
  const row = [...rail.items, ...rail.items];
  const isMobile = useIsMobile();
  return (
    <div className="group/rail py-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`h-2 w-2 rotate-45 ${TONE[rail.tone].replace("text-", "bg-")} shadow-[0_0_14px_currentColor]`} />
          <h2 className={`font-mono text-[11px] uppercase tracking-[0.24em] ${TONE[rail.tone]}`}>
            {rail.label}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {rail.note}
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground opacity-0 transition-opacity group-hover/rail:opacity-100 md:inline">
          hover to pause
        </span>
      </div>
      {isMobile ? (
        <MobileRail rail={rail} />
      ) : (
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <div
            className={`flex w-max gap-4 ${rail.reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/rail:[animation-play-state:paused]`}
            style={{ animationDuration: `${rail.speed}s` }}
          >
            {row.map((item, i) => (
              <RailCard key={`${rail.key}-${item.title}-${i}`} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function Index() {
  const scrollY = useScrollY();
  const progress = useScrollProgress();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Games");
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

  const term = query.trim().toLowerCase();

  const rows = useMemo(() => {
    const source = term
      ? GROUPS.flatMap((g) => g.links.map(([label, path]) => ({ label, path, group: g.name })))
      : (GROUPS.find((g) => g.name === active)?.links ?? []).map(([label, path]) => ({
          label,
          path,
          group: active,
        }));
    return source.filter(({ label }) => !term || label.toLowerCase().includes(term));
  }, [term, active]);

  return (
    <div className="grain-overlay relative min-h-screen overflow-x-hidden bg-background font-display text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 82% 8%, color-mix(in oklab, var(--neon-pink) 18%, transparent), transparent 32%), radial-gradient(circle at 8% 58%, color-mix(in oklab, var(--neon-cyan) 15%, transparent), transparent 30%), radial-gradient(circle at 60% 96%, color-mix(in oklab, var(--acid) 10%, transparent), transparent 28%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          transform: `translateY(${-(scrollY * 0.1)}px) skewY(-1deg)`,
        }}
      />

      <div className="fixed inset-x-0 top-0 z-50 h-[3px]">
        <div
          className="h-full origin-left bg-acid shadow-[0_0_18px_var(--acid)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] w-[min(1320px,calc(100%-36px))] items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <span className="skew-tag grid h-8 w-8 place-items-center bg-acid font-mono text-xs text-acid-foreground shadow-[5px_5px_0_var(--neon-pink)]">
              {"</>"}
            </span>
            <span className="text-[13px] font-extrabold uppercase tracking-[0.09em]">
              HTML Creations <span className="text-neon-cyan">/ Signal Lab</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-acid sm:block">
              {clock.time}
            </span>
            <a
              href="#directory"
              className="skew-tag border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all hover:border-neon-cyan hover:text-neon-cyan"
            >
              Index ({TOTAL})
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — offset editorial slab */}
        <section className="relative overflow-hidden border-b border-border">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-[420px] w-[420px] animate-orbit rounded-full border border-neon-cyan/60 opacity-40"
          />
          <div className="mx-auto grid w-[min(1320px,calc(100%-36px))] items-end gap-8 py-14 lg:grid-cols-[1fr_auto] lg:py-20">
            <div className="relative">
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan">
                <span className="h-px w-9 bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)]" />
                {TOTAL} projects · one archive · zero frameworks
              </p>
              <h1 className="text-[clamp(2.7rem,9vw,7.2rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.075em]">
                <span
                  className="block"
                  style={{ transform: `translateX(${Math.min(scrollY * 0.05, 60)}px)` }}
                >
                  Signal
                </span>
                <span
                  className="text-glow-pink block text-neon-pink"
                  style={{ transform: `translateX(${-Math.min(scrollY * 0.07, 90)}px)` }}
                >
                  Lab
                </span>
                <span
                  className="text-glow-cyan block text-neon-cyan"
                  style={{ transform: `translateX(${Math.min(scrollY * 0.1, 130)}px)` }}
                >
                  Live.
                </span>
              </h1>
              <p className="mt-7 max-w-[440px] text-[15px] leading-[1.75] text-muted-foreground">
                Games, tools, quizzes and experiments — all built by hand with plain HTML, CSS and
                JavaScript. Everything below opens instantly in your browser.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:w-[300px]">
              <div className="relative overflow-hidden border border-border bg-card/60 p-5 backdrop-blur-sm">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-0 h-full w-px animate-scan bg-gradient-to-b from-transparent via-neon-pink to-transparent"
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Local signal · Doha, Qatar
                </div>
                <div className="text-glow-acid mt-2 font-mono text-[34px] tracking-[-0.06em] text-acid">
                  {clock.time}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{clock.date}</div>
              </div>
              <div className="flex gap-3">
                <a
                  href={url("Car Game.html")}
                  target="_blank"
                  rel="noopener"
                  className="skew-tag flex-1 bg-acid px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-acid-foreground transition-all hover:shadow-[0_0_28px_var(--acid)]"
                >
                  Play featured ↗
                </a>
                <a
                  href="#directory"
                  className="skew-tag flex-1 border border-border px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] transition-all hover:border-neon-pink hover:text-neon-pink"
                >
                  Browse all
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AUTO-SCROLLING RAILS */}
        <section className="border-b border-border">
          <div className="mx-auto w-[min(1320px,calc(100%-36px))] divide-y divide-border">
            {RAILS.map((rail, i) => (
              <Reveal key={rail.key} delay={i * 90}>
                <AutoRail rail={rail} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* DIRECTORY — sidebar + list */}
        <section id="directory" className="mx-auto w-[min(1320px,calc(100%-36px))] py-16">
          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-border pb-6">
              <div>
                <h2 className="text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em]">
                  The full <span className="text-neon-cyan">index</span>
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {rows.length} shown · {TOTAL} total
                </p>
              </div>
              <div className="relative w-full max-w-[330px]">
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search every project…"
                  className="w-full border border-border bg-card/60 px-4 py-3 pr-14 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-neon-cyan"
                />
                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
                  /
                </kbd>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[230px_1fr]">
            <aside className="lg:sticky lg:top-[96px] lg:self-start">
              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {GROUPS.map((g) => {
                  const on = !term && g.name === active;
                  return (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActive(g.name);
                      }}
                      className={`flex shrink-0 items-center justify-between gap-4 border px-4 py-3 text-left transition-all lg:w-full ${
                        on
                          ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[0_0_24px_color-mix(in_oklab,var(--neon-cyan)_22%,transparent)]"
                          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                        {g.icon} {g.name}
                      </span>
                      <span className="font-mono text-[10px] opacity-70">
                        {String(g.links.length).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
              {!term && (
                <p className="mt-4 hidden max-w-[210px] text-xs leading-relaxed text-muted-foreground lg:block">
                  {GROUPS.find((g) => g.name === active)?.desc}
                </p>
              )}
            </aside>

            <div className="border-t border-border">
              {rows.map((row, i) => (
                <Reveal key={`${row.group}-${row.label}`} delay={Math.min(i * 35, 320)}>
                  <a
                    href={url(row.path)}
                    target="_blank"
                    rel="noopener"
                    className="group/row flex items-center gap-4 border-b border-border px-2 py-5 transition-all hover:bg-neon-cyan/5 hover:pl-5 sm:gap-6"
                  >
                    <span className="font-mono text-[11px] text-muted-foreground transition-colors group-hover/row:text-neon-pink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[clamp(1rem,2.4vw,1.5rem)] font-extrabold uppercase tracking-[-0.03em] transition-colors group-hover/row:text-neon-cyan">
                      {row.label}
                    </span>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
                      {row.group}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:text-acid">
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
              {rows.length === 0 && (
                <div className="border border-dashed border-border px-5 py-20 text-center text-muted-foreground">
                  <strong className="block text-foreground">No signal found.</strong>
                  Try a different query.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[min(1320px,calc(100%-36px))] flex-wrap justify-between gap-4 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
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
