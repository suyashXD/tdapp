'use client';

import React from 'react';

export default function TaskItem({ task, onComplete }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
            <span
                className={`${
                    task.completed ? 'line-through text-gray-500' : ''
                }`}
            >
                {task.description}
            </span>
            <button
                onClick={() => onComplete(task.id)}
                className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
            >
                Mark Complete
            </button>
        </div>
    );
}
