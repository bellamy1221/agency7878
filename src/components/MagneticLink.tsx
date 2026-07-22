"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type MagneticProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  strength?: number;
};

/** Slight cursor pull so CTAs feel tactile. */
export function MagneticLink({
  children,
  strength = 10,
  className,
  ...rest
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const rx = useTransform(sx, (v) => v * 0.04);
  const ry = useTransform(sy, (v) => -v * 0.04);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set((dx / r.width) * strength);
    y.set((dy / r.height) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      className={className}
      style={reduce ? undefined : { x: sx, y: sy, rotateX: ry, rotateY: rx }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
