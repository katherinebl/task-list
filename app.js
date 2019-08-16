// DEFINE UI VARS

const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.colletion');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// CALL TO LOAD ALL EVENT LISTENERS
loadAllEventListeners();

//Load all event listeners
function loadAllEventListeners() {
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
}

//Add Task function
function addTask(e) {
  //Check if there's a value in the input
  if (taskInput.value === '') {
    alert('Add a task :)');
  }

  //Create item
  const li = document.createElement('li');
  //Asign class to item
  li.className = 'colletion-item';
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

  //Appens item to the list
  taskList.appendChild(li);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Remove Task function

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }

  }

}

