import { useState } from 'react';
import MapComponent from './components/MapComponent';
import ReportForm from './components/ReportForm';
import Legend from './components/Legend';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { useEWasteLocations } from './hooks/useEWasteLocations';
import { ReportFormData } from './types';
import { Recycle } from 'lucide-react';
import './App.css';

function App() {
  const { locations, addLocation } = useEWasteLocations();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleFormSubmit = (data: ReportFormData) => {
    addLocation(data);
    setSelectedLocation(null);
    showToast('E-waste location reported successfully!', 'success');
  };

  const handleLocationSelect = () => {
    showToast('Click anywhere on the map to select a location', 'info');
  };

  return (
    <div className="app">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Recycle size={32} color="#10B981" />
            <h1>EcoMap</h1>
          </div>
          <p className="tagline">Crowdsourced E-Waste Tracking System</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <ReportForm
              selectedLocation={selectedLocation}
              onSubmit={handleFormSubmit}
              onLocationSelect={handleLocationSelect}
              onError={(msg) => showToast(msg, 'error')}
            />
            <Legend />
          </div>
        </aside>

        {/* Map */}
        <main className="map-section">
          <MapComponent
            locations={locations}
            onMapClick={handleMapClick}
            selectedLocation={selectedLocation}
          />
        </main>
      </div>

      {/* Stats Footer */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-value">{locations.length}</span>
          <span className="stat-label">Total Reports</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {locations.filter((l) => l.status === 'pending').length}
          </span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {locations.filter((l) => l.status === 'verified').length}
          </span>
          <span className="stat-label">Verified</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {locations.filter((l) => l.status === 'collected').length}
          </span>
          <span className="stat-label">Collected</span>
        </div>
      </div>
    </div>
  );
}

export default App;
