# EcoMap - E-Waste Tracking System

A crowdsourced platform to map and manage electronic waste, connecting citizens, authorities, and recyclers to combat electronic waste through technology.

![EcoMap Preview](https://github.com/user-attachments/assets/9cfda361-c0f0-4c66-ad29-6576065a0957)

## 🌟 Features

### Interactive Mapping
- **React Leaflet Integration**: Real-time e-waste location display using OpenStreetMap
- **Color-Coded Markers**: Different colors for waste types (mobile devices, computers, TVs, batteries, appliances)
- **Interactive Popups**: Click markers to view detailed information about each e-waste location
- **GPS Selection**: Click anywhere on the map to select coordinates for new reports

### Citizen Reporting
- **Photo Upload**: Upload images of e-waste sites
- **GPS Coordinates**: Select location by clicking on the map
- **Waste Categorization**: Choose from 6 different e-waste types
- **Detailed Descriptions**: Add context about quantity, condition, and other details
- **Status Tracking**: Reports can be pending, verified, or collected

### AI-Powered Image Classification
- **Automatic Waste Detection**: AI analyzes uploaded images to identify e-waste type
- **LLM Integration Ready**: Framework prepared for integration with OpenAI, Anthropic, or similar services
- **Confidence Scoring**: AI provides confidence levels for classifications
- **Smart Suggestions**: Auto-fills waste type and description based on AI analysis

### Dashboard & Statistics
- **Real-time Metrics**: View total reports, pending, verified, and collected counts
- **Legend**: Visual guide for color-coded waste categories
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Devender284/EcoMap.git
cd EcoMap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Mapping**: React Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **HTTP Client**: Axios (for future API integration)
- **Styling**: Custom CSS with responsive design

## 📁 Project Structure

```
EcoMap/
├── src/
│   ├── components/          # React components
│   │   ├── MapComponent.tsx     # Interactive map with markers
│   │   ├── ReportForm.tsx       # E-waste reporting form
│   │   └── Legend.tsx           # Color-coded legend
│   ├── hooks/               # Custom React hooks
│   │   └── useEWasteLocations.ts # Location state management
│   ├── services/            # Business logic
│   │   └── aiClassification.ts   # AI image classification
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── App.css              # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Waste Categories

| Category | Color | Icon |
|----------|-------|------|
| Mobile Devices | Blue (#3B82F6) | 📱 |
| Computers | Purple (#8B5CF6) | 💻 |
| TVs & Monitors | Red (#EF4444) | 📺 |
| Batteries | Amber (#F59E0B) | 🔋 |
| Appliances | Green (#10B981) | 🔌 |
| Other E-Waste | Gray (#6B7280) | ♻️ |

## 🤖 AI Integration

The application includes a framework for AI-powered image classification. Currently using a mock implementation for demonstration. To integrate with a real LLM:

1. Add your API key to environment variables:
```bash
VITE_OPENAI_API_KEY=your_api_key_here
```

2. Uncomment the LLM integration code in `src/services/aiClassification.ts`

3. Configure your preferred LLM provider (OpenAI GPT-4 Vision, Anthropic Claude, etc.)

## 📱 Usage

### Reporting E-Waste

1. **Select Location**: Click anywhere on the map to select GPS coordinates
2. **Upload Photo** (Optional): Choose an image of the e-waste site
3. **AI Analysis**: If photo uploaded, AI will automatically classify the waste type
4. **Fill Details**: 
   - Confirm or change the waste type
   - Add description
   - Enter your name
5. **Submit**: Click "Submit Report" to add the location to the map

### Viewing Reports

- Click on any marker on the map to view details
- Different colored markers represent different waste types
- Check the stats bar at the bottom for overall statistics

## 🔒 Security Considerations

- No sensitive data is stored in the mock version
- Image uploads use blob URLs for preview
- Real deployment should include:
  - Backend API with authentication
  - Secure image storage
  - Rate limiting
  - Input validation and sanitization

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication and authorization
- [ ] Admin dashboard for verification
- [ ] Recycler portal
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Data analytics and reporting
- [ ] Integration with municipal waste systems

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.
