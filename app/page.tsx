"use client";

import "@/styles/layout.css";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import {
  AntdesignIcon,
  BunIcon,
  EslintIcon,
  HuskyIcon,
  LucideReactIcon,
  NextjsIcon,
  PrettierIcon,
  ReactIcon,
  TailwindCssIcon,
  TypeScriptIcon,
} from "components/icon/logo";
import { useEventListener } from "hooks/use-event-listner";
import {
  Clipboard,
  ClipboardCheck,
  FlameKindling,
  Github,
  Mouse,
  MoveUpRight,
} from "lucide-react";

type Feature = {
  title: string;
  logo: () => JSX.Element;
  description: string;
  link: string;
};

const features: Feature[] = [
  {
    title: "Next.js",
    logo: NextjsIcon,
    description: "The React Framework for Production.",
    link: "https://nextjs.org/",
  },
  {
    title: "React 18",
    logo: ReactIcon,
    description: "JavaScript library for building user interfaces.",
    link: "https://reactjs.org/",
  },
  {
    title: "TypeScript",
    logo: TypeScriptIcon,
    description:
      "Strongly typed programming language that builds on JavaScript.",
    link: "https://www.typescriptlang.org/",
  },
  {
    title: "TailwindCSS",
    logo: TailwindCssIcon,
    description: "A utility-first CSS framework packed with classes.",
    link: "https://tailwindcss.com/",
  },
  {
    title: "Ant Design",
    logo: AntdesignIcon,
    description: "A UI Design Language and React UI library.",
    link: "https://ant.design/",
  },
  {
    title: "ESLint",
    logo: EslintIcon,
    description: "Find and fix problems in your JavaScript code.",
    link: "https://eslint.org/",
  },
  {
    title: "Prettier",
    logo: PrettierIcon,
    description: "An opinionated code formatter.",
    link: "https://prettier.io/",
  },
  {
    title: "Husky",
    logo: HuskyIcon,
    description: "Git hooks made easy. (lint-staged, commitlint)",
    link: "https://github.com/typicode/husky",
  },
  {
    title: "Bun",
    logo: BunIcon,
    description: "Bun is a fast JavaScript all-in-one toolkit",
    link: "https://bun.sh",
  },
];

const packageManagers = {
  bun: "bunx",
  pnpm: "pnpx",
  npm: "npx",
  yarn: "yarn dlx",
};

type PackageManagers = keyof typeof packageManagers;

const Home = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const dropdownButtonsRef = useRef<HTMLButtonElement[]>([]);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  // close dropdown on ESC key press
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setShowDropdown(false);
  });

  // dropdown up and down arrow key navigation
  useEventListener("keydown", (e) => {
    if (!showDropdown) return;
    e.preventDefault();

    if (e.key === "ArrowDown") {
      const curr = dropdownButtonsRef.current.findIndex(
        (el) => el === document.activeElement
      );
      const next = curr + 1;

      if (next < dropdownButtonsRef.current.length) {
        dropdownButtonsRef.current[next].focus();
      } else {
        dropdownButtonsRef.current[0].focus();
      }
    }

    if (e.key === "ArrowUp") {
      const curr = dropdownButtonsRef.current.findIndex(
        (el) => el === document.activeElement
      );
      const prev = curr - 1;

      if (prev >= 0) {
        dropdownButtonsRef.current[prev].focus();
      } else {
        dropdownButtonsRef.current[
          dropdownButtonsRef.current.length - 1
        ].focus();
      }
    }
  });

  // copy on Enter key press
  useEventListener("keydown", (e) => {
    if (!showDropdown) return;
    e.preventDefault();

    if (e.key === "Enter") {
      const currentIndex = dropdownButtonsRef.current.findIndex(
        (el) => el === document.activeElement
      );
      copyToClipboard(
        Object.keys(packageManagers)[currentIndex] as PackageManagers
      );
    }
  });

  useEffect(() => {
    cardWrapperRef.current!.onmousemove = (e) => {
      for (const card of cardsRef.current) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }, []);

  const copyToClipboard = (pm: PackageManagers) => {
    setShowDropdown(false);
    setIsCopied(true);

    const text = `${packageManagers[pm]} degit liaoyio/nextjs-template <project-name>`;

    try {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-zinc-300 selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-24 lg:pt-32 xl:pt-48">
        <Image
          src="/nextjs-light.svg"
          alt="Next.js logo"
          height={150}
          width={150}
          className="mx-auto mb-6 max-w-[100px] md:max-w-full"
        />

        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="mb-6 space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-2 text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
                Next.js Starter Template
              </h1>

              <p className="mx-auto max-w-3xl text-sm text-zinc-200 sm:text-base md:text-xl">
                A Next.js template with TypeScript, TailwindCSS, Lucide Icons
                and pre-configured with ESLint, Prettier and Husky git hooks.
              </p>
            </div>

            <div className="relative mx-auto max-w-xs rounded-xl border border-zinc-700 p-1 text-zinc-200 shadow-md duration-300 hover:shadow-black sm:max-w-full">
              <p className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-white/5 px-2 py-3 font-mono hover:bg-white/10">
                <span className="text-orange-500">$</span>

                <span className="truncate">
                  bunx degit liaoyio/nextjs-template {"<project-name>"}
                </span>

                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  {isCopied ? (
                    <ClipboardCheck className="h-5 w-5" />
                  ) : (
                    <Clipboard className="h-5 w-5" />
                  )}
                </button>
              </p>

              {showDropdown && (
                <div className="absolute -right-20 top-8 z-10 rounded-xl border border-zinc-700 p-1 hover:border-zinc-600">
                  <ul className="sticky flex flex-col rounded-md bg-zinc-800">
                    {(Object.keys(packageManagers) as PackageManagers[]).map(
                      (pm, i) => (
                        <button
                          key={i}
                          ref={(el) => {
                            dropdownButtonsRef.current[i] = el!;
                          }}
                          onClick={() => copyToClipboard(pm)}
                          className="m-0.5 w-20 cursor-pointer rounded-md px-3 py-0.5 outline-none ring-zinc-600 hover:bg-zinc-700/50 hover:text-green-500 focus:ring-2"
                        >
                          {pm}
                        </button>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <a
                href="https://github.com/new?template_name=nextjs-template&template_owner=liaoyio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              >
                <FlameKindling className="mr-2 h-5 w-5" />
                Use Template
              </a>

              <a
                href="https://github.com/liaoyio/nextjs-template"
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              >
                <Github className="mr-2 h-5 w-5 " />
                View Repo
              </a>
            </div>
          </div>
        </div>
      </section>

      <button
        className="mx-auto flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
        onClick={() =>
          featuresRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <Mouse strokeWidth={1} className="h-10 w-10" />
      </button>

      <section ref={featuresRef} className="container mx-auto mt-10">
        <h2 className="mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-xl font-bold tracking-tight text-transparent sm:text-3xl xl:text-4xl">
          Features
        </h2>

        <div
          ref={cardWrapperRef}
          className="cards grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <a
              key={i}
              ref={(el) => (cardsRef.current![i] = el!)}
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group relative h-48 w-full rounded-xl bg-zinc-800 shadow-md shadow-black outline-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 hover:shadow-xl hover:shadow-black hover:before:opacity-100"
            >
              <div className="absolute inset-[1px] z-[2] flex flex-col gap-2.5 rounded-xl bg-black/75 p-2.5">
                <div className="relative h-full w-full overflow-hidden rounded-md p-4">
                  <div className="mb-3.5 h-14 w-14">{<f.logo />}</div>

                  <h3 className="text-xl">
                    <div className="flex h-full w-full items-center after:absolute after:inset-0">
                      {f.title}

                      <MoveUpRight
                        strokeWidth={0.75}
                        className="ml-1 h-4 w-4 text-white"
                      />
                    </div>
                  </h3>

                  <p className="mt-2 text-sm text-gray-300 group-hover:text-white">
                    {f.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-20 flex justify-center gap-2 pb-6">
        <Button>按钮</Button>
        <Button type="primary">Button</Button>
        <Button type="primary"> Create Next App </Button>
      </div>

      <footer className="container mt-10 grid place-items-center pb-4 text-neutral-400">
        <span className="flex items-center gap-1">
          &copy;
          <span>{new Date().getFullYear()}</span>
          <a
            href="https://github.com/liaoyio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 duration-200 hover:text-white hover:underline"
          >
            liaoyio@github
          </a>
        </span>
      </footer>
    </main>
  );
};

export default Home;
