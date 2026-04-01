// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

// Save tasks to localStorage
function saveTasks() {
  const tasksArr = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasksArr.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
   console.log("Saving tasks:", tasksArr); // <-- check this
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Add new task to DOM
function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";
  li.appendChild(span);

  if (completed) li.classList.add("completed");

  // Click to toggle completion
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });
  li.appendChild(delBtn);

  taskList.appendChild(li);
}

// Add task button click
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText);
    taskInput.value = "";
    saveTasks();
  }
});
