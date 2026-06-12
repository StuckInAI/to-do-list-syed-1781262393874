interface Props {
  filter: string;
  searchQuery: string;
}

export default function EmptyState({ filter, searchQuery }: Props) {
  if (searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-slate-500 font-medium">No tasks match "{searchQuery}"</p>
        <p className="text-slate-400 text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  if (filter === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">✨</div>
        <p className="text-slate-500 font-medium">No completed tasks yet</p>
        <p className="text-slate-400 text-sm mt-1">Complete some tasks to see them here</p>
      </div>
    );
  }

  if (filter === 'active') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-slate-500 font-medium">All tasks completed!</p>
        <p className="text-slate-400 text-sm mt-1">Great job! Add more tasks to keep going.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">📝</div>
      <p className="text-slate-500 font-medium">No tasks yet</p>
      <p className="text-slate-400 text-sm mt-1">Add a task above to get started</p>
    </div>
  );
}
