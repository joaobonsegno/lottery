# Name Lottery App 🎲

A modern, animated web application for randomly selecting names from a list with multi-language support.

## Features

✨ **Modern UI with Animations**
- Beautiful gradient background (purple to pink)
- Smooth transitions and animations powered by Framer Motion
- Animated countdown (3, 2, 1, 🎊) before revealing winners
- Bouncing and scaling animations for winner cards

🌍 **Multi-Language Support**
- English (United States) 🇺🇸
- Portuguese (Brazil) 🇧🇷
- Automatic language detection based on browser settings
- Beautiful dropdown selector with country flags
- Language preference saved to localStorage

🎯 **Functionality**
- Add unlimited names via textarea
- Support for multiple input formats (comma-separated or line breaks)
- Select how many winners you want (1 to total number of names)
- Fair random selection algorithm
- Live counter showing total names entered

💾 **Local Storage Persistence**
- All names are automatically saved to browser's localStorage
- Language preference is saved and restored
- Data persists even after closing the browser
- Names are restored when you revisit the app

🎨 **User Experience**
- Responsive design that works on all screen sizes
- Disabled state during drawing to prevent multiple clicks
- Visual feedback with hover and click effects
- Clear validation messages for edge cases
- Click outside to close dropdown menus

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **localStorage API** - Data persistence

## Development

The app is now running at: **http://localhost:5173/**

To run the app:
```bash
yarn dev
```

To build for production:
```bash
yarn build
```

## How to Use

1. **Select Language**: Click the language selector in the top-right corner to choose between English (🇺🇸) and Portuguese (🇧🇷)

2. **Enter Names**: Add names in the textarea, separated by commas or line breaks
   - English example: `John, Sarah, Mike` or one name per line
   - Portuguese example: `João, Maria, Pedro` ou um nome por linha

3. **Select Number of Winners**: Choose how many winners you want to select

4. **Draw Winners**: Click the draw button to start the animated countdown

5. **See Results**: After the countdown, winners are revealed with celebration animations!

## File Structure

- `src/App.tsx` - Main application component with all logic and translations
- `src/index.css` - Global styles and Tailwind imports
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## Internationalization

The app automatically detects your browser language and displays content accordingly. Supported languages:

- **en-US** (English - United States): Default for English-speaking regions
- **pt-BR** (Português - Brasil): Default for Portuguese-speaking regions

The language preference is saved to localStorage and persists across sessions.

Enjoy your lottery! 🎉

