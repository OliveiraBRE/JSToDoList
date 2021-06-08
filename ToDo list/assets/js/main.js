// Capturar entrada e saída de informação
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const ulTarefas = document.querySelector('.tarefas');
const btnRemove = document.querySelector('.btn-remove');



btnTarefa.addEventListener('click', (e) => {
  
  if(!inputTarefa.value){
  
    return;
    
  } else {
  
    addTarefa();

  }

});

inputTarefa.addEventListener('keypress', (e) => {
  
  if(e.keyCode === 13) {
  
    addTarefa();

  }
});

document.addEventListener('click', (e) => {

  const el = e.target;

  if(el.classList.contains('btn-remove')){

    el.parentElement.remove();
    saveToDo();
  }

});

function li(text) {
  const li = createLi();
  li.innerText = text;
  return li;
}

function createLi(){
  const li = document.createElement('li');
  return li;
}

function createBtnRemove(){
  const btn = document.createElement('button');
  btn.setAttribute('class', 'btn-remove');
  btn.innerText = 'remover';
  return btn;
}

function addTarefa() {
  const liTarefa = li(inputTarefa.value);
  const btnLi = createBtnRemove();
  liTarefa.innerText += ' ';
  liTarefa.appendChild(btnLi);
  ulTarefas.appendChild(liTarefa);
  limpaImput();
  saveToDo();
}

function limpaImput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function saveToDo(){
  const liTarefas = ulTarefas.querySelectorAll('li');
  const listaTarefas = [];

  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('remover', '').trim();
    listaTarefas.push(tarefaTexto);
  }



  // a coisa mais importante dessa aula
  // criar um JSON com o strigify()
  const tarefasJSON = JSON.stringify(listaTarefas);
  // salvar no local storage com setItem('nomeBDLocal', Array)
  localStorage.setItem('tarefas', tarefasJSON);
  
}

function recuperarTarefas(){
  const recuperarTarefas = localStorage.getItem('tarefas');
  // voltar as tarefas para um array com o .parse()
  const listagemDeTarefas = JSON.parse(recuperarTarefas);

  console.log(listagemDeTarefas);
  for(let tarefa of listagemDeTarefas){
    li(tarefa);
  }
}

recuperarTarefas();
