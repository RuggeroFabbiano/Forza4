// Costanti

const colori = ['rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
var partita = false;
var nomi, toccaA, giocatore, c, r;


// Funzioni

function ottieniNomi() {
  var nome;
  var nomi = [];
  for(i=0; i<2; i++) {
    nome = prompt("Nome giocatore "+(i+1)+":");
    if (nome==null) {nome = "Giocatore "+(i+1);}
    else {nome = nome[0].toUpperCase()+nome.slice(1);}
    nomi.push(nome);
  } return nomi;
}

function eufonica(nomi) {
  var eufon;
  var toccaA = [];
  for (i=0; i<2; i++) {
    nomi[i][0]=="A"? eufon = "d " : eufon = " ";
    toccaA.push("Tocca a"+eufon);
  } return toccaA;
}


function verificaColore(riga, colonna, colore) {
  return $('tr').eq(riga).find('td').eq(colonna).css('background-color')==
  colore;
}

function rigaLibera(col) {
  for (var r=5; r>=0; r--) {
    if (verificaColore(r, col, 'rgb(255, 255, 255)')) {return r;}
  } return -1;
}

function verifica4Riga(r, c, col) {
  for (var i=Math.max(c-3, 0); i<=Math.min(c, 3); i++) {
    if (verificaColore(r, i, col) && verificaColore(r, i+1, col) &&
    verificaColore(r, i+2, col) && verificaColore(r, i+3, col)) {
      modificaBordo([r, r, r, r], [i, i+1, i+2, i+3]);
      return true;
    }
  } return false;
}

function verifica4Colonna(r, c, col) {
  for (var i=Math.max(r-3, 0); i<=Math.min(r, 2); i++) {
    if (verificaColore(i, c, col) && verificaColore(i+1, c, col) &&
    verificaColore(i+2, c, col) && verificaColore(i+3, c, col)) {
      modificaBordo([i, i+1, i+2, i+3], [c, c, c, c]);
      return true;
    }
  } return false;
}

function verifica4Diag1(r, c, col) {
  var DeltaIn = Math.min(r, c, 3);
  var l = DeltaIn+Math.min(6-r, 7-c, 3);
  var i = r-DeltaIn;
  var j = c-DeltaIn;
  while (l>=3) {
    if (verificaColore(i, j, col) && verificaColore(i+1, j+1, col) &&
    verificaColore(i+2, j+2, col) && verificaColore(i+3, j+3, col)) {
      modificaBordo([i, i+1, i+2, i+3], [j, j+1, j+2, j+3]);
      return true;
    } i++;
    j++;
    l--;
  } return false;
}

function verifica4Diag2(r, c, col) {
  var DeltaIn = Math.min(r, 7-c, 3);
  var l = DeltaIn+Math.min(6-r, c, 3);
  var i = r-DeltaIn;
  var j = c+DeltaIn;
  while (l>=3) {
    if (verificaColore(i, j, col) && verificaColore(i+1, j-1, col) &&
    verificaColore(i+2, j-2, col) && verificaColore(i+3, j-3, col)) {
      modificaBordo([i, i+1, i+2, i+3], [j, j-1, j-2, j-3]);
      return true;
    } i++;
    j--;
    l--;
  } return false;
}

function modificaBordo(righe, colonne) {
  for (var i=0; i<4; i++) {
    $('tr').eq(righe[i]).find('td').eq(colonne[i]).css('border-color', '#FC6C85');
  }
}

function restanoMosse() {
  for (var c=0; c<7; c++) {if (rigaLibera(c)!=-1) {return true;}}
  return false;
}


// Eventi

$('input').click(
  function() {
    $('td').css('background-color', 'white');
    $('td').css('border-color', 'black');
    nomi = ottieniNomi();
    toccaA = eufonica(nomi);
    $('#turno').text(toccaA[0]+nomi[0]+"...");
    $('#turno').css('color', colori[0]);
    giocatore = 0;
    partita = true;
  }
)

$('td').click(
  function() {
    if (partita) {
      c = $(this).index();
      r = rigaLibera(c);
      if (r>-1) {
        $('tr').eq(r).find('td').eq(c).css('background-color',
        colori[giocatore]);
        if (verifica4Riga(r, c, colori[giocatore]) ||
        verifica4Colonna(r, c, colori[giocatore]) ||
        verifica4Diag1(r, c, colori[giocatore]) ||
        verifica4Diag2(r, c, colori[giocatore])) {
          $('#turno').text(nomi[giocatore]+" ha vinto!");
          partita = false;
        } else {
          if (!restanoMosse()) {
            $('#turno').text("Nessuna mossa disponibile rimasta!");
            $('#turno').css('color', 'black');
            partita = false;
          } else {
            giocatore = -giocatore+1;
            $('#turno').text(toccaA[giocatore]+nomi[giocatore]+"...");
            $('#turno').css('color', colori[giocatore]);
          }
        }
      }
    }
  }
)
