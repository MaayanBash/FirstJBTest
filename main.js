function save(event) {
    event.preventDefault();

    const descriptionInput = document.getElementById('boxInput');
    const dateInput = document.getElementById('timeInput');

    const description = descriptionInput.value;
    const date = dateInput.value;

    const newTask = {
        description,
        date
    };

    const json = localStorage.getItem('tasks');
    const tasks = json ? JSON.parse(json) : [];

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
    descriptionInput.value = '';
    dateInput.value = '';
}

function displayTasks() {
    const json = localStorage.getItem('tasks');
    const tasks = json ? JSON.parse(json) : [];

    const sectionTasks = document.getElementById('sectionTasks');
    sectionTasks.innerHTML = '';

    if (tasks.length === 0) {
        sectionTasks.textContent = 'No tasks available.';
        return;
    }

    const ul = document.createElement('ul');

    tasks.forEach(task => {
        const { description, date } = task;
        const li = document.createElement('li');
        li.textContent = `${description} - ${date}`;
        ul.appendChild(li);
    });

    sectionTasks.appendChild(ul);
}

function clearTasks() {
    localStorage.removeItem('tasks');
    displayTasks();
}

// Initial display of tasks when the page loads
displayTasks();
