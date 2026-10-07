

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");


// ===============================
// Application State
// ===============================

let tasks = [];

let currentFilter = "all";


// ===============================
// Add Task
// ===============================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Reject empty task
    if (taskText === "") {

        showError("Please enter a task.");

        return;
    }

    // Reject duplicate task
    const duplicate = tasks.some(function (task) {

        return task.text.toLowerCase() === taskText.toLowerCase();

    });

    if (duplicate) {

        showError("This task already exists.");

        return;
    }

    // Create new task
    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    clearError();

    renderTasks();
});


// ===============================
// Event Delegation
// ===============================

taskList.addEventListener("click", function (event) {

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = Number(taskItem.dataset.id);


    // Delete Task
    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function (task) {

            return task.id !== taskId;

        });

        renderTasks();
    }

});


// ===============================
// Checkbox
// ===============================

taskList.addEventListener("change", function (event) {

    if (!event.target.classList.contains("task-checkbox")) {
        return;
    }

    const taskItem = event.target.closest(".task-item");

    const taskId = Number(taskItem.dataset.id);

    const task = tasks.find(function (task) {

        return task.id === taskId;

    });

    if (task) {

        task.completed = event.target.checked;

    }

    renderTasks();
});


// ===============================
// Bonus: Double Click Editing
// ===============================

taskList.addEventListener("dblclick", function (event) {

    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const taskItem = event.target.closest(".task-item");

    const taskId = Number(taskItem.dataset.id);

    const task = tasks.find(function (task) {

        return task.id === taskId;

    });

    if (!task) {
        return;
    }

    const editInput = document.createElement("input");

    editInput.type = "text";

    editInput.className = "edit-input";

    editInput.value = task.text;

    event.target.replaceWith(editInput);

    editInput.focus();

    editInput.select();


    // Enter = Save
    editInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const newText = editInput.value.trim();

            if (newText === "") {

                showError("Task cannot be empty.");

                return;
            }

            const duplicate = tasks.some(function (item) {

                return (
                    item.id !== taskId &&
                    item.text.toLowerCase() === newText.toLowerCase()
                );

            });

            if (duplicate) {

                showError("This task already exists.");

                return;
            }

            task.text = newText;

            clearError();

            renderTasks();
        }


        // Escape = Cancel
        if (event.key === "Escape") {

            clearError();

            renderTasks();
        }

    });

});


// ===============================
// Filters
// ===============================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;


        // Remove active class
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class
        button.classList.add("active");

        renderTasks();
    });

});


// ===============================
// Clear Completed
// ===============================

clearCompletedBtn.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });

    renderTasks();
});


// ===============================
// Render Tasks
// ===============================

function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    // Active filter
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {

            return !task.completed;

        });

    }


    // Completed filter
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {

            return task.completed;

        });

    }


    // No tasks
    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent = "No tasks to show.";

        taskList.appendChild(emptyMessage);

    }


    // Display tasks
    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        li.className = "task-item";

        li.dataset.id = task.id;


        // Completed class
        if (task.completed) {

            li.classList.add("completed");

        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // Task text
        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";


        // Add elements
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();
}


// ===============================
// Counter
// ===============================

function updateCounter() {

    const totalTasks = tasks.length;

    const remainingTasks = tasks.filter(function (task) {

        return !task.completed;

    }).length;


    counter.textContent =
        `Total: ${totalTasks} | Remaining: ${remainingTasks}`;
}


// ===============================
// Error Functions
// ===============================

function showError(message) {

    errorMessage.textContent = message;
}


function clearError() {

    errorMessage.textContent = "";
}


// ===============================
// Initial Render
// ===============================

renderTasks();

