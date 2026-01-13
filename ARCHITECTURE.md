# Project Architecture

This document outlines the organized structure of the Name Lottery application following React best practices and senior-level code organization patterns.

## 📁 Directory Structure

```
src/
├── components/           # React components
│   ├── CountdownOverlay/ # Countdown animation overlay
│   │   ├── CountdownOverlay.tsx
│   │   └── index.ts
│   ├── Header/          # App header with title
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── LanguageSelector/ # Language dropdown selector
│   │   ├── LanguageSelector.tsx
│   │   └── index.ts
│   ├── LotteryForm/     # Main form components
│   │   ├── LotteryForm.tsx    # Container component
│   │   ├── NameInput.tsx      # Names textarea input
│   │   ├── WinnersInput.tsx   # Number of winners input
│   │   ├── DrawButton.tsx     # Draw action button
│   │   └── index.ts
│   ├── WinnersDisplay/  # Winners announcement display
│   │   ├── WinnersDisplay.tsx
│   │   ├── WinnerCard.tsx
│   │   └── index.ts
│   └── index.ts         # Component barrel exports
├── hooks/               # Custom React hooks
│   ├── useLanguage.ts   # Language state management
│   ├── useNameStorage.ts # LocalStorage for names
│   └── index.ts
├── i18n/                # Internationalization
│   ├── translations.ts   # Translation strings
│   ├── languageDetection.ts # Browser language detection
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── constants/           # App constants
│   ├── storage.ts       # LocalStorage keys
│   └── index.ts
├── utils/               # Utility functions
│   ├── nameParser.ts    # Name parsing logic
│   └── index.ts
├── App.tsx              # Main app component (orchestrator)
├── main.tsx             # App entry point
└── index.css            # Global styles

```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- Each component has a single, well-defined responsibility
- Business logic is separated from presentation
- Utilities and helpers are in dedicated files

### 2. **Component Organization**
- Components are grouped by feature in their own folders
- Each component folder contains:
  - Main component file
  - Sub-components (if needed)
  - `index.ts` for clean imports

### 3. **Custom Hooks**
- State management logic extracted into custom hooks
- `useLanguage`: Manages language preference and translations
- `useNameStorage`: Handles localStorage for names

### 4. **Type Safety**
- All TypeScript types/interfaces in dedicated `types/` folder
- Strict typing throughout the application
- Prop interfaces defined in component files

### 5. **Internationalization (i18n)**
- Translations centralized in `i18n/translations.ts`
- Language detection logic separated
- Type-safe translation functions

### 6. **Barrel Exports**
- Each folder has an `index.ts` for clean imports
- Enables: `import { Header } from './components'`
- Instead of: `import { Header } from './components/Header/Header'`

## 🔧 Component Breakdown

### **App.tsx** (Orchestrator)
- Main application component
- Coordinates all sub-components
- Manages application state
- Handles business logic (draw functionality)
- **Clean and readable**: ~120 lines vs original 417 lines

### **LanguageSelector**
- Dropdown menu with country flags
- Click-outside-to-close functionality
- Animated transitions
- Manages its own UI state

### **Header**
- Simple presentational component
- Displays title and subtitle
- Receives translated text as props

### **LotteryForm**
- Container for form inputs
- Composed of three sub-components:
  - **NameInput**: Textarea for entering names
  - **WinnersInput**: Number input for winner count
  - **DrawButton**: Action button with animations

### **CountdownOverlay**
- Full-screen countdown animation
- 3-2-1 countdown with spring animations
- Celebration emoji on completion

### **WinnersDisplay**
- Shows the selected winners
- Composed of:
  - Container with gradient background
  - **WinnerCard**: Individual winner card with animations
- Staggered entrance animations

## 🎣 Custom Hooks

### **useLanguage**
```typescript
const { language, setLanguage, t } = useLanguage()
```
- Manages language state
- Persists to localStorage
- Returns current translations object
- Detects browser language on first load

### **useNameStorage**
```typescript
const { namesText, setNamesText } = useNameStorage()
```
- Manages names state
- Automatically syncs with localStorage
- Initializes from localStorage on mount

## 🌍 Internationalization

### Structure
```typescript
translations: Record<Language, Translations>
```

### Supported Languages
- `en-US`: English (United States)
- `pt-BR`: Português (Brasil)

### Translation Keys
- `title`, `subtitle`: Main headings
- `enterNames`, `numberOfWinners`: Form labels
- `drawButton`, `drawing`: Button states
- `winner`, `winners`: Result display
- `alertNoNames`, `alertTooManyWinners`: Validation messages
- `namesCount`, `placeholder`: Dynamic text functions

## 🛠️ Utilities

### **parseNames**
```typescript
parseNames(text: string): string[]
```
- Splits text by comma or newline
- Trims whitespace
- Filters empty strings
- Used by multiple components

## 💾 Constants

### Storage Keys
- `STORAGE_KEY`: 'lottery-names'
- `LANGUAGE_KEY`: 'lottery-language'

## 🎨 Benefits of This Architecture

1. **Maintainability**: Easy to find and modify specific features
2. **Testability**: Components can be tested in isolation
3. **Reusability**: Components can be reused or extracted
4. **Scalability**: Easy to add new features or components
5. **Readability**: Clear structure and naming conventions
6. **Type Safety**: Full TypeScript coverage
7. **DRY Principle**: No code duplication
8. **Single Responsibility**: Each file has one clear purpose

## 🚀 Adding New Features

### To add a new component:
1. Create folder in `src/components/NewComponent/`
2. Create `NewComponent.tsx`
3. Create `index.ts` with export
4. Add to `src/components/index.ts`

### To add a new language:
1. Add language code to `Language` type
2. Add translations to `translations` object
3. Add language option to `LanguageSelector`

### To add a new hook:
1. Create file in `src/hooks/useNewHook.ts`
2. Export from `src/hooks/index.ts`
3. Use in components

## 📊 Code Metrics

- **Original App.tsx**: 417 lines
- **Refactored App.tsx**: ~120 lines
- **Total Components**: 9 modular components
- **Custom Hooks**: 2
- **Type Safety**: 100%
- **Code Reusability**: High

This architecture follows industry best practices and makes the codebase professional, maintainable, and scalable.

