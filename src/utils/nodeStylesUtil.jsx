export const baseClass = "rounded-md px-3 py-2 shadow-sm border";
export const typeClasses = {
  object:
    "!bg-emerald-50 dark:!bg-emerald-900 !text-emerald-800 dark:!text-emerald-200 !border-emerald-200 dark:!border-emerald-700",
  array:
    "!bg-sky-50 dark:!bg-sky-900 !text-sky-800 dark:!text-sky-200 !border-sky-200 dark:!border-sky-700",
  primitive:
    "!bg-white dark:!bg-slate-800 !text-slate-800 dark:!text-slate-200 !border-slate-200 dark:!border-slate-700",
  match:
    "!bg-amber-50 dark:!bg-amber-800 !text-amber-800 dark:!text-amber-200 !ring-2 !ring-amber-300",
};

export function nodeClass(nodeType, isMatch) {
  const typeClass = isMatch ? typeClasses.match : typeClasses[nodeType] || typeClasses.primitive;
  return `${baseClass} ${typeClass}`;
}