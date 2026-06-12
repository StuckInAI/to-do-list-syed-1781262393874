import { useState } from 'react';
import type { Todo, Priority } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, dueDate?: string) => void;
}

const priorityConfig: Record<Priority, { label: string; classes: string; dot: string }> = {
  low: { label: 'Low', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400' },
  medium: { label: 'Medium', classes: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
  high: { label: 'High', classes: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-400' },
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '');

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, editPriority, editDueDate || undefined);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setEditDueDate(todo.dueDate ?? '');
      setIsEditing(false);
    }
  }

  const pc = priorityConfig[todo.priority];

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate + 'T23:59:59') < new Date();

  return (
    <div
      className={`group flex items-start gap-3 p-4 rounded-2xl border transition-all ${
        todo.completed
          ? 'bg-slate-50 border-slate-100 opacity-60'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
            />
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
              />
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={handleSave}
                  className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditText(todo.text);
                    setEditPriority(todo.priority);
                    setEditDueDate(todo.dueDate ?? '');
                    setIsEditing(false);
                  }}
                  className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p
              className={`text-sm font-medium leading-snug break-words ${
                todo.completed ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {todo.text}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${pc.classes}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                {pc.label}
              </span>
              {todo.dueDate && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    isOverdue
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  {isOverdue ? '⚠ ' : '📅 '}
                  {todo.dueDate}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
