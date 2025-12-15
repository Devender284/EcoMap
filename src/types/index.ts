export interface EWasteLocation {
  id: string;
  lat: number;
  lng: number;
  wasteType: WasteType;
  description: string;
  imageUrl?: string;
  reportedBy: string;
  reportedAt: Date;
  status: 'pending' | 'verified' | 'collected';
}

export type WasteType = 
  | 'mobile' 
  | 'computer' 
  | 'tv' 
  | 'battery' 
  | 'appliance' 
  | 'other';

export interface ReportFormData {
  lat: number;
  lng: number;
  wasteType: WasteType;
  description: string;
  image?: File;
  reportedBy: string;
}

export interface AIClassificationResult {
  wasteType: WasteType;
  confidence: number;
  description: string;
}
