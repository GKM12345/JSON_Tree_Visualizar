
const Controls = (props) => {
  const { jsonValue, onChange, searchKey, setSearchKey } = props;
  const onPrettify = () => {
    try {
      const v = JSON.stringify(JSON.parse(jsonValue), null, 2);
      onChange(v);
    } catch {
      // ignore
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonValue);
    } catch {}
  };

  const clear = () => onChange("");

  return (
    <div className="mt-3">
      {/* Controls Buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <button 
          onClick={onPrettify} 
          className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-sm"
        >Prettify</button>
        <button 
          onClick={onCopy} 
          className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-sm"
        >Copy</button>
        <button 
          onClick={clear} 
          className="px-4 py-2 rounded-md bg-rose-500 dark:bg-rose-500 text-sm text-slate-100 dark:text-slate-100 hover:bg-rose-600 dark:hover:bg-rose-600 transition shadow-sm"
        >Clear</button>
      </div>

      {/* Search Input Box */}
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>

          {/* input */}
          <input
            id="json-search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search key... (live)"
            className="w-full pl-10 pr-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>
      </div>

    </div>
  );
}

export default Controls;