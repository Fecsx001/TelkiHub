# TelkiHub Development Guide

## Cross-Platform Development Setup

This Expo app is configured to work seamlessly across Android, iOS, and Web (PC). Here's how to develop for each platform:

## Quick Start

### Install Dependencies
```bash
npm install
```

### Development Scripts

#### Start Development Server
```bash
npm start                    # Start with options menu
npm run android             # Start and open Android emulator
npm run web                 # Start and open web browser
npm run ios                 # Start and open iOS simulator (macOS only)
```

#### Advanced Development
```bash
npm run dev                 # Start with development client
npm run tunnel              # Start with tunnel (for testing on physical devices)
npm run clear               # Start with cleared cache
```

#### Building
```bash
npm run build:development:android    # Build development APK
npm run build:preview:android        # Build preview APK
npm run build:production:android     # Build production AAB
```

## Platform-Specific Development

### Android Development

1. **Setup Android Studio** (for emulator):
   - Install Android Studio
   - Create a virtual device (API 31+ recommended)

2. **Physical Device Testing**:
   - Install Expo Go from Google Play Store
   - Scan the QR code from the terminal
   - Or use `npm run tunnel` for remote testing

3. **Development Build**:
   ```bash
   npm run build:development:android
   ```

### Web/PC Development

1. **Start Web Server**:
   ```bash
   npm run web
   ```
   - Opens automatically at http://localhost:8081
   - Full React Native Web support
   - Hot reloading enabled

2. **Production Web Build**:
   ```bash
   npx expo build:web
   ```

### iOS Development (macOS only)

1. **iOS Simulator**:
   ```bash
   npm run ios
   ```

2. **Physical Device**:
   - Install Expo Go from App Store
   - Scan QR code with Camera app

## Configuration Files

### Key Files
- `app.json` - Expo configuration
- `eas.json` - Build configuration
- `metro.config.js` - Metro bundler configuration
- `package.json` - Dependencies and scripts

### VS Code Setup
- Extensions are auto-recommended
- Debugging configurations included
- TypeScript support enabled

## Development Tips

### Hot Reloading
- Press `r` in terminal to reload
- Changes auto-reload in development

### Debugging
- Press `j` to open debugger
- Use VS Code debug configurations
- React DevTools available in web browser

### Platform-Specific Code
Use platform-specific file extensions:
```
component.tsx          # Shared
component.ios.tsx      # iOS only
component.android.tsx  # Android only
component.web.tsx      # Web only
```

### Platform Detection
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // Android-specific code
} else if (Platform.OS === 'web') {
  // Web-specific code
}
```

## Troubleshooting

### Common Issues

1. **Metro bundler fails**:
   ```bash
   npm run clear
   ```

2. **Android emulator not detected**:
   - Ensure Android Studio is installed
   - Check that virtual device is running

3. **Web bundle errors**:
   - Check metro.config.js
   - Clear browser cache

4. **Build issues**:
   ```bash
   npx expo prebuild --clean
   ```

### Getting Help
- Expo docs: https://docs.expo.dev/
- React Native docs: https://reactnative.dev/
- Community: https://forums.expo.dev/

## Project Structure

```
src/frontend/TelkiHub/
├── app/                 # App routes (file-based routing)
│   ├── (tabs)/         # Tab navigation
│   └── _layout.tsx     # Root layout
├── components/         # Reusable components
├── constants/          # App constants and themes
├── hooks/             # Custom React hooks
├── assets/            # Images and static assets
└── scripts/           # Utility scripts
```

## Next Steps

1. Customize the app in `app/(tabs)/index.tsx`
2. Add new screens in the `app/` directory
3. Create reusable components in `components/`
4. Configure themes in `constants/theme.ts`
5. Test on all target platforms

Happy coding! 🚀