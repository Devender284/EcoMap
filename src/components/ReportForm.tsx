import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { Camera, MapPin, Upload, Loader2 } from 'lucide-react';
import { ReportFormData, WasteType, AIClassificationResult } from '../types';
import { classifyEWasteImage } from '../services/aiClassification';
import { getWasteTypeLabel } from '../utils/helpers';

interface ReportFormProps {
  selectedLocation: { lat: number; lng: number } | null;
  onSubmit: (data: ReportFormData) => void;
  onLocationSelect: () => void;
  onError?: (message: string) => void;
}

export default function ReportForm({ selectedLocation, onSubmit, onLocationSelect, onError }: ReportFormProps) {
  const [wasteType, setWasteType] = useState<WasteType>('mobile');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [aiResult, setAiResult] = useState<AIClassificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wasteTypes: WasteType[] = ['mobile', 'computer', 'tv', 'battery', 'appliance', 'other'];

  // Cleanup blob URL on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous URL to prevent memory leak
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      setImagePreview(newPreview);
      
      // Trigger AI classification
      setIsClassifying(true);
      setAiResult(null);
      
      try {
        const result = await classifyEWasteImage(file);
        setAiResult(result);
        setWasteType(result.wasteType); // Auto-select the classified type
        if (!description) {
          setDescription(result.description);
        }
      } catch (error) {
        console.error('AI classification failed:', error);
      } finally {
        setIsClassifying(false);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      onError?.('Please select a location on the map first!');
      return;
    }
    
    if (!reportedBy.trim()) {
      onError?.('Please enter your name!');
      return;
    }

    const formData: ReportFormData = {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      wasteType,
      description,
      reportedBy,
      image: image || undefined,
    };

    onSubmit(formData);
    
    // Reset form
    setWasteType('mobile');
    setDescription('');
    setReportedBy('');
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setAiResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="report-form" style={styles.container}>
      <h2 style={styles.title}>Report E-Waste Location</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Location Selection */}
        <div style={styles.section}>
          <label style={styles.label}>
            <MapPin size={16} style={{ marginRight: '8px' }} />
            GPS Location
          </label>
          <div style={styles.locationBox}>
            {selectedLocation ? (
              <div>
                <p style={styles.coordinates}>
                  Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
                </p>
                <button
                  type="button"
                  onClick={onLocationSelect}
                  style={styles.buttonSecondary}
                >
                  Change Location
                </button>
              </div>
            ) : (
              <div>
                <p style={styles.hint}>Click on the map to select a location</p>
                <button
                  type="button"
                  onClick={onLocationSelect}
                  style={styles.buttonPrimary}
                >
                  Select Location on Map
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div style={styles.section}>
          <label style={styles.label}>
            <Camera size={16} style={{ marginRight: '8px' }} />
            Upload Photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
          
          {imagePreview && (
            <div style={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" style={styles.previewImage} />
            </div>
          )}
          
          {isClassifying && (
            <div style={styles.aiProcessing}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ marginLeft: '8px' }}>AI is analyzing the image...</span>
            </div>
          )}
          
          {aiResult && (
            <div style={styles.aiResult}>
              <p style={styles.aiResultTitle}>🤖 AI Classification Result:</p>
              <p style={styles.aiResultText}>
                Type: <strong>{getWasteTypeLabel(aiResult.wasteType)}</strong>
              </p>
              <p style={styles.aiResultText}>
                Confidence: <strong>{(aiResult.confidence * 100).toFixed(1)}%</strong>
              </p>
              <p style={styles.aiResultDesc}>{aiResult.description}</p>
            </div>
          )}
        </div>

        {/* Waste Type Selection */}
        <div style={styles.section}>
          <label style={styles.label}>Waste Type</label>
          <select
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value as WasteType)}
            style={styles.select}
          >
            {wasteTypes.map((type) => (
              <option key={type} value={type}>
                {getWasteTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div style={styles.section}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the e-waste (quantity, condition, etc.)"
            style={styles.textarea}
            rows={3}
          />
        </div>

        {/* Reporter Name */}
        <div style={styles.section}>
          <label style={styles.label}>Your Name</label>
          <input
            type="text"
            value={reportedBy}
            onChange={(e) => setReportedBy(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          <Upload size={16} style={{ marginRight: '8px' }} />
          Submit Report
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFF',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1F2937',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } as React.CSSProperties,
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  locationBox: {
    padding: '12px',
    backgroundColor: '#F9FAFB',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
  } as React.CSSProperties,
  coordinates: {
    fontSize: '14px',
    margin: '0 0 8px 0',
    color: '#4B5563',
  } as React.CSSProperties,
  hint: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '8px',
  } as React.CSSProperties,
  buttonPrimary: {
    padding: '8px 16px',
    backgroundColor: '#3B82F6',
    color: '#FFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  buttonSecondary: {
    padding: '6px 12px',
    backgroundColor: '#FFF',
    color: '#3B82F6',
    border: '1px solid #3B82F6',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  fileInput: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
  } as React.CSSProperties,
  imagePreview: {
    marginTop: '12px',
  } as React.CSSProperties,
  previewImage: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
  } as React.CSSProperties,
  aiProcessing: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#EFF6FF',
    borderRadius: '6px',
    marginTop: '8px',
    fontSize: '14px',
    color: '#1E40AF',
  } as React.CSSProperties,
  aiResult: {
    padding: '12px',
    backgroundColor: '#F0FDF4',
    borderRadius: '6px',
    marginTop: '8px',
    border: '1px solid #86EFAC',
  } as React.CSSProperties,
  aiResultTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#166534',
  } as React.CSSProperties,
  aiResultText: {
    fontSize: '13px',
    margin: '4px 0',
    color: '#15803D',
  } as React.CSSProperties,
  aiResultDesc: {
    fontSize: '12px',
    margin: '8px 0 0 0',
    color: '#166534',
    fontStyle: 'italic',
  } as React.CSSProperties,
  select: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    backgroundColor: '#FFF',
  } as React.CSSProperties,
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontFamily: 'inherit',
    resize: 'vertical',
  } as React.CSSProperties,
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
  } as React.CSSProperties,
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#10B981',
    color: '#FFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8px',
  } as React.CSSProperties,
};
