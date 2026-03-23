# OTESHIP Project

This repository contains the source code for the frontend of the OTESHIP (Our Tradition... Our Entrepreneurship) platform. The project is an Erasmus+ co-funded initiative designed to showcase the collaboration, educational processes, and ceramic products created by students from special education schools across Greece, Poland, and Turkey.

## Architecture and Technology Stack

The application is structured as a Single Page Application (SPA) designed for high performance, accessibility, and maintainability.

- **Core Framework:** React 19 utilizing Vite as the build tool and development server. This ensures highly optimized asset delivery and rapid Hot Module Replacement (HMR) during development.
- **Routing:** React Router v7 manages client-side navigation, enabling seamless, asynchronous transitions between the portfolio, educational guides, and gallery sections.
- **Styling and Theming:** Tailwind CSS v4 provides a utility-first styling methodology. The application utilizes a fully responsive, mobile-first design system with native support for user-toggled Light and Dark modes.
- **Internationalization (i18n):** The `i18next` and `react-i18next` libraries power the multi-language infrastructure, allowing dynamic switching between English, Greek, Polish, and Turkish.
- **Form Processing:** Contact form submissions are integrated with EmailJS and routed through a custom PHP backend to enforce IP-based rate limiting and secure API key management.

## Key Technical Implementations

- **Accessibility (a11y) Engine:** A custom React Context provider (`AccessibilityContext`) manages dynamic accessibility adjustments. This includes DOM-level class toggling for dyslexia-friendly typography, high-contrast visual modes, scalable root typography, and reduced motion preferences.
- **Performance Optimization:** Asset loading is optimized using React's `lazy` and `Suspense` boundaries. Custom skeleton loading states are implemented across data-heavy views (like the gallery and process carousels) to stabilize Cumulative Layout Shift (CLS) metrics during asynchronous operations.

## Local Development Setup

To initialize this project locally for code review or environment testing:

1. Clone the repository:

   ```bash
   git clone https://github.com/dimitrismarkou05/OTESHIP-Project.git
   cd OTESHIP-Project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the local development server:

   ```bash
   npm run dev
   ```

4. Compile the build for production:
   ```bash
   npm run build
   ```

---

## License and Usage Restrictions

**All Rights Reserved**

Copyright (c) 2026 Dimitris Markou

This repository is completely public strictly to showcase the source code for portfolio and evaluation purposes. It is **not** open-source software.

You are permitted to read and review the code on the GitHub platform. However, you may not use, copy, modify, merge, publish, distribute, sublicense, or sell copies of this code, in whole or in part, for your own personal or commercial projects without explicit, prior written permission from the author.
