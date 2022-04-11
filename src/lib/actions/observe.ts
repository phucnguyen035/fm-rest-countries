export const observe = (node: HTMLElement) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        node.dispatchEvent(new CustomEvent('intersecting'));
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(node);

  return {
    destroy: () => observer.unobserve(node),
  };
};
