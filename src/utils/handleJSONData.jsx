import { nodeClass } from "./nodeStylesUtil";

// center each depth column node
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

// convert json data to node and edge data supported by react flow
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

  function traverse(value, name = "root", depth = 0, parentId = null) {
    const id = nextId();
    const position = getXY(depth);
    const isMatch = keyMatch(name);


    // Building label for nodes
    let label = name;
    if (value === null) label += ": null";
    else if (typeof value !== "object") label += `: ${String(value)}`;

    const nodeType = Array.isArray(value)
      ? "array"
      : value && typeof value === "object"
      ? "object"
      : "primitive";
      
    nodes.push({
      id,
      position,
      data: { label, nodeType },
      className: nodeClass(nodeType, isMatch),
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
        value.forEach((item, idx) => traverse(item, `${name}[${idx}]`, depth + 1, id));
      } else {
        Object.entries(value).forEach(([k, v]) => traverse(v, k, depth + 1, id));
      }
    }
  }

  traverse(parsed, "root", 0, null);
  centerNodesByDepth(nodes, xGap, yGap);
  return { nodes, edges };
}

// count no key present in json data
export function countKeyMatches(jsonString, searchKey) {
  if (!searchKey) return 0;
  try {
    const parsed = JSON.parse(jsonString);
    let count = 0;
    const target = String(searchKey).toLowerCase();

    function traverse(value) {
      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((item) => traverse(item));
        } else {
          Object.entries(value).forEach(([k, v]) => {
            if (String(k).toLowerCase() === target) count += 1;
            traverse(v);
          });
        }
      }
    }

    traverse(parsed);
    return count;
  } catch {
    return 0;
  }
}