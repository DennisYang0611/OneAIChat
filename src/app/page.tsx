'use client';

import { useState, useRef, useEffect } from 'react';
import ModelSelector from '@/components/ModelSelector';
import ChatMessage from '@/components/ChatMessage';
import { Model, Message, Vendor, ModelChat, CustomModel, EditingModel } from '@/types';
import { translations } from '@/locales';

const VENDORS: Vendor[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '/vendors/openai.png',
    description: 'Pioneering AI research and development, known for creating advanced language models and AI technologies.'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: '/vendors/claude.png',
    description: 'Focused on AI safety and alignment, developing models that prioritize ethical considerations in AI.'
  },
  {
    id: 'baidu',
    name: 'Baidu',
    logo: '/vendors/baidu.png',
    description: 'Leading Chinese technology company specializing in AI and internet services, with a strong focus on natural language processing.'
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI',
    logo: '/vendors/zhipu.png',
    description: 'Provider of advanced GLM models, offering innovative solutions for various AI applications.'
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI',
    logo: '/vendors/moonshot.jpeg',
    description: 'Innovative AI company dedicated to pushing the boundaries of AI technology and applications.'
  },
  {
    id: 'alibaba',
    name: 'Alibaba',
    logo: '/vendors/alibaba.png',
    description: 'Global e-commerce giant leveraging AI to enhance user experience and optimize business operations.'
  },
  {
    id: 'iflytek',
    name: 'iFlytek',
    logo: '/vendors/iFlytek.png',
    description: 'Leading provider of intelligent voice and language technologies, focusing on speech recognition and natural language processing.'
  },
  {
    id: 'MiniMax',
    name: 'miniMax',
    logo: '/vendors/minimax.jpeg',
    description: 'AI model provider specializing in efficient and scalable solutions for various industries.'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    logo: '/vendors/deepseek.jpeg',
    description: 'AI company focused on deep learning and data analysis, providing cutting-edge solutions for complex problems.'
  },
  {
    id: 'doubao',
    name: 'Doubao',
    logo: '/vendors/doubao.png',
    description: 'Provider of advanced AI models tailored for specific applications, enhancing productivity and efficiency.'
  }
];

// 修改现有的模型数组，添加 vendorId
const AVAILABLE_MODELS: Model[] = [
  // OpenAI Models
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient GPT-3.5 model',
    vendorId: 'openai'
  },
  {
    id: 'gpt-3.5-turbo-16k',
    name: 'GPT-3.5 Turbo 16K',
    description: 'Extended context GPT-3.5',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 model',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Standard GPT-4',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Optimized compact version of GPT-4',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4-0125-preview',
    name: 'GPT-4 0125 Preview',
    description: 'Preview version of GPT-4 0125',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4-01-preview',
    name: 'GPT-4 01 Preview',
    description: 'Preview version of GPT-4 01',
    vendorId: 'openai'
  },
  {
    id: 'gpt-4-audio-preview',
    name: 'GPT-4 Audio',
    description: 'Audio-enabled GPT-4',
    vendorId: 'openai'
  },

  // Abab Models
  {
    id: 'abab5.5-chat',
    name: 'Abab 5.5 Chat',
    description: 'Standard Abab chat model',
    vendorId: 'MiniMax'
  },
  {
    id: 'abab5.5s-chat',
    name: 'Abab 5.5s Chat',
    description: 'Enhanced Abab 5.5 chat',
    vendorId: 'MiniMax'
  },
  {
    id: 'abab6.5g-chat',
    name: 'Abab 6.5g Chat',
    description: 'Latest generation Abab chat',
    vendorId: 'MiniMax'
  },
  {
    id: 'abab6.5s-chat',
    name: 'Abab 6.5s Chat',
    description: 'Enhanced Abab 6.5 chat',
    vendorId: 'MiniMax'
  },
  {
    id: 'abab6.5t-chat',
    name: 'Abab 6.5t Chat',
    description: 'Tuned Abab 6.5 chat',
    vendorId: 'MiniMax'
  },

  // DeepSeek Models
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    description: 'DeepSeek conversational model',
    vendorId: 'deepseek'
  },

  // Doubao Models
  {
    id: 'Doubao-lite-128k',
    name: 'Doubao Lite 128K',
    description: 'Large context Doubao Lite',
    vendorId: 'doubao'
  },
  {
    id: 'Doubao-lite-32k',
    name: 'Doubao Lite 32K',
    description: 'Medium context Doubao Lite',
    vendorId: 'doubao'
  },
  {
    id: 'Doubao-lite-4k',
    name: 'Doubao Lite 4K',
    description: 'Standard Doubao Lite',
    vendorId: 'doubao'
  },
  {
    id: 'Doubao-pro-128k',
    name: 'Doubao Pro 128K',
    description: 'Large context Doubao Pro',
    vendorId: 'doubao'
  },
  {
    id: 'Doubao-pro-32k',
    name: 'Doubao Pro 32K',
    description: 'Medium context Doubao Pro',
    vendorId: 'doubao'
  },
  {
    id: 'Doubao-pro-4k',
    name: 'Doubao Pro 4K',
    description: 'Standard Doubao Pro',
    vendorId: 'doubao'
  },

  // ERNIE Models
  {
    id: 'ERNIE-3.5-8K',
    name: 'ERNIE 3.5 8K',
    description: 'ERNIE 3.5 with 8K context',
    vendorId: 'baidu'
  },
  {
    id: 'ERNIE-4.0-8K',
    name: 'ERNIE 4.0 8K',
    description: 'Latest ERNIE 4.0 model',
    vendorId: 'baidu'
  },
  {
    id: 'ERNIE-Speed-128K',
    name: 'ERNIE Speed 128K',
    description: 'Fast ERNIE with large context',
    vendorId: 'baidu'
  },
  {
    id: 'ERNIE-Speed-8K',
    name: 'ERNIE Speed 8K',
    description: 'Fast ERNIE with standard context',
    vendorId: 'baidu'
  },
  {
    id: 'ERNIE-Tiny-8K',
    name: 'ERNIE Tiny 8K',
    description: 'Compact ERNIE model',
    vendorId: 'baidu'
  },

  // GLM Models
  {
    id: 'glm-3-turbo',
    name: 'GLM-3 Turbo',
    description: 'Fast GLM-3 model',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4',
    name: 'GLM-4',
    description: 'Latest GLM model',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-air',
    name: 'GLM-4 Air',
    description: 'Lightweight GLM-4',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-airx',
    name: 'GLM-4 Air X',
    description: 'Enhanced GLM-4 Air',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-flash',
    name: 'GLM-4 Flash',
    description: 'High-speed GLM-4',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-flashx',
    name: 'GLM-4 Flash X',
    description: 'Enhanced GLM-4 Flash',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-long',
    name: 'GLM-4 Long',
    description: 'GLM-4 with extended context',
    vendorId: 'zhipu'
  },
  {
    id: 'glm-4-plus',
    name: 'GLM-4 Plus',
    description: 'Advanced GLM-4 model',
    vendorId: 'zhipu'
  },

  // Moonshot Models
  {
    id: 'moonshot-v1-128k',
    name: 'Moonshot v1 128K',
    description: 'Large context Moonshot model',
    vendorId: 'moonshot'
  },
  {
    id: 'moonshot-v1-32k',
    name: 'Moonshot v1 32K',
    description: 'Medium context Moonshot model',
    vendorId: 'moonshot'
  },
  {
    id: 'moonshot-v1-8k',
    name: 'Moonshot v1 8K',
    description: 'Standard Moonshot model',
    vendorId: 'moonshot'
  },

  // Qwen Models
  {
    id: 'qwen-long',
    name: 'Qwen Long',
    description: 'Extended context Qwen model',
    vendorId: 'alibaba'
  },
  {
    id: 'qwen-max',
    name: 'Qwen Max',
    description: 'Most capable Qwen model',
    vendorId: 'alibaba'
  },
  {
    id: 'qwen-plus',
    name: 'Qwen Plus',
    description: 'Enhanced Qwen model',
    vendorId: 'alibaba'
  },
  {
    id: 'qwen-turbo',
    name: 'Qwen Turbo',
    description: 'Fast Qwen model',
    vendorId: 'alibaba'
  },

  // SparkDesk Models
  {
    id: 'SparkDesk-4.0-Ultra',
    name: 'SparkDesk 4.0 Ultra',
    description: 'Most capable SparkDesk model',
    vendorId: 'iflytek'
  },
  {
    id: 'SparkDesk-Lite',
    name: 'SparkDesk Lite',
    description: 'Lightweight SparkDesk model',
    vendorId: 'iflytek'
  },
  {
    id: 'SparkDesk-Max',
    name: 'SparkDesk Max',
    description: 'Advanced SparkDesk model',
    vendorId: 'iflytek'
  },
  {
    id: 'SparkDesk-Max-32k',
    name: 'SparkDesk Max 32K',
    description: 'Extended context SparkDesk Max',
    vendorId: 'iflytek'
  },
  {
    id: 'SparkDesk-Pro',
    name: 'SparkDesk Pro',
    description: 'Professional SparkDesk model',
    vendorId: 'iflytek'
  },
  {
    id: 'SparkDesk-Pro-128K',
    name: 'SparkDesk Pro 128K',
    description: 'Large context SparkDesk Pro',
    vendorId: 'iflytek'
  },

  // Anthropic Models - 更新为新的模型ID
  {
    id: 'claude-3-5-sonnet-20240620',
    name: 'Claude 3.5 Sonnet',
    description: 'Latest Claude 3.5 model with balanced performance',
    vendorId: 'anthropic'
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    description: 'Fast and efficient Claude 3 model',
    vendorId: 'anthropic'
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    description: 'Most capable Claude 3 model',
    vendorId: 'anthropic'
  },

  // ... 其他模型保持不变 ...

  // O1 Preview Models
  {
    id: 'o1-preview',
    name: 'O1 Preview',
    description: 'Preview version of O1 model',
    vendorId: 'openai'
  },
  {
    id: 'o1-mini',
    name: 'O1 Mini',
    description: 'Mini version of O1 model',
    vendorId: 'openai'
  }
];

interface APIConfig {
  baseUrl: string;
  apiKey: string;
}

// 加自定义模型的接口
interface CustomModel {
  id: string;
  name: string;
  description: string;
  customBaseUrl?: string;
  customApiKey?: string;
}

interface EditingModel extends Model {
  customBaseUrl?: string;
  customApiKey?: string;
}

// 修改 parseSSEResponse 函数
const parseSSEResponse = (data: string) => {
  const lines = data.split('\n');
  let content = '';
  let buffer = '';
  
  for (const line of lines) {
    buffer += line;
    if (line.trim() === '') {
      // 处理完整的数据块
      if (buffer.includes('data: ')) {
        const dataStr = buffer.replace(/^data: /, '').trim();
        if (dataStr === '[DONE]') {
          buffer = '';
          continue;
        }
        try {
          const json = JSON.parse(dataStr);
          const delta = json.choices?.[0]?.delta?.content || '';
          content += delta;
        } catch (e) {
          console.error('Failed to parse SSE message:', e);
        }
      }
      buffer = '';
    }
  }
  
  return content;
};

// 添加一个辅助函数来判断是否是 o1 系列模型
const isO1Model = (modelId: string) => {
  return modelId.includes('o1') || modelId.includes('01-preview');
};

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [modelChats, setModelChats] = useState<ModelChat[]>([]);
  const [apiConfig, setApiConfig] = useState<APIConfig>({
    baseUrl: 'https://aiproxy.hzh.sealos.run',
    apiKey: 'sk-tLMuhdnWARSFd6OPC542Ac6cF9324d7889Bc93C0C8C3E15b'
  });
  const [showApiConfig, setShowApiConfig] = useState(false);
  const resizeRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [customModel, setCustomModel] = useState<CustomModel>({
    id: '',
    name: '',
    description: ''
  });
  const [showCustomModelForm, setShowCustomModelForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingModel, setEditingModel] = useState<EditingModel | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [includeHistory, setIncludeHistory] = useState(true);
  const [globalStreamEnabled, setGlobalStreamEnabled] = useState(true);

  // 获取当前语言的翻译
  const t = translations[language];

  // 加语言切换函数
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
    localStorage.setItem('language', language === 'en' ? 'zh' : 'en');
  };

  // 初始化语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'zh';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 初始化深色模式
  useEffect(() => {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 初始化主题
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // 当选中的模型发生变化时
    setModelChats(prev => {
      // 保留所有现有的聊天记录
      const existingChats = [...prev];
      
      // 为新添加的模型创建聊天记录
      selectedModels.forEach(model => {
        if (!existingChats.some(chat => chat.modelId === model.id)) {
          existingChats.push({
            modelId: model.id,
            messages: [],
            input: '',
            isHidden: false
          });
        }
      });
      
      // 更新所有聊天记录的显示状态
      return existingChats.map(chat => ({
        ...chat,
        isHidden: !selectedModels.some(model => model.id === chat.modelId)
      }));
    });
  }, [selectedModels]);

  const handleModelSelect = async (model: Model) => {
    setSelectedModels(prev => [...prev, model]);
    
    // 检查是否存在该模型的历史聊天记录
    const existingChat = modelChats.find(chat => chat.modelId === model.id);
    
    if (existingChat) {
      // 如果存在历史记录，则取消隐藏
      setModelChats(prev => prev.map(chat => {
        if (chat.modelId === model.id) {
          return {
            ...chat,
            isHidden: false
          };
        }
        return chat;
      }));
    } else {
      // 如果不存在历史记录，则创建新的聊天记录
      setModelChats(prev => [...prev, {
        modelId: model.id,
        messages: [],
        input: '',
        isHidden: false
      }]);
    }
  };

  const handleStartChat = () => {
    if (selectedModels.length > 0) {
      setIsModelSelectorOpen(false);
    }
  };

  // 修改发送息函数支持流式输出
  const handleSendMessage = async () => {
    if (!input.trim() || selectedModels.length === 0) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      modelId: 'user',
    };

    setInput('');
    
    setModelChats(prev => prev.map(chat => ({
      ...chat,
      messages: [...chat.messages, userMessage],
      isLoading: true
    })));

    selectedModels.forEach(async model => {
      try {
        const baseUrl = model.customBaseUrl || apiConfig.baseUrl;
        const apiKey = model.customApiKey || apiConfig.apiKey;

        const currentChat = modelChats.find(chat => chat.modelId === model.id);
        const messages = includeHistory 
          ? (currentChat ? [...currentChat.messages, userMessage] : [userMessage])
          : [userMessage];

        // 根据模型类型决定是否使用流式输出
        const useStream = globalStreamEnabled && !isO1Model(model.id);

        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model.id,
            messages: messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            temperature: 0.7,
            max_tokens: 1000,
            stream: useStream
          }),
        });

        if (!response.ok) throw new Error('Request failed');

        if (useStream) {
          // 流式输出处理
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let accumulatedContent = '';

          setModelChats(prev => prev.map(chat => {
            if (chat.modelId !== model.id) return chat;
            return {
              ...chat,
              messages: [...chat.messages, {
                role: 'assistant',
                content: '',
                modelId: model.id
              }]
            };
          }));

          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const newContent = parseSSEResponse(chunk);
            accumulatedContent += newContent;

            setModelChats(prev => prev.map(chat => {
              if (chat.modelId !== model.id) return chat;
              const messages = [...chat.messages];
              messages[messages.length - 1] = {
                role: 'assistant',
                content: accumulatedContent,
                modelId: model.id
              };
              return {
                ...chat,
                messages,
              };
            }));
          }
        } else {
          // 非流式输出处理
          const data = await response.json();
          const content = data.choices[0]?.message?.content || '';

          setModelChats(prev => prev.map(chat => {
            if (chat.modelId !== model.id) return chat;
            return {
              ...chat,
              messages: [...chat.messages, {
                role: 'assistant',
                content: content,
                modelId: model.id
              }],
              isLoading: false
            };
          }));
        }

        setModelChats(prev => prev.map(chat => 
          chat.modelId === model.id ? { ...chat, isLoading: false } : chat
        ));

      } catch (error) {
        console.error(`Error with model ${model.id}:`, error);
        setModelChats(prev => prev.map(chat => {
          if (chat.modelId !== model.id) return chat;
          return {
            ...chat,
            isLoading: false,
            messages: [...chat.messages, {
              role: 'assistant',
              content: `Error: Failed to get response from ${model.id}`,
              modelId: model.id
            }]
          };
        }));
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveModel = (modelId: string) => {
    // 更新选中的模型列表
    setSelectedModels(prev => prev.filter(model => model.id !== modelId));
    
    // 更新本地存储中的模型列表
    const updatedModels = selectedModels.filter(model => model.id !== modelId);
    if (updatedModels.length === 0) {
      localStorage.removeItem('selectedModels');
    } else {
      localStorage.setItem('selectedModels', JSON.stringify(updatedModels));
    }
    
    // 更新modelChats，只隐藏被删除模型的聊天框，但保留其聊天记录
    setModelChats(prev => prev.map(chat => {
      if (chat.modelId === modelId) {
        return {
          ...chat,
          isHidden: true // 添加一个标记来隐藏聊天框，而不是删除记录
        };
      }
      return chat;
    }));
  };

  const handleResize = (modelId: string, newWidth: number) => {
    setModelChats(prev => prev.map(chat => 
      chat.modelId === modelId ? { ...chat, width: newWidth } : chat
    ));
  };

  const handleAddCustomModel = () => {
    if (!customModel.id.trim() || !customModel.name.trim()) {
      alert('Model ID and Name are required');
      return;
    }
    
    const newModel: Model = {
      id: customModel.id,
      name: customModel.name,
      description: customModel.description || 'Custom Model',
      vendorId: 'custom',
      customBaseUrl: customModel.customBaseUrl,
      customApiKey: customModel.customApiKey
    };

    setSelectedModels(prev => [...prev, newModel]);
    setCustomModel({ id: '', name: '', description: '' });
    setShowCustomModelForm(false);
    setIsModelSelectorOpen(false);
  };

  // 添加测试连接函
  const testConnection = async (model: EditingModel | CustomModel) => {
    setIsTestingConnection(true);
    try {
      const baseUrl = model.customBaseUrl || apiConfig.baseUrl;
      const apiKey = model.customApiKey || apiConfig.apiKey;

      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model.id,
          messages: [{ role: 'user', content: 'Test connection' }],
          temperature: 0.7,
          max_tokens: 10
        }),
      });

      if (response.ok) {
        alert(t.ui.connectionSuccess);
      } else {
        const error = await response.json();
        alert(`${t.ui.connectionFailed} ${error.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  // 添加编辑模型函数
  const handleEditModel = (model: Model) => {
    if (!model) return;
    
    setEditingModel({
      ...model,
      customBaseUrl: (model as EditingModel).customBaseUrl || apiConfig.baseUrl,
      customApiKey: (model as EditingModel).customApiKey || apiConfig.apiKey
    });
    setIsModelSelectorOpen(true);
  };

  // 更新保存辑函数
  const handleSaveEdit = () => {
    if (!editingModel) return;

    setSelectedModels(prev => prev.map(model => 
      model.id === editingModel.id ? editingModel : model
    ));
    setEditingModel(null);
    setIsModelSelectorOpen(false);
  };

  // 修改 handleRegenerateSingle 函数
  const handleRegenerateSingle = async (modelId: string, userMessage: Message) => {
    const model = selectedModels.find(m => m.id === modelId);
    if (!model) return;

    setModelChats(prev => prev.map(chat => {
      if (chat.modelId !== modelId) return chat;
      
      const messageIndex = chat.messages.findIndex(msg => 
        msg.role === 'user' && msg.content === userMessage.content
      );
      
      if (messageIndex === -1) return chat;

      // 找到这条用户消息后面的第一条AI回复
      const nextAssistantIndex = chat.messages.findIndex((msg, index) => 
        index > messageIndex && msg.role === 'assistant'
      );

      if (nextAssistantIndex === -1) return chat;

      // 保留所有消息，只删除要重新生成的那条AI回复
      const messages = [
        ...chat.messages.slice(0, nextAssistantIndex),
        ...chat.messages.slice(nextAssistantIndex + 1)
      ];
      
      return {
        ...chat,
        isLoading: true,
        messages: messages
      };
    }));

    try {
      const baseUrl = model.customBaseUrl || apiConfig.baseUrl;
      const apiKey = model.customApiKey || apiConfig.apiKey;
      const useStream = !isO1Model(model.id);

      // 获取当前模型的聊天历史，只包含到当前用户息为止的历史
      const currentChat = modelChats.find(chat => chat.modelId === modelId);
      const chatHistory = includeHistory && currentChat 
        ? currentChat.messages.slice(0, currentChat.messages.findIndex(m => 
            m.role === 'user' && m.content === userMessage.content
          ) + 1)
        : [userMessage];

      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model.id,
          messages: chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1000,
          stream: useStream
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      if (useStream) {
        // 原有的流式输出处理逻辑
        // ... 保持不变 ...
      } else {
        // 非流式输出处理
        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';

        setModelChats(prev => prev.map(chat => {
          if (chat.modelId !== modelId) return chat;
          
          const messageIndex = chat.messages.findIndex(msg => 
            msg.role === 'user' && msg.content === userMessage.content
          );

          if (messageIndex === -1) return chat;

          const messages = [...chat.messages];
          messages[messageIndex + 1] = {
            role: 'assistant',
            content: content,
            modelId: model.id
          };

          return {
            ...chat,
            messages,
            isLoading: false
          };
        }));
      }

      // 完成后移除加载状态
      setModelChats(prev => prev.map(chat => 
        chat.modelId === modelId ? { ...chat, isLoading: false } : chat
      ));

    } catch (error) {
      console.error(`Error with model ${model.id}:`, error);
      setModelChats(prev => prev.map(chat => {
        if (chat.modelId !== modelId) return chat;
        
        const messageIndex = chat.messages.findIndex(msg => 
          msg.role === 'user' && msg.content === userMessage.content
        );

        if (messageIndex === -1) return chat;

        const errorMessage: Message = {
          role: 'assistant',
          content: `Error: Failed to get response from ${model.id}`,
          modelId: model.id
        };

        const messages = [...chat.messages];
        messages[messageIndex + 1] = errorMessage;

        return {
          ...chat,
          isLoading: false,
          messages
        };
      }));
    }
  };

  // 修改 handleRegenerate 函数
  const handleRegenerate = async () => {
    const lastUserMessage = modelChats.flatMap(chat => chat.messages).find(msg => msg.role === 'user');
    if (!lastUserMessage) return;

    // 设置所有模型的加载状态
    setModelChats(prev => prev.map(chat => ({
      ...chat,
      isLoading: true,
      messages: chat.messages.filter(msg => msg.role !== 'assistant')
    })));

    selectedModels.forEach(async model => {
      try {
        const baseUrl = model.customBaseUrl || apiConfig.baseUrl;
        const apiKey = model.customApiKey || apiConfig.apiKey;
        const useStream = globalStreamEnabled && !isO1Model(model.id);

        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model.id,
            messages: [{ role: 'user', content: lastUserMessage.content }],
            temperature: 0.7,
            max_tokens: 1000,
            stream: useStream
          }),
        });

        if (!response.ok) throw new Error('Request failed');

        if (useStream) {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let accumulatedContent = '';

          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const newContent = parseSSEResponse(chunk);
            accumulatedContent += newContent;

            setModelChats(prev => prev.map(chat => {
              if (chat.modelId !== model.id) return chat;
              return {
                ...chat,
                messages: [...chat.messages.filter(msg => msg.role !== 'assistant'), {
                  role: 'assistant',
                  content: accumulatedContent,
                  modelId: model.id
                }]
              };
            }));
          }
        } else {
          const data = await response.json();
          const content = data.choices[0]?.message?.content || '';

          setModelChats(prev => prev.map(chat => {
            if (chat.modelId !== model.id) return chat;
            return {
              ...chat,
              messages: [...chat.messages.filter(msg => msg.role !== 'assistant'), {
                role: 'assistant',
                content: content,
                modelId: model.id
              }],
              isLoading: false
            };
          }));
        }

        setModelChats(prev => prev.map(chat => 
          chat.modelId === model.id ? { ...chat, isLoading: false } : chat
        ));

      } catch (error) {
        console.error(`Error with model ${model.id}:`, error);
        setModelChats(prev => prev.map(chat => {
          if (chat.modelId !== model.id) return chat;
          return {
            ...chat,
            isLoading: false,
            messages: [...chat.messages.filter(msg => msg.role !== 'assistant'), {
              role: 'assistant',
              content: `Error: Failed to get response from ${model.id}`,
              modelId: model.id
            }]
          };
        }));
      }
    });
  };

  // 从本地存储加载聊天记录
  useEffect(() => {
    const savedChats = localStorage.getItem('modelChats');
    const savedModels = localStorage.getItem('selectedModels');
    
    if (savedChats && savedModels) {
      try {
        const parsedChats = JSON.parse(savedChats);
        const parsedModels = JSON.parse(savedModels);
        setModelChats(parsedChats);
        setSelectedModels(parsedModels);
      } catch (error) {
        console.error('Error loading saved chats:', error);
      }
    }
  }, []);

  // 聊天记录或选中的模发生变化时保存到本地存储
  useEffect(() => {
    if (modelChats.length > 0) {
      localStorage.setItem('modelChats', JSON.stringify(modelChats));
    }
    if (selectedModels.length > 0) {
      localStorage.setItem('selectedModels', JSON.stringify(selectedModels));
    }
  }, [modelChats, selectedModels]);

  // 添加清除历记录功能
  const clearHistory = () => {
    if (window.confirm(t.ui.confirmClearHistory)) {
      setModelChats(prev => prev.map(chat => ({
        ...chat,
        messages: []
      })));
      localStorage.removeItem('modelChats');
    }
  };

  // 添加一个新的清除所有记录的函数
  const clearAllChats = () => {
    if (window.confirm(t.ui.confirmClearAllChats)) {
      // 清除所有聊天记录
      setModelChats(prev => prev.map(chat => ({
        ...chat,
        messages: []
      })));
      // 清除本地存储
      localStorage.removeItem('modelChats');
      localStorage.removeItem('selectedModels');
      // 清除选中的模型
      setSelectedModels([]);
    }
  };

  // 添加一个新的清除所有模型的函数
  const clearAllModels = () => {
    if (window.confirm(t.ui.confirmClearAllModels)) {
      setSelectedModels([]);
      localStorage.removeItem('selectedModels');
    }
  };

  return (
    <main className="container mx-auto max-w-full p-4 dark:bg-gray-900 transition-colors duration-200">
      <div className="mb-8 p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">{t.ui.apiConfiguration}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={language === 'en' ? '切换到中文' : 'Switch to English'}
            >
              {language === 'en' ? '中' : 'En'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {showApiConfig ? t.ui.hideConfig : t.ui.showConfig}
            </button>
          </div>
        </div>
        
        {showApiConfig && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.ui.apiBaseUrl}
              </label>
              <input
                type="text"
                value={apiConfig.baseUrl}
                onChange={(e) => setApiConfig(prev => ({
                  ...prev,
                  baseUrl: e.target.value
                }))}
                className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter API Base URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.ui.apiKey}
              </label>
              <input
                type="password"
                value={apiConfig.apiKey}
                onChange={(e) => setApiConfig(prev => ({
                  ...prev,
                  apiKey: e.target.value
                }))}
                className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter API Key"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col h-[90vh] dark:text-white relative pb-16">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-2 flex-wrap items-center">
            {selectedModels.map(model => (
              <span key={model.id} className="px-3 py-1 bg-blue-100 rounded flex items-center">
                {t.models[model.id as keyof typeof t.models] || model.name}
                <button
                  onClick={() => handleRemoveModel(model.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {selectedModels.length > 0 && (
              <button
                onClick={clearAllModels}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 flex items-center gap-1"
                title={t.ui.clearAllModels}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">{t.ui.clearModels}</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
          {modelChats
            .filter(chat => !chat.isHidden)
            .map((chat) => (
              <div
                key={chat.modelId}
                className="border rounded-lg flex flex-col h-[500px] dark:border-gray-700"
              >
                <div className="p-2 bg-gray-100 dark:bg-gray-800 flex justify-between items-center border-b dark:border-gray-700">
                  <span className="font-bold dark:text-white">
                    {selectedModels.find(m => m.id === chat.modelId)?.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditModel(selectedModels.find(m => m.id === chat.modelId)!)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      title="Edit Model"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveModel(chat.modelId)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {chat.messages.map((message, msgIndex) => {
                    // 如果是空消息且不是最后一条加载中的消息，则跳过渲染
                    if (!message.content && !(chat.isLoading && msgIndex === chat.messages.length - 1)) {
                      return null;
                    }

                    return (
                      <div 
                        key={`${msgIndex}-${message.content}`} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        <div className="max-w-[70%] bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold dark:text-white">
                              {message.role === 'user' ? t.ui.youMessage : selectedModels.find(m => m.id === message.modelId)?.name}
                            </span>
                            {message.role === 'user' && (
                              <button
                                onClick={() => handleRegenerateSingle(chat.modelId, message)}
                                className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                title={t.ui.regenerateResponse}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              </button>
                            )}
                          </div>
                          {message.content ? (
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{message.content}</p>
                          ) : chat.isLoading && msgIndex === chat.messages.length - 1 ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

          <button
            onClick={() => setIsModelSelectorOpen(true)}
            className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-[500px] hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <svg 
              className="w-12 h-12 text-gray-400 mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            <span className="text-gray-500">Add Model</span>
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t dark:border-gray-700 shadow-lg z-50">
          <div className="container mx-auto max-w-full">
            <div className="flex gap-2 max-w-[1200px] mx-auto items-center">
              <button
                onClick={() => setGlobalStreamEnabled(!globalStreamEnabled)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  globalStreamEnabled 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                } relative group`}
                title={globalStreamEnabled ? t.ui.streamEnabled : t.ui.streamDisabled}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={globalStreamEnabled 
                      ? "M13 10V3L4 14h7v7l9-11h-7z"  // 闪电图标表示流式输出
                      : "M9 13h6m-3-3v6"               // 加号图标表示非流式
                    }
                  />
                </svg>
                <span className="hidden sm:inline">
                  {globalStreamEnabled ? t.ui.streaming : t.ui.nonStreaming}
                </span>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {globalStreamEnabled ? t.ui.streamingTooltip : t.ui.nonStreamingTooltip}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              </button>

              <button
                onClick={() => setIncludeHistory(!includeHistory)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  includeHistory 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                } relative group`}
                title={includeHistory ? t.ui.withHistory : t.ui.withoutHistory}
              >
                <svg className={`w-5 h-5 transition-transform ${includeHistory ? 'rotate-0' : 'rotate-180'}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">
                  {includeHistory ? t.ui.includeHistory : t.ui.noHistory}
                </span>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {includeHistory ? t.ui.historyModeTooltip : t.ui.noHistoryModeTooltip}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder={t.ui.typeMessage}
              />

              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedModels.length === 0}
              >
                {t.ui.sendMessage}
              </button>

              {modelChats.some(chat => chat.messages.length > 0) && (
                <>
                  <button
                    onClick={handleRegenerate}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    title={t.ui.regenerateResponse}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={clearHistory}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                    title={t.ui.clearHistory}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModelSelectorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">
                {editingModel 
                  ? t.ui.editModelTitle.replace('{modelName}', editingModel.name)
                  : t.ui.selectVendor}
              </h2>
              <button
                onClick={() => {
                  setIsModelSelectorOpen(false);
                  setSelectedVendor(null);
                  setEditingModel(null);
                  setShowCustomModelForm(false);  // 重置自定义模型表单状态
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {showCustomModelForm ? (
              // 自定义模型表单
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.ui.modelId}
                  </label>
                  <input
                    type="text"
                    value={customModel.id}
                    onChange={(e) => setCustomModel(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t.ui.enterModelId}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.ui.modelName}
                  </label>
                  <input
                    type="text"
                    value={customModel.name}
                    onChange={(e) => setCustomModel(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t.ui.enterModelName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.ui.modelDescription}
                  </label>
                  <input
                    type="text"
                    value={customModel.description}
                    onChange={(e) => setCustomModel(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t.ui.enterModelDescription}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.ui.apiBaseUrl}
                  </label>
                  <input
                    type="text"
                    value={customModel.customBaseUrl || ''}
                    onChange={(e) => setCustomModel(prev => ({ ...prev, customBaseUrl: e.target.value }))}
                    className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={apiConfig.baseUrl}
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.ui.leaveEmptyDefault} {apiConfig.baseUrl}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.ui.apiKey}
                  </label>
                  <input
                    type="password"
                    value={customModel.customApiKey || ''}
                    onChange={(e) => setCustomModel(prev => ({ ...prev, customApiKey: e.target.value }))}
                    className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t.ui.enterApiKey}
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.ui.leaveEmptyDefaultKey}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleAddCustomModel}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {t.ui.addModel}
                  </button>
                  <button
                    onClick={() => setShowCustomModelForm(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    {t.ui.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {selectedVendor ? (
                  <>
                    <button
                      onClick={() => setSelectedVendor(null)}
                      className="mb-4 text-blue-500 hover:text-blue-600 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      {t.ui.backToVendors}
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {AVAILABLE_MODELS
                        .filter(model => model.vendorId === selectedVendor && !selectedModels.find(m => m.id === model.id))
                        .map(model => (
                          <div
                            key={model.id}
                            className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all dark:border-gray-700 dark:hover:border-blue-400"
                            onClick={() => {
                              handleModelSelect(model);
                              setIsModelSelectorOpen(false);
                              setSelectedVendor(null);
                            }}
                          >
                            <h3 className="font-bold dark:text-white">
                              {t.models[model.id as keyof typeof t.models] || model.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{model.description}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">ID: {model.id}</p>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {VENDORS.map((vendor) => (
                        <div 
                          key={vendor.id} 
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700 dark:border-gray-700"
                          onClick={() => setSelectedVendor(vendor.id)}
                        >
                          <div className="flex flex-col items-center">
                            <img 
                              src={vendor.logo} 
                              alt={vendor.name} 
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23666">${vendor.name.charAt(0)}</text></svg>`;
                              }}
                            />
                            <h3 className="mt-2 font-semibold dark:text-white">{vendor.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {t.vendors[vendor.id.toLowerCase() as keyof typeof t.vendors]?.description || vendor.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t dark:border-gray-700">
                      <button
                        onClick={() => setShowCustomModelForm(true)}
                        className="w-full p-4 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2 dark:text-gray-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>{t.ui.addCustomModel}</span>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
