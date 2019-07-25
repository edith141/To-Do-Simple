VANTA.WAVES({
    el: "html",
    waveHeight: 7.00,
    waveSpeed: 0.40,
    color: 0x121e
});
// VANTA.WAVES({
//     el: "body",
//     waveHeight: 7.00,
//     waveSpeed: 0.40,
//     color: 0x121e
// });
const addForm = document.querySelector(".add");
const search = document.querySelector(".search");
const todoList = document.querySelector('.todos');
const heading = document.querySelector(".heading");
let LocList, id;
let data = localStorage.getItem("TODO");
if (data) {
    LocList = JSON.parse(data);
    id = LocList.length;
    loadList(LocList);
}
else {
    LocList = [];
    id = 0;
}
 
// let data = localStorage.getItem("TODO");

// if (data) {
//     LocList = JSON.parse(data);
//     id = LocList.length;
//     loadList(LocList);
// }
// else {
//     LocList = [];
//     id = 0;
// }

// const loadList = (array) => {
//     array.forEach((item) => {
//         addToTodo(item.name, item.id, item.trash);
//     })
// }


function addToTodo(todo, id, trash) {
    
    if (trash) { return; }
    
    const html = `<li class="todo-item list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="fas fa-backspace delete" id = "${id}"></i>
    </li>`;
    todoList.innerHTML += html;
    
}

// const filterTodos = (sch) =>{
//     tlist = Object.values(todoList.children);
//     console.log(typeof(tlist))
//     console.log(tlist);
// }

function loadList(arr)  {
    arr.forEach((i) => {
        addToTodo(i.name, i.id, i.trash);
    })
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if (todo) {
        // console.log(todo.trim());
        addToTodo(todo.trim(), id, false);
        addForm.add.value = "";
        //or
        //addForm.reset();
        LocList.push({
            'name': todo,
            'id': id,
            'trash': false
        });
        id += 1;
        localStorage.setItem("TODO", JSON.stringify(LocList));
    }
    
    
})

//del
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        LocList[e.target.id].trash = true;
        localStorage.setItem("TODO", JSON.stringify(LocList));
    }
})


const filterTodos = (t) => {
    Array.from(todoList.children)
    .filter((tod) => {
        return !(tod.textContent.toLowerCase().includes(t.toLowerCase()))
    })
    .forEach((tod) => {
        tod.classList.add('filtered');
    })
    
    
    Array.from(todoList.children)
    .filter((tod) => {
        return (tod.textContent.toLowerCase().includes(t.toLowerCase()))
    })
    .forEach((tod) => {
        tod.classList.remove('filtered');
    })
};


search.addEventListener("keyup", (e) => {
    const t = search.search.value.trim();
    //console.log(t);
    filterTodos(t);
});

search.addEventListener('submit', (e) => {
    e.preventDefault();
});

heading.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});