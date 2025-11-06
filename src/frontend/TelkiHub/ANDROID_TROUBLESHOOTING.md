# Android Expo Go Troubleshooting Guide

## Quick Fix for Android Expo Go Connection

### Step 1: Use Tunnel Mode
Always use tunnel mode for external device connections:
```bash
npm run tunnel
# or
npx expo start --tunnel
```

### Step 2: Scan the Correct QR Code
- Make sure you're scanning the QR code that appears AFTER tunnel connection
- Look for the URL format: `exp://xxxxx-anonymous-8081.exp.direct`
- NOT the local IP format: `exp://192.168.x.x:8081`

### Step 3: Check Expo Go App
- Make sure Expo Go is updated to the latest version
- Clear Expo Go cache: Settings > Clear Cache in Expo Go app

## Common Issues & Solutions

### Issue 1: "Could not load exp://..." Error
**Solution:**
```bash
# Stop all expo processes
pkill -f expo

# Clear cache and restart with tunnel
npx expo start --tunnel --clear
```

### Issue 2: Network Connection Problems
**Causes:**
- Different WiFi networks (phone vs computer)
- Corporate firewalls
- VPN interference

**Solutions:**
1. **Use Tunnel Mode** (bypasses local network issues):
   ```bash
   npm run tunnel
   ```

2. **Check Network Settings**:
   - Ensure phone and computer are on same WiFi
   - Disable VPN temporarily
   - Try mobile data instead of WiFi

3. **Alternative: Use USB Debugging**:
   ```bash
   # Enable USB debugging on Android
   # Connect via USB
   adb reverse tcp:8081 tcp:8081
   npm start
   ```

### Issue 3: QR Code Scanner Not Working
**Solutions:**
1. Use the in-app scanner in Expo Go (not camera app)
2. Manually enter the URL:
   - Open Expo Go
   - Tap "Enter URL manually"
   - Copy the `exp://` URL from terminal

### Issue 4: Bundle Loading Fails
**Solution:**
```bash
# Clear all caches
npm run clear
# or
npx expo start --clear --tunnel
```

### Issue 5: Metro Bundler Issues
**Solution:**
```bash
# Reset metro cache
npx expo start --reset-cache --tunnel
```

## Step-by-Step Connection Process

1. **Start Development Server**:
   ```bash
   cd /path/to/TelkiHub
   npm run tunnel
   ```

2. **Wait for Tunnel Connection**:
   - Look for "Tunnel connected" message
   - Wait for QR code to appear

3. **Open Expo Go on Android**:
   - Tap "Scan QR Code"
   - Scan the QR code from terminal
   - Wait for bundling to complete (may take 1-2 minutes)

4. **If Scanning Fails**:
   - Copy the `exp://` URL manually
   - In Expo Go: "Enter URL manually"
   - Paste the URL and press Go

## Alternative Methods

### Method 1: Development Build
For more stable development:
```bash
npx expo install expo-dev-client
npm run build:development:android
# Install the built APK
npm run dev
```

### Method 2: Local Network (if tunnel issues)
```bash
# Start without tunnel
npm start

# In Expo Go, manually enter:
exp://YOUR_COMPUTER_IP:8081
# Replace YOUR_COMPUTER_IP with actual IP
```

### Method 3: Android Studio Emulator
```bash
# Start Android emulator first
npm run android
```

## Debugging Tips

### Check Connection Status
```bash
# In terminal, press 'm' for menu
# Check connection logs
```

### Network Diagnostics
```bash
# Check your computer's IP
ip addr show | grep "inet "

# Test if port is accessible
netstat -tlnp | grep :8081
```

### Expo Go Logs
- In Expo Go app: Shake device → "Show Performance Monitor"
- Check for error messages

## Success Indicators

✅ **Working Setup Shows:**
- "Tunnel connected" in terminal
- QR code with `exp://xxxxx.exp.direct` format
- Android bundling progress (e.g., "Android node_modules... 25%")
- No error messages in Expo Go

⚠️ **Problem Indicators:**
- Local IP in QR code (`192.168.x.x`) without tunnel
- "Network connection failed" in Expo Go
- Bundle stuck at 0% or failing to load

## Quick Commands Reference

```bash
# Start with tunnel (recommended for external devices)
npm run tunnel

# Clear cache and restart
npm run clear

# Development build (more stable)
npm run dev

# Reset everything
npx expo start --reset-cache --clear --tunnel
```