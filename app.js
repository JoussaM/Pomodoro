const tasks = [];
let time = null; //Uncaught TypeError: Assignment to constant variable.
let timer = null;

const form = document.querySelector('#form');
const itTask = document.querySelector('#itTask');
const bAdd = document.querySelector('#bAdd');

renderTime(); 

form.addEventListener('submit', e => {
    e.preventDefault();

    if (itTask.value !== '') {
        createTask(itTask.value);
        itTask.value = '';
        renderTask();
    }
})

function createTask(value) {
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    }

    tasks.unshift(newTask);

}

function renderTask() {
    const html = tasks.map(task => {
        return `
        <div class="task">
            <div class="completed">${task.completed 
                                ? `<span class="done">Done</span>` 
                                : `<button class="start-button" data-id="${task.id}">Start</button>`}
            </div>
        <div class="title">${task.title}</div>
        </div>
        `;
    })

    const containerTask = document.querySelector('#tasks');
    containerTask.innerHTML = html.join('');

    const startButtons = document.querySelectorAll('.start-button');
    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            id = button.getAttribute('data-id');
            button.textContent = 'In progress';
            startButtonHandler(id);
        })
    })
}

function startButtonHandler(id) {
    time = 5;
    renderTime();
    const taskIndex = tasks.findIndex( task => task.id === id);

    const taskName = document.querySelector('#taskName');
    taskName.textContent = tasks[taskIndex].title;

    timer = setInterval( () => {
        timerHandler(id);
    }, 1000);

}

function timerHandler(id) {
    time--;
    renderTime();
    if (time === 0) {
        clearInterval(timer);
        timer = null;
        markCompleted(id);
        startBreakHandler();
    }
}

function startBreakHandler() {
    time = 3;
    renderTime();
    taskName.textContent = 'Break';
    
    timerBreak = setInterval( () => {
        timerBreakHandler(id);
    }, 1000);
}

function timerBreakHandler() {
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timerBreak);
        timeBreak = null;
        taskName.textContent = '';
        
    }
}



function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
}

function markCompleted(id) {
    const taskIndex = tasks.findIndex( task => task.id === id);
    tasks[taskIndex].completed = true;
    renderTask();
}