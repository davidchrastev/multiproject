function attachEvents() {
    const BASE_URL = 'http://localhost:8080/tasks/1';

    const inputs = {
        loadBoardBtn: document.getElementById('load-board-btn'),
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        createTaskBtn: document.getElementById('create-task-btn'),
    }
    const container = {
        toDo: document.getElementById('todo-section'),
        done: document.getElementById('done-section'),
    }
    inputs.loadBoardBtn.addEventListener('click', load);
    let currentTasks = [];
    function load(event) {
        if (event) {
            event.preventDefault();
        }

        container.toDo.children[1].innerHTML = '';

        fetch('http://localhost:8080/tasks/1')
            .then((res) => res.json())
            .then((allProducts) => {
                currentTasks = Object.values(allProducts);
                let arr = currentTasks[3];
                console.log(arr);

                for (const { description, completionStatus } of arr) {

                    switch (completionStatus) {
                        case false:
                            const li = createElement('li', container.toDo.children[1],'', ['task']);
                            createElement('p', li, description);
                            const moveToProgress = createElement('button', li, 'Move to Done');
                            moveToProgress.addEventListener('click', toDone);
                            break;
                        case true:
                            const liDone = createElement('li', container.done.children[1],'', ['task']);
                            createElement('p', liDone, description);
                            const close = createElement('button', liDone, 'Close');
                            close.addEventListener('click', deleteTask);

                            break;
                    }
                }

            })
    }
    function deleteTask() {
        const id = this.parentNode.id;

        const httpHeaders = {
            method: 'DELETE'
        }
        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => {
                load();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function toDone() {
        const id = this.parentNode.id;
        console.log(id);

        const payload = JSON.stringify({
            completionStatus: true,
        });

        const httpHeaders = {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
            mode: 'cors', // Add the 'mode' option with 'cors'
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                load();
            })
            .catch((err) => {
                console.error(err);
            });

    }
    inputs.createTaskBtn.addEventListener('click', addTask);
    function addTask(event) {
        event.preventDefault();
        const {  description } = inputs;
        const payload = JSON.stringify({
            description: description.value,
            status: false,
        });

        console.log(payload);

        const httpHeaders = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        };
        console.log(payload);

        fetch(BASE_URL, httpHeaders)
            .then(() => {
                clearForm();
                load();
            }).catch(err => {
            console.error(err);
        })



    }
    function clearForm() {
        Object.values(inputs)
        inputs.description.value = '';
    }
    function createElement(typeOfElement, parent, content, classes, id, attributes, useInnerHtml) {
        const htmlElement = document.createElement(typeOfElement);

        if (content && useInnerHtml) {
            htmlElement.innerHTML = content;
        } else {
            if (content && typeOfElement !== 'input') {
                htmlElement.textContent = content;
            }

            if (content && typeOfElement === 'input') {
                htmlElement.value = content;
            }
        }

        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        }

        if (id) {
            htmlElement.id = id;
        }

        // { src: 'link', href: 'http' }
	// practicing git
	// really powerfull

        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key])
            }
        }

        if (parent) {
            parent.appendChild(htmlElement);
        }

        return htmlElement;
    }
}

attachEvents();