import React, { useMemo, useRef } from "react";
import { ReactFlow, Background, Controls as RfControls } from "@xyflow/react";
import { convertJsonToFlow } from "../utils/convertJsonToFlow";
import '@xyflow/react/dist/style.css';

const VisualizationCanvas = ({ jsonString, searchKey }) => {
  const reactFlowWrapper = useRef(null);

  const parsed = useMemo(() => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }, [jsonString]);

  const { nodes, edges } = useMemo(() => {
    if (parsed === null) return { nodes: [], edges: [] };
    return convertJsonToFlow(parsed, searchKey);
  }, [parsed, searchKey]);

  if (parsed === null) {
    return <div className="text-sm text-rose-600 dark:text-rose-400">Invalid JSON — check the editor.</div>;
  }

  return (
    <div ref={reactFlowWrapper} className="h-[60vh] w-full bg-transparent">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        style={{ background: "transparent" }}
      >
        <Background gap={16} color="rgba(15,23,42,0.03)" />
        <RfControls />
      </ReactFlow>
    </div>
  );
};

export default React.memo(VisualizationCanvas);