export function startViewTransition(callback: () => void) {
  // Check if the user's system prefers reduced motion
  const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // If the startViewTransition method doesn't exist on the document object or the user's system prefers reduced motion, call the callback function
  if (!document.startViewTransition || prefersMotion.matches) {
    callback();
  } else {
    // Otherwise, start the view transition and call the callback function
    document.startViewTransition(() => {
      callback();
    });
  }
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
