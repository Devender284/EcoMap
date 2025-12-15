import { WasteType } from '../types';
import { getMarkerColor, getWasteTypeLabel } from '../utils/helpers';

interface LegendProps {
  onFilterChange?: (type: WasteType | null) => void;
}

export default function Legend({ onFilterChange }: LegendProps) {
  const wasteTypes: WasteType[] = ['mobile', 'computer', 'tv', 'battery', 'appliance', 'other'];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>E-Waste Categories</h3>
      <div style={styles.legendItems}>
        {wasteTypes.map((type) => (
          <div
            key={type}
            style={styles.legendItem}
            onClick={() => onFilterChange && onFilterChange(type)}
          >
            <div
              style={{
                ...styles.colorBox,
                backgroundColor: getMarkerColor(type),
              }}
            />
            <span style={styles.label}>{getWasteTypeLabel(type)}</span>
          </div>
        ))}
      </div>
      <div style={styles.info}>
        <p style={styles.infoText}>
          Click on map markers to view details about e-waste locations.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFF',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '16px',
  } as React.CSSProperties,
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#1F2937',
  } as React.CSSProperties,
  legendItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  colorBox: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #000',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    color: '#374151',
  } as React.CSSProperties,
  info: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #E5E7EB',
  } as React.CSSProperties,
  infoText: {
    fontSize: '12px',
    color: '#6B7280',
    margin: 0,
    lineHeight: '1.5',
  } as React.CSSProperties,
};
