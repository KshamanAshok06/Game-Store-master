import React, { useRef, useState } from "react";

const MagneticTab = ({ item }) => { // Remove type annotation
  const ref = useRef(null);

  const [hoverPosition, setHoverPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const buttonElement = ref.current;

    if (buttonElement) {
      const { left, top, width, height } = buttonElement.getBoundingClientRect();
      const x = (clientX - left - width / 2) * 0.15;
      const y = (clientY - top - height / 2) * 0.15;

      setHoverPosition({ x, y, opacity: 1 });
    }
  };

  const onMouseOut = () => {
    setHoverPosition({ x: 0, y: 0, opacity: 0 });
  };

  return (
    <button
      ref={ref}
      className="relative h-9"
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseOut}
    >
      <span className="relative px-4 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
        {item.text}
      </span>
      <div
        className="absolute bottom-0 left-0 -z-10 h-full w-full rounded-[4px] bg-zinc-200/80 transition-opacity dark:bg-zinc-800/80"
        aria-hidden="true"
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity,
        }}
      />
    </button>
  );
};

export default MagneticTab;
