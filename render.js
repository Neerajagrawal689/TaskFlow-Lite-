// modules/render.js
import { escapeHTML } from './validation.js';

/**
 * Render the list of tasks into the DOM element
 * @param {HTMLElement} taskListElement
 * @param {Array} tasks
 */
export function renderTaskList(taskListElement, tasks) {
  taskListElement.innerHTML = '';

  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="empty-state" tabindex="0">
        <img src="images/empty-tasks.svg" alt="No tasks" />
        <p>Add your first task!</p>
      </li>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.dataset.id = task.id;
    taskElement.setAttribute('tabindex', '0');
    taskElement.setAttribute('role', 'listitem');

    taskElement.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-checked="${task.completed}" />
        <span>${escapeHTML(task.text)}</span>
      </label>
      <div class="task-actions">
        <button class="edit-btn" aria-label="Edit task">✏</button>
        <button class="delete-btn" aria-label="Delete task">🗑</button>
      </div>
    `;

    fragment.appendChild(taskElement);
  });

  taskListElement.appendChild(fragment);
}

/**
 * Render task counter text
 * @param {HTMLElement} counterElement
 * @param {Array} tasks
 */
export function renderTaskCounter(counterElement, tasks) {
  const total = tasks.length;
  const active = tasks.filter(t => !t.completed).length;
  const completed = total - active;

  let text = '';
  if (total === 0) {
    text = 'No tasks yet';
  } else {
    text = `${total} task${total !== 1 ? 's' : ''} total, ${active} active, ${completed} completed`;
  }

  counterElement.textContent = text;
}