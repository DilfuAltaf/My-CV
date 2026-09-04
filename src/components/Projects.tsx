"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { FiGithub } from "react-icons/fi";

type Project = {
  id: number;
  title: string;
  short_description: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  thumbnail_url?: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Qifaya",
    short_description:
      "A comprehensive, full-stack commercial web application tailored for professional business operations. Features a robust Next.js frontend and a NestJS backend architecture, complete with a fully functional admin dashboard.",
    technologies: ["Next.js", "NestJS", "Tailwind CSS"],
    live_url: "https://qifaya.vercel.app/",
    thumbnail_url: "/project/qifaya.png",
  },
  {
    id: 2,
    title: "SmartGadget Hub",
    short_description:
      "A responsive frontend e-commerce application focused on electronic gadgets, built with Vue.js and Tailwind CSS. It features a seamless user interface with efficient state management and cart functionality.",
    technologies: ["Vue.js", "Tailwind CSS"],
    live_url: "https://smartgadget-hub.vercel.app/",
    thumbnail_url: "/project/smartGadget.png",
  },
  {
    id: 3,
    title: "Perpustakaan Mini",
    short_description:
      "A lightweight digital library management system built with Next.js. Developed as an academic project, it demonstrates proficiency in React-based frameworks and modern web application structuring.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    live_url: "https://pespustakaan-mini-dilfu.vercel.app/",
    thumbnail_url: "/project/perpusMini.png",
  },
  {
    id: 4,
    title: "Bali Tour",
    short_description:
      "An interactive tourism promotional website showcasing destinations in Bali. Built with Vue.js and Tailwind CSS to deliver dynamic content rendering and engaging user interactions.",
    technologies: ["Vue.js", "Tailwind CSS"],
    live_url: "https://bali-tour-eta.vercel.app/",
    thumbnail_url: "/project/baliTour.png",
  },
  {
    id: 5,
    title: "Plant Shop",
    short_description:
      "A visually appealing landing page for a boutique plant shop. This project focuses on modern UI/UX design principles, leveraging Tailwind CSS to create a fully responsive, utility-first layout.",
    technologies: ["Tailwind CSS", "HTML"],
    live_url: "https://plant-shop-dilfu.vercel.app/",
    thumbnail_url: "/project/platShop.png",
  },
  {
    id: 6,
    title: "Web Coffee Shop",
    short_description:
      "A sleek and modern web interface for a coffee shop, developed using Vue.js. The project emphasizes component-based architecture and responsive design to provide an inviting digital storefront.",
    technologies: ["Vue.js", "Tailwind CSS"],
    live_url: "https://web-coffe-shop.vercel.app/home",
    thumbnail_url: "/project/cafeDeAroma.png",
  },
  {
    id: 7,
    title: "SMK Madinatul Quran",
    short_description:
      "An informational school profile website. Designed with semantic HTML and custom CSS to deliver a clean, accessible, and structured presentation of the institution's academic programs and facilities.",
    technologies: ["HTML", "CSS"],
    live_url: "https://smk-madinatulquran-by-dilfu.vercel.app/",
    thumbnail_url: "/project/mq.png",
  },
];

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (carouselRef.current) {
        const range =
          carouselRef.current.scrollWidth -
          carouselRef.current.offsetWidth;

        setScrollRange(Math.max(0, range));
      }
    };

    updateScrollRange();

    window.addEventListener("resize", updateScrollRange);

    return () => {
      window.removeEventListener("resize", updateScrollRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  /*
   * =========================================================
   * TITLE ANIMATION
   * =========================================================
   *
   * Awal:
   * - Center
   * - Besar
   * - Opacity 0
   *
   * Setelah masuk:
   * - Fade in
   * - Mengecil
   * - Bergerak ke kiri
   *
   * Akhir:
   * - TETAP terlihat
   * - Tidak fade out
   */

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [2.5, 1]
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["10vh", "0vh"]
  );

  /*
   * Mulai dari tengah layar.
   *
   * left: 50%
   * x: -50%
   *
   * = posisi benar-benar center.
   *
   * Kemudian bergerak ke posisi normal kiri.
   */
  const titleLeft = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["50%", "0%"]
  );

  const titleX = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["-50%", "0%"]
  );

  /*
   * =========================================================
   * CAROUSEL ANIMATION
   * =========================================================
   *
   * Project mulai muncul dengan fade-in.
   *
   * Setelah opacity mencapai 1:
   * opacity TIDAK PERNAH TURUN LAGI.
   *
   * Horizontal scroll:
   * 15% -> mulai geser
   * 75% -> selesai di project terakhir
   * 75% -> 100% tetap di project terakhir
   */

  const carouselOpacity = useTransform(
    scrollYProgress,
    [0.10, 0.18],
    [0, 1]
  );

  const carouselY = useTransform(
    scrollYProgress,
    [0.10, 0.18],
    ["30px", "0px"]
  );

  const carouselX = useTransform(
    scrollYProgress,
    [0.18, 0.75],
    [0, -scrollRange]
  );

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative h-[250vh] bg-background"
    >
      {/* Sticky Container */}
      <div
        className="
          sticky
          top-0
          h-screen
          flex
          flex-col
          justify-center
          overflow-hidden
          pt-20
          px-4
          sm:px-6
          lg:px-8
          max-w-7xl
          mx-auto
          w-full
          relative
        "
      >
        {/* =====================================================
            TITLE
        ====================================================== */}

        <motion.div
          style={{
            opacity: titleOpacity,
            scale: titleScale,
            y: titleY,
            left: titleLeft,
            x: titleX,
            transformOrigin: "center center",
          }}
          className="
    z-20
    absolute
    top-20
    w-max
    pointer-events-none
  "
        >
          <h2
            className="
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-bold
              text-foreground
              whitespace-nowrap
            "
          >
            This is my project!
          </h2>
        </motion.div>

        {/* =====================================================
            HORIZONTAL CAROUSEL
        ====================================================== */}

        <motion.div
          ref={carouselRef}
          style={{
            opacity: carouselOpacity,
            y: carouselY,
          }}
          className="
            w-full
            h-[60vh]
            mt-24
            overflow-hidden
            relative
          "
        >
          <motion.div
            style={{
              x: carouselX,
            }}
            className="
              flex
              items-center
              gap-6
              md:gap-8
              w-max
              h-full
            "
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="
                  w-[85vw]
                  sm:w-[400px]
                  h-[480px]
                  shrink-0
                  group
                  flex
                  flex-col
                  bg-card
                  border
                  border-border
                  rounded-3xl
                  overflow-hidden

                  shadow-[0_10px_30px_rgba(0,0,0,0.06)]

                  transition-all
                  duration-500
                  ease-out

                  hover:-translate-y-2
                  hover:border-primary
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                "
              >
                {/* =================================================
                    THUMBNAIL
                ================================================== */}

                <div
                  className="
                    h-56
                    w-full
                    bg-border/50
                    relative
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <Folder
                      size={64}
                      className="
                        text-foreground
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />
                  )}

                  {/* Thumbnail Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/5
                      dark:group-hover:bg-white/5
                      transition-colors
                      duration-500
                      pointer-events-none
                    "
                  />
                </div>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Title + Links */}
                  <div className="flex justify-between items-start mb-4">
                    <h3
                      className="
                        text-xl
                        font-bold
                        text-foreground
                        group-hover:text-primary
                        transition-colors
                        duration-300
                      "
                    >
                      {project.title}
                    </h3>

                    <div className="flex space-x-3 text-secondary-text">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            transition-all
                            duration-300
                            hover:text-primary
                            hover:-translate-y-1
                          "
                        >
                          <FiGithub size={20} />
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            transition-all
                            duration-300
                            hover:text-primary
                            hover:-translate-y-1
                          "
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="
                      text-secondary-text
                      text-sm
                      mb-6
                      flex-grow
                      leading-relaxed
                    "
                  >
                    {project.short_description}
                  </p>

                  {/* =================================================
                      TECHNOLOGIES
                  ================================================== */}

                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="
                              px-3
                              py-1
                              bg-primary/10
                              text-primary
                              text-xs
                              font-bold
                              rounded-full

                              transition-all
                              duration-300

                              group-hover:bg-primary/15
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}