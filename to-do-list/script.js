class TodoApp {
  constructor() {
    this.todos = [];
    this.currentEditId = null;
    this.init();
  }

  init() {
    this.todoInput = document.querySelector('.todo-input');
    this.addBtn = document.querySelector('.add-btn');
    this.todoList = document.getElementById('todoList');
    this.emptyState = document.getElementById('emptyState');
    this.stats = document.getElementById('stats');

    this.addBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });

    this.render();
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date()
    };

    this.todos.push(todo);
    this.todoInput.value = '';
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  editTodo(id) {
    this.currentEditId = id;
    this.render();
  }

  saveTodo(id, newText) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo && newText.trim()) {
      todo.text = newText.trim();
    }
    this.currentEditId = null;
    this.render();
  }

  cancelEdit() {
    this.currentEditId = null;
    this.render();
  }

  render() {
    this.todoList.innerHTML = '';

    if (this.todos.length === 0) {
      this.emptyState.style.display = 'block';
      this.stats.style.display = 'none';
      return;
    }

    this.emptyState.style.display = 'none';
    this.stats.style.display = 'flex';

    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

      if (this.currentEditId === todo.id) {
        li.innerHTML = `
                    <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                         onclick="app.toggleTodo(${todo.id})"></div>
                    <input type="text" class="edit-input" value="${todo.text}" 
                           onkeypress="if(event.key==='Enter') app.saveTodo(${todo.id}, this.value)"
                           onblur="app.saveTodo(${todo.id}, this.value)" autofocus>
                    <div class="todo-actions">
                        <button class="save-btn" onclick="app.saveTodo(${todo.id}, this.previousElementSibling.value)">Save</button>
                        <button class="cancel-btn" onclick="app.cancelEdit()">Cancel</button>
                    </div>
                `;
      } else {
        li.innerHTML = `
                    <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                         onclick="app.toggleTodo(${todo.id})"></div>
                    <span class="todo-text">${todo.text}</span>
                    <div class="todo-actions">
                        <button class="edit-btn" onclick="app.editTodo(${todo.id})">Edit</button>
                        <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
      }

      this.todoList.appendChild(li);
    });

    this.updateStats();
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pending: ${pending}`;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TodoApp();
});