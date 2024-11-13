export const translations = {
  en: {
    vendors: {
      openai: {
        description: 'GPT-3.5 Series, GPT-4 Series, Vision and Audio Models'
      },
      anthropic: {
        description: 'Claude 3 Series (Opus, Sonnet, Haiku), Claude 2 Series'
      },
      baidu: {
        description: 'ERNIE Series (3.5, 4.0), ERNIE Speed, ERNIE Tiny'
      },
      zhipu: {
        description: 'GLM-3 Turbo, GLM-4 Series (Standard, Air, Flash, Long)'
      },
      moonshot: {
        description: 'Moonshot v1 Series (8K, 32K, 128K Context)'
      },
      alibaba: {
        description: 'Qwen Series (Turbo, Plus, Max, Long)'
      },
      iflytek: {
        description: 'SparkDesk Series (Pro, Max, Ultra, Lite)'
      },
      minimax: {
        description: 'Abab Series (5.5, 5.5s, 6.5g, 6.5s, 6.5t)'
      },
      deepseek: {
        description: 'DeepSeek Chat, Code, MoE Models'
      },
      doubao: {
        description: 'Doubao Series (Lite, Pro with 4K-128K Context)'
      }
    },
    ui: {
      apiConfiguration: 'API Configuration',
      apiBaseUrl: 'API Base URL',
      apiKey: 'API Key',
      hideConfig: 'Hide Config',
      showConfig: 'Show Config',
      back: 'Back to Vendors',
      addModel: 'Add Model',
      sendMessage: 'Send',
      typeMessage: 'Type your message...',
      testConnection: 'Test Connection',
      testing: 'Testing...',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      editModel: 'Edit',
      removeModel: 'Remove',
      regenerateResponse: 'Regenerate response',
      modelName: 'Model Name',
      baseUrl: 'Base URL',
      leaveEmptyDefault: 'Leave empty to use default:',
      leaveEmptyDefaultKey: 'Leave empty to use default API key',
      selectVendor: 'Select Vendor',
      connectionSuccess: 'Connection successful! Model is available.',
      connectionFailed: 'Connection failed:',
      modelIdRequired: 'Model ID and Name are required',
      darkMode: 'Switch to Dark Mode',
      lightMode: 'Switch to Light Mode',
      switchToChinese: 'Switch to Chinese',
      switchToEnglish: 'Switch to English',
      enterApiBaseUrl: 'Enter API Base URL',
      enterApiKey: 'Enter API Key',
      edit: 'Edit',
      modelId: 'Model ID',
      defaultBaseUrl: 'Default base URL:',
      defaultApiKey: 'Default API key',
      youMessage: 'You',
      assistantMessage: 'Assistant',
      addModelButton: 'Add Model',
      editModelTitle: 'Edit {modelName}',
      backToVendors: 'Back to Vendors',
      clearHistory: 'Clear History',
      confirmClearHistory: 'Are you sure you want to clear all chat history?',
      includeHistory: 'Include History',
      noHistory: 'No History',
      withHistory: 'Current: With History (May use more tokens)',
      withoutHistory: 'Current: Without History (Uses fewer tokens)',
      historyModeTooltip: 'Including chat history helps maintain context but uses more tokens',
      noHistoryModeTooltip: 'Excluding chat history uses fewer tokens but may lose context',
      clearAllChats: 'Clear all chats and models',
      confirmClearAllChats: 'Are you sure you want to clear all chats and remove all models? This action cannot be undone.',
      clearAll: 'Clear All',
      clearAllModels: 'Clear all selected models',
      confirmClearAllModels: 'Are you sure you want to remove all selected models?',
      clearModels: 'Clear Models',
      streamEnabled: 'Streaming Mode',
      streamDisabled: 'Non-Streaming Mode',
      streaming: 'Streaming',
      nonStreaming: 'Non-Streaming',
      streamingTooltip: 'Messages appear gradually as they are generated',
      nonStreamingTooltip: 'Messages appear all at once when completed',
      addCustomModel: 'Add Custom Model',
      enterModelId: 'Enter Model ID',
      enterModelName: 'Enter Model Name',
      modelDescription: 'Model Description',
      enterModelDescription: 'Enter Model Description',
      customModelTitle: 'Add Custom Model',
      configSaved: 'Configuration saved successfully',
      saveConfig: 'Save Configuration',
      selectModelFirst: 'Please select a model first',
      selectModelToTest: 'Select a model to test the configuration',
      saveAndApplyConfig: 'Save & Apply Configuration',
      usingModelConfig: ' (Using model specific configuration)',
      modelNotAvailable: 'Model is not available'
    },
    models: {
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
      'gpt-3.5-turbo-16k': 'GPT-3.5 Turbo 16K',
      'gpt-4-turbo': 'GPT-4 Turbo',
      'gpt-4': 'GPT-4',
      'gpt-4o-mini': 'GPT-4o Mini',
      'gpt-4-0125-preview': 'GPT-4 0125 Preview',
      'gpt-4-audio-preview': 'GPT-4 Audio',
      'claude-3-opus': 'Claude 3 Opus',
      'claude-3-sonnet': 'Claude 3 Sonnet',
      'claude-3-haiku': 'Claude 3 Haiku',
      'claude-2.1': 'Claude 2.1',
      'glm-3-turbo': 'GLM-3 Turbo',
      'glm-4': 'GLM-4',
      'glm-4-vision': 'GLM-4 Vision',
      'claude-3-5-sonnet-20240620': 'Claude 3.5 Sonnet',
      'claude-3-haiku-20240307': 'Claude 3 Haiku',
      'claude-3-opus-20240229': 'Claude 3 Opus',
      'gpt-3.5-turbo-1106': 'GPT-3.5 Turbo 1106',
      'gpt-4-32k': 'GPT-4 32K',
      'gpt-4-turbo-preview': 'GPT-4 Turbo Preview',
      'gpt-4-1106-preview': 'GPT-4 1106',
      'gpt-4-0613': 'GPT-4 0613',
      'gpt-4-01-preview': 'GPT-4 01 Preview',
      'o1-preview': 'O1 Preview',
      'o1-mini': 'O1 Mini'
    }
  },
  zh: {
    vendors: {
      openai: {
        description: 'GPT-3.5系列、GPT-4系列、视觉和语音模型'
      },
      anthropic: {
        description: 'Claude 3系列（旗舰版、标准版、轻量版）、Claude 2系列'
      },
      baidu: {
        description: '文心一言系列（3.5、4.0）、文心一言极速版、精简版'
      },
      zhipu: {
        description: 'GLM-3 Turbo、GLM-4系列（标准版、轻量版、闪电版、长文本）'
      },
      moonshot: {
        description: 'Moonshot v1系列（8K、32K、128K上下文）'
      },
      alibaba: {
        description: '通义千问系列（极速版、增强版、旗舰版、长文本）'
      },
      iflytek: {
        description: '讯飞星火系列（专业版、Max版、Ultra版、轻量版）'
      },
      minimax: {
        description: 'Abab系列（5.5、5.5s、6.5g、6.5s、6.5t）'
      },
      deepseek: {
        description: 'DeepSeek对话模型、代码模型、混合专家模型'
      },
      doubao: {
        description: '豆包系列（轻量版、专业版，支持4K-128K上下文）'
      }
    },
    ui: {
      apiConfiguration: 'API 配置',
      apiBaseUrl: 'API 基础地址',
      apiKey: 'API 密钥',
      hideConfig: '隐藏配置',
      showConfig: '显示配置',
      back: '返回供应商列表',
      addModel: '添加模型',
      sendMessage: '发送',
      typeMessage: '输入消息...',
      testConnection: '测试连接',
      testing: '测试中...',
      saveChanges: '保存更改',
      cancel: '取消',
      editModel: '编辑',
      removeModel: '移除',
      regenerateResponse: '重新生成回复',
      modelName: '模型名称',
      baseUrl: '基础地址',
      leaveEmptyDefault: '留空使用默认值：',
      leaveEmptyDefaultKey: '留空使用默认 API 密钥',
      selectVendor: '选择供应商',
      connectionSuccess: '连接成功！模型可用。',
      connectionFailed: '连接失败：',
      modelIdRequired: '模型 ID 和名称为必填项',
      darkMode: '切换到深色模式',
      lightMode: '切换到浅色模式',
      switchToChinese: '切换到中文',
      switchToEnglish: '切换到英文',
      enterApiBaseUrl: '请输入 API 基础地址',
      enterApiKey: '请输入 API 密钥',
      edit: '编辑',
      modelId: '模型 ID',
      defaultBaseUrl: '默认基础地址：',
      defaultApiKey: '默认 API 密钥',
      youMessage: '你',
      assistantMessage: '助手',
      addModelButton: '添加模型',
      editModelTitle: '编辑 {modelName}',
      backToVendors: '返回供应商列表',
      clearHistory: '清除历史',
      confirmClearHistory: '确定要清除所有聊天记录吗？',
      includeHistory: '包含历史',
      noHistory: '无历史',
      withHistory: '当前：包含历史记录（可能消耗更多token）',
      withoutHistory: '当前：不包含历史记录（节省token）',
      historyModeTooltip: '包含聊天历史有助于保持上下文连贯性，但会消耗更多token',
      noHistoryModeTooltip: '不包含聊天历史可以节省token，但可能失去上下文关联',
      clearAllChats: '清除所有聊天和模型',
      confirmClearAllChats: '确定要清除所有聊天记录并移除所有模型吗？此操作无法撤销。',
      clearAll: '清除全部',
      clearAllModels: '清除所有已选模型',
      confirmClearAllModels: '确定要移除所有已选择的模型吗？',
      clearModels: '清除模型',
      streamEnabled: '流式输出模式',
      streamDisabled: '非流式输出模式',
      streaming: '流式输出',
      nonStreaming: '非流式输出',
      streamingTooltip: '消息生成时逐步显示',
      nonStreamingTooltip: '消息生成完成后一次性显示',
      addCustomModel: '添加自定义模型',
      enterModelId: '输入模型ID',
      enterModelName: '输入模型名称',
      modelDescription: '模型描述',
      enterModelDescription: '输入模型描述',
      customModelTitle: '添加自定义模型',
      configSaved: '配置保存成功',
      saveConfig: '保存配置',
      selectModelFirst: '请先选择一个模型',
      selectModelToTest: '请选择一个模型来测试配置',
      saveAndApplyConfig: '保存并应用配置',
      usingModelConfig: ' (使用模型专用配置)',
      modelNotAvailable: '模型不可用'
    },
    models: {
      'gpt-3.5-turbo': 'GPT-3.5 智能助手',
      'gpt-3.5-turbo-16k': 'GPT-3.5 长文本助手',
      'gpt-4-turbo': 'GPT-4 智能助手',
      'gpt-4': 'GPT-4 标准版',
      'gpt-4o-mini': 'GPT-4o 精简版',
      'gpt-4-0125-preview': 'GPT-4 0125 预览版',
      'gpt-4-audio-preview': 'GPT-4 语音助手',
      'claude-3-opus': 'Claude 3 旗舰版',
      'claude-3-sonnet': 'Claude 3 标准版',
      'claude-3-haiku': 'Claude 3 轻量版',
      'claude-2.1': 'Claude 2.1 经典版',
      'glm-3-turbo': 'GLM-3 智能助手',
      'glm-4': 'GLM-4 标准版',
      'glm-4-vision': 'GLM-4 视觉助手',
      'claude-3-5-sonnet-20240620': 'Claude 3.5 标准版',
      'claude-3-haiku-20240307': 'Claude 3 轻量版',
      'claude-3-opus-20240229': 'Claude 3 旗舰版',
      'gpt-3.5-turbo-1106': 'GPT-3.5 Turbo 1106 版本',
      'gpt-4-32k': 'GPT-4 32K 长文本版',
      'gpt-4-turbo-preview': 'GPT-4 Turbo 预览版',
      'gpt-4-1106-preview': 'GPT-4 1106 预览版',
      'gpt-4-0613': 'GPT-4 0613 稳定版',
      'gpt-4-01-preview': 'GPT-4 01 预览版',
      'o1-preview': 'O1 预览版',
      'o1-mini': 'O1 精简版'
    }
  }
}; 