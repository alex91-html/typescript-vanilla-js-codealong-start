// interface 
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// enums 

enum FilterState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// DOM Elements
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
const tasksCount = document.getElementById('tasks-count') as HTMLDivElement;
const filterAll = document.getElementById('filter-all') as HTMLButtonElement;
const filterActive = document.getElementById('filter-active') as HTMLButtonElement;
const filterCompleted = document.getElementById('filter-completed') as HTMLButtonElement;

// task array 

let tasks: Task[] = [];

// Add task
const addTask = (e: Event): void => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task: Task = {
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
const toggleTask = (id: number): void => {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
};


// Delete task
const deleteTask = (id: number): void => {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
};

// Render tasks
const renderTasks = (filter: FilterState = FilterState.All) => {
  let filteredTasks = tasks;
  if (filter === FilterState.Active) {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === FilterState.Completed) {
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