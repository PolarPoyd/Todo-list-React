import React from 'react';
import { Task, TaskStatus } from '../models/TaskModel';
import { FaTrash, FaEdit, FaClock, FaStar, FaRegStar } from 'react-icons/fa';

// Interface pour les props du composant TaskItem
interface Props {
  task: Task; // La tâche à afficher
  onEdit: (task: Task) => void; 
  onToggleImportant: (id: number) => void; 
  onToggleInProgress: (id: number) => void; 
  onDelete: (id: number) => void; 
  updateStatus: (task: Task, status: TaskStatus) => void;
}

// Composant TaskItem pour afficher une tâche
const TaskItem: React.FC<Props> = ({ task, onEdit, onToggleImportant, onToggleInProgress, onDelete, updateStatus }) => {

  // Fonction pour déterminer la couleur de fond en fonction du statut de la tâche
  const getBackgroundColorByStatus = (task: Task) => {
    if (task.important) {
      return "bg-yellow-200";
    }
    switch (task.status) {
      case TaskStatus.ToDo:
        return "bg-gray-200";
      case TaskStatus.InProgress:
        return "bg-blue-200";
      case TaskStatus.Done:
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className={`border p-3 mb-3 flex justify-between items-center rounded-md ${getBackgroundColorByStatus(task)} shadow-sm hover:shadow-md transition-all ease-in-out duration-300`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`mr-2 form-checkbox text-white ${task.status === TaskStatus.Done ? 'bg-purple-500 checked:bg-purple-500 checked:border-transparent' : 'border-purple-500'}`}
          checked={task.status === TaskStatus.Done}
          onChange={() => updateStatus(task, task.status === TaskStatus.Done ? TaskStatus.ToDo : TaskStatus.Done)}
        />

        <span className={`ml-2 text-purple-800 ${task.status === TaskStatus.Done ? 'line-through' : ''}`}>{task.name}</span>
      </div>
      <div className="flex space-x-3">
        <button className="text-yellow-500 hover:text-yellow-600 transition-all ease-in-out duration-300" onClick={() => onEdit(task)}>
          <FaEdit />
        </button>
        <button className="text-blue-500 hover:text-blue-600 transition-all ease-in-out duration-300" onClick={() => onToggleInProgress(task.id)}>
          <FaClock />
        </button>
        <button
          className={task.important ? "text-gold-500 hover:text-gold-600 transition-all ease-in-out duration-300" : "text-gray-400 hover:text-gray-500 transition-all ease-in-out duration-300"}
          onClick={() => onToggleImportant(task.id)}
        >
          {task.important ? <FaStar /> : <FaRegStar />}
        </button>
        <button className="text-red-500 hover:text-red-600 transition-all ease-in-out duration-300" onClick={() => onDelete(task.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
