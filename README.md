# Name Lottery App 🎲

A modern, animated web application for randomly selecting names from a list with multi-language support. Built with React, TypeScript, and following senior-level architectural patterns.

## ✨ Features

### **Modern UI with Animations**
- Beautiful gradient background (purple to pink)
- Smooth transitions and animations powered by Framer Motion
- Animated countdown (3, 2, 1, 🎊) before revealing winners
- Bouncing and scaling animations for winner cards

### **🌍 Multi-Language Support**
- English (United States) 🇺🇸
- Portuguese (Brazil) 🇧🇷
- Automatic language detection based on browser settings
- Beautiful dropdown selector with country flags
- Language preference saved to localStorage

### **🎯 Functionality**
- Add unlimited names via textarea
- Support for multiple input formats (comma-separated or line breaks)
- Select how many winners you want (1 to total number of names)
- Fair random selection algorithm
- Live counter showing total names entered

### **💾 Local Storage Persistence**
- All names are automatically saved to browser's localStorage
- Language preference is saved and restored
- Data persists even after closing the browser
- Names are restored when you revisit the app

### **🎨 User Experience**
- Responsive design that works on all screen sizes
- Disabled state during drawing to prevent multiple clicks
- Visual feedback with hover and click effects
- Clear validation messages for edge cases
- Click outside to close dropdown menus

## 🏗️ Architecture

This project follows **professional React architecture patterns** with:

- **Component-based structure**: 9 modular, reusable components
- **Custom hooks**: `useLanguage`, `useNameStorage`
- **Separation of concerns**: Clear separation of UI, logic, and data
- **Type safety**: 100% TypeScript coverage
- **Internationalization**: Centralized i18n system
- **Clean code**: Single Responsibility Principle throughout

### Project Structure
```
src/
├── components/      # React components (9 components)
├── hooks/          # Custom React hooks (2 hooks)
├── i18n/           # Internationalization & translations
├── types/          # TypeScript type definitions
├── constants/      # Application constants
├── utils/          # Utility functions
└── App.tsx         # Main orchestrator (~120 lines, clean!)
```

**For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **localStorage API** - Data persistence

## 🚀 Development

The app is running at: **http://localhost:5173/**

### Commands
```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

## 📖 How to Use

1. **Select Language**: Click the language selector in the top-right corner to choose between English (🇺🇸) and Portuguese (🇧🇷)

2. **Enter Names**: Add names in the textarea, separated by commas or line breaks
   - English example: `John, Sarah, Mike` or one name per line
   - Portuguese example: `João, Maria, Pedro` ou um nome por linha

3. **Select Number of Winners**: Choose how many winners you want to select

4. **Draw Winners**: Click the draw button to start the animated countdown

5. **See Results**: After the countdown, winners are revealed with celebration animations!

## 📁 File Structure

```
lottery/
├── src/
│   ├── components/           # All React components
│   │   ├── CountdownOverlay/ # Countdown animation
│   │   ├── Header/          # App header
│   │   ├── LanguageSelector/# Language dropdown
│   │   ├── LotteryForm/     # Form components
│   │   └── WinnersDisplay/  # Winners announcement
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Translations
│   ├── types/               # TypeScript types
│   ├── constants/           # App constants
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main component
├── ARCHITECTURE.md          # Detailed architecture docs
├── README.md               # This file
└── package.json            # Dependencies
```

## 🌍 Internationalization

The app automatically detects your browser language and displays content accordingly.

### Supported Languages
- **en-US** (English - United States): Default for English-speaking regions
- **pt-BR** (Português - Brasil): Default for Portuguese-speaking regions

The language preference is saved to localStorage and persists across sessions.

### Adding New Languages
See [ARCHITECTURE.md](./ARCHITECTURE.md) for instructions on adding new languages.

## 🧪 Code Quality

- ✅ **Zero linter errors**
- ✅ **Full TypeScript coverage**
- ✅ **Component isolation**: Easy to test
- ✅ **Clean code**: Following SOLID principles
- ✅ **Modular**: 28 TypeScript files organized logically
- ✅ **Maintainable**: Clear naming and structure

## 🎯 Key Improvements (Refactored)

### Before
- Single 417-line App.tsx file
- Mixed concerns (UI, logic, translations)
- Hard to maintain and extend

### After
- Clean 120-line App.tsx orchestrator
- 9 modular, reusable components
- Separated concerns (components, hooks, utils, i18n)
- Professional folder structure
- Easy to test and maintain
- Ready to scale

## 📚 Learn More

- See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architectural documentation
- Component breakdown and design patterns
- How to add new features
- Code organization principles

---

Enjoy your lottery! 🎉

Built with ❤️ using React, TypeScript, and modern best practices.

