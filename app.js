// app.js
import { loadTasks, saveTasks } from './storage.js';
import { renderTaskList, renderTaskCounter } from './render.js';
import { validateTaskInput } from './validation.js';

let tasks = loadTasks();
let filteredTasks = [...tasks];
let currentFilter = 'all';

const taskListElement = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskInputError = document.getElementById('task-input-error');
const filterButtons = document.querySelectorAll('.filter-btn');
const taskCounter = document.getElementById('task-counter');
const themeSwitch = document.getElementById('theme-switch');

const history = [];
let historyIndex = -1;

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function saveState() {
  if (historyIndex < history.length - 1) {
    history.splice(historyIndex + 1);
  }
  history.push(JSON.stringify(tasks));
  if (history.length > 50) history.shift();
  historyIndex = history.length - 1;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    tasks = JSON.parse(history[historyIndex]);
    applyFilter(currentFilter);
    saveTasks(tasks);
    render();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    tasks = JSON.parse(history[historyIndex]);
    applyFilter(currentFilter);
    saveTasks(tasks);
    render();
  }
}

function applyFilter(filter) {
  currentFilter = filter;
  switch (filter) {
    case 'active':
      filteredTasks = tasks.filter(t => !t.completed);
      break;
    case 'completed':
      filteredTasks = tasks.filter(t => t.completed);
      break;
    default:
      filteredTasks = [...tasks];
  }
}

function render() {
  renderTaskList(taskListElement, filteredTasks);
  renderTaskCounter(taskCounter, tasks);
  updateFilterButtons();
}

function updateFilterButtons() {
  filterButtons.forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive.toString());
  });
}

function showValidationError(message) {
  if (message) {
    taskInputError.textContent = message;
    taskInput.setAttribute('aria-invalid', 'true');
  } else {
    taskInputError.textContent = '';
    taskInput.removeAttribute('aria-invalid');
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function initEventListeners() {
  // Form submission
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const { valid, error } = validateTaskInput(taskInput.value);
    if (!valid) {
      showValidationError(error);
      return;
    }
    showValidationError(null);
    const newTask = createTask(taskInput.value);
    tasks.push(newTask);
    saveState();
    saveTasks(tasks);
    applyFilter(currentFilter);
    render();
    taskInput.value = '';
    taskInput.focus();
  });

  // Real-time validation feedback with debounce
  taskInput.addEventListener('input', debounce(() => {
    const { valid, error } = validateTaskInput(taskInput.value);
    showValidationError(valid ? null : error);
  }, 300));

  // Filter buttons click
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
      render();
    });
  });

  // Event delegation for task list
  taskListElement.addEventListener('click', e => {
    const taskElement = e.target.closest('.task');
    if (!taskElement) return;

    const taskId = Number(taskElement.dataset.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    // Delete button
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(taskIndex, 1);
        saveState();
        saveTasks(tasks);
        applyFilter(currentFilter);
        render();
      }
      return;
    }

    // Edit button (optional enhancement)
    if (e.target.classList.contains('edit-btn')) {
      // Simple inline edit prompt
      const newText = prompt('Edit task:', tasks[taskIndex].text);
      if (newText !== null) {
        const trimmed = newText.trim();
        if (trimmed.length === 0) {
          alert('Task cannot be empty.');
          return;
        }
        if (trimmed.length > 100) {
          alert('Task cannot exceed 100 characters.');
          return;
        }
        tasks[taskIndex].text = trimmed;
        saveState();
        saveTasks(tasks);
        applyFilter(currentFilter);
        render();
      }
      return;
    }

    // Checkbox toggle completion
    if (e.target.type === 'checkbox') {
      tasks[taskIndex].completed = e.target.checked;
      saveState();
      saveTasks(tasks);
      taskElement.classList.toggle('completed', e.target.checked);
      renderTaskCounter(taskCounter, tasks);
      return;
    }
  });

  // Keyboard shortcuts for undo/redo
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      undo();
    } else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') || 
               ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y')) {
      e.preventDefault();
      redo();
    }
  });

  // Theme toggle
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark');
      themeSwitch.setAttribute('aria-checked', 'true');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      themeSwitch.setAttribute('aria-checked', 'false');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Load theme preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
    themeSwitch.setAttribute('aria-checked', 'true');
  } else {
    document.body.classList.remove('dark');
    themeSwitch.checked = false;
    themeSwitch.setAttribute('aria-checked', 'false');
  }
}

// Initialize app
function init() {
  saveState(); // Save initial state
  applyFilter(currentFilter);
  render();
  initEventListeners();
  loadTheme();
}

init();

