"use strict";
// enums 
var FilterState;
(function (FilterState) {
  FilterState["All"] = "all";
  FilterState["Active"] = "active";
  FilterState["Completed"] = "completed";
})(FilterState || (FilterState = {}));
// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const tasksCount = document.getElementById('tasks-count');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');
// task array 
let tasks = [];
// Add task
const addTask = (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
};
// Toggle task completion
const toggleTask = (id) => {
  tasks = tasks.map(task => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
  renderTasks();
};
// Delete task
const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
};
// Render tasks
const renderTasks = (filter = FilterState.All) => {
  let filteredTasks = tasks;
  if (filter === FilterState.Active) {
    filteredTasks = tasks.filter(task => !task.completed);
  }
  else if (filter === FilterState.Completed) {
    filteredTasks = tasks.filter(task => task.completed);
  }
  taskList.innerHTML = filteredTasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}">
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
  tasksCount.textContent = `${tasks.filter(task => !task.completed).length} tasks left`;
};
// Event listeners
taskForm.addEventListener('submit', addTask);
filterAll.addEventListener('click', () => renderTasks(FilterState.All));
filterActive.addEventListener('click', () => renderTasks(FilterState.Active));
filterCompleted.addEventListener('click', () => renderTasks(FilterState.Completed));
// Initial render
renderTasks();
