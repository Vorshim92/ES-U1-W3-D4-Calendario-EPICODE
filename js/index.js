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
const unselectPreviousDay = () => {};

// 6) cambiare numero in newMeetingDay
const changeDayNumber = (dayNumber) => {};

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
  h1.innerHTML = monthNames[month] + " " + year;
  const lastDayMonth = new Date(year, month + 1, 0);

  const cellDays = document.getElementById("calendar");
  cellDays.innerHTML = ``;

  for (let i = 1; i <= lastDayMonth.getDate(); i++) {
    cellDays.innerHTML += `<div class="day">
    <h3 id="giorno">${i}</h3>
    <span class="weekday">${dayNames[lastDayMonth.getDay()]}</span>
    </div>`;
  }
  if (month === now.getMonth() && year === now.getFullYear()) {
    let allDay = document.querySelectorAll("#giorno");
    allDay.forEach((e) => {
      if (parseInt(e.innerText) === now.getDate()) {
        e.classList.add("actual");
      }
    });
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

// 4)

// 👇👇👇 punto di ingresso del nostro codice
window.onload = function () {
  createDaysAndMonth(now.getMonth(), now.getFullYear());

  // tutte le risorse sono a questo punto già caricate nel browser
  // è il momento più sicuro per cominciare a cercare gli elementi nel DOM
};
// window.addEventListener("DOMContentLoaded", function () {
//   const calendar = document.getElementById("calendar");
//   console.log("DOMContentLoaded", calendar);
// });

// const calendar = document.getElementById("calendar");
// console.log("Root Context", calendar);
