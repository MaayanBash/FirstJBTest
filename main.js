// Call the displayTasks function initially
displayTasks();

// Saving new task:
function save() {
  // Take DOM elements
  const taskHeadBox = document.getElementById("taskHeadBox");
  const descriptionBox = document.getElementById("descriptionBox");
  const timeBox = document.getElementById("timeBox");

  // Create task object
  const head = taskHeadBox.value;
  const description = descriptionBox.value;
  const time = timeBox.value;
  const task = {
    head,
    description,
    time,
  };

  // Take data from storage
  let json = localStorage.getItem("tasks");
  const tasks = json ? JSON.parse(json) : [];

  // Validation
  if (taskHeadBox.value === "") {
    alert("Head cannot be empty");
    taskHeadBox.focus();
    return;
  }
  if (descriptionBox.value === "") {
    alert("Description cannot be empty");
    descriptionBox.focus();
    return;
  }
  if (timeBox.value === "") {
    alert("Time needs to be updated");
    timeBox.focus();
    return;
  }

  // Add new task
  tasks.push(task);

  // Save to storage
  json = JSON.stringify(tasks);
  localStorage.setItem("tasks", json);

  // Clear fields
  taskHeadBox.value = "";
  descriptionBox.value = "";
  timeBox.value = "";

  // Prevent form submission
  event.preventDefault();

  // Call displayTasks function to update the displayed tasks
  displayTasks(false);
}

function displayTasks(isRemoving) {
    // Take data from storage
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
      // Split the date and time
      const dateTime = tasks[i].time.split("T");
      const date = dateTime[0];
      const time = dateTime[1];
      html += `
        <div id="task" class="newTask ${isRemoving === false && i === tasks.length - 1 ? 'fade-in' : ''}">
          <button class="remove" onclick="remove(${i})">❌</button>
          <p class="headP">${tasks[i].head}</p>
          <div class="mainDescription">
            <p class="descriptionP">${tasks[i].description}</p>
          </div>
          <footer>${date} ${time}</footer>
        </div>
      `;
    }

  
    // Take sectionTasks from HTML
    let sectionTasks = document.getElementById("sectionTasks");
    sectionTasks.innerHTML = html;
}
function remove(index) {
  // Take data from storage
  let json = localStorage.getItem("tasks");
  const tasks = json ? JSON.parse(json) : [];

  tasks.splice(index, 1);

  // Save to storage
  json = JSON.stringify(tasks);
  localStorage.setItem("tasks", json);

  // Check if tasks array is empty and remove tasks from local storage
  if (tasks.length === 0) {
    localStorage.removeItem("tasks");
  }

  // Call displayTasks function to update the displayed tasks
  displayTasks(true);
}
