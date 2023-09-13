import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../models/TaskModel';

// Custom hook pour gérer les tâches
const useTasks = () => {
    // État local pour stocker les tâches
    const [tasks, setTasks] = useState<Task[]>([]);

    // Effet pour charger les tâches depuis le stockage local lors de la première exécution
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Effet pour sauvegarder les tâches dans le stockage local lorsque 'tasks' change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Fonction pour ajouter une nouvelle tâche ou mettre à jour une tâche existante
    const addTask = (input: string, editingTask: Task | null) => {
        if (input) {
            if (editingTask) {
                // Mettre à jour une tâche existante
                const updatedTasks = tasks.map(t => t.id === editingTask.id ? { ...t, name: input } : t);
                setTasks(updatedTasks);
            } else {
                // Ajouter une nouvelle tâche
                setTasks(prevTasks => [...prevTasks, {
                    id: Date.now(),
                    name: input,
                    status: TaskStatus.ToDo,
                    important: false,
                }]);
            }
        }
    };

    // Fonction pour marquer une tâche comme importante ou non
    const markAsImportant = (id: number) => {
        const updatedTasks = tasks.map(t =>
            t.id === id ? { ...t, important: !t.important } : t
        );
        setTasks(updatedTasks);
    };

    // Fonction pour marquer une tâche comme en cours ou à faire
    const markAsInProgress = (id: number) => {
        const updatedTasks = tasks.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    status: t.status === TaskStatus.InProgress ? TaskStatus.ToDo : TaskStatus.InProgress
                };
            }
            return t;
        });
        setTasks(updatedTasks);
    };

    // Fonction pour supprimer une tâche
    const deleteTask = (id: number) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    };

    // Fonction pour mettre à jour le statut d'une tâche
    const updateStatus = (task: Task, status: TaskStatus) => {
        const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, status } : t);
        setTasks(updatedTasks);
    };

    // Retourne les fonctions et les données nécessaires à l'interface utilisateur
    return {
        tasks,
        addTask,
        markAsImportant,
        markAsInProgress,
        deleteTask,
        updateStatus,
    };
};

export default useTasks;
