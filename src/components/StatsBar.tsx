interface Props {
  total: number;
  active: number;
  completed: number;
}

export default function StatsBar({ total, active, completed }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-500">
          <span className="font-semibold text-indigo-600">{active}</span> task{active !== 1 ? 's' : ''} remaining
        </span>
        <span className="text-sm text-slate-500">
          {completed}/{total} done
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
