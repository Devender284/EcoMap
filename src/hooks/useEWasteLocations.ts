import { useState, useCallback } from 'react';
import { EWasteLocation, ReportFormData } from '../types';

// Mock data for demonstration
const mockLocations: EWasteLocation[] = [
  {
    id: '1',
    lat: 28.6139,
    lng: 77.2090,
    wasteType: 'mobile',
    description: 'Old mobile phones dumped near residential area',
    reportedBy: 'Citizen #1',
    reportedAt: new Date('2024-01-15'),
    status: 'verified',
  },
  {
    id: '2',
    lat: 28.7041,
    lng: 77.1025,
    wasteType: 'computer',
    description: 'Computer monitors and CPUs',
    reportedBy: 'Citizen #2',
    reportedAt: new Date('2024-01-20'),
    status: 'pending',
  },
  {
    id: '3',
    lat: 28.5355,
    lng: 77.3910,
    wasteType: 'tv',
    description: 'Multiple old TVs abandoned',
    reportedBy: 'Citizen #3',
    reportedAt: new Date('2024-01-25'),
    status: 'collected',
  },
];

export const useEWasteLocations = () => {
  const [locations, setLocations] = useState<EWasteLocation[]>(mockLocations);

  const addLocation = useCallback((formData: ReportFormData) => {
    const newLocation: EWasteLocation = {
      id: crypto.randomUUID(),
      lat: formData.lat,
      lng: formData.lng,
      wasteType: formData.wasteType,
      description: formData.description,
      reportedBy: formData.reportedBy,
      reportedAt: new Date(),
      status: 'pending',
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : undefined,
    };

    setLocations((prev) => [...prev, newLocation]);
    return newLocation;
  }, []);

  const removeLocation = useCallback((id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  }, []);

  const updateLocationStatus = useCallback((id: string, status: EWasteLocation['status']) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, status } : loc))
    );
  }, []);

  return {
    locations,
    addLocation,
    removeLocation,
    updateLocationStatus,
  };
};
