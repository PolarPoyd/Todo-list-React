import React from 'react';
import { FaCalendarCheck, FaBullhorn, FaClock, FaStar, FaTasks } from 'react-icons/fa';

// Interface pour les props du composant TaskFilter
interface Props {
    activeTab: string;
    onChange: (tab: string) => void;
    getTaskCount: (filter: string) => number;
}

// Définition des onglets avec leurs icônes correspondantes
const TABS = [
    { label: 'Tous', icon: FaTasks },
    { label: 'Important', icon: FaStar },
    { label: 'A faire', icon: FaBullhorn },
    { label: 'En cours', icon: FaClock },
    { label: 'Terminé', icon: FaCalendarCheck }
];

// Composant TabItem pour chaque onglet
const TabItem: React.FC<{ tab: any; isActive: boolean; onClick: () => void; count: number }> = ({ tab, isActive, onClick, count }) => (
    <div
        onClick={onClick}
        className={`my-2 md:my-0 mx-1 md:mx-4 p-4 border-b transition-all ease-in-out duration-300 ${isActive ? 'border-purple-500' : 'border-transparent'} hover:border-purple-500 cursor-pointer flex items-center justify-between w-full md:w-auto`}
    >
        <tab.icon className="hidden md:inline-block text-purple-500 md:text-lg" />
        <div className="flex items-center no-wrap">
            <span className="bg-white rounded-full px-2 py-1 text-xs text-purple-500 mr-2">{count}</span>
            {tab.label}
        </div>
    </div>
);

// Composant TaskFilter principal
const TaskFilter = ({ activeTab, onChange, getTaskCount }: Props) => (
    <div className="mb-8 mt-8 flex flex-wrap justify-center">
        {TABS.map(tab => (
            <TabItem
                key={tab.label}
                tab={tab}
                isActive={activeTab === tab.label}
                onClick={() => onChange(tab.label)}
                count={getTaskCount(tab.label)}
            />
        ))}
    </div>
);

export default TaskFilter;
