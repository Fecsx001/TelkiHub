# TelkiHub 🏘️

A community-focused mobile and web application for Telki residents, providing real-time travel information, local announcements, and push notifications for important community updates.

## 🚀 Features

- **📍 Real-time Travel Information**
  - Travel times to Széll Kálmán tér (Budapest)
  - Travel times to Kelenföld Railway Station
  - Traffic-aware routing using Google Maps and TomTom APIs

- **📢 Community Announcements**
  - High priority alerts (power outages, emergencies)
  - Normal community updates and events
  - Time-based relevance filtering

- **📱 Push Notifications**
  - Automatic notifications for high priority items
  - Cross-platform support (iOS, Android, Web)
  - Powered by Expo's push notification service

- **🌐 Cross-Platform**
  - React Native mobile app (iOS & Android)
  - Web application support
  - Responsive design for all screen sizes

## 🏗️ Architecture

### Frontend (React Native + Expo)
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **UI Components**: Custom styled components
- **Push Notifications**: expo-notifications
- **Location**: Telki, Hungary focus

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **APIs**: Google Maps Directions, TomTom Routing
- **Data Storage**: JSON file-based (production-ready for small scale)
- **Push Notifications**: Expo Push Service integration
- **CORS**: Configured for cross-platform access

## 📁 Project Structure

```
TelkiHub/
├── src/
│   ├── frontend/TelkiHub/          # React Native Expo app
│   │   ├── app/                    # App router pages
│   │   │   ├── (tabs)/            # Tab navigation
│   │   │   └── components/        # Reusable UI components
│   │   ├── constants/              # App configuration
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API and push notification services
│   │   ├── assets/                 # Images and static files
│   │   ├── app.json               # Expo configuration
│   │   └── package.json           # Dependencies
│   │
│   └── backend/                    # FastAPI server
│       ├── routers/               # API route handlers
│       ├── services/              # Push notification services
│       ├── data/                  # Data models and storage
│       ├── utils/                 # Logging and utilities
│       ├── app.py                 # Main FastAPI application
│       ├── config.py              # Configuration management
│       └── requirements.txt       # Python dependencies
│
├── PUSH_NOTIFICATIONS_README.md   # Push notification setup guide
├── NGROK_SETUP_GUIDE.md          # Remote testing with ngrok
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.8 or higher)
- **Expo CLI**: `npm install -g @expo/cli`
- **Mobile device** with Expo Go app (for testing)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd src/backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys (see Configuration section)
   ```

4. **Start the FastAPI server:**
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 9000 --reload
   ```

   Server will be available at: `http://localhost:9000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd src/frontend/TelkiHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API configuration:**
   ```bash
   # Edit constants/index.ts with your backend URL
   ```
   You can get it with 
   ```bash
   hostname -I

4. **Start the development server:**
   ```bash
   npx expo start --tunnel
   ```
   while standing at src/frontend/TelkiHub

5. **Test on device:**
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - App will load on your device

## ⚙️ Configuration

### Required API Keys

1. **Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Routes API" and "Directions API"
   - Create API key and add to `.env`

### Environment Variables (.env)

```bash
# API Keys
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
TOMTOM_API_KEY=your-tomtom-api-key

# Server Configuration
API_HOST=0.0.0.0
API_PORT=9000
DEBUG=True
```

### Frontend Configuration

Update `src/frontend/TelkiHub/constants/index.ts`:

```typescript
// For local development
const LOCAL_IP_URL = 'http://192.168.1.100:9000';

// For remote testing with ngrok
const NGROK_URL = 'https://your-ngrok-url.ngrok-free.app';

// For production
const PRODUCTION_URL = 'https://api.telkihub.com';
```

## 📱 Push Notifications

TelkiHub uses **Expo's Push Notification service** - no Firebase setup required!

### Features:
- ✅ **Automatic notifications** when high priority items are added
- ✅ **Cross-platform** (iOS, Android, Web)
- ✅ **No server keys needed** - Expo handles everything
- ✅ **Real-time delivery** via Expo's infrastructure


### Testing:
```bash
# Send test notification
curl -X POST "http://localhost:9000/test-push-notification?title=Hello&message=Test"

# Add high priority item (auto-triggers notification)
curl -X POST "http://localhost:9000/additem" \
  -H "Content-Type: application/json" \
  -d '{"prio":"high","title":"Test Alert","text":"Emergency test","relevant_until":"2025-12-31T23:59:59"}'
```

## 🌐 API Endpoints

### Travel Information
- `GET /timetoSzell` - Travel time to Széll Kálmán tér
- `GET /timetoKelen` - Travel time to Kelenföld Railway Station

### Community Data
- `GET /getrelevant` - Get current relevant announcements
- `POST /additem` - Add new announcement (triggers push notification for high priority)

### Push Notifications
- `POST /register-device` - Register device for push notifications
- `POST /test-push-notification` - Send test notification
- `GET /registered-devices` - View registered devices (debugging)

### Utilities
- `GET /` - API health check
- `GET /docs` - Interactive API documentation (Swagger UI)

## 🧪 Testing

### Local Testing
```bash
# Test backend
curl http://localhost:9000/

# Test travel endpoints
curl http://localhost:9000/timetoSzell
curl http://localhost:9000/timetoKelen

# Test announcements
curl http://localhost:9000/getrelevant
```

### Remote Testing with ngrok
For testing from any device or sharing with others:

```bash
# Start ngrok tunnel
ngrok http 9000

# Update frontend configuration with ngrok URL
# See NGROK_SETUP_GUIDE.md for complete instructions
```

## 🚀 Deployment

### Backend Deployment Options:

1. **VPS/Cloud Server**
   - Deploy to DigitalOcean, AWS, Google Cloud, etc.
   - Use PM2 or systemd for process management
   - Set up nginx reverse proxy
   - Configure SSL certificate

2. **Serverless**
   - Deploy to Vercel, Railway, or Heroku
   - Update environment variables
   - Configure custom domains

### Frontend Deployment Options:

1. **Mobile App Store**
   ```bash
   # Build for app stores
   eas build --platform all
   eas submit --platform all
   ```

2. **Web Deployment**
   ```bash
   # Build web version
   npx expo export --platform web
   # Deploy to Vercel, Netlify, etc.
   ```

## 🔧 Development

### Adding New Features

1. **New API Endpoint:**
   - Add route to `src/backend/routers/routes.py`
   - Update documentation

2. **New UI Component:**
   - Add component to `src/frontend/TelkiHub/app/components/`
   - Import and use in pages

3. **New Travel Destination:**
   - Add endpoint in backend with coordinates
   - Add UI component in frontend
   - Update navigation if needed

### Code Style
- **Backend**: Follow PEP 8 (Python)
- **Frontend**: Follow React/TypeScript best practices
- **Commits**: Use conventional commit messages

## 🐛 Troubleshooting

### Common Issues:

1. **API Connection Issues**
   - Verify backend server is running
   - Check network configuration
   - Ensure CORS is properly configured

2. **Travel Times Not Loading**
   - Verify API keys in `.env` file
   - Check API quotas and billing
   - Review server logs for errors

### Debug Mode:
```bash
# Backend with detailed logging
uvicorn app:app --host 0.0.0.0 --port 9000 --reload --log-level debug

# Frontend with network debugging
npm start -- --reset-cache
```

## 📄 License

This project is developed for the Telki community by Fecsó András Balázs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: Create an issue on GitHub
- **Community**: Contact me on Facebook Messenger or fecsoandrasbalazs@gmail.com
- **Email**: [Contact information]

## 🙏 Acknowledgments

- **Google Maps API** for traffic-aware routing
- **Expo team** for excellent framework and ability to test on mobile too
- **FastAPI** for the modern Python web framework

---

**Built with ❤️ for the Telki community**