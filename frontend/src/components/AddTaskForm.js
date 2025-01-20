'use client';

import React, { useState } from 'react';

export default function AddTaskForm({ onAddTask }) {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description) return;
        onAddTask(description);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
                type="text"
                placeholder="Add a new task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Add Task
            </button>
        </form>
    );
}
