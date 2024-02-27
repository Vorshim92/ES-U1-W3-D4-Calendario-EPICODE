// TASKS:

// ✓ 1) Capire quante celle generare per il mese corrente (dovrà funzionare per OGNI mese, non solo quello corrente) (bisogna considerare gli anni bisestili)

//  ✓ 2) Con il numero esatto, trovato in precedenza, di giorni in questo mese dobbiamo generare il numero corrispondente di celle nel calendario

//  ✓ 3) Il giorno corrente dovrebbe "illuminarsi"

//  ✓ 4) Visualizzare il nome del mese nell'h1

//  5) Rendere cliccabili le celle per poter salvare gli appuntamenti in quel dato giorno (applicare un bordo alla selezione)

// ________________________________

//  ✓ 6) Modificare il meeting day alla selezione di un giorno

//  7) Salvare un appuntamento con l'ora e una stringa sempre per il giorno selezionato

//  8) devo poter selezionare altri giorni, potendo inserire un appuntamento per loro, pur mantenendo la possibilità di RIVEDERE appuntamenti già creati su altri giorni

//  extra 9) un giorno contenente un appuntamento dovrà riflettere questo stato con un pallino colorato dentro la cella
// creo una storagekey per il sessionStorage
const storageKey = `appointments`;

//  creo una classe costruttrice
class MeetingEvent {
  constructor(_day, _month, _time, _name) {
    this.day = _day;
    this.month = _month;
    this.time = _time;
    this.name = _name;
  }
}
function createEvent() {
  let time = document.getElementById("newMeetingTime").value;
  let name = document.getElementById("newMeetingName").value;
  let month = monthNames[actualMonth];
  const newMeetingEvent = new MeetingEvent(lastSelDay, month, time, name);
  const savedAppointments = sessionStorage.getItem(storageKey);

  if (savedAppointments) {
    const tempArray = JSON.parse(savedAppointments);
    tempArray.push(newMeetingEvent);
    sessionStorage.setItem(storageKey, JSON.stringify(tempArray));
  } else {
    const appointments = [];
    appointments.push(newMeetingEvent);
    sessionStorage.setItem(storageKey, JSON.stringify(appointments));
  }
}
// 7a)

const now = new Date(); // estrae il momento nel tempo attuale in cui si esegue in forma di data
let actualMonth = now.getMonth();
let actualYear = now.getFullYear();
let lastSelMonthYear;
let lastSelDay;
const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const dayNames = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

const addMettingEvent = function (e) {
  e.preventDefault();
  createEvent();
  form.reset();
};

const form = document.getElementById("meeting");
form.addEventListener("submit", addMettingEvent);

const showAppointments = (selDay, selMonth) => {
  const savedEvents = sessionStorage.getItem(storageKey);
  const uList = document.getElementById("appointmentsList");

  if (storageKey) {
    const savedEventsArr = JSON.parse(savedEvents);
    const dayAppointments = savedEventsArr.filter((obj) => parseInt(obj.day) === selDay && obj.month === selMonth);
    console.log(dayAppointments);
    dayAppointments.forEach((appointment) => {
      const newLi = document.createElement("li");
      document.querySelector(".appointments").classList.remove("appointments");
      newLi.innerText = `ORA: ${appointment.time} - NOME: ${appointment.name}`;
      uList.appendChild(newLi);
    });
  } else {
    uList.innerHTML = ``;
  }
};

// 2) creazione dinamica delle celle in base al mese e anno in arrivo come parametro
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
  // INIZIALIZZAZIONE EVENTLISTENER su OGNI DIV per il CLICK FUNCTION
  selectDay();

  // CONDIZIONE PER SELEZIONE SOLO SUL GIORNO CORRENTE (CON CONDIZIONE su MESE e ANNO)
  currentDay(month, year);

  // CONDIZIONE PER RIPRISTINARE LA SELEZIONE NEL MESE IN CUI E' STATA SELEZIONATA

  restoreSelection(h1.innerHTML);
};

// funzione per aggiungere classe ACTUAL al giorno corrente, solo quando ci troviamo nel mese corrente
const currentDay = (month, year) => {
  if (month === now.getMonth() && year === now.getFullYear()) {
    let allDay = document.querySelectorAll("#giorno");
    allDay.forEach((e) => {
      if (parseInt(e.innerText) === now.getDate()) {
        e.classList.add("actual");
      }
    });
  }
};

// CONDIZIONE PER RIPRISTINARE LA SELEZIONE NEL MESE IN CUI E' STATA SELEZIONATA
const restoreSelection = (monthYear) => {
  if (monthYear === lastSelMonthYear) {
    let allDays = document.querySelectorAll(".day");
    allDays.forEach((day) => {
      if (parseInt(day.innerText) === lastSelDay) {
        day.classList.add("selected");
      }
    });
  }
};

// INIZIALIZZAZIONE EVENTLISTENER su OGNI DIV per il CLICK FUNCTION
const selectDay = () => {
  let giorni = document.getElementsByClassName("day");

  for (let i = 0; i < giorni.length; i++) {
    giorni[i].addEventListener("click", function (e) {
      let selectedDay = document.querySelector(".selected"); // variabile che rappresenta il giorno già selezionato (se è stato selezionato)

      this.classList.add("selected");
      lastSelDay = parseInt(this.innerText); //variabile globale per tenere traccia dell'ultimo giorno selezionato
      lastSelMonthYear = document.querySelector("h1").innerText; //variabile globale per tenere traccia del mese del giorno selezionato
      if (this === selectedDay) {
        //condizione quando clicchiamo il giorno già selezionato
        this.classList.remove("selected");
        lastSelDay = null;
        lastSelMonthYear = null;
      } else if (selectedDay) {
        //condizione quando clicchiamo un giorno diverso, ed esiste già un giorno selezionato (diverso)
        selectedDay.classList.remove("selected");
        lastSelDay = parseInt(this.innerText);
        lastSelMonthYear = document.querySelector("h1").innerText;
      }

      changeDayNumber();
      showAppointments(lastSelDay, monthNames[actualMonth]);
    });
  }
};

// FUNZIONE PER CAMBIARE IL GIORNO SELEZIONATO SUL FORM SOTTOSTANTE
const changeDayNumber = () => {
  const meetingDay = document.getElementById("newMeetingDay");

  let daySelected = document.querySelector(".selected");
  if (daySelected) {
    meetingDay.innerText = daySelected.innerText;
  } else if (!daySelected) {
    meetingDay.innerText = "Click on a Day";
  }
};

const nextMonth = document.getElementById("forward").addEventListener("click", function (e) {
  if (actualMonth === 11) {
    actualMonth = 0;
    actualYear += 1; // Aggiorna year
  } else {
    actualMonth += 1; // Aggiorna month
  }

  return createDaysAndMonth(actualMonth, actualYear);
});

const prevMonth = document.getElementById("back").addEventListener("click", function (e) {
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

  // changeDayNumber();

  // tutte le risorse sono a questo punto già caricate nel browser
  // è il momento più sicuro per cominciare a cercare gli elementi nel DOM
};
// window.addEventListener("DOMContentLoaded", function () {
//   const calendar = document.getElementById("calendar");
//   console.log("DOMContentLoaded", calendar);
// });

// const calendar = document.getElementById("calendar");
// console.log("Root Context", calendar);
