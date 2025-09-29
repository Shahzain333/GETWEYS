document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-tsk-btn');
    const taskInput = document.querySelector('.box-container input');
    const todoList = document.querySelector('.todo-list');

    let taskBeingEdited = null;

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
                addTaskButton.textContent = "SAVE";
            }
        });

        todoList.appendChild(listItem);
        taskInput.value = "";
    };

    addTaskButton.addEventListener('click', () => {
        if (taskBeingEdited) {
            const newText = taskInput.value.trim();
            if (newText) {
                taskBeingEdited.querySelector('span').textContent = newText;
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
});
