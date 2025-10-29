import { toPng } from "html-to-image";

const imageWidth = 1024;
const imageHeight = 768;

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

 const DownloadButton = ({ className = "" }) => {

  const onClick = async () => {
    try {
      const dark =
        typeof document !== "undefined" && document.documentElement.classList.contains("dark");
      const backgroundColor = dark ? "#0b1220" : "#ffffff";

      const viewportEl = document.querySelector(".react-flow__viewport");
      if (!viewportEl) return;

      const nodeEls = Array.from(document.querySelectorAll(".react-flow__node"));
      if (nodeEls.length === 0) {
        const dataUrl = await toPng(viewportEl, {
          backgroundColor,
          width: imageWidth,
          height: imageHeight,
          style: { width: imageWidth, height: imageHeight },
        });
        downloadImage(dataUrl);
        return;
      }

      const viewportRect = viewportEl.getBoundingClientRect();
      const rects = nodeEls.map((el) => el.getBoundingClientRect());

      const minX = Math.min(...rects.map((r) => r.left));
      const maxX = Math.max(...rects.map((r) => r.right));
      const minY = Math.min(...rects.map((r) => r.top));
      const maxY = Math.max(...rects.map((r) => r.bottom));

      const contentWidth = Math.max(1, maxX - minX);
      const contentHeight = Math.max(1, maxY - minY);

      const pad = 24; 
      const scale = Math.min(
        (imageWidth - pad * 2) / contentWidth,
        (imageHeight - pad * 2) / contentHeight,
        1
      );
      const relOffsetX = minX - viewportRect.left;
      const relOffsetY = minY - viewportRect.top;
      const centeredX = (imageWidth - contentWidth * scale) / 2;
      const centeredY = (imageHeight - contentHeight * scale) / 2;
      const tx = centeredX / scale - relOffsetX;
      const ty = centeredY / scale - relOffsetY;

      const dataUrl = await toPng(viewportEl, {
        backgroundColor,
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: "top left",
        },
      });

      downloadImage(dataUrl);
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Download visualization"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors shadow-sm
        bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11l4 4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
      </svg>
    </button>
  );
}

export default DownloadButton;