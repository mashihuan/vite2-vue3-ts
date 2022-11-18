import { reactive } from "vue";
import { loadFull } from "tsparticles"; // particles文档 https://particles.js.org/

export function useParticles() {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  const particlesOptions = reactive({
    fpsLimit: 60,
    particles: {
      move: {
        bounce: false,
        direction: "none",
        enable: true,
        outModes: "out",
        random: false,
        speed: 2,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "connect",
          parallax: {
            enable: false,
            force: 60,
            smooth: 10,
          },
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
    },
    themes: [
      {
        name: "light",
        default: {
          value: true,
          mode: "light",
        },
        options: {
          background: {
            color: "#fff",
          },
          particles: {
            color: {
              value: [
                "#3998D0",
                "#2EB6AF",
                "#A9BD33",
                "#FEC73B",
                "#F89930",
                "#F45623",
                "#D62E32",
                "#EB586E",
                "#9952CF",
              ],
            },
          },
        },
      },
    ],
  });

  return [particlesInit, particlesOptions];
}
