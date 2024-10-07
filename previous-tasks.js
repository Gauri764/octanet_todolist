// DOM Elements
const completedTaskList = document.getElementById('completed-task-list');

// Retrieve completed tasks from localStorage
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Display Completed Tasks
function displayCompletedTasks(taskArray) {
    completedTaskList.innerHTML = '';
    taskArray.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'completed';
        taskItem.innerHTML = `
            <span>
                ${task.name} <small>(Completed on: ${task.date})</small>
            </span>
        `;
        completedTaskList.appendChild(taskItem);
    });
}

// Initial Display
displayCompletedTasks(completedTasks);
