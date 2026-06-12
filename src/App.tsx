import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoItem from '@/components/TodoItem';
import StatsBar from '@/components/StatsBar';
import EmptyState from '@/components/EmptyState';
import { useTodos } from '@/hooks/useTodos';

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            <span className="text-indigo-500">My</span> Tasks
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Stay organized, stay productive</p>
        </div>

        {/* Stats */}
        <StatsBar
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
        />

        {/* Add Form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCount={stats.active}
          completedCount={stats.completed}
          onClearCompleted={clearCompleted}
        />

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <EmptyState filter={filter} searchQuery={searchQuery} />
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-10">
          Tasks saved locally in your browser
        </p>
      </div>
    </div>
  );
}
