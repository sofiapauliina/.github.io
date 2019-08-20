var players = [];
var playerCount = 1;
var tableCells = [];

function addPlayer(){
  playerCount++;
  let table = document.getElementById('players');
  let row = document.createElement("tr");
  table.appendChild(row);

  let cell = document.createElement("td");
  row.appendChild(cell);

  let input = document.createElement("INPUT");
  input.type= "text";
  input.setAttribute("class", "pelaaja")
  input.setAttribute("placeholder", "Pelaajan nimi");
  cell.appendChild(input);

  let remove = document.createElement('i');
  remove.setAttribute('class', 'fa fa-times fa-2x');

  remove.onclick = function(e){
    //Remove the grand-parent element of the grand-grand-parent element :D
    remove.parentNode.parentNode.parentNode.removeChild(remove.parentNode.parentNode)
    playerCount--;
  }
  cell.appendChild(remove);
}

function aloitaPeli(){
  tableCells = document.getElementsByClassName('pelaaja');
  for(let i = 0; i<tableCells.length; i++){
    if(tableCells[i].value != undefined){
      let playerno= i+1
      players[playerno] = tableCells[i].value
      console.log("Player "+playerno+": "+players[playerno])
      tableCells[i].readOnly = true;
    }
  }
  //Poista nappulat
  let poistettava = document.getElementById('uusiPelaaja');
  poistettava.parentNode.removeChild(poistettava);
  poistettava = document.getElementById('aloita');
  poistettava.parentNode.removeChild(poistettava);
  document.getElementById('result').innerHTML = "Good luck everyone!"
  //soitaMusiikki();
  //Countdown animaatio.. 5.. 4.. 3.. 2.. 1..

  const next = document.createElement('button');
  next.innerHTML = 'Arvo';
  next.onclick = function(e){
    let pudonnut = arvoNumero();
    document.getElementById('result').innerHTML = 'Better luck next time, ' + pudonnut

    for(let i = 0; i<tableCells.length; i++){
      if(tableCells[i].value == pudonnut){
        tableCells[i].style.backgroundColor = "#fd5e53";
      }
    }
    if(playerCount == 1){
      console.log("Voittaja: "+players[1]);
    }
  }
  document.getElementById('grid-container').prepend(next);

  //soitaMusiikki();
}

function arvoNumero(){
  let arvottu = getNumero(playerCount);
  let pudonnutPelaaja = players[arvottu]
  players.splice(arvottu, 1);
  console.log(pudonnutPelaaja + ", better luck next time!");
  playerCount--;
  return pudonnutPelaaja;
}

function getNumero(count){
  let arvo = Math.floor(Math.random()*count) +1
  return arvo;
}
