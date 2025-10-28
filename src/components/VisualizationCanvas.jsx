import React, { useMemo } from "react";

const VisualizationCanvas = (props) => {

  const { jsonString, searchKey } = props;
  
  const parsed = useMemo(() => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }, [jsonString]);

  if (parsed === null) {
    return <div className="text-sm text-rose-600 dark:text-rose-400">Invalid JSON — check the editor.</div>;
  }

  return (
    <div className="overflow-auto max-h-[60vh] p-2">
      
    </div>
  );
}

export default React.memo(VisualizationCanvas);