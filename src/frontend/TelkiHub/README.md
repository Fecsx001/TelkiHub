# TelkiHub - Clean Expo App

A clean, ready-to-develop Expo React Native app with cross-platform support for Android, iOS, and Web.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development**
   ```bash
   npm start          # Choose platform
   npm run android    # Android
   npm run web        # Web browser
   npm run ios        # iOS (macOS only)
   ```

3. **For external devices**
   ```bash
   npm run tunnel     # Use tunnel for remote testing
   ```

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx      # Home screen - edit this first
│   └── explore.tsx    # Second tab screen
├── _layout.tsx        # Root layout
└── modal.tsx          # Example modal

components/            # Reusable components
├── themed-text.tsx
├── themed-view.tsx
└── ui/               # UI components

constants/
└── theme.ts          # Colors and styling
```

## Start Building

- **Main screen:** `app/(tabs)/index.tsx` - Your app's home screen
- **Second screen:** `app/(tabs)/explore.tsx` - Additional content
- **Add new screens:** Create files in `app/` directory
- **Components:** Add reusable components in `components/`
- **Styling:** Modify themes in `constants/theme.ts`

## Development

- File-based routing (add `.tsx` files in `app/` folder)
- Hot reloading enabled
- TypeScript support
- Cross-platform components included
- Dark/light theme support

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [File-based Routing](https://docs.expo.dev/router/introduction/)
