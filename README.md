# RS To-Do List App 📝

A full-stack To-Do List application built using **React**, **Express.js**, **MongoDB**, and styled with **Tailwind CSS**. This app allows users to manage their tasks efficiently with features such as adding, updating, marking as complete/incomplete, and deleting tasks.

---

## Author  
**Rehan Feroz Sayyed**

---

## Features  
- Add new tasks with a title and description.  
- Mark tasks as complete or incomplete.  
- Delete tasks.  
- View tasks sorted by creation date (latest first).  
- Simple, clean, and responsive UI built with Tailwind CSS.

---

## File Structure  

```
RS-ToDo-App/
│
├── backend/
│   ├── models/
│   │   └── Task.js           # Mongoose model for tasks
│   ├── routes/
│   │   └── tasks.js          # Express.js routes for task CRUD operations
│   ├── server.js             # Entry point for the backend
│   ├── package.json          # Backend dependencies and scripts
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskList.jsx  # Task list component
│   │   ├── index.js          # React entry point
│   │   └── App.jsx           # Main application component
│   ├── public/               # Public files (e.g., favicon, index.html)
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Documentation for the project
```

---

## Setup  

Follow these steps to run the project locally:

### Backend  

1. Navigate to the `backend/` directory:  
   ```bash
   cd backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and add:  
   ```
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5000
   ```
4. Start the backend server:  
   ```bash
   npm start
   ```

### Frontend  

1. Navigate to the `frontend/` directory:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```

---

## Technologies  

### Frontend  
- **React**  
- **Tailwind CSS**  
- **Axios**  
- **Vite**  

### Backend  
- **Node.js**  
- **Express.js**  
- **MongoDB** (Mongoose ODM)  

---

## Usage  

1. Start the backend server (refer to Setup > Backend).  
2. Start the frontend server (refer to Setup > Frontend).  
3. Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.  

---

## API Endpoints  

### Base URL: `http://localhost:5000/api/tasks/`  

| Method | Endpoint          | Description                    |  
|--------|-------------------|--------------------------------|  
| GET    | `/`               | Get all tasks                 |  
| GET    | `/:id`            | Get a single task by ID       |  
| POST   | `/`               | Create a new task             |  
| PUT    | `/:id`            | Update an existing task       |  
| DELETE | `/:id`            | Delete a task by ID           |  

---

## Screenshots  

### Home Page  
A minimalistic UI to manage your tasks with ease.  

---

## License  

This project is open-source and available under the MIT License.  

---
```

Make sure to replace `<your_mongodb_connection_string>` with your actual MongoDB connection string. Include relevant screenshots of your app under the "Screenshots" section for a more appealing README.