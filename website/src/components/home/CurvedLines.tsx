import React from "react";

const CurvedLines = () => {
  return (
    <div className="absolute top-[50%] translate-y-[-50%] left-0 z-0 w-full h-[300px] overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 400"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Intersecting curved lines */}
        <path
          id="curve1"
          d="M0,200 C480,100 900,100 1440,300"
          className="stroke-slate-300 dark:stroke-white/10"
          strokeWidth="1"
          fill="none"
        />
        <path
          id="curve2"
          d="M0,300 C480,120 960,100 1440,200"
          className="stroke-slate-300 dark:stroke-white/8"
          strokeWidth="1"
          fill="none"
        />
        <path
          id="curve3"
          d="M0,100 C480,140 500,100 1440,350"
          className="stroke-slate-200 dark:stroke-white/6"
          strokeWidth="1"
          fill="none"
        />

        {/* Shooting stars */}
        <circle r="2.5" className="fill-slate-800 dark:fill-white">
          <animateMotion dur="2s" begin="0s;star3.end" fill="freeze">
            <mpath href="#curve1" />
          </animateMotion>
          <set
            attributeName="visibility"
            to="visible"
            begin="0s;star3.end"
            dur="2s"
          />
          <set attributeName="visibility" to="hidden" begin="4s;star1.end" />
          <animate
            id="star1"
            attributeName="cx"
            from="0"
            to="0"
            dur="2s"
            begin="0s;star3.end"
            fill="freeze"
          />
        </circle>

        <circle
          r="2.5"
          className="fill-slate-800 dark:fill-white"
          visibility="hidden"
        >
          <animateMotion dur="2s" begin="star1.end" fill="freeze">
            <mpath href="#curve2" />
          </animateMotion>
          <set
            attributeName="visibility"
            to="visible"
            begin="star1.end"
            dur="2s"
          />
          <set attributeName="visibility" to="hidden" begin="6s;star2.end" />
          <animate
            id="star2"
            attributeName="cx"
            from="0"
            to="0"
            dur="2s"
            begin="star1.end"
            fill="freeze"
          />
        </circle>

        <circle
          r="2.5"
          className="fill-slate-800 dark:fill-white"
          visibility="hidden"
        >
          <animateMotion dur="2s" begin="star2.end" fill="freeze">
            <mpath href="#curve3" />
          </animateMotion>
          <set
            attributeName="visibility"
            to="visible"
            begin="star2.end"
            dur="2s"
          />
          <set attributeName="visibility" to="hidden" begin="8s;star3.end" />
          <animate
            id="star3"
            attributeName="cx"
            from="0"
            to="0"
            dur="2s"
            begin="star2.end"
            fill="freeze"
          />
        </circle>
      </svg>
    </div>
  );
};

export default CurvedLines;
