# Component Hierarchy

Visual representation of the component tree and data flow in the Name Lottery application.

## 🌳 Component Tree

```
App (Main Orchestrator)
│
├── LanguageSelector
│   └── (Dropdown Menu)
│
├── Header
│   ├── Title
│   └── Subtitle
│
├── LotteryForm
│   ├── NameInput
│   │   ├── Label (with name count)
│   │   └── Textarea
│   ├── WinnersInput
│   │   ├── Label
│   │   └── Number Input
│   └── DrawButton
│
├── CountdownOverlay (conditional)
│   └── Animated Number/Emoji
│
└── WinnersDisplay (conditional)
    ├── Title
    └── WinnerCard[] (array)
        ├── Name
        └── Trophy Icon
```

## 📊 Data Flow

```
┌─────────────────────────────────────────────────────┐
│                      App.tsx                         │
│                  (State Container)                   │
│                                                      │
│  State:                                             │
│  • namesText        (from useNameStorage hook)      │
│  • numberOfWinners                                  │
│  • isDrawing                                        │
│  • countdown                                        │
│  • winners                                          │
│  • showWinners                                      │
│  • language         (from useLanguage hook)         │
│                                                      │
└─────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐         ┌──────────┐        ┌──────────┐
    │Language │         │ Lottery  │        │ Winners  │
    │Selector │         │  Form    │        │ Display  │
    └─────────┘         └──────────┘        └──────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
    [language]     [namesText, handlers]      [winners]
```

## 🔄 State Management Flow

### 1. Language Management
```typescript
useLanguage Hook
  ├─ Reads: localStorage (on mount)
  ├─ Detects: Browser language (if no saved preference)
  ├─ Provides: { language, setLanguage, t }
  └─ Persists: To localStorage (on change)
```

### 2. Names Storage
```typescript
useNameStorage Hook
  ├─ Reads: localStorage (on mount)
  ├─ Provides: { namesText, setNamesText }
  └─ Persists: To localStorage (on every change)
```

### 3. Drawing Process
```typescript
User clicks "Draw" button
  ↓
handleDraw() in App
  ├─ Validates names exist
  ├─ Validates numberOfWinners ≤ totalNames
  ├─ Sets isDrawing = true
  ├─ Sets countdown = 3
  └─ Clears previous winners
       ↓
useEffect watches countdown
  ├─ countdown: 3 → 2 → 1 → 0
  ├─ Each second: setCountdown(countdown - 1)
  └─ When 0:
      ├─ Shuffles names
      ├─ Selects winners
      ├─ Sets showWinners = true
      └─ Sets isDrawing = false
```

## 🎨 Component Responsibilities

### **App.tsx** (Smart Component)
- **Role**: Orchestrator / Container
- **Responsibilities**:
  - Manages application state
  - Coordinates components
  - Handles business logic
  - Manages side effects
- **Props**: None (root component)
- **State**: All application state

### **LanguageSelector** (Smart Component)
- **Role**: Self-contained widget
- **Responsibilities**:
  - Display current language
  - Show/hide dropdown menu
  - Handle language selection
  - Manage click-outside behavior
- **Props**: `language`, `onLanguageChange`
- **State**: `showMenu` (internal)

### **Header** (Presentational Component)
- **Role**: Display component
- **Responsibilities**:
  - Display title and subtitle
  - Apply animations
- **Props**: `title`, `subtitle`
- **State**: None

### **LotteryForm** (Container Component)
- **Role**: Form container
- **Responsibilities**:
  - Group form inputs
  - Pass props to children
  - Apply container styling
- **Props**: All form data and handlers
- **State**: None (all lifted to App)

### **NameInput** (Presentational Component)
- **Role**: Controlled input
- **Responsibilities**:
  - Display label with count
  - Render textarea
  - Handle text changes
- **Props**: `value`, `onChange`, `label`, etc.
- **State**: None (controlled)

### **WinnersInput** (Presentational Component)
- **Role**: Controlled input
- **Responsibilities**:
  - Display label
  - Render number input
  - Handle value changes
- **Props**: `value`, `onChange`, `label`, `max`
- **State**: None (controlled)

### **DrawButton** (Presentational Component)
- **Role**: Action button
- **Responsibilities**:
  - Display button text
  - Handle click event
  - Show disabled state
  - Apply animations
- **Props**: `onClick`, `disabled`, `isDrawing`, texts
- **State**: None

### **CountdownOverlay** (Presentational Component)
- **Role**: Fullscreen overlay
- **Responsibilities**:
  - Display countdown number
  - Apply enter/exit animations
  - Block user interaction
- **Props**: `countdown`
- **State**: None

### **WinnersDisplay** (Container Component)
- **Role**: Results container
- **Responsibilities**:
  - Show/hide based on prop
  - Display title
  - Render winner cards
- **Props**: `winners`, `showWinners`, texts
- **State**: None

### **WinnerCard** (Presentational Component)
- **Role**: Individual winner item
- **Responsibilities**:
  - Display winner name
  - Show trophy icon
  - Apply staggered animations
- **Props**: `name`, `index`
- **State**: None

## 🔌 Props Interface Examples

```typescript
// LanguageSelector
interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

// LotteryForm
interface LotteryFormProps {
  namesText: string
  onNamesChange: (value: string) => void
  numberOfWinners: number
  onNumberOfWinnersChange: (value: number) => void
  onDraw: () => void
  totalNames: number
  isDrawing: boolean
  translations: Translations
}

// WinnersDisplay
interface WinnersDisplayProps {
  winners: string[]
  showWinners: boolean
  winnerText: string
  winnersText: string
}
```

## 🎯 Design Patterns Used

1. **Container/Presentational Pattern**
   - Smart components (App, LanguageSelector) manage state
   - Presentational components receive props and render UI

2. **Custom Hooks Pattern**
   - `useLanguage`: Encapsulates language logic
   - `useNameStorage`: Encapsulates storage logic

3. **Composition Pattern**
   - LotteryForm composes smaller input components
   - WinnersDisplay composes WinnerCard components

4. **Controlled Components Pattern**
   - All inputs are controlled by parent state
   - Unidirectional data flow

5. **Barrel Export Pattern**
   - Each folder has index.ts for clean imports
   - Improves import statements readability

## 🚀 Benefits

- **Testability**: Each component can be tested in isolation
- **Reusability**: Components can be used elsewhere
- **Maintainability**: Easy to locate and fix issues
- **Scalability**: Easy to add new features
- **Readability**: Clear structure and responsibilities
- **Type Safety**: TypeScript ensures prop correctness

---

This hierarchy ensures a clean, maintainable, and scalable application structure.

