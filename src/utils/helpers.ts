import { WasteType } from '../types';

// Color mapping for different waste types
export const getMarkerColor = (wasteType: WasteType): string => {
  const colors: Record<WasteType, string> = {
    mobile: '#3B82F6',      // Blue
    computer: '#8B5CF6',    // Purple
    tv: '#EF4444',          // Red
    battery: '#F59E0B',     // Amber
    appliance: '#10B981',   // Green
    other: '#6B7280',       // Gray
  };
  
  return colors[wasteType];
};

// Get waste type label
export const getWasteTypeLabel = (wasteType: WasteType): string => {
  const labels: Record<WasteType, string> = {
    mobile: 'Mobile Devices',
    computer: 'Computers',
    tv: 'TVs & Monitors',
    battery: 'Batteries',
    appliance: 'Appliances',
    other: 'Other E-Waste',
  };
  
  return labels[wasteType];
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
