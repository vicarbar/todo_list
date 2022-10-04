tasklist = []; // Array to store the elements of the list

// Get the state of the radio buttons in order to get the priority selected in them
function get_rb_class(){
    let radioButtonGroup = document.getElementsByName("options");
    let checkedRadio = Array.from(radioButtonGroup).find((radio) => radio.checked);
    let class_value = '';
    switch(checkedRadio.value){
        case '0':
            class_value = "low";
            break;
        case '1':
            class_value = "medium";
            break;
        case '2':
            class_value = "high";
            break;
    }
    return class_value;
}

// To be done when the app page is loaded and the document is full ready
window.onload = () =>{
    if($(document).ready){
        let tasks = Array.from(JSON.parse(localStorage.getItem("items")));
        tasks.forEach(task => {
            let text = task[0];
            let prior = task[1];
            let li = document.createElement("li");
            let t = document.createTextNode(text);
            li.appendChild(t);
            li.className = prior;  
            tasklist.push([text, prior]);
            document.getElementById("list_items").appendChild(li);

        });
        set_modify_close();
        for (let i = 0; i < modify.length; i++) {
            modify[i].onclick = function() {
                let div = this.parentElement;

                let class_value = get_rb_class();

                div.className = class_value;
                tasklist[i][1] = class_value;
                localStorage.setItem("items", JSON.stringify(tasklist));
            }
          }

        for (let i = 0; i < close.length; i++) {
          close[i].onclick = function(event) {
            i > 0 ? tasklist.splice(i, 2) : tasklist.splice(0, 2);
            localStorage.setItem("items", JSON.stringify(tasklist));
            let div = this.parentElement;
            div.style.display = "none";
          }
        }
    }
}

// Create a "modify" button and append it to each list item
// Create a "close" button and append it to each list item
set_modify_close = () =>{
    let myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("Modify");
        span.className = "modify";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    
        span = document.createElement("SPAN");
        txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function(event) {
    i > 0 ? tasklist.splice(i, 2) : tasklist.splice(0, 2);
    localStorage.setItem("items", JSON.stringify(tasklist));
    let div = this.parentElement;
    div.style.display = "none";
  }
}


set_modify_close();




// Click on a modify button to change the priority of a task
let modify = document.getElementsByClassName("modify");
for (let i = 0; i < modify.length; i++) {
  modify[i].onclick = function(event) {
    let li = this.parentElement;
    let class_value = get_rb_class();
    li.className = class_value;
    tasklist[i][1] = class_value;
    localStorage.setItem("items", JSON.stringify(tasklist));
  }
}


//Clearing the list
function removeAll(){
    let lst = document.getElementsByTagName("ul");
    lst[0].innerHTML = "";
    tasklist = [];
    localStorage.clear();
}


// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    if (!event.target.classList.contains('checked')){
        if(event.target.classList.contains('low')){
            event.target.classList.remove('low');
        }
        else if(event.target.classList.contains('medium')){
            event.target.classList.remove('medium');
        }
        else if(event.target.classList.contains('high')){
            event.target.classList.remove('high');
        }
        else{
            event.target.classList.remove('unknown');
        }
        event.target.classList.toggle('checked');

        let element = event.target.innerText.substring(0, event.target.innerText.length - 9);
        for(let i = 0; i < tasklist.length; i++){
            if(tasklist[i][0] === element){
                let pos = i;
                tasklist[pos][1] = 'checked';
                localStorage.setItem("items", JSON.stringify(tasklist));
                break;
            }
        }

    }
    else{
        event.target.classList.remove('checked');
        event.target.classList.toggle('unknown');
        let element = event.target.innerText.substring(0, event.target.innerText.length - 9);
        for(let i = 0; i < tasklist.length; i++){
            if(tasklist[i][0] === element){
                let pos = i;
                tasklist[pos][1] = 'unknown';
                localStorage.setItem("items", JSON.stringify(tasklist));
                break;
            }
        }

    }
  }
}, false);



addElement = (event) =>{
    let text = document.getElementById('input_task').value;
    if(text === ''){
        alert("You must write a new task!")
    }
    else{
        let li = document.createElement("li");
        let t = document.createTextNode(text);
        li.appendChild(t);
        //Get priority radio button
        class_value = get_rb_class();

        li.className = class_value;     

        tasklist.push([text, class_value]);
        localStorage.setItem("items", JSON.stringify(tasklist));

        document.getElementById("list_items").appendChild(li);
        document.getElementById("input_task").value = "";

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("Modify");
        span.className = "modify";
        span.appendChild(txt);
        li.appendChild(span);

        span = document.createElement("SPAN");
        txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        

        for (let i = 0; i < modify.length; i++) {
            modify[i].onclick = function() {
                let div = this.parentElement;
                class_value = get_rb_class();
                div.className = class_value;
                tasklist[i][1] = class_value;
                localStorage.setItem("items", JSON.stringify(tasklist));
            }
          }

        for (let i = 0; i < close.length; i++) {
          close[i].onclick = function() {
            i > 0 ? tasklist.splice(i, 2) : tasklist.splice(0, 2);
            localStorage.setItem("items", JSON.stringify(tasklist));
            let div = this.parentElement;
            div.style.display = "none";
          }
        }

        
    }
}

document.getElementById('add_button').addEventListener('click', addElement);

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addElement(event);
    }
});















