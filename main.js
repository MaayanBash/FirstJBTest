function save() {
    const descriptionInput = document.getElementById('boxInput');
    const dateInput = document.getElementById('timeInput');

    const description = descriptionInput.value;
    const date = dateInput.value;

    const newTask = {
    description,
    date
};
    let json = localStorage.getItem('tasks')}
    const tasks = json? JSON.parse(json) : [];

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
