// Initialize Lucide icons
lucide.createIcons();

// Get DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const todoScreen = document.getElementById('todo-screen');
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const welcomeName = document.getElementById('welcome-name');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Welcome screen functionality
nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        welcomeName.textContent = `Welcome, ${name}!`;
        welcomeScreen.classList.add('hidden');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            todoScreen.classList.remove('hidden');
        }, 500); // Matches CSS transition duration
    }
});

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <button class="completeBtn" onclick="toggleComplete(this)">
                <i data-lucide="check"></i>
            </button>
            <span class="task-text">${taskText}</span>
            <button class="editBtn" onclick="editTask(this)">
                <i data-lucide="edit-2"></i>
            </button>
            <button class="deleteBtn" onclick="deleteTask(this)">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        lucide.createIcons();
        
        // Add transition for new task
        setTimeout(() => {
            li.classList.add('show');
        }, 10);
    }
}

// Toggle complete function
function toggleComplete(btn) {
    const li = btn.parentElement;
    li.classList.toggle('completed');
}

// Edit task function
function editTask(btn) {
    const li = btn.parentElement;
    const span = li.querySelector('.task-text');
    const text = span.textContent;
    span.innerHTML = `<input type="text" value="${text}">`;
    btn.innerHTML = '<i data-lucide="check"></i>';
    btn.onclick = () => saveTask(btn);
    btn.classList.replace('editBtn', 'saveBtn');
    lucide.createIcons();
}

// Save task function
function saveTask(btn) {
    const li = btn.parentElement;
    const input = li.querySelector('input');
    const span = li.querySelector('.task-text');
    span.textContent = input.value;
    btn.innerHTML = '<i data-lucide="edit-2"></i>';
    btn.onclick = () => editTask(btn);
    btn.classList.replace('saveBtn', 'editBtn');
    lucide.createIcons();
}

// Delete task function
function deleteTask(btn) {
    const li = btn.parentElement;
    if (li.classList.contains('completed')) {
        li.classList.add('removing');
        setTimeout(() => {
            li.remove();
        }, 500); // Matches the CSS transition duration for completed tasks
    } else {
        li.classList.add('removing');
        setTimeout(() => {
            li.remove();
        }, 300); // Matches the CSS transition duration for uncompleted tasks
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});