# Full-Stack JS Engineer Test Assessment

This project is a full-stack JavaScript application featuring a React + Vite + Tailwind CSS frontend and an Express + TypeScript backend. It demonstrates recipe browsing, filtering, and detail viewing.

---

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone github.com/VladVozhzhov/Developers.Today_TS-node-react-test
   cd Developers.Today_TS-node-react-test
   ```

2. **Install root dependencies:**

   ```bash
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

4. **Install backend dependencies:**

   ```bash
   cd ../backend
   npm install
   ```

---

## Running the Application (Development)

From the project root:

```bash
npm run dev
```

- This will start both the backend (on port 3500 by default) and the frontend (on port 5173 by default).
- The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Building for Production

```bash
npm run build
```

- This will build both the backend and frontend.

---

## Starting the Production Build

```bash
npm start
```

- This will start the backend server using the built files.

---

## Testing the Application

1. **Manual Testing:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.
   - Browse recipes, filter by country, ingredient, or category, and view recipe details.

2. **API Testing:**
   - The backend exposes endpoints at `/api/recipes` for listing and filtering recipes, and `/api/recipes/:id` for recipe details.

---

## Environment Variables

The backend uses a `.env` file for configuration. Example:

```
PORT=3500
RECIPE_API=https://www.themealdb.com/api/json/v1/1
```

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, TypeScript
- **Backend:** Express, TypeScript

---

## Project Structure

```
.
├── backend
│   └── ... (Express API)
├── frontend
│   └── ... (React app)
├── package.json
└── README.md
```

---
