"use client";
import React, { ReactNode } from "react";
import classNames, { Argument } from "classnames";

const cn = (...args: Argument[]) => classNames(...args);

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
  gap?: string;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = Infinity,
  gap = "2rem",
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--gap": gap } as React.CSSProperties} // Type cast to CSSProperties
      className={cn(
        "group flex overflow-hidden [--duration:40s] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
