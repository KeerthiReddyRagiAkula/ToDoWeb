let tasks = [];

function displayTasks() {
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');

  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Title: ${task.title}</strong>
      <p>Description:${task.description}</p>
      <small>Added: ${task.dateAdded}</small>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);
    li.appendChild(deleteButton);

    if (task.completed) {
      const completeInfo = document.createElement('small');
      completeInfo.innerText = `Completed: ${task.dateCompleted}`;
      li.appendChild(completeInfo);
      completedTasksList.appendChild(li);
    } else {
      const completeButton = document.createElement('button');
      completeButton.innerText = 'Complete';
      completeButton.onclick = () => completeTask(task.id);
      li.appendChild(completeButton);
      pendingTasksList.appendChild(li);
    }
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const taskText = taskInput.value.trim();
  const descriptionText = descriptionInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      id: Date.now(),
      title: taskText,
      description: descriptionText,
      completed: false,
      dateAdded: new Date().toLocaleString(),
      dateCompleted: null,
    };

    tasks.push(newTask);
    taskInput.value = '';
    descriptionInput.value = '';
    displayTasks();
  }
}

function completeTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: true, dateCompleted: new Date().toLocaleString() } : task
  );
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

displayTasks();
