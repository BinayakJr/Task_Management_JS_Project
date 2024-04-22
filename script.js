const tasks = []
const taskForm = document.getElementById('taskForm')
const taskList = document.getElementById('taskList')

taskForm.addEventListener('submit', addTasks)
document.getElementById('searchInput').addEventListener('input', searchTasks)

//function to take input and store in an object
function addTasks(e) {
    e.preventDefault() //to prevent form from submitting as default

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const deadline = document.getElementById('deadline').value
    const time = document.getElementById('time').value
    const priority = document.getElementById('priority').value
    const category = document.getElementById('category').value

    const task = {
        title,
        description,
        deadline,
        time,
        priority,
        category,
        completed: false
    }
    // console.log(task)
    
    tasks.push(task)
    // alert("Task has been added successfully !")

    displayTask(task)
    updateTaskCounts()
    taskForm.reset()
}

//function to display task
function displayTask(task) {
    const taskRow = document.createElement('tr')//create an element tr
    taskRow.innerHTML = `
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.deadline}</td>
    <td>${task.time}</td>
    <td>${task.priority}</td>
    <td>${task.category}</td>
    <td>
    <button class="btn btn-success" onclick="markAsCompleted(this)">
    <i class="fa-solid fa-circle-check"></i>
    </button>
    <button class="btn btn-primary" onclick="editTask(this)">Edit</button>
    <button class="btn btn-danger" onclick="deleteTask(this)">Delete</button>
    </td>
    `
    taskList.append(taskRow)
}


// Function to mark task as completed
function markAsCompleted(button) {
    const taskRow = button.parentElement.parentElement
    const title = taskRow.cells[0].textContent

    // Find the task in the tasks array
    const task = tasks.find(task => task.title === title)

    // Toggle the 'completed' property of the task
    task.completed = !task.completed;

    // Toggle the 'completed' class on cells
    const cells = taskRow.querySelectorAll('td:not(:last-child)')
    cells.forEach(cell => {
        cell.classList.toggle('completed', task.completed)
    });

    if (task.completed) {
        button.style.color = "green"
        button.style.borderColor = "green"
    } else {
        button.style.color = "blue"
        button.style.borderColor = "blue"
    }

    // Update the completed tasks count
    updateTaskCounts()
}

function editTask(button) {
    const taskRow = button.parentElement.parentElement
    const cells = taskRow.querySelectorAll('td')

    // Set input fields with current task's data
    document.getElementById('title').value = cells[0].innerText
    document.getElementById('description').value = cells[1].innerText
    document.getElementById('deadline').value = cells[2].innerText
    document.getElementById('time').value = cells[3].innerText
    document.getElementById('priority').value = cells[4].innerText
    document.getElementById('category').value = cells[5].innerText

    // Remove the existing task row from the DOM
    taskList.removeChild(taskRow)
    updateTaskCounts()
}


// Function to delete task
function deleteTask(button) {
    const taskRow = button.parentElement.parentElement
    taskList.removeChild(taskRow)

    // Remove the deleted task from the tasks array
    const index = tasks.findIndex(task => task.title === taskRow.cells[0].textContent)
    if (index !== -1) {
        tasks.splice(index, 1)
    }

    // Update task counts after deleting a task
    updateTaskCounts()
}


//function to search task
function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase()
    const tasks = taskList.querySelectorAll('tr')

    tasks.forEach(task => {
        const title = task.querySelector('td:nth-child(1)').innerText.toLowerCase()
        const description = task.querySelector('td:nth-child(2)').innerText.toLowerCase()
        const deadline = task.querySelector('td:nth-child(3)').innerText.toLowerCase()
        const time = task.querySelector('td:nth-child(4)').innerText.toLowerCase()
        const priority = task.querySelector('td:nth-child(5)').innerText.toLowerCase()
        const category = task.querySelector('td:nth-child(6)').innerText.toLowerCase()

        if(title.includes(searchInput) || description.includes(searchInput) || deadline.includes(searchInput) || priority.includes(searchInput) || category.includes(searchInput)) {
            task.style.display = ''
        }
        else{
            task.style.display = 'none';
        }
    })

}

// Function to calculate completed tasks
function updateTaskCounts() {
    const completedTasksElement = document.getElementById('completedTasks')

    // Calculate completed tasks
    const completedTasksCount = tasks.filter(task => task.completed).length

    // Update HTML elements with the calculated counts
    completedTasksElement.textContent = completedTasksCount
}










