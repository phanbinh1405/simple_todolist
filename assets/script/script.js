const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-add");
const todoList = document.querySelector(".todo-list");
let worksList = JSON.parse(localStorage.getItem("todo")) || [];
let done = false;

// Render Todo List
function render(value, id, isDone) {
  let html = `<li data-id=${id} class=${isDone ? "done" : ""}>
   <input type="checkbox" 
   class="todo-check" 
   onclick='handleDone(this.checked, this)' 
   ${isDone ? "checked=true" : ""}
   >
  <span>${value}</span> 
  <i class='fa-solid fa-trash-can todo-remove' onclick="deleteTodo('${id}')"></i>
  </li>`;

  todoList.insertAdjacentHTML("beforeend", html);
}

// Update Storage of Todo List when it have item done
function updateStateOfTodo( idItem) {
  worksList = worksList.map((item) => {
    return item.id === idItem ? { ...item, isDone: !item.isDone } : item;
  });
  localStorage.setItem("todo", JSON.stringify(worksList));

  console.log('run')
}

// Handle when work is done
function handleDone(isCheck, element) {
  let idItem = element.parentElement.getAttribute("data-id");
  if (isCheck) {
    element.parentElement.classList.add("done");
    updateStateOfTodo(idItem);
  } else {
    element.parentElement.classList.remove("done");
    element.checked = false;
    updateStateOfTodo(idItem);
  }
}

// Handle save todo list to local storages
function saveTodo(id, value, done) {
  worksList.push({ id: id, value: value, isDone: done });
  localStorage.setItem("todo", JSON.stringify(worksList));
}

// Delete todo item in DOM and local storages
function deleteTodo(id) {
  worksList = worksList.filter((item) => item.id != id);
  localStorage.setItem("todo", JSON.stringify(worksList));
  document.querySelector(`li[data-id='${id}']`).remove();
}

// Generator id for todo item
function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

window.addEventListener("load", () => {
  // Render Todo lần đầu nếu local storage có chứa dữ liệu
  if (worksList && worksList.length > 0) {
    worksList.forEach((item) => {
      render(item.value, item.id, item.isDone);
    });
  }

  // Render Todo
  addBtn.addEventListener("click", () => {
    let id = makeid();

    render(todoInput.value, id, done);
    saveTodo(id, todoInput.value, done);
    todoInput.value = "";
  });

  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let id = makeid();

      render(todoInput.value, id, done);
      saveTodo(id, todoInput.value, done);
      todoInput.value = "";
    }
  });
});
