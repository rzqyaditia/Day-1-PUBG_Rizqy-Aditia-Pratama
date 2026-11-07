const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");

let tasks = [];
let currentFilter = "all";

// Menampilkan daftar tugas
function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty">Belum ada tugas.</li>';
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        const info = document.createElement("div");
        info.className = "task-info";

        if (task.completed) {
            info.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.textContent = task.title;

        const deadline = document.createElement("p");
        deadline.textContent = "Deadline: " + task.deadline;

        info.appendChild(title);
        info.appendChild(deadline);

        const completeButton = document.createElement("button");
        completeButton.textContent =
            task.completed ? "Selesai" : "Tandai Selesai";

        completeButton.addEventListener("click", () => {
            task.completed = !task.completed;
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            displayTasks();
        });

        li.appendChild(info);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Menambahkan tugas baru
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newTask = {
        id: Date.now(),
        title: taskInput.value,
        deadline: deadlineInput.value,
        completed: false
    };

    tasks.push(newTask);

    form.reset();
    displayTasks();
});

// Mengatur filter tugas
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayTasks();
    });
});

displayTasks();