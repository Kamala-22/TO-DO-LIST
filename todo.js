document.addEventListener("DOMContentLoaded", function() {
    function updateTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        document.getElementById('current-time').textContent = 
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }
    setInterval(updateTime, 1000);

    
    var tasks = [];

    
    var newTaskButton = document.getElementById("new");
    var saveButton = document.getElementById("save");
    var closeButton = document.getElementById("close");
    var taskInput = document.getElementById("text");
    var categorySelect = document.querySelector(".category");
    var wishList = document.querySelector(".wish");
    var completedTaskCounter = document.querySelector(".completed_task p");
    var pendingTaskCounter = document.querySelector(".pending_task p");
    var totalTaskCounter = document.querySelector(".total_tasks p");

    
    function updateTaskCounters() {
        var completedTasks = tasks.filter(function(task) {
            return task.completed;
        });
        var pendingTasks = tasks.filter(function(task) {
            return !task.completed;
        });
        completedTaskCounter.textContent = completedTasks.length;
        pendingTaskCounter.textContent = pendingTasks.length;
        totalTaskCounter.textContent = tasks.length;
        
    }

    // Function to show popup
    function showPopup() {
        document.getElementById("popup").style.display = "block";
    }

    // Function to hide popup
    function hidePopup() {
        document.getElementById("popup").style.display = "none";
        taskInput.value = ""; 
        categorySelect.selectedIndex = 0; 
    }

    // Event listener for "Add new task" button
    newTaskButton.addEventListener("click", showPopup);

    // Event listener for "Close" button in pop
    closeButton.addEventListener("click", hidePopup);

    // Function to save task to wish list
    function saveTask() {
        var taskText = taskInput.value.trim();
        var category = categorySelect.value;
        if (taskText !== "") {
            var task = {
                task: taskText,
                completed: false,
                category: category,
                pendig:false,
            };
            console.log(task)
            tasks.push(task);
            renderTask(task);
            updateTaskCounters();
            hidePopup(); 
        }
    }


    function renderTask(task) {
        var taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = '<span>' + task.task + ' - ' + task.category + '</span>' +
                            '<i class="fa fa-edit edit" style="font-size:24px; color: green;" id="edit"></i>' +
                            '<i class="fa fa-trash-o delete" style="font-size:24px; color: red;" id="trash"></i>' +
'                           <i class="fa fa-check check" style="font-size:24px; color: blue;" id="check"></i>:'

    
        wishList.appendChild(taskItem);
    }


    saveButton.addEventListener("click", saveTask);


    wishList.addEventListener("click", function(event) {
        var target = event.target;
        if (target.classList.contains("check")) {
            var taskItem = target.parentElement;
            var taskTextElement = taskItem.querySelector("span");
            var taskText = taskTextElement.textContent;
            var index = tasks.findIndex(function(task) {
                return task.task === taskText;
            });
            if (index !== -1) {
                tasks[index].completed = true; 
                taskItem.style.backgroundColor = "lightgreen"; 
                updateTaskCounters(); 
            }   
        }
    });



     wishList.addEventListener("click", function(event) {
        var target = event.target;
        if (target.classList.contains("delete")) {
            var taskItem = target.parentElement;
            var taskText = taskItem.querySelector("span").textContent;
            var index = tasks.findIndex(function(task) {
                return task.task === taskText;
            });
               console.log("Index:", index); 

            if (index !== 0) {
                tasks.splice(index, 1);
                taskItem.remove();
                updateTaskCounters();
            }
        } else if (target.classList.contains("edit")) {
            var taskItem = target.parentElement;
            var taskTextElement = taskItem.querySelector("span");
            var taskText = taskTextElement.textContent;
            var newTaskText = prompt("Edit task:", taskText);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                taskTextElement.textContent = newTaskText;
                var index = tasks.findIndex(function(task) {
                    return task.task === taskText;
                });
                if (index !== -1) {
                    tasks[index].task = newTaskText;
                }
            }
        }
    });

    document.getElementById("all").addEventListener("click", function() {
        var allTasksString = tasks.map(function(task) {
            return task.task + ' - ' + task.category;
        }).join('\n');
        alert("All Tasks:\n" + allTasksString);
    });
});      
