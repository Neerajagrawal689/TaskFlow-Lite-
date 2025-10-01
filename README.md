# TaskFlow-Lite-TaskFlow Lite is a lightweight, fully client-side task management application built with vanilla JavaScript, HTML, and CSS. It enables users to create, read, update, and delete tasks with persistent storage using the browser's localStorage. The app is designed with a clean MVC-like architecture, focusing on modularity, accessibility, and responsive design.

Features
Task Management
Add new tasks with auto-generated unique IDs.
Toggle task completion status.
Edit existing tasks inline with validation.
Delete tasks with confirmation prompt.
Filtering
View all tasks, only active tasks, or only completed tasks.
Data Persistence
Tasks are saved in localStorage and persist across browser sessions.
Undo/Redo
Undo and redo task changes with keyboard shortcuts (Ctrl/Cmd + Z / Ctrl/Cmd + Shift + Z or Y).
Validation
Prevent empty or overly long task submissions.
Real-time validation feedback on input.
UI/UX
Responsive design for mobile and desktop.
Dark and light mode toggle with saved preference.
Visual feedback for user actions.
Empty state illustration when no tasks exist.
Accessibility
ARIA labels and roles for screen readers.
Keyboard navigable interface.
High contrast and focus indicators.
Architecture
The application follows a modular MVC-like pattern:

Model (Data)
Task data stored as an array of objects.
Persistence handled via localStorage abstraction (storage.js).
View (DOM)
Dynamic rendering of tasks and UI components (render.js).
Controller (Event Handling)
User interactions handled in app.js.
Validation logic separated in validation.js.
Installation & Setup
Clone the repository:

bash

Run
Copy code
git clone https://github.com/yourusername/taskflow-lite.git
cd taskflow-lite
Open index.html in a modern browser:

No build tools or server required.

Alternatively, serve with a static server for module support:

bash

Run
Copy code
npx http-server .
Start managing your tasks!

Usage
Add Task: Type a task in the input box and press "Add" or Enter.
Toggle Completion: Click the checkbox next to a task.
Edit Task: Click the ✏️ button and enter new text.
Delete Task: Click the 🗑 button and confirm deletion.
Filter Tasks: Use the All / Active / Completed buttons.
Undo/Redo: Use keyboard shortcuts:
Undo: Ctrl/Cmd + Z
Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
Toggle Theme: Use the Dark Mode switch at the bottom.
Technical Details
Languages & APIs:

Vanilla JavaScript (ES6+ modules)
HTML5 & CSS3 (Flexbox, CSS variables)
Browser APIs: localStorage, DOM API, Event Delegation
