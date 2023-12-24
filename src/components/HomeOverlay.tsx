"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

const HomeOverlay = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  useEffect(() => {
    setOption({
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 1,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#fff" : "#000",
        },
        links: {
          color: {
            value: theme === "dark" ? "#fff" : "#000",
          },
          distance: 200,
          enable: true,

          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    });
  }, [theme]);

  const [option, setOption] = useState<RecursivePartial<IOptions>>({
    fpsLimit: 120,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 1,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: theme === "dark" ? "#fff" : "#000",
      },
      links: {
        color: {
          value: theme === "dark" ? "#fff" : "#000",
        },
        distance: 200,
        enable: true,

        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },

      size: {
        value: { min: 1, max: 5 },
      },
    },

    pauseOnBlur: true,
    detectRetina: true,
  });
  return (
    <div className="relative -z-10 ">
      {init ? (
        <Particles id="tsparticles" className="" options={option} />
      ) : null}
    </div>
  );
};

export default HomeOverlay;
