'use client';

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export const buttonAnimation = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};
