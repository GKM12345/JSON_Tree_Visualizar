import { useState } from "react";
import {Header, ThemeToggle, EditorPanel, VisualizationCanvas, Controls, DownloadButton} from "./components";

const initialJsonValue = `{
  "name": "Example",
  "items": [
    { "id": 1, "label": "One" },
    { "id": 2, "label": "Two", "meta": { "active": true } }
  ]
}`

const App = () => {

  const [jsonValue, setJsonValue] = useState(initialJsonValue);
  const [searchKey, setSearchKey] = useState("");

  const handleJsonChange = (val) => setJsonValue(val);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-end mb-6">
          <Header />
          <ThemeToggle />
        </div>

        <main className="grid gap-6 grid-cols-1 md:grid-cols-12">
          <section className="md:col-span-6 bg-slate-50 dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Editor</h2>
            <EditorPanel 
              value={jsonValue} 
              onChange={handleJsonChange} 
            />
            <Controls 
              jsonValue={jsonValue} 
              onChange={handleJsonChange}
              searchKey={searchKey}
              setSearchKey={setSearchKey} 
            />
          </section>

          <aside className="md:col-span-6 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border-transparent dark:border-slate-700 dark:ring-1 dark:ring-slate-800 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">Visualization</h2>
              <DownloadButton />
            </div>
            <VisualizationCanvas 
              jsonString={jsonValue}
              searchKey={searchKey}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
