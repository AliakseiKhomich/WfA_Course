var oBack = document.getElementById('btnBack');
var oClear = document.getElementById('btnClear');

oBack.addEventListener('click', fClickBack);
oClear.addEventListener('click', fClickClear);

function fClickBack(){
  console.log('Click on Back');
  window.location.href='../index.html';    
}

function fClickClear(){
  console.log('Click on Clear');
  document.body.innerHTML = '';
}