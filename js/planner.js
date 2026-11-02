(() => {
  const storageKey = 'joshua-academic-tasks-v1';
  const form = document.querySelector('#task-form');
  form.querySelector('button[type="submit"]').disabled = false;
  const input = document.querySelector('#task-title');
  const list = document.querySelector('#task-list');
  const emptyState = document.querySelector('#empty-state');
  const summary = document.querySelector('#task-summary');
  const status = document.querySelector('#task-status');
  const storageNotice = document.querySelector('#storage-notice');
  let tasks = [];

  function loadTasks() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === null) return;
      const parsed = JSON.parse(stored);
      const ids = new Set();
      if (!Array.isArray(parsed) || !parsed.every(task => {
        if (!task || typeof task.id !== 'string' || !task.id || ids.has(task.id) ||
            typeof task.title !== 'string' || !task.title.trim() || task.title.length > 200 ||
            typeof task.completed !== 'boolean') return false;
        ids.add(task.id);
        return true;
      })) throw new Error('Invalid saved task format');
      tasks = parsed.map(task => ({ id: task.id, title: task.title.trim(), completed: task.completed }));
    } catch {
      storageNotice.textContent = 'Saved tasks could not be read. You can start a new list; saving a change will replace any unreadable saved data.';
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      storageNotice.textContent = 'Tasks are saved in this browser on this device.';
    } catch {
      storageNotice.textContent = 'Browser storage is unavailable. You can use this list, but changes will be lost when you leave or reload.';
    }
  }

  function renderTasks() {
    list.replaceChildren();
    emptyState.hidden = tasks.length > 0;
    const completed = tasks.filter(task => task.completed).length;
    summary.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} · ${completed} completed`;
    tasks.forEach(task => {
      const row = document.createElement('li');
      row.className = `task-row${task.completed ? ' is-complete' : ''}`;
      const label = document.createElement('label');
      label.className = 'task-label';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        row.classList.toggle('is-complete', task.completed);
        summary.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} · ${tasks.filter(item => item.completed).length} completed`;
        saveTasks();
        status.textContent = task.completed ? 'Task completed.' : 'Task marked as incomplete.';
      });
      const title = document.createElement('span');
      title.textContent = task.title;
      label.append(checkbox, title);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'delete-task';
      remove.textContent = 'Delete';
      remove.setAttribute('aria-label', `Delete task: ${task.title}`);
      remove.addEventListener('click', () => {
        const index = tasks.findIndex(item => item.id === task.id);
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasks();
        renderTasks();
        const buttons = list.querySelectorAll('button');
        (buttons[Math.min(index, buttons.length - 1)] || input).focus();
        status.textContent = 'Task deleted.';
      });
      row.append(label, remove);
      list.append(row);
    });
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title || title.length > 200) {
      input.setAttribute('aria-invalid', 'true');
      document.querySelector('#task-error').textContent = !title ? 'Enter a task before adding it.' : 'Keep your task within 200 characters.';
      input.focus();
      return;
    }
    let id;
    do {
      id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    } while (tasks.some(task => task.id === id));
    tasks.push({ id, title, completed: false });
    saveTasks();
    renderTasks();
    form.reset();
    input.removeAttribute('aria-invalid');
    document.querySelector('#task-error').textContent = '';
    input.focus();
    status.textContent = 'Task added.';
  });
  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    document.querySelector('#task-error').textContent = '';
  });
  loadTasks();
  renderTasks();
})();
