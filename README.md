# tg-miniapp

A Telegram Mini App built with Next.js 14, TypeScript, and Tailwind CSS. Features a coin-based system with multi-language support (English/Persian) and RTL layout.

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 🌍 **Internationalization** - English and Persian with RTL support
- 📱 **Telegram WebApp SDK** integration
- 💰 **Coin System** - Buy coins, track consumption and payments
- 🎨 **Modern UI** - Dark theme with responsive design
- 📊 **State Management** - Local storage with persistence
- 🧪 **E2E Testing** - Cypress test suite
- 🚀 **CI/CD** - GitHub Actions workflow

## Quick Start

### Prerequisites

- Node.js 22+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/hosseintaromi/tg-miniapp.git
cd tg-miniapp

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit `http://localhost:3000/en/profile` or `http://localhost:3000/fa/profile`

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint errors
yarn typecheck    # Run TypeScript check
yarn format       # Format code with Prettier

# Testing
yarn test:e2e     # Run E2E tests (headless)
yarn test:e2e:open # Open Cypress UI
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/       # Localized routes
│   │   ├── profile/    # Profile page
│   │   ├── consumption/# Consumption history
│   │   ├── payments/   # Payment history
│   │   └── buy-coins/  # Coin purchase
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── i18n/              # Translation files
├── lib/               # Utilities
├── services/          # State management
└── types/             # TypeScript types
```

## Features Overview

### 🏠 Profile Page

- User profile with avatar and username
- Current coin balance display
- Responsive design

### 💳 Buy Coins Page

- Multiple coin packages (100, 500, 1000, 2000 coins)
- Package selection with visual feedback
- Purchase button with state updates

### 📊 Consumption Page

- History of coin usage
- Feature usage tracking
- Chronological listing

### 💰 Payments Page

- Purchase history with dates
- Transaction amounts in USD
- Coin quantities purchased

### 🌐 Internationalization

- English and Persian language support
- RTL layout for Persian
- Seamless language switching

## Development

### Adding New Features

1. Create components in `src/components/`
2. Add pages under `src/app/[locale]/`
3. Update translations in `src/i18n/messages/`
4. Add E2E tests in `cypress/e2e/`

### Translation Keys

Translations use nested structure:

```json
{
  "tabs": {
    "profile": "Profile",
    "consumption": "Consumption"
  }
}
```

Access with: `t('tabs.profile')`

## Testing

### E2E Tests

Located in `cypress/e2e/`:

- `app-navigation.cy.ts` - Tab navigation and localization
- `coin-purchase.cy.ts` - Purchase flow and balance updates
- `data-persistence.cy.ts` - State persistence across reloads

Run tests:

```bash
yarn test:e2e        # Headless mode
yarn test:e2e:open   # Interactive mode
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main

### Manual Deployment

```bash
yarn build
yarn start
```

## Environment Variables

Create `.env.local` for local development:

```bash
# Add any environment variables here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Run `yarn lint` and `yarn typecheck`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
