document.addEventListener('DOMContentLoaded', () => {

    const addTaskButton = document.getElementById('add-tsk-btn');
    const taskInput = document.querySelector('.box-container input');
    const todoList = document.querySelector('.todo-list');

    let taskBeingEdited = null;           // keep track of task currently being edited

    const addTask = (text, completed = false, referenceNode = null) => {
        
        const textInput = text || taskInput.value.trim();
        
        if (!textInput) return;

        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="task-check">
            <input type='checkbox' class="checkbox" ${completed ? "checked" : ""}>
            <span>${textInput}</span>
        </div>
        <div class="task-btn">
            <button class="edit-btn">EDIT</button>
            <button class="del-btn">DELETE</button>
        </div>`;

        const deleteBtn = listItem.querySelector('.del-btn');
        const editBtn = listItem.querySelector('.edit-btn');
        const checkBox = listItem.querySelector('.checkbox');

        if (completed) {
            listItem.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkBox.addEventListener('click', () => {
           
            const isChecked = checkBox.checked;
           
            listItem.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? "0.5" : "1";
            editBtn.style.pointerEvents = isChecked ? "none" : "auto";
        });

        deleteBtn.addEventListener('click', () => {
            listItem.remove();
        });

        editBtn.addEventListener('click', () => {
            if (!checkBox.checked) {
                taskBeingEdited = listItem;
                taskInput.value = listItem.querySelector('span').textContent;
                addTaskButton.textContent = "SAVE"; // change button text
            }
        });

        if (referenceNode) {
            todoList.insertBefore(listItem, referenceNode);
        } else {
            todoList.appendChild(listItem);
        }

        taskInput.value = "";
    };

    addTaskButton.addEventListener('click', () => {
        if (taskBeingEdited) {
            // Save mode
            const newText = taskInput.value.trim();
            if (newText) {
                taskBeingEdited.querySelector('span').textContent = newText;
            }
            taskBeingEdited = null;
            taskInput.value = "";
            addTaskButton.textContent = "Add Task"; // back to normal
        } else {
            // Normal add mode
            addTask();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (taskBeingEdited) {
                addTaskButton.click(); // trigger save
            } else {
                addTask();
            }
        }
    });

});
