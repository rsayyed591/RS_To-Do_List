import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    fetchTasks();

    const intervalId = setInterval(fetchTasks, 5000); // Check server every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setIsOnline(true);
      syncLocalTasks(res.data);
    } catch (err) {
      console.log('Error Fetching Tasks', err);
      setIsOnline(false);
    }
  };

  const syncLocalTasks = (serverTasks) => {
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTasks = localTasks.filter(
      (localTask) => !serverTasks.some((serverTask) => serverTask._id === localTask._id)
    );
    if (newTasks.length > 0) {
      newTasks.forEach((task) => handleAddTask(null, task));
    }
  };

  const handleAddTask = async (e, taskData = null) => {
    if (e) e.preventDefault();
    if (!taskData && !title) return;

    const newTask = taskData || { title, description, completed: false };
    if (!isOnline) {
      newTask._id = Date.now().toString();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
      return;
    }

    try {
      const res = await axios.post(API_URL, newTask);
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.log("Error Adding Task", err);
      newTask._id = Date.now().toString();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
    }
  };

  const toggleCompletion = async (id, currentStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, completed: !currentStatus } : task
    );
    setTasks(updatedTasks);

    if (!isOnline) return;

    try {
      await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
    } catch (err) {
      console.log('Error Updating Task', err);
    }
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task._id !== id));

    if (!isOnline) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      console.log('Error Deleting Task', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-2 px-2 sm:py-4 sm:px-4 md:py-8 md:px-6">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-3 py-4 sm:px-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">RS : To Do List</h1>
          {!isOnline && (
            <div className="flex items-center text-yellow-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Offline Mode</span>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleAddTask} className="px-3 py-4 sm:px-4 sm:py-5">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Task
              </button>
            </div>
          </form>
        </div>
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`px-3 py-4 sm:px-4 sm:py-5 ${
                task.completed ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                  <h3 className={`text-base sm:text-lg font-medium text-gray-900 ${
                    task.completed ? 'line-through' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`mt-1 text-sm text-gray-500 ${
                    task.completed ? 'line-through' : ''
                  }`}>
                    {task.description}
                  </p>
                </div>
                <div className="flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => toggleCompletion(task._id, task.completed)}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md ${
                      task.completed
                        ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                        : 'text-green-700 bg-green-100 hover:bg-green-200'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {task.completed ? (
                      <>
                        <XCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="sm:inline">Incomplete</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="sm:inline">Complete</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                  >
                    <Trash2 className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;

