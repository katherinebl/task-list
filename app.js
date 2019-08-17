// Define UI Vars

const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Call to load all event listeners
loadAllEventListeners();

//Load all event listeners
function loadAllEventListeners() {
  //Get tasks from LS
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    //Create item
    const li = document.createElement('li');
    //Asign class to item
    li.className = 'collection-item';
    //Create text node with task content and append to item
    li.appendChild(document.createTextNode(task));

    //Create link
    const link = document.createElement('a');
    //Assing class to link
    link.className = " delete-item secondary-content";
    //Insert icon tag to link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to item
    li.appendChild(link);

    //Append item to the list
    taskList.appendChild(li);
  });
}

//ADD TASK function
function addTask(e) {
  //Check if there's a value in the input
  if (taskInput.value === '') {
    alert('Add a task :)');
  }

  //Create item
  const li = document.createElement('li');
  //Asign class to item
  li.className = 'collection-item';
  //Create text node with task content and append to item
  li.appendChild(document.createTextNode(taskInput.value));

  //Create link
  const link = document.createElement('a');
  //Assing class to link
  link.className = " delete-item secondary-content";
  //Insert icon tag to link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to item
  li.appendChild(link);

  //Append item to the list
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//STORE IN LS function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//CLEAR ALL TASKS function
function clearTasks() {
  // taskList.innerHTML = "";

  //Faster
  if (confirm('Are you really sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

}

//FILTER TASKS function
function filterTasks(e) {
  const input = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(input) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}
