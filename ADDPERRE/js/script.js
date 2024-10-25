import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const input = document.getElementById("inputField");
const boto = document.getElementById("afegir");
const lista = document.getElementById ("llista")

const AppConfiguracio={
    databaseURL:"https://llistadetasques-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(AppConfiguracio);
const baseDades = getDatabase(app);
const task = ref(baseDades, "tareas");

boto.addEventListener("click", function(){
    push (task, input.value)
    clearScreem();
   

})

function addElement(e){
    let elementLlista = document.createElement("li");
    elementLlista.id= e[0]
    elementLlista.textContent=e[1];

    elementLlista.addEventListener("click", function(){
        let localitzacioItem = ref(baseDades, `tareas/${e[0]}`)
        remove(localitzacioItem)
    })
    lista.append(elementLlista);
}

function clearScreen(){
    input.value = ""
}

function clearList(){
    lista.innerHTML=""
}

onValue(task, function(snapshot){

    if (snapshot.exist()){

    let resultats = Object.entries(snapshot.val())
    clearList()
    for (let i = 0; i < resultats.length; i++) {
        let current = resultats[i]
        addElement(current)
    }
}else{
    lista.innerHTML = "Give me my money"
}}
)
