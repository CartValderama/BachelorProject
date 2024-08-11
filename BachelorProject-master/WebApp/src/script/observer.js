export default function observer(id, style, unStyle, repeat) {
  const object = document.getElementById(id);
  const objectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.background = style;
        } else {
          if (repeat) {
            entry.target.style.background = unStyle;
          }
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  if (object) {
    objectObserver.observe(object);
  }
}
