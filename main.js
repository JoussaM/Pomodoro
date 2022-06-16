const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const form = document.querySelector('#form');
const itTask = document.querySelector('#itTask')
const bAdd = document.querySelector('#bAdd');
const taskName = document.querySelector('#time #taskName');

// Cuenta regresiva de inicio
renderTime();
renderTasks();

form.addEventListener('submit', e => {
    e.preventDefault();

    if (itTask.value !== '') {
        createTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }
});

// Empaqueta las nuevas tareas {} -> []
const createTask = (value) => {
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3), 
        title: value,
        completed: false
    };

    tasks.unshift(newTask);

};

// Pintar la tarea en el DOM
function renderTasks() {

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
    });

    // Inyectar html al DOM
    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML = html.join("");

    // 18:45
    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => {
        
        button.addEventListener('click', e => {
            if(!timer) {    //Pregunta si hay una tiempo en progreso
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = 'In progress...';
                
            }
        })
    })

};

// Calculamos 25min de tarea e insertamos en el DOM el task Name
const startButtonHandler = (id) => {
    time = 5;
    current = id;   //id de la tarea actual
    const taskIndex = tasks.findIndex(task => task.id === id); //debemos encontrar esa tarea mediante su id
    taskName.textContent = tasks[taskIndex].title;  //obtiene la tarea

    renderTime();
    //Cuenta regresiva, necesito llamar una función cada segundo
    timer = setInterval( () => {
        timerHandler(id);
    }, 1000);

}

const timerHandler = (id) => {
    time--;
    renderTime();

    // Despues de renderTime()
    if (time === 0) {
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
    }

}

const startBreak = () => {
    time = 3;
    taskName.textContent = 'Break';
    renderTime();

    timerBreak = setInterval (() => {
        timerBreakHandler();
    }, 1000);
}

const timerBreakHandler = () => {
    time--;
    renderTime();

    // Despues de renderTime()
    if (time === 0) {
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = '';

        renderTasks();
    }
}

// Formato de tiempo 
function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt( time / 60 );
    const seconds = parseInt( time % 60 );

    timeDiv.textContent = `${minutes < 10 ? "0" : "" }${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

const markCompleted = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id); //debemos encontrar esa tarea mediante su id
    tasks[taskIndex].completed = true;  //obtiene la tarea
}