const checkBox = document.querySelector(".circle-checkbox");
const createInput = document.querySelector(".createInput");
const todoList = document.querySelector(".todoList");
const clearCompletedBtn = document.querySelector(".clearCompletedBtn");
const kalanItemSayisi = document.querySelector(".kalanItemSayisi");

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleAddTodo();
  }
});

function handleAddTodo() {
  const todo = createInput.value.trim();
  if (todo !== "") {
    todoList.innerHTML += `
            <li class="todo-list-item">
              <div class="todoText">
                <label class="checkboxTodoLabel">
                  <input class="checkBoxTodo" type="checkbox">
                  <span></span>
                </label>
                <p class="todoText">${todo}</p>
              </div>
              <button class="deleteBtn"><img src="assets/images/delete-btn.svg"></img></button>
            </li>`;

    createInput.value = "";
    checkBox.checked = false;
    kalanItemSayisiniGuncelle();
    bindClickEvents();
    toggleListBoxVisibility(); 
  } else {
    alert("Lütfen bir todo giriniz.");
  }
}

function bindClickEvents() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  for (const btn of deleteBtns) {
    btn.addEventListener("click", removeTodo);
  }
  
  const checkBoxes = document.querySelectorAll(".checkBoxTodo");
  checkBoxes.forEach(checkBox => {
    checkBox.addEventListener("change", function() {
      const todoText = this.closest(".todo-list-item").querySelector(".todoText");
      if (this.checked) {
        todoText.classList.add("completed");
        todoText.classList.remove("todo");
      } else {
        todoText.classList.add("todo");
        todoText.classList.remove("completed");
      }
      kalanItemSayisiniGuncelle();
    });
  });
}


checkBox.addEventListener("change", function () {
  const allTodos = document.querySelectorAll(".checkBoxTodo");
  const isChecked = this.checked;

  allTodos.forEach((checkbox) => {
    checkbox.checked = isChecked; 
  });

  kalanItemSayisiniGuncelle();
});

function removeTodo() {
    this.parentElement.remove();
    kalanItemSayisiniGuncelle();
}

const allBtn = document.querySelector(".allBtn");
const activeBtn = document.querySelector(".activeBtn");
const completedBtn = document.querySelector(".completedBtn");

allBtn.addEventListener("click", () => filterTodos("all"));
activeBtn.addEventListener("click", () => filterTodos("active"));
completedBtn.addEventListener("click", () => filterTodos("completed"));

function filterTodos(filter) {
  const todos = document.querySelectorAll(".todo-list-item");
  todos.forEach((todo) => {
    const isCompleted = todo.querySelector(".checkBoxTodo").checked;
    switch (filter) {
      case "all":
        todo.style.display = "flex";
        break;
      case "active":
        todo.style.display = isCompleted ? "none" : "flex";
        break;
      case "completed":
        todo.style.display = isCompleted ? "flex" : "none";
        break;
    }
  });
}


function kalanItemSayisiniGuncelle() {
  const checkBoxes = document.querySelectorAll(".checkBoxTodo");
  const remaining = [...checkBoxes].filter(checkbox => !checkbox.checked).length;
  kalanItemSayisi.textContent = `${remaining} item kaldı`;
}

clearCompletedBtn.addEventListener("click", () => {
  const checkBoxes = document.querySelectorAll(".checkBoxTodo:checked");
  checkBoxes.forEach(checkBox => {
    checkBox.closest(".todo-list-item").remove();
  });
  kalanItemSayisiniGuncelle();
  toggleListBoxVisibility(); 
});

function toggleListBoxVisibility() {
  const listBox = document.querySelector(".listBox");
  const listeFiltreleme = document.querySelector(".filterBox")
  if (todoList.children.length === 0) {
    listBox.style.display = 'none';
    listeFiltreleme.style.display = 'none';
  } else {
    listBox.style.display = 'block';
    listeFiltreleme.style.display = 'flex';
  }
}

const toggleButton = document.querySelector('.theme');
const body = document.body;
const lightIcon = toggleButton.querySelector('.light');
const darkIcon = toggleButton.querySelector('.dark');

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  } else {
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
  }
});



kalanItemSayisiniGuncelle();
document.addEventListener('DOMContentLoaded', toggleListBoxVisibility);

