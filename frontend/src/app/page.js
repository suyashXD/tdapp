'use client';

import React, { useEffect, useState } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskItem from '../components/TaskItem';
import TaskAnalytics from '../components/TaskAnalytics';
import { fetchTasks, createTask, markTaskComplete } from '../utils/api';

export default function Page() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasks();
            setTasks(data);
        };
        loadTasks();
    }, []);

    const handleAddTask = async (description) => {
        await createTask(description);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    const handleCompleteTask = async (taskId) => {
        await markTaskComplete(taskId);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold text-center mb-4">
                Decentralized To-Do App
            </h1>
            <AddTaskForm onAddTask={handleAddTask} />
            <div className="mt-6 space-y-4">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={handleCompleteTask}
                    />
                ))}
            </div>
            <TaskAnalytics tasks={tasks} />
        </div>
    );
}
