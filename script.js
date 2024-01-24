// Function to add a new task
function addTask() {
  var newTask = document.getElementById("newTask").value;
  if (newTask) {
    var li = document.createElement("li");
    li.textContent = newTask;

    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      li.remove();
      saveTasks();
    };
    li.appendChild(deleteBtn);

    // Add mark as complete functionality
    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });

    document.getElementById("taskList").appendChild(li);
    document.getElementById("newTask").value = "";

    saveTasks();
  }
}

// Function to save tasks to local storage
function saveTasks() {
  var tasks = [];
  document.querySelectorAll("#taskList li").forEach(function (taskLi) {
    tasks.push({
      text: taskLi.textContent.replace("Delete", "").trim(),
      completed: taskLi.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(function (task) {
      var li = document.createElement("li");
      li.textContent = task.text;

      // Add delete button
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
      };
      li.appendChild(deleteBtn);

      if (task.completed) {
        li.classList.add("completed");
      }

      li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
      });

      document.getElementById("taskList").appendChild(li);
    });
  }
}

// Event listener for add task button
document.getElementById("addTask").addEventListener("click", addTask);

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
