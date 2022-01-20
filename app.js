// var

const form = document.form;
const text = form.elements.text;
const btnClear = document.querySelector('.btnClear')
const liste = document.querySelector('ul')
const message = document.querySelector('h4')

let storage = JSON.parse(localStorage.getItem('task'));
console.log(listON());
if (storage && JSON.stringify(storage) != "[]") {
    btnClear.innerHTML = `<button class="btn clear">clear</button>`
}

// end var

// function

function listON() {
    let storage = JSON.parse(localStorage.getItem('task'));
    if (storage == null) {
        liste.innerHTML = " ";
        btnClear.innerHTML = " ";
    } else {
        storage.forEach(function (element) {
            liste.innerHTML = liste.innerHTML + `<li id="${element.id}"> <span class="task">${element.task} </span><form name="formEdit"><input class="taskEdit hidden" id="${element.id}" type="text" name="taskEdit" placeholder="edit task" /> <button class="btn submitEdit hidden" id="${element.id}">submit edit</button> </form> <button class="btn cancel hidden" id="${element.id}">cancel</button><button class="btn edit" id="${element.id}">edit</button><button class="btn del" id="${element.id}">delete</button></li>`
        })
    }
}

// end function

// form

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const date = Date.now();
    console.log('formulaire soumis');
    tasks = [];
    const newTask = {}

    if (text.value != "") {
        if (localStorage.getItem('task')) {
            const prevTasks = JSON.parse(localStorage.getItem('task'));

            for (i = 0; i < prevTasks.length; i++) {
                const newTask = {}
                newTask['id'] = prevTasks[i].id;
                newTask['task'] = prevTasks[i].task;
                tasks.push(newTask);
            }
            newTask['id'] = date;
            newTask['task'] = text.value;
            tasks.push(newTask);
            const newTasks = JSON.stringify(tasks);
            localStorage.setItem('task', newTasks)
        } else {
            newTask['id'] = date;
            newTask['task'] = text.value;
            tasks.push(newTask);
            const newTasks = JSON.stringify(tasks);
            localStorage.setItem('task', newTasks)
        }

        liste.innerHTML = " ";
        listON();
        message.innerHTML = "task added"
        setTimeout(function () { message.innerHTML = " " }, 1500)
        if (liste.innerHTML != null) {
            btnClear.innerHTML = `<button class="btn clear">clear</button>`
        }

        const btns = document.querySelectorAll('.btn');
        let storage = JSON.parse(localStorage.getItem('task'));

        btns.forEach(function (btn) {
            if (btn.classList.contains('clear')) {
                btn.addEventListener('click', function () {
                    localStorage.removeItem('task');
                    listON();
                    message.innerHTML = "list clear"
                    setTimeout(function () { message.innerHTML = " " }, 1500)
                })
            } else if (btn.classList.contains('del')) {
                btn.addEventListener('click', function () {
                    storage.forEach(function (element) {
                        if (element.id == btn.id) {
                            message.innerHTML = "task deleted"
                            setTimeout(function () { message.innerHTML = " " }, 1500)
                            btn.parentElement.remove();
                            const index = storage.indexOf(element);
                            storage.splice(index, 1)
                            localStorage.setItem('task', JSON.stringify(storage));
                            if (JSON.stringify(storage) == "[]") {
                                btnClear.innerHTML = " ";
                            }
                        }
                    })
                })
            } else if (btn.classList.contains('edit')) {
                btn.addEventListener('click', function () {
                    btn.parentElement.firstChild.nextSibling.nextSibling.firstChild.classList.remove('hidden');
                    btn.parentElement.firstElementChild.classList.add('hidden');
                    btn.classList.add('hidden');
                    btn.previousElementSibling.classList.remove('hidden')
                    btn.nextSibling.classList.add('hidden')
                    btn.parentElement.firstChild.nextSibling.nextSibling.lastChild.previousSibling.classList.remove('hidden')
                })
            } else if (btn.classList.contains('submitEdit')) {
                const formEdit = btn.parentElement;
                const textEdit = formEdit.elements.taskEdit;
                formEdit.addEventListener('submit', function (e) {
                    e.preventDefault();
                    if (textEdit.value != "") {
                        btn.previousSibling.previousSibling.classList.add('hidden');
                        btn.parentElement.previousSibling.classList.remove('hidden');
                        btn.parentElement.parentElement.lastChild.previousSibling.classList.remove('hidden');
                        btn.classList.add('hidden');
                        btn.parentElement.parentElement.lastElementChild.classList.remove('hidden')
                        btn.parentElement.nextElementSibling.classList.add('hidden')
                        btn.parentElement.previousSibling.innerHTML = textEdit.value;
                        storage.forEach(function (element) {
                            if (element.id == btn.id) {
                                const index = storage.indexOf(element);
                                const newTask = {}
                                newTask['id'] = element.id;
                                newTask['task'] = btn.parentElement.previousSibling.innerHTML;
                                newTask['checked'] = '0';
                                storage.splice(index, 1, newTask);
                                localStorage.setItem('task', JSON.stringify(storage));
                                message.innerHTML = "task edited"
                                setTimeout(function () { message.innerHTML = " " }, 1500)
                            }
                        })
                    } else {
                        message.innerHTML = "error: type something"
                        setTimeout(function () { message.innerHTML = " " }, 1500)
                    }
                })
            } else if (btn.classList.contains('cancel')) {
                btn.addEventListener('click', function () {
                    btn.parentElement.firstChild.nextSibling.nextSibling.firstChild.classList.add('hidden');
                    btn.parentElement.firstChild.nextSibling.classList.remove('hidden');
                    btn.classList.add('hidden');
                    btn.nextElementSibling.classList.remove('hidden')
                    btn.nextSibling.nextSibling.classList.remove('hidden');
                    btn.previousSibling.previousSibling.lastChild.previousSibling.classList.add('hidden')
                })

            }
        })
    } else {
        message.innerHTML = "error: type something"
        setTimeout(function () { message.innerHTML = " " }, 1500)
    }

});

// end form

// buttons

const btns = document.querySelectorAll('.btn');

btns.forEach(function (btn) {
    if (btn.classList.contains('clear')) {
        btn.addEventListener('click', function () {
            localStorage.removeItem('task');
            listON();
            message.innerHTML = "list clear"
            setTimeout(function () { message.innerHTML = " " }, 1500)
        })
    } else if (btn.classList.contains('del')) {
        btn.addEventListener('click', function () {
            storage.forEach(function (element) {
                if (element.id == btn.id) {
                    message.innerHTML = "task deleted"
                    setTimeout(function () { message.innerHTML = " " }, 1500)
                    btn.parentElement.remove();
                    const index = storage.indexOf(element);
                    storage.splice(index, 1)
                    localStorage.setItem('task', JSON.stringify(storage));
                    if (JSON.stringify(storage) == "[]") {
                        btnClear.innerHTML = " ";
                    }
                }
            })
        })
    } else if (btn.classList.contains('edit')) {
        btn.addEventListener('click', function () {
            btn.parentElement.firstChild.nextSibling.nextSibling.firstChild.classList.remove('hidden');
            btn.parentElement.firstElementChild.classList.add('hidden');
            btn.classList.add('hidden');
            btn.previousElementSibling.classList.remove('hidden')
            btn.nextSibling.classList.add('hidden')
            btn.parentElement.firstChild.nextSibling.nextSibling.lastChild.previousSibling.classList.remove('hidden')
        })
    } else if (btn.classList.contains('submitEdit')) {
        const formEdit = btn.parentElement;
        const textEdit = formEdit.elements.taskEdit;
        formEdit.addEventListener('submit', function (e) {
            e.preventDefault();
            if (textEdit.value != "") {
                btn.previousSibling.previousSibling.classList.add('hidden');
                btn.parentElement.previousSibling.classList.remove('hidden');
                btn.parentElement.parentElement.lastChild.previousSibling.classList.remove('hidden');
                btn.classList.add('hidden');
                btn.parentElement.parentElement.lastElementChild.classList.remove('hidden')
                btn.parentElement.nextElementSibling.classList.add('hidden')
                btn.parentElement.previousSibling.innerHTML = textEdit.value;
                storage.forEach(function (element) {
                    if (element.id == btn.id) {
                        const index = storage.indexOf(element);
                        const newTask = {}
                        newTask['id'] = element.id;
                        newTask['task'] = btn.parentElement.previousSibling.innerHTML;
                        newTask['checked'] = '0';
                        storage.splice(index, 1, newTask);
                        localStorage.setItem('task', JSON.stringify(storage));
                        message.innerHTML = "task edited"
                        setTimeout(function () { message.innerHTML = " " }, 1500)
                    }
                })
            } else {
                message.innerHTML = "error: type something"
                setTimeout(function () { message.innerHTML = " " }, 1500)
            }
        })
    } else if (btn.classList.contains('cancel')) {
        btn.addEventListener('click', function () {
            btn.parentElement.firstChild.nextSibling.nextSibling.firstChild.classList.add('hidden');
            btn.parentElement.firstChild.nextSibling.classList.remove('hidden');
            btn.classList.add('hidden');
            btn.nextElementSibling.classList.remove('hidden')
            btn.nextSibling.nextSibling.classList.remove('hidden');
            btn.previousSibling.previousSibling.lastChild.previousSibling.classList.add('hidden')
        })

    }
})

// end buttons