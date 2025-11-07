# 🐜 MERN Bug Tracker (with Comprehensive Testing)

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built from scratch. The primary goal of this project is to demonstrate a robust, multi-layered testing strategy for a MERN application, ensuring reliability and maintainability.

The application itself is a simple "Bug Tracker" where users can report, view, update, and delete project issues.

## Core Features

* **Create:** Report new bugs with a title and description.
* **Read:** View a list of all submitted bugs, sorted by creation date.
* **Update:** Change a bug's status (e.g., "Open," "In-Progress," "Resolved").
* **Delete:** Remove a bug from the tracker.

## 🛠️ Technical Stack & Architecture

This project is separated into two main packages: `client` and `server`.

### Backend (CommonJS)

* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB (with Mongoose ODM)
* **Error Handling:** Custom global error handler middleware
* **Environment:** `dotenv` for managing environment variables

### Frontend (Vite)

* **Library:** React
* **Bundler:** Vite
* **API Client:** Axios
* **Error Handling:** React Error Boundaries
* **Styling:** Plain CSS

### 🧪 Testing & Debugging (The Core Focus)

This project implements a three-layer testing strategy:

1.  **Backend Integration Tests:**
    * **Tools:** Jest, Supertest
    * **Strategy:** Tests the full API lifecycle (request -> controller -> database -> response) by connecting to a **real, separate test database** for C.R.U.D. operations.

2.  **Frontend Unit & Integration Tests:**
    * **Tools:** Vitest, React Testing Library (RTL)
    * **Strategy:** Includes component unit tests (e.g., `BugForm`) and integration tests that mock the API service to verify UI behavior (e.g., `App.jsx`).

3.  **End-to-End (E2E) Tests:**
    * **Tools:** Cypress
    * **Strategy:** Simulates a real user's entire journey in a live browser. Tests the complete flow: from visiting the page, to filling the form, submitting, and seeing the new bug appear in the list.

---

## 🚀 Getting Started

### 1. Prerequisites

* Node.js (v18 or later)
* NPM
* MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)

### 2. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/testing-and-debugging-ensuring-mern-app-reliability-Deeja-ish.git
cd testing-and-debugging-ensuring-mern-app-reliability-Deeja-ish
```

### 3. Backend Setup (Terminal 1)

1.  Navigate to the backend:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` root folder:
    ```bash
    touch .env
    ```
4.  Add your environment variables to the `.env` file. You must provide two separate database connection strings: one for development and one for testing.

    ```.env
    PORT=5000
    MONGO_URI=your_MAIN_mongodb_connection_string
    MONGO_URI_TEST=your_TEST_mongodb_connection_string
    ```

### 4. Frontend Setup (Terminal 2)

1.  Navigate to the frontend:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## 🏃‍♀️ Running the Application

You must have **two** terminals open to run the full application.

1.  **Start Backend Server:**
    In your `server` terminal:
    ```bash
    npm run server
    ```
    (Server will run on `http://localhost:5000`)

2.  **Start Frontend Server:**
    In your `client` terminal:
    ```bash
    npm run dev
    ```
    (Application will open in your browser at `http://localhost:5173` or similar)

---

## 🔬 Running the Test Suites

This project features three distinct test suites.

### 1. Backend Integration Tests (Jest)

These tests run against your **test database** (`MONGO_URI_TEST`).

1.  Navigate to the `server` directory.
2.  Run the test command:
    ```bash
    npm test
    ```

### 2. Frontend Unit/Integration Tests (Vitest)

These tests are self-contained and mock any API calls.

1.  Navigate to the `client` directory.
2.  Run the test command:
    ```bash
    npm test
    ```

### 3. End-to-End Tests (Cypress)

**Requirement:** The *entire application* must be running first (both backend and frontend servers, as described in "Running the Application").

1.  Navigate to the `frontend` directory.
2.  Open the Cypress test runner:
    ```bash
    npm run cypress:open
    ```
3.  In the Cypress app, click "E2E Testing," choose a browser, and click on the `bug-tracker.cy.js` spec to run the tests.

## 🐞 Debugging & Reliability Features

* **Backend Error Handling:** A global `errorHandler` middleware (`backend/middleware/errorMiddleware.js`) catches and formats all server-side errors, ensuring no requests hang.
* **Frontend Error Handling:** A React `<ErrorBoundary>` component (`frontend/src/components/ErrorBoundary.jsx`) wraps the main application to catch any rendering errors, display a fallback UI, and prevent a "white screen of death."
* **Backend Debugging:** Run `nodemon --inspect server.js` to debug the server with the Node.js inspector.
* **Frontend Debugging:** Use Chrome DevTools' **Network** tab to inspect API calls and the **Components** tab (with React DevTools extension) to inspect component state.