// TASKS:

// ✓ 1) Capire quante celle generare per il mese corrente (dovrà funzionare per OGNI mese, non solo quello corrente) (bisogna considerare gli anni bisestili)

//  ✓ 2) Con il numero esatto, trovato in precedenza, di giorni in questo mese dobbiamo generare il numero corrispondente di celle nel calendario

//  3) Il giorno corrente dovrebbe "illuminarsi"

//  4) Visualizzare il nome del mese nell'h1

//  5) Rendere cliccabili le celle per poter salvare gli appuntamenti in quel dato giorno (applicare un bordo alla selezione)

// ________________________________

//  6) Modificare il meeting day alla selezione di un giorno

//  7) Salvare un appuntamento con l'ora e una stringa sempre per il giorno selezionato

//  8) devo poter selezionare altri giorni, potendo inserire un appuntamento per loro, pur mantenendo la possibilità di RIVEDERE appuntamenti già creati su altri giorni

//  extra 9) un giorno contenente un appuntamento dovrà riflettere questo stato con un pallino colorato dentro la cella

// _____________________________________________________________________________________________________________________________

// 7a)
const appointments = [];

/* vedi ciclo for per la generazione delle celle interne dell'array
[
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], 
] 
*/
const now = new Date(); // estrae il momento nel tempo attuale in cui si esegue in forma di data
let actualMonth = now.getMonth();
let actualYear = now.getFullYear();
let actualDay = now.getDay();
const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];
const dayNames = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];
// 1) abbiamo il valore numerico, di nr di giorni in questo mese, in uscita dalla funzione daysInThisMonth

// 5b) deselezionare eventuali altri elementi selezionati

// 6) cambiare numero in newMeetingDay

// 8) creo una funzione per gestire la visualizzazione dei miei appuntamenti
const showAppointments = (dayIndex) => {};

// 7c) salvare appuntamento
const saveMeeting = function (e) {
  // da fare sempre per una funzione collegata al submit di un form
};

// 2) creazione dinamica delle celle in base al numero di giorni in arrivo come parametro
const createDaysAndMonth = (month, year) => {
  const h1 = document.querySelector("h1");
  // h1.innerText = monthNames[month] + " " + year;
  h1.innerHTML = monthNames[month] + " " + year; // modifica il mese e l'anno nel titolo

  let lastDayMonth = new Date(year, month + 1, 0); // "month + 1" ci da il mese successivo, la posizione "0" nel mese è intesa come ultimo giorno del mese precedente, quindi ci restituisce l'ultimo giorno del mese passato e sappiamo quindi di quanti giorni era formato

  const cellDays = document.getElementById("calendar");
  cellDays.innerHTML = ``; // resetta il calendario ad ogni iterazione della funzione

  for (let i = 1; i <= lastDayMonth.getDate(); i++) {
    // ciclo che aggiunge il numero di celle in base al numero di giorni del mese corrente (o selezionato)
    cellDays.innerHTML += `<div class="day">
    <h3 id="giorno">${i}</h3></div>`; // da sistemare l'aggiunta dello span weekday per mettere in automatico anche i giorni della settimana
  }
  let spanWeekDay = document.querySelectorAll(".day");
  let j = lastDayMonth.getDay(); // definisco il giorno della settimana dell'ultimo del mese con GetDay per il primo giro del for (i = lastDayMonth.getDate() - 1)
  for (let i = lastDayMonth.getDate() - 1; i >= 0; i--) {
    const span = document.createElement("span");
    span.classList.add("weekday");
    span.innerText = dayNames[j];
    spanWeekDay[i].appendChild(span);
    j--;
    if (j < 0) {
      j = 6;
    }
  }

  // CONDIZIONE PER SELEZIONE SOLO SUL GIORNO CORRENTE (CON CONDIZIONE su MESE e ANNO)
  if (month === now.getMonth() && year === now.getFullYear()) {
    let allDay = document.querySelectorAll("#giorno");
    allDay.forEach((e) => {
      if (parseInt(e.innerText) === now.getDate()) {
        e.classList.add("actual");
      }
    });
  }

  selectDay();
};

const selectDay = () => {
  let giorni = document.getElementsByClassName("day");

  for (let i = 0; i < giorni.length; i++) {
    giorni[i].addEventListener("click", function () {
      let selectedDay = document.querySelector(".selected");
      console.log(selectedDay);
      if (selectedDay) {
        selectedDay.classList.remove("selected");
      }
      this.classList.add("selected");

      changeDayNumber();
    });
  }
};

const changeDayNumber = () => {
  const meetingDay = document.getElementById("newMeetingDay");

  let daySelected = document.querySelector(".selected");
  if (daySelected) {
    meetingDay.innerText = daySelected.innerText;
  }
};

const nextMonth = document
  .getElementById("forward")
  .addEventListener("click", function (e) {
    if (actualMonth === 11) {
      actualMonth = 0;
      actualYear += 1; // Aggiorna year
    } else {
      actualMonth += 1; // Aggiorna month
    }
    return createDaysAndMonth(actualMonth, actualYear);
  });

const prevMonth = document
  .getElementById("back")
  .addEventListener("click", function (e) {
    if (actualMonth === 0) {
      actualMonth = 11;
      actualYear -= 1; // Aggiorna year
    } else {
      actualMonth -= 1; // Aggiorna month
    }
    return createDaysAndMonth(actualMonth, actualYear);
  });

// 👇👇👇 punto di ingresso del nostro codice
window.onload = function () {
  createDaysAndMonth(now.getMonth(), now.getFullYear());

  changeDayNumber();

  // tutte le risorse sono a questo punto già caricate nel browser
  // è il momento più sicuro per cominciare a cercare gli elementi nel DOM
};
// window.addEventListener("DOMContentLoaded", function () {
//   const calendar = document.getElementById("calendar");
//   console.log("DOMContentLoaded", calendar);
// });

// const calendar = document.getElementById("calendar");
// console.log("Root Context", calendar);
