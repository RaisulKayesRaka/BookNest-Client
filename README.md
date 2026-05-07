# BookNest - Client

This is the frontend portion of the BookNest Library Management System. Built with React and Vite, it provides a fast, responsive, and interactive experience for users to manage their library activities.

## Key Features

- **Dynamic Homepage**: Features an interactive banner with sliders and library insights.
- **Categorized Browsing**: Explore books across different genres like Business, History, Science Fiction, and more.
- **Book Inventory**: View detailed information about each book, including ratings and descriptions.
- **Borrowing Workflow**: Simple modal-based borrowing system with validation (e.g., date selection, borrowing limits).
- **Personalized Dashboard**: View borrowed books, return them, and track return dates.
- **Admin Capabilities**: Authorized users can add new books to the collection or update existing ones.
- **Responsive UI**: Seamless experience across mobile, tablet, and desktop devices.

## Tech Stack

| Name | Purpose |
| :--- | :--- |
| React.js | Library for building the user interface |
| Vite | Fast and lean build tool |
| Tailwind CSS | Styling the application with utility classes |
| DaisyUI | Pre-built UI components for Tailwind |
| Firebase | Handling user authentication (Google & Email/Password) |
| React Router | Handling client-side navigation and private routes |
| Axios | Managing API communication with the backend |
| Swiper.js | Implementing responsive carousels |
| React Hot Toast | Displaying beautiful notifications |
| React Rating | Displaying and handling book ratings |
| React Helmet | Managing SEO and dynamic page titles |

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RaisulKayesRaka/BookNest-Client.git
   cd BookNest-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root of the client directory and add your Firebase credentials:
   ```env
   VITE_apiKey=YOUR_API_KEY
   VITE_authDomain=YOUR_AUTH_DOMAIN
   VITE_projectId=YOUR_PROJECT_ID
   VITE_storageBucket=YOUR_STORAGE_BUCKET
   VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
   VITE_appId=YOUR_APP_ID
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Previews the production build locally.
