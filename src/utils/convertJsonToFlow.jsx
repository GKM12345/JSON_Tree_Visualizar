// center each depth column — moved to helper for clarity
  function centerNodesByDepth(nodesList, gapX, gapY) {
    const counts = {};
    nodesList.forEach((n) => {
      const d = Math.round(n.position.y / gapY);
      counts[d] = (counts[d] || 0) + 1;
    });

    const offsets = {};
    Object.keys(counts).forEach((d) => {
      const cnt = counts[d];
      offsets[d] = -((cnt - 1) * gapX) / 2;
    });

    nodesList.forEach((n) => {
      const d = Math.round(n.position.y / gapY);
      n.position = { x: n.position.x + (offsets[d] || 0) + 10, y: n.position.y };
    });
  }


export function convertJsonToFlow(parsed, searchKey = "", xGap = 180, yGap = 90) {
  if (!parsed) return { nodes: [], edges: [] };

  let idCounter = 0;
  const nodes = [];
  const edges = [];
  const depthIndex = {};

  function nextId() {
    idCounter += 1;
    return String(idCounter);
  }

  function getXY(depth) {
    depthIndex[depth] = (depthIndex[depth] || 0) + 1;
    const ix = depthIndex[depth] - 1;
    return { x: ix * xGap, y: depth * yGap };
  }

  const keyMatch = (name) =>
    !!searchKey &&
    name &&
    String(name).toLowerCase() === (String(searchKey).toLowerCase());

  function walk(value, name = "root", depth = 0, parentId = null) {
    const id = nextId();
    const position = getXY(depth);
    const isMatch = keyMatch(name);


    // Build label
    let label = name;
    if (value === null) label += ": null";
    else if (typeof value !== "object") label += `: ${String(value)}`;

    // Use Tailwind classNames so dark mode works via .dark on root
    const baseClass =
      "rounded-md px-3 py-2 shadow-sm border";
    const themeClass =
      "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700";
    const matchClass =
      "bg-amber-50 dark:bg-amber-800 text-amber-800 dark:text-amber-200 ring-2 ring-amber-300";

    nodes.push({
      id,
      position,
      data: { label },
      // node wrapper will receive this className (react-flow supports it)
      className: `${baseClass} ${isMatch ? matchClass : themeClass}`,
      draggable: false,
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: false,
        style: { stroke: "var(--edge-stroke)" },
      });
    }

    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        value.forEach((item, idx) => walk(item, `${name}[${idx}]`, depth + 1, id));
      } else {
        Object.entries(value).forEach(([k, v]) => walk(v, k, depth + 1, id));
      }
    }
  }

  walk(parsed, "root", 0, null);
  centerNodesByDepth(nodes, xGap, yGap);
  return { nodes, edges };
}