document.addEventListener("DOMContentLoaded", () => {
  // Smooth fade-in effect
  document.body.classList.add("loaded");

  // Small interactive glow effect
  const card = document.querySelector(".hero-card");

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    const rotateY = (x - 0.5) * 6;
    const rotateX = (0.5 - y) * 6;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  });
});
