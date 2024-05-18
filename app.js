const todoInputEl = document.getElementById("todo-input");
const addTodoBtnEl = document.getElementById("todo-add-button");
const todoListEl = document.getElementById("todo-list");

// 1. po naciśnięciu przycisku pobierz zawartosc inputa
// 2. dodaj do listy zawartosc inputa

// logike naszej aplikacji
let counter = 0;
let todos = [];

function addTodo(name) {
  todos.push({
    id: counter++,
    name,
    isDone: false,
  });
}

function removeTodo(id) {
  const filteredTodos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  todos = filteredTodos;
}

function makeDone(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      return {
        ...todo,
        isDone: true,
      };
    }

    return todo;
  });
}

function printTodos() {
  let result = "";

  todos.forEach(function (todo) {
    result += `
        <div class="todo-item ${todo.isDone ? "todo-done" : ""}">
            <p>${todo.name}</p>
            <p>
                <button class="todo-make-done-btn" data-id=${
                  todo.id
                }>✅</button>
                <button class="todo-make-remove-btn" data-id=${
                  todo.id
                }>🗑️</button>
            </p>
        </div>
    `;
  });

  todoListEl.innerHTML = result;

  Array.from(document.getElementsByClassName("todo-make-done-btn")).forEach(
    function (makeDoneBtn) {
      makeDoneBtn.addEventListener("click", function () {
        makeDone(parseInt(makeDoneBtn.dataset.id));
        printTodos();
      });
    }
  );

  Array.from(document.getElementsByClassName("todo-make-remove-btn")).forEach(
    function (makeRemoveBtn) {
      makeRemoveBtn.addEventListener("click", function () {
        removeTodo(parseInt(makeRemoveBtn.dataset.id));
        printTodos();
      });
    }
  );
}

// visual layer -> wartwe prezentacji naszej aplikacji
addTodoBtnEl.addEventListener("click", function () {
  const inputValue = todoInputEl.value;

  todoInputEl.value = "";

  addTodo(inputValue);
  printTodos();
});
