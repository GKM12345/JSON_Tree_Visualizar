export default function EditorPanel(props) {
    const { value, onChange } = props;
  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full h-64 md:h-80 resize-y p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      <div className="text-xs text-slate-500 dark:text-slate-400">
        Tip: Use the controls below to prettify, copy, or validate.
      </div>
    </div>
  );
}