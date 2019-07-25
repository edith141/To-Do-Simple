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


const addToTodo = (todo) =>{
    const html = `<li class="todo-item list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="fas fa-backspace delete"></i>
    </li>`;
    todoList.innerHTML += html;
    
}

// const filterTodos = (sch) =>{
//     tlist = Object.values(todoList.children);
//     console.log(typeof(tlist))
//     console.log(tlist);
// }



addForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if (todo){
        // console.log(todo.trim());
        addToTodo(todo.trim());
        addForm.add.value = "";
        //or
        //addForm.reset();
    }
    
    
})

//del
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
    } 
})


const filterTodos = (t) => {
    Array.from(todoList.children)
    .filter((tod) => {
        return !(tod.textContent.toLowerCase().includes(t.toLowerCase()))
    })
    .forEach( (tod) => {
        tod.classList.add('filtered');
    })
    
    
    Array.from(todoList.children)
    .filter((tod) => {
        return (tod.textContent.toLowerCase().includes(t.toLowerCase()))
    })
    .forEach( (tod) => {
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