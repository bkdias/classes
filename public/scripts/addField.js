// procurar o botão
document.querySelector("#add-time")

// quando clicar no botão 
.addEventListener('click', cloneField);

//executar uma ação
function cloneField(){
 // duplicar os campos
   const newfieldContainer = document.querySelector('.schedule-item').cloneNode(true)

//PEgar os campos
    const fields= newfieldContainer.querySelectorAll('input')
//Para cada campo limpar
   fields.forEach(function(field){
     field.value = ""
   })
  newfieldContainer.setAttribute("id", "ClonedField");
  console.log(newfieldContainer);
   // adicionar evento do clique remover ao obj clonado. O cloneNode nao replica AddEventListener
    newfieldContainer.querySelector("#remove-time").addEventListener('click', removeField)
  //colocar na página, onde??  
  document.querySelector('#schedule-items').appendChild(newfieldContainer)
}


//Remover input de horario quando clicar no botao remover
document.querySelector("#remove-time").addEventListener('click', removeField);
//funcao de remover o campo
function removeField() {
  var Node = document.querySelector("#ClonedField");
  
  if (Node.parentNode) {
    Node.parentNode.removeChild(Node);
 }
}






