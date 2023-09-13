'use client'

import React, { useState } from 'react';
import { TaskStatus, Task } from './models/TaskModel';
import { NextPage } from 'next';
import { FaEdit } from 'react-icons/fa';
import TaskItem from './components/TaskItem';
import TaskFilter from './components/TaskFilter';
import TaskInput from './components/TaskInput';
import useTasks from './hooks/useTasks';

// Page d'accueil
const Home: NextPage = () => {
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [activeTab, setActiveTab] = useState('All'); // Onglet actif pour filtrer les tâches
    const [editingTask, setEditingTask] = useState<null | Task>(null); // Tâche en cours d'édition

    // Utilisation du custom hook useTasks pour gérer les tâches
    const {
        tasks,
        addTask: addOrUpdateTask,
        markAsImportant,
        markAsInProgress,
        deleteTask,
        updateStatus
    } = useTasks();

    const addTask = () => {
        addOrUpdateTask(input, editingTask);
        setInput('');
        setShowInput(false);
        setEditingTask(null);
    };

    const startEditing = (task: Task) => {
        setShowInput(true);
        setInput(task.name);
        setEditingTask(task);
    };

    // Fonction pour filtrer les tâches en fonction de l'onglet actif
    const getFilteredTasks = () => {
        switch (activeTab) {
            case 'Important': return tasks.filter(t => t.important);
            case 'En cours': return tasks.filter(t => t.status === TaskStatus.InProgress);
            case 'A faire': return tasks.filter(t => t.status === TaskStatus.ToDo);
            case 'Terminé': return tasks.filter(t => t.status === TaskStatus.Done);
            default: return tasks;
        }
    };

    // Fonction pour obtenir le nombre de tâches en fonction du filtre
    const getTaskCount = (filter) => {
        switch (filter) {
            case 'Important': return tasks.filter(t => t.important).length;
            case 'En cours': return tasks.filter(t => t.status === TaskStatus.InProgress).length;
            case 'A faire': return tasks.filter(t => t.status === TaskStatus.ToDo).length;
            case 'Terminé': return tasks.filter(t => t.status === TaskStatus.Done).length;
            default: return tasks.length;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
            <div className="container mx-auto mt-10 p-4 md:p-6 w-full md:w-4/5 lg:w-3/5 bg-white rounded-xl shadow-2xl flex flex-col h-full md:h-auto mb-6">
                <h1 className="text-2xl md:text-3xl mb-10 text-center font-bold text-purple-700">Todo List</h1>

                {showInput ? (
                    <TaskInput
                        onAdd={addTask}
                        isEditing={editingTask !== null}
                        inputValue={input}
                        setInputValue={setInput}
                    />
                ) : (
                    <button
                        className="mb-4 p-2 h-12 md:h-auto bg-purple-400 text-white w-full flex justify-center items-center rounded-md hover:bg-purple-600 transition-all ease-in-out duration-300"
                        onClick={() => setShowInput(true)}
                    >
                        <FaEdit className="mr-2" /> Ajouter
                    </button>
                )}

                <TaskFilter
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    getTaskCount={getTaskCount}
                />

                <div className="flex-1 overflow-y-auto mb-4">
                    {getFilteredTasks().map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={startEditing}
                            onToggleImportant={markAsImportant}
                            onToggleInProgress={markAsInProgress}
                            onDelete={deleteTask}
                            updateStatus={updateStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
