'use client';

import React from 'react';

export default function TaskAnalytics({ tasks }) {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    return (
        <div className="mt-6">
            <p>
                You have completed {completedTasks} out of {totalTasks} tasks.
            </p>
        </div>
    );
}
