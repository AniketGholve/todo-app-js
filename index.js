let todoMainBox = document.getElementById("todoTasks");
let addTaskDiv = false;
let addSubtaskDiv = false;
let data = document.createElement("h1");
function checkChilderns(){
    if (document.getElementById("todoTasks").childElementCount===0) {
        data.innerHTML = "No Items In Todo List";
        todoMainBox.appendChild(data);
        data.classList.add("noTask");
    }
    else if(todoMainBox.hasChildNodes(data)){
        todoMainBox.removeChild(data);
    }
}
checkChilderns();
function addTodo(event) {
    event.preventDefault()
    if (document.querySelectorAll(".noTask").length === 1) {
        todoMainBox.removeChild(data);
    }
    let heading = event.target.heading.value;
    if (heading.trim() === "") return;
    let todoTaksDiv = document.createElement("div");
    let hr = document.createElement("hr");
    let h1Tag = document.createElement("h1");
    let tasks = document.createElement("div");
    let options = document.createElement("div");
    let addOption = document.createElement("i");
    let deleteOption = document.createElement("i");
    let headingNode = document.createTextNode(heading);

    tasks.classList.add("todoElements");
    h1Tag.classList.add("text-center", "blueColor","cursorPointer");
    todoTaksDiv.classList.add("todoTaskBox");
    options.classList.add("todoOperations")
    addOption.classList.add("fa-solid", "fa-plus", "addSubtask","cursorPointer");
    deleteOption.classList.add("fa-solid", "fa-trash","cursorPointer");

    h1Tag.innerText = headingNode.nodeValue;
    h1Tag.setAttribute("onclick", "viewTodoElement(this)");

    options.appendChild(deleteOption);
    options.appendChild(addOption);
    todoTaksDiv.appendChild(h1Tag);
    todoTaksDiv.appendChild(hr);
    todoTaksDiv.appendChild(tasks);
    todoTaksDiv.appendChild(options);
    todoMainBox.appendChild(todoTaksDiv);

    addOption.setAttribute("onclick", 'currentDivClicked(event)')
    deleteOption.setAttribute("onclick", "deleteTodo(event)")

    event.target.heading.value = "";
    toggleClose();
}
let addTaskBtn = document.getElementsByClassName('addTask');
function toggleClose() {
    if (addTaskDiv === false) {
        document.getElementById("addTodoTasks").style.display = "block";
        document.getElementById("todoTasks").style.filter = "blur(8px)";
        addTaskBtn[0].style.filter = "blur(8px)";
        addTaskBtn[0].style.pointerEvents = "none";
        addTaskDiv = true;
    }
    else {
        document.getElementById("todoTasks").style.filter = "blur(0px)"
        addTaskBtn[0].style.filter = "blur(0px)";
        addTaskBtn[0].style.pointerEvents = "all";
        document.getElementById("addTodoTasks").style.display = "none";
        addTaskDiv = false;
    }
}
let taskDiv;
function currentDivClicked(event) {
    taskDiv = event.target.parentElement.previousSibling;
    toggleCloseSubtask()
}
function addTodoSubtask(event) {
    event.preventDefault();
    let data = event.target.subtask.value;
    let elementToAdd = taskDiv;

    let task = document.createElement("label");
    let button = document.createElement("button");
    let subtaskDiv = document.createElement("div");
    button.setAttribute("onclick", "deleteTodoSubtask(this)")

    button.innerText = "Mark Done";
    subtaskDiv.appendChild(task);
    subtaskDiv.appendChild(button);
    subtaskDiv.classList.add("margin2")
    task.innerText = data;
    elementToAdd.appendChild(subtaskDiv)
    toggleCloseSubtask()
    event.target.subtask.value = ""
}
function toggleCloseSubtask() {
    if (addSubtaskDiv === false) {
        document.getElementById("addTodoSubtaskTasks").style.display = "block";
        document.getElementById("todoTasks").style.filter = "blur(8px)";
        addTaskBtn[0].style.filter = "blur(5px)";
        addTaskBtn[0].style.pointerEvents = "none";
        addSubtaskDiv = true;
    }
    else {
        document.getElementById("addTodoSubtaskTasks").style.display = "none";
        document.getElementById("todoTasks").style.filter = "blur(0px)"
        addTaskBtn[0].style.filter = "blur(0px)";
        addTaskBtn[0].style.pointerEvents = "all";
        addSubtaskDiv = false;
    }
}
function deleteTodo(event) {
    let element = event.target.parentElement.parentElement;
    todoMainBox.removeChild(element);
    checkChilderns();
}
function deleteTodoSubtask(e) {
    e.previousSibling.style.textDecoration = "line-through";
    e.previousSibling.style.gridColumn = "1/3";
    e.parentElement.removeChild(e);
}

function viewTodoElement(e) {
    let allTodos = document.getElementsByClassName("todoTaskBox");
    for (let i = 0; i < allTodos.length; i++) {
        if (allTodos[i] !== e.parentElement) {
            allTodos[i].classList.add("hide");
        }
    }
    document.getElementById("todoTasks").style.justifyContent='center'
    document.getElementById("backBtn").classList.remove("hide");
    document.getElementById("backBtn").parentElement.classList.add("addTaskSpacebetween");
}
function backBtn(e) {
    let allTodos = document.getElementsByClassName("todoTaskBox");
    for (let i = 0; i < allTodos.length; i++) {
        allTodos[i].classList.remove("hide");
    }
    e.target.classList.add("hide");
    addTaskBtn[0].style.filter = "blur(0px)";
    addTaskBtn[0].style.pointerEvents = "all";
    document.getElementById("backBtn").parentElement.classList.remove("addTaskSpacebetween");
    document.getElementById("todoTasks").style.justifyContent='space-between'
}