// modules/storage.js
export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};