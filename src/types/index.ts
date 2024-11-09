export interface Message {
  role: 'user' | 'assistant';
  content: string;
  modelId: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  customBaseUrl?: string;
  customApiKey?: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  fallbackLogo?: string;
}

export interface ModelChat {
  modelId: string;
  messages: Message[];
  input: string;
  isLoading?: boolean;
  isHidden?: boolean;
  streamEnabled?: boolean;
}

export interface CustomModel extends Model {
  customBaseUrl?: string;
  customApiKey?: string;
}

export interface EditingModel extends Model {
  customBaseUrl?: string;
  customApiKey?: string;
} 