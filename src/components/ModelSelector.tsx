import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Model } from '@/types';

interface ModelSelectorProps {
  model: Model;
  onModelChange: (model: Model) => void;
}

export default function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    customBaseUrl: model.customBaseUrl || '',
    customApiKey: model.customApiKey || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onModelChange({
      ...model,
      customBaseUrl: config.customBaseUrl,
      customApiKey: config.customApiKey
    });
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 保持不变的代码 */}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-medium mb-4">
              编辑模型配置
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={config.customApiKey}
                    onChange={(e) => setConfig({ ...config, customApiKey: e.target.value })}
                    placeholder="输入 API Key"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base URL
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={config.customBaseUrl}
                    onChange={(e) => setConfig({ ...config, customBaseUrl: e.target.value })}
                    placeholder="输入中转地址"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    保存
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 