export interface PrinterModel {
  id: string;
  brand: string;
  model: string;
  series: string;
  image?: string;
}

export interface TroubleshootingStep {
  id: string;
  question: string;
  answers: TroubleshootingAnswer[];
}

export interface TroubleshootingAnswer {
  text: string;
  nextStepId?: string;
  solution?: string;
  action?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  videoUrl: string;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  price: number;
  category: string;
  compatibility: string[];
  image: string;
}

export interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastCompleted?: string;
  nextDue: string;
}