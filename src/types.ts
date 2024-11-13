export interface Model {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  customBaseUrl?: string;
  customApiKey?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  modelId: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface ModelChat {
  modelId: string;
  messages: Message[];
  input?: string;
  isHidden?: boolean;
  isLoading?: boolean;
  width?: number;
}

export interface APIConfig {
  baseUrl: string;
  apiKey: string;
} 