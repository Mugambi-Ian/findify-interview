export function updateSlider() {
  for (let i of document.querySelectorAll('input[type="range"]')) {
    const e = i;
    if (e && e.style) {
      e.style.setProperty("--value", e.value);
      e.style.setProperty("--min", e.min === "" ? "0" : e.min);
      e.style.setProperty("--max", e.max === "" ? "100" : e.max);
      e.addEventListener("input", () =>
        e.style.setProperty("--value", e.value)
      );
    }
  }
}
