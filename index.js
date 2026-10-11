const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const clearBtn = document.getElementById("clearBtn");
const emptyMsg = document.getElementById("empty");

let tasks = JSON.parse(localStorage.getItem("dta-tasks") || "[]");

function save() {
  localStorage.setItem("dta-tasks", JSON.stringify(tasks));
  render();
}

function render() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.classList.add("show");
  } else {
    emptyMsg.classList.remove("show");
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.done? 'completed' : ''}`;
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.done? 'checked' : ''} onchange="toggleTask(${index})">
        <span class="checkmark"></span>
        <span class="text">${escapeHtml(task.text)}</span>
      </label>
      <button class="delete" onclick="deleteTask(${index})">✕</button>
    `;
    taskList.appendChild(li);
  });

  totalCount.innerText = `${tasks.length} Tasks`;
  const done = tasks.filter(t => t.done).length;
  completedCount.innerText = `${done} Completed`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({ text: text, done: false });
  taskInput.value = "";
  save();
}

function toggleTask(index) {
  tasks[index].done =!tasks[index].done;
  save();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
}

function clearCompleted() {
  tasks = tasks.filter(t =>!t.done);
  save();
}

// Events
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
clearBtn.addEventListener("click", clearCompleted);

// Initial render
render();