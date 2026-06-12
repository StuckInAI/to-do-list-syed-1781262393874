import type { Filter } from '@/types/todo';

interface Props {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 mb-4 flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
              filter === f.value
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-rose-500 hover:text-rose-700 font-medium transition whitespace-nowrap"
        >
          Clear {completedCount} completed
        </button>
      )}
    </div>
  );
}
