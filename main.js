displayTasks();
//saving new task:
function save() {
    //take DOM elements:
    const taskHeadBox = document.getElementById("taskHeadBox");
    const descriptionBox = document.getElementById("descriptionBox");
    const timeBox = document.getElementById("timeBox");

    //create task object:
    const head = taskHeadBox.value;
    const description = descriptionBox.value;
    const time = timeBox.value;
    const task = { head, description, time };

    //take data from storage:
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    //add new task:
    tasks.push(task);

    // validation:
    if (taskHeadBox.value === "") {
        alert("Head cannot be empty");
        taskHead.focus();
        return;
    }
    if (descriptionBox.value === "") {
        alert("Description cannot be empty");
        descriptionBox.focus();
        return;
    }
    if (timeBox.value === "") {
        alert("time need to be updated");
        timeBox.focus();
        return;
    }

    //save to storage:
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);

    //clear fields:
    taskHeadBox.value = "";
    descriptionBox.value = "";
    timeBox.value = "";

    //event listeners:
    event.preventDefault();

    displayTasks();
}

function displayTasks() {
    // Take data from storage:
    let json = localStorage.getItem("tasks");
    const tasks = JSON ? JSON.parse(json) : [];
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
      // Split the date and time
      const dateTime = tasks[i].time.split("T");
      const date = dateTime[0];
      const time = dateTime[1];
  
      html += `
        <div id="task">
          <button class="remove" onclick="remove(${i})">❌</button>
          <p class="headP">
            ${tasks[i].head}
          </p>
          <div class="mainDescription">
          <p class="descriptionP">
            ${tasks[i].description}
          </p>
          </div>
          <footer>${date} ${time}</footer>
        </div>
      `;
    }
  
    // Take section from HTML
    let sectionTasks = document.getElementById("sectionTasks");
    sectionTasks.innerHTML = html;
  }
  

function remove(index) {
    //take data from storage:
    let json = localStorage.getItem("tasks");
    const tasks = JSON ? JSON.parse(json) : [];

    tasks.splice(index, 1);

    //save to storage:
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
    displayTasks();
}