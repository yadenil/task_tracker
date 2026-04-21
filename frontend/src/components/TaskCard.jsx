import { useState } from 'react';

export default function TaskCard({ task, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const priorityColors = {
    high: 'from-red-500 to-orange-500 shadow-red-500/30',
    medium: 'from-yellow-500 to-amber-500 shadow-yellow-500/30',
    low: 'from-emerald-500 to-teal-500 shadow-emerald-500/30'
  };

  return (
    <div className={`group relative glass-panel p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 animate-slide-up'}`}>
      {/* Priority Indicator */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${priorityColors[task.priority]} rounded-t-2xl`} />
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => onToggle(task.id)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.completed === 1 || task.completed === true ? 'bg-emerald-500 border-emerald-500' : 'border-white/30 hover:border-violet-400'}`}
            >
              {(task.completed === 1 || task.completed === true) && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <h3 className={`text-lg font-semibold transition-all duration-300 ${task.completed === 1 || task.completed === true ? 'line-through text-white/40' : 'text-white'}`}>
              {task.title}
            </h3>
          </div>
          
          <p className={`text-sm mb-3 ${task.completed === 1 || task.completed === true ? 'text-white/30' : 'text-white/60'}`}>
            {task.description}
          </p>
          
          <div className="flex items-center gap-3 text-xs">
            <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[task.priority]} text-white font-medium shadow-lg`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="text-white/40 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {task.created_at ? new Date(task.createdAt).toLocaleDateString() : 'No date'}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}