import React from 'react';
import { Model } from '@/types';

interface ModelSelectorProps {
  models: Model[];
  onSelect: (model: Model) => void;
}

export default function ModelSelector({ models, onSelect }: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => (
        <div
          key={model.id}
          className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all dark:border-gray-700 dark:hover:border-blue-400"
          onClick={() => onSelect(model)}
        >
          <h3 className="font-bold dark:text-white">{model.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{model.description}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">ID: {model.id}</p>
        </div>
      ))}
    </div>
  );
} 