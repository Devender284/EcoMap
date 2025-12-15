import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { EWasteLocation } from '../types';
import { getMarkerColor, getWasteTypeLabel, formatDate } from '../utils/helpers';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  locations: EWasteLocation[];
  onMapClick?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

// Component to handle map clicks
function MapClickHandler({ onClick }: { onClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onClick) {
        onClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

// Create custom marker icon with color
const createColoredIcon = (color: string, isSelected: boolean = false) => {
  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 10 16 26 16 26s16-16 16-26c0-8.8-7.2-16-16-16z" 
            fill="${color}" 
            stroke="${isSelected ? '#FFF' : '#000'}" 
            stroke-width="${isSelected ? '3' : '1'}"/>
      <circle cx="16" cy="16" r="6" fill="#FFF"/>
    </svg>
  `;
  
  return new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(svgIcon),
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
};

export default function MapComponent({ locations, onMapClick, selectedLocation }: MapComponentProps) {
  const defaultCenter: LatLngExpression = [28.6139, 77.2090]; // Delhi, India
  const defaultZoom = 11;

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onClick={onMapClick} />
        
        {/* Render markers for all e-waste locations */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createColoredIcon(getMarkerColor(location.wasteType), false)}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                  {getWasteTypeLabel(location.wasteType)}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Description:</strong> {location.description}
                </p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
                  <strong>Reported by:</strong> {location.reportedBy}
                </p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
                  <strong>Date:</strong> {formatDate(location.reportedAt)}
                </p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>
                  <strong>Status:</strong>{' '}
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor:
                        location.status === 'verified'
                          ? '#10B981'
                          : location.status === 'collected'
                          ? '#6B7280'
                          : '#F59E0B',
                      color: '#FFF',
                      fontSize: '11px',
                    }}
                  >
                    {location.status}
                  </span>
                </p>
                {location.imageUrl && (
                  <img
                    src={location.imageUrl}
                    alt="E-waste"
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      borderRadius: '4px',
                    }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Show selected location marker (for new reports) */}
        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={createColoredIcon('#FF0000', true)}
          >
            <Popup>
              <div>
                <strong>Selected Location</strong>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>
                  Lat: {selectedLocation.lat.toFixed(4)}
                  <br />
                  Lng: {selectedLocation.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
