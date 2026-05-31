# gcp-selector

A Chrome extension that allows you to quickly select Google Cloud Platform (GCP) projects and services at once.

<img width="300px" height="auto" src="image/popup.gif">

The list supports fuzzy search, with matching characters highlighted in red for easy identification.

<img width="300px" height="auto" src="image/popup-service.png">

project setting page

<img width="300px" height="auto" src="image/option.png">

## ✨ Features
- Select both project and service simultaneously
- Register your GCP project IDs

## 📦 Installation

Install easily from the [Chrome Web Store](https://chrome.google.com/webstore/detail/gcp-selector/gdfiojnnhlfmkbghihllimpaanldflag)


## 🏗️ Project Structure

### 🔧 Architecture
This project is a Chrome extension built with React + TypeScript.

### 📁 Directory Structure
```
├── manifest.json          # Chrome extension manifest
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
├── jest.config.js         # Jest configuration
├── playwright.config.ts   # Playwright configuration
│
├── e2e/                   # E2E tests (Playwright)
│   ├── fixtures.ts        # Custom fixtures for extension loading
│   ├── popup.spec.ts      # Popup tests
│   ├── option.spec.ts     # Option page tests
│   └── integration.spec.ts # Cross-page integration tests
│
├── src/                   # Source code
│   ├── popup/             # Popup screen
│   │   ├── Popup.tsx      # Main popup component
│   │   ├── popup.html     # Popup HTML
│   │   └── index.tsx      # Popup entry point
│   │
│   ├── option/            # Settings screen
│   │   ├── Option.tsx     # Settings component
│   │   ├── option.html    # Settings HTML
│   │   └── index.tsx      # Settings entry point
│   │
│   ├── components/        # Reusable components
│   │   ├── popup/         # Popup-specific components
│   │   │   ├── PopupHeader.tsx        # Header component
│   │   │   ├── ProjectSelector.tsx    # Project selection component
│   │   │   ├── ServiceSelector.tsx    # Service selection component
│   │   │   └── NoProjectsMessage.tsx  # No projects message
│   │   └── select/        # Select-related components
│   │       └── Option.tsx # Custom option component
│   │
│   ├── hooks/             # Custom hooks
│   │   ├── useNavigation.ts  # Navigation management
│   │   ├── useOptions.ts     # Settings management
│   │   └── useProjects.ts    # Project management
│   │
│   ├── utils/             # Utility functions
│   │   ├── projects/      # Project-related utilities
│   │   │   ├── AddProject.ts     # Add project
│   │   │   ├── DeleteProject.ts  # Delete project
│   │   │   ├── ListProject.ts    # List projects
│   │   │   └── Constant.ts       # Constants
│   │   └── services/      # Service-related utilities
│   │       └── ListServices.ts   # List services
│   │
│   └── types/             # Type definitions
│       ├── SelectOption.ts    # Select option types
│       └── Service.ts         # Service types
│
├── public/                # Public assets
├── dist/                  # Build output
├── icons/                 # Icon files
└── image/                 # Documentation images
```

### 🛠️ Technology Stack
- **Framework**: React 19.0.0
- **Language**: TypeScript
- **UI**: react-select, FontAwesome
- **Build Tool**: Webpack
- **Testing**: Jest, React Testing Library, Playwright
- **Package Manager**: npm

### 🚀 Key Features
- Simultaneous GCP project and service selection
- Fuzzy search support
- Seamless Chrome extension integration
- Local storage for project management

## 💻 Development

### 🔥 Hot Reload Development
For efficient development, use the hot reload feature:

```bash
npm run dev
```

This command starts webpack in watch mode, automatically rebuilding when files change.

### 🔌 Loading the Extension
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select the `dist` folder
4. The extension icon will appear in your Chrome toolbar

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### E2E Tests (Playwright)

E2E tests run against the actual built extension in a real Chromium browser.

```bash
npm run test:e2e        # Build and run all E2E tests
npm run test:e2e:ui     # Run with Playwright UI mode
```

The E2E suite covers:
- **Popup**: auto-focus, keyboard navigation, URL generation, settings navigation
- **Option page**: add/delete projects, validation, Enter key support
- **Integration**: cross-page storage consistency, full setup flow

## 🚀 Release

Releases are triggered by pushing a version tag. CI will automatically run tests, build `gcp-selector.zip`, and create a GitHub Release with the zip attached.

### Steps

1. Update the version in `manifest.json` and `package.json`
2. Commit and push to `main`
3. Push a version tag:

```bash
git tag v1.0.1
git push origin v1.0.1
```

4. Download `gcp-selector.zip` from the [GitHub Release](../../releases) and upload it to the [Chrome Web Store](https://chrome.google.com/webstore/detail/gcp-selector/gdfiojnnhlfmkbghihllimpaanldflag) manually.

## 📋 Requirements
- Google Chrome browser
- Account with access to GCP console
