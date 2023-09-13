import React, { useState } from 'react';

// Interface pour les props du composant TaskInput
interface Props {
// Fonction pour ajouter une tâche
  onAdd: (input: string) => void;        
  isEditing: boolean;                    
  inputValue: string;    
  // Fonction pour mettre à jour la valeur de l'input                
  setInputValue: (value: string) => void; 
}

// Composant TaskInput pour l'ajout et la modification de tâches
const TaskInput: React.FC<Props> = ({ onAdd, isEditing, inputValue, setInputValue }) => {
  return (
    <div className="mb-4 transition-all ease-in-out duration-300">
        <input
            className="border p-2 w-full rounded-md shadow-sm transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur de l'input à chaque changement
            placeholder="Ajoutez une nouvelle tâche"
        />
        <button
            className="mt-2 p-2 bg-purple-500 text-white w-full rounded-md hover:bg-purple-600 transition-all ease-in-out duration-300"
            onClick={() => onAdd(inputValue)} // Appelle la fonction onAdd avec la valeur de l'input
        >
            {isEditing ? "Modifier" : "Confirmer"} 
        </button>
    </div> // Change le texte du bouton en fonction du mode d'édition
  );
};

export default TaskInput;
