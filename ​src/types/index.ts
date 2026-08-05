export type MediaType = 'image' | 'video';

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  prompt: string;
  mediaUrl: string | null;
  mediaType: MediaType | null;
  aiResultUrl: string | null;
}

export interface AppSettings {
  apiKey: string;
  theme: 'light' | 'dark';
}
