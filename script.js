let div = document.querySelector(".formTask");
let input = document.querySelector('.nameTask');
let list = document.querySelector(".ToDoList");
let tasksArr = [];
//Проверка локального хранилища на наличие данных
if(localStorage.getItem("saveTasks")){
   tasksArr =  JSON.parse(localStorage.getItem("saveTasks"));
}
//Прокручиваем сохраненые данные из LocalStorage данные
tasksArr.forEach(function (task) {
    ShowTask(task);
})
//Функция открытия/закрытия формы для заполнения задачи. По нажатию клавиши value меняется на true либо false
function CloseDiv(value)
{
    div.hidden = value;
    input.value = "";
}
//Функция добавления задачи в список
function AddNewTask()
{
    //Если поле пустое, то возращаем до тех пор пока оно не будет заполнено
    if(input.value==="")
        return;
    //Новая задача, данные которой пойдут в массив для LocalStorage
    let newTask = {
        id: Date.now(),
        text:input.value,
        done:false,
    }
    tasksArr.push(newTask);
    ShowTask(newTask);
    input.value = "";
    input.focus();
    //При каждом изменении данных вызываем функцию сохранения в localStorage
    SaveLS();
}
//Функция удаления задач
function DeleteTask(element)
{
    //Ищем радителя элемента, по которому будем удалять задачи из списка
    let id = Number(element.parentElement.parentElement.id);
    //Ищем айдишник массива для удаления элемента из localStorage
    let index = tasksArr.findIndex(function (task) {
        return  task.id === id;
    });
    //Удаляем найденные элементы
    tasksArr.splice(index,1);
    //Удаляем элементы с верстки
    element.parentElement.parentElement.remove();
    SaveLS();
}
//Функция Активна/Неактивна задача
 function DoneTask(element)
 {
     let parentNode = element.parentElement.parentElement;
     //Добавляем отредактированный класс в CSS по клику кнопки
     if(!parentNode.classList.contains("task-item2"))
     {
         parentNode.classList.add("task-item2")
     }
     else {
         parentNode.classList.remove("task-item2");
     }
     //Ищем значение по айдишнику для изменений значений в localStorage
     let id = Number(parentNode.id);
     let task = tasksArr.find(function (task) {
         return task.id===id;
     })
     task.done = !task.done;
     SaveLS();
 }
//Функция записи данных из массива в localStorage
 function SaveLS()
 {
     localStorage.setItem("saveTasks", JSON.stringify(tasksArr));
 }
//Функция отрисовки списка задач
function ShowTask(task)
{
    //Проверяем условие активна или нет задача, по которому уже будем делать отрисовку
    let cssClass = task.done ? "task-item task-item2" : "task-item";
    //Создаем элемент в список
    let li = document.createElement("li");
    li.className = cssClass;
    li.id = task.id;
    li.innerHTML = `<span class="taskText">${task.text}</span>
                     <div class="taskButtons">
                     <button type="button" class="btnAction" onclick="DoneTask(this)"><img src="assets/done.png"></button>
                     <button type="button" class="btnAction2" onclick="DeleteTask(this)"><img src="assets/close.png"></button>
                     </div>`;
    list.append(li);
}








