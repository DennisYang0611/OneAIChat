import React from 'react';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
  onAddResponse: () => void;
}

export default function ChatMessage({ message, onAddResponse }: ChatMessageProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-[70%] bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">{message.role === 'user' ? 'You' : message.modelId}</span>
          {message.role === 'assistant' && (
            <button
              onClick={onAddResponse}
              className="ml-2 p-1 rounded-full hover:bg-gray-100"
              title="Get another response"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-gray-800">{message.content}</p>
      </div>
    </div>
  );
} 