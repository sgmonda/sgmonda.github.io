const html = document.documentElement;

var scrollPosition = 0; // This can be used to hide/show elements based on scroll %
window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  scrollPosition = scrollTop / maxScrollTop;
  console.log("SCROLL POS", Math.round(scrollPosition * 100), "%");
});

const init = (canvas) => {
  const context = canvas.getContext("2d");
  const url = canvas.getAttribute("data-frame-url");
  const count = canvas.getAttribute("data-frame-count");
  const width = canvas.getAttribute("data-frame-width");
  const height = canvas.getAttribute("data-frame-height");

  const currentFrame = (index) =>
    url.replace("{num}", `${index.toString().padStart(4, "0")}`);

  const preloadImages = () => {
    for (let i = 1; i < count; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image();
  img.src = currentFrame(1);
  canvas.width = width;
  canvas.height = height;
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };

  const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  };

  window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / maxScrollTop;
    const frameIndex = Math.min(count - 1, Math.ceil(scrollPercent * count));
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

  preloadImages();
};

const canvasList = Array.prototype.slice.call(
  document.getElementsByTagName("canvas")
);
canvasList.forEach(init);
