import React from "react";

// Version 1: Gradient Flow Lines - More dynamic and modern
export const GradientFlowLines = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
            <stop
              offset="50%"
              stopColor="rgb(147, 51, 234)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="rgb(236, 72, 153)"
              stopOpacity="0.1"
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
            <stop
              offset="50%"
              stopColor="rgb(59, 130, 246)"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="rgb(147, 51, 234)"
              stopOpacity="0.1"
            />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main flowing curves */}
        <path
          d="M-100,400 Q360,200 720,350 T1540,250"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          opacity="0.8"
        >
          <animate
            attributeName="d"
            values="M-100,400 Q360,200 720,350 T1540,250;M-100,350 Q360,150 720,300 T1540,200;M-100,400 Q360,200 720,350 T1540,250"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M-100,300 Q480,500 960,200 T1540,400"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            values="M-100,300 Q480,500 960,200 T1540,400;M-100,250 Q480,450 960,150 T1540,350;M-100,300 Q480,500 960,200 T1540,400"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>

        {/* Floating particles */}
        <g className="opacity-60">
          {[...Array(6)].map((_, i) => (
            <circle key={i} r="1.5" fill="url(#gradient1)" filter="url(#glow)">
              <animateMotion
                dur={`${15 + i * 3}s`}
                repeatCount="indefinite"
                path={`M${100 + i * 200},${300 + i * 50} Q${400 + i * 100},${
                  200 - i * 30
                } ${800 + i * 80},${350 + i * 40} T${1400 + i * 40},${
                  250 + i * 60
                }`}
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${8 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

// Version 2: Geometric Network - Tech/startup focused
export const GeometricNetwork = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
            <stop
              offset="100%"
              stopColor="rgb(59, 130, 246)"
              stopOpacity="0.1"
            />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        <g
          className="stroke-blue-500/20 dark:stroke-blue-400/20"
          strokeWidth="1"
        >
          <path d="M200,300 Q400,200 600,350 Q800,500 1000,250">
            <animate
              attributeName="stroke-dasharray"
              values="0,1000;1000,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M100,500 Q350,300 650,400 Q950,200 1200,450">
            <animate
              attributeName="stroke-dasharray"
              values="0,1000;1000,0"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M300,150 Q500,400 700,200 Q900,350 1100,180">
            <animate
              attributeName="stroke-dasharray"
              values="0,1000;1000,0"
              dur="5s"
              begin="2s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Network nodes */}
        <g>
          {[
            { x: 200, y: 300, delay: 0 },
            { x: 600, y: 350, delay: 0.5 },
            { x: 1000, y: 250, delay: 1 },
            { x: 350, y: 500, delay: 1.5 },
            { x: 750, y: 180, delay: 2 },
          ].map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="4"
              fill="url(#nodeGradient)"
              className="opacity-0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="3s"
                begin={`${node.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="4;8;4"
                dur="3s"
                begin={`${node.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

// Version 3: Organic Waves - More natural and calming
 export const OrganicWaves = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="waveGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.1" />
            <stop
              offset="100%"
              stopColor="rgb(59, 130, 246)"
              stopOpacity="0.05"
            />
          </linearGradient>
          <linearGradient
            id="waveGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="rgb(168, 85, 247)"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="rgb(236, 72, 153)"
              stopOpacity="0.03"
            />
          </linearGradient>
        </defs>

        {/* Layered organic waves */}
        <path
          d="M0,400 C320,350 480,450 720,400 C960,350 1120,450 1440,400 L1440,800 L0,800 Z"
          fill="url(#waveGradient1)"
        >
          <animate
            attributeName="d"
            values="M0,400 C320,350 480,450 720,400 C960,350 1120,450 1440,400 L1440,800 L0,800 Z;M0,450 C320,400 480,500 720,450 C960,400 1120,500 1440,450 L1440,800 L0,800 Z;M0,400 C320,350 480,450 720,400 C960,350 1120,450 1440,400 L1440,800 L0,800 Z"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M0,300 C360,250 600,350 840,300 C1080,250 1260,350 1440,300 L1440,800 L0,800 Z"
          fill="url(#waveGradient2)"
        >
          <animate
            attributeName="d"
            values="M0,300 C360,250 600,350 840,300 C1080,250 1260,350 1440,300 L1440,800 L0,800 Z;M0,350 C360,300 600,400 840,350 C1080,300 1260,400 1440,350 L1440,800 L0,800 Z;M0,300 C360,250 600,350 840,300 C1080,250 1260,350 1440,300 L1440,800 L0,800 Z"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>

        {/* Floating elements */}
        <g className="opacity-40">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              r={Math.random() * 3 + 1}
              fill="rgb(59, 130, 246)"
              fillOpacity="0.3"
            >
              <animateMotion
                dur={`${20 + i * 5}s`}
                repeatCount="indefinite"
                path={`M${i * 180},${600 + Math.random() * 100} Q${
                  i * 180 + 200
                },${400 + Math.random() * 200} ${i * 180 + 400},${
                  500 + Math.random() * 150
                }`}
              />
              <animate
                attributeName="opacity"
                values="0;0.6;0"
                dur={`${10 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

// Version 4: Minimal Lines - Clean and professional
export const MinimalLines = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="minimalGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="text-slate-600 dark:text-white/20">
          {/* Clean geometric lines */}
          <path
            d="M0,300 Q360,200 720,300 T1440,250"
            stroke="url(#minimalGradient)"
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,2000;2000,0;0,2000"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>

          <path
            d="M0,450 Q480,350 960,450 T1440,400"
            stroke="url(#minimalGradient)"
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,2000;2000,0;0,2000"
              dur="8s"
              begin="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Subtle accent dots */}
          <circle cx="360" cy="200" r="2" fill="currentColor" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="720" cy="300" r="2" fill="currentColor" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="1080" cy="250" r="2" fill="currentColor" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="4s"
              begin="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

// Demo component to showcase all versions
export const CurvedLinesShowcase = () => {
  const [activeVersion, setActiveVersion] = React.useState(0);

  const versions = [
    {
      name: "Gradient Flow",
      component: GradientFlowLines,
      description: "Dynamic gradients with flowing particles",
    },
    {
      name: "Geometric Network",
      component: GeometricNetwork,
      description: "Tech-focused network visualization",
    },
    {
      name: "Organic Waves",
      component: OrganicWaves,
      description: "Natural wave patterns with floating elements",
    },
    {
      name: "Minimal Lines",
      component: MinimalLines,
      description: "Clean, professional line animations",
    },
  ];

  const ActiveComponent = versions[activeVersion].component;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Background component */}
      <ActiveComponent />

      {/* Demo content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Hero Section
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
            Enhanced curved line backgrounds with modern design principles
          </p>
        </div>

        {/* Version selector */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Design Versions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {versions.map((version, index) => (
              <button
                key={index}
                onClick={() => setActiveVersion(index)}
                className={`p-3 rounded-lg text-left transition-all duration-200 ${
                  activeVersion === index
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <div className="font-medium">{version.name}</div>
                <div className="text-sm opacity-75">{version.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

