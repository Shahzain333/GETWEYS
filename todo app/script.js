document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-tsk-btn');
    const taskInput = document.querySelector('.box-container input');
    const todoList = document.querySelector('.todo-list');

    let taskBeingEdited = null;

    // Save task all to local storage
    const saveTasks = () => {
        const task = [];
        
        todoList.querySelectorAll('li').forEach(item => {
            task.push({
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            });
        });
        //console.log(task)
        localStorage.setItem("tasks", JSON.stringify(task));
    }

    //Load tasks from local storage
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        if (storedTasks) {
            storedTasks.forEach( task => addTask(task.text, task.completed));
        }
    }

    const addTask = (text, completed = false) => {
        
        const textInput = text || taskInput.value.trim();
        
        if (!textInput) return;

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="task-check">
                <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
                <span>${textInput}</span>
            </div>
            <div class="task-btn">
                <button class="edit-btn">EDIT</button>
                <button class="del-btn">DELETE</button>
            </div>`;

        todoList.appendChild(listItem);
        taskInput.value = "";

        saveTasks();  // save after adding new task
        
        const deleteBtn = listItem.querySelector('.del-btn');
        const editBtn = listItem.querySelector('.edit-btn');
        const checkBox = listItem.querySelector('.checkbox');

        // Apply initial completed state
        if (completed) {
            listItem.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        // Checkbox toggle behavior
        checkBox.addEventListener('click', () => {
            const isChecked = checkBox.checked;
            listItem.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? "0.5" : "1";
            editBtn.style.pointerEvents = isChecked ? "none" : "auto";
            saveTasks();  // Update Storage
        });

        // Delete Task
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            saveTasks();  // Update Storage
        });

        // Edit Task
        editBtn.addEventListener('click', () => {
            if (!checkBox.checked) {
                taskBeingEdited = listItem;
                taskInput.value = listItem.querySelector('span').textContent;
                addTaskButton.textContent = "SAVE";
            }
        });
    };

    addTaskButton.addEventListener('click', () => {
        if (taskBeingEdited) {
            const newText = taskInput.value.trim();
            if (newText) {
                taskBeingEdited.querySelector('span').textContent = newText;
                saveTasks();  // Update Storage
            }
            taskBeingEdited = null;
            taskInput.value = "";
            addTaskButton.textContent = "Add Task";
        } else {
            addTask();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTaskButton.click();
        }
    });

    loadTasks();  // Load tasks on page load
});
