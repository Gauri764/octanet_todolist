// DOM Elements
const taskInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Task Storage Array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Add Task
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value;
    const taskDate = taskDateInput.value;
    
    if (taskName === '' || taskDate === '') {
        alert('Please enter a task name and select a due date.');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        date: taskDate,
        completed: false,
    };

    tasks.push(newTask);
    taskInput.value = '';
    taskDateInput.value = '';
    updateLocalStorage();
    displayTasks(tasks);
});

// Display Tasks
function displayTasks(taskArray) {
    taskList.innerHTML = '';
    taskArray.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.innerHTML = `
            <span>
                ${task.name} <small>(Due: ${task.date})</small>
            </span>
            <div class="task-action-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Toggle Task Complete
function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;

            // Move completed task to completedTasks array
            if (task.completed) {
                completedTasks.push(task);
            } else {
                completedTasks = completedTasks.filter(t => t.id !== taskId);
            }
        }
        return task;
    });
    updateLocalStorage();
    displayTasks(tasks);
}

// Delete Task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    completedTasks = completedTasks.filter(task => task.id !== taskId);
    updateLocalStorage();
    displayTasks(tasks);
}

// Filter Tasks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        if (button.id === 'all-tasks') {
            displayTasks(tasks);
        } else if (button.id === 'incomplete-tasks') {
            const incompleteTasks = tasks.filter(task => !task.completed);
            displayTasks(incompleteTasks);
        } else if (button.id === 'completed-tasks') {
            const completedTasks = tasks.filter(task => task.completed);
            displayTasks(completedTasks);
        }
    });
});

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Initial Display
displayTasks(tasks);
