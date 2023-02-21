let calendar = document.querySelector(".calendar"),

    prev = document.querySelector(".prev"),
    date = document.querySelector(".date"),
    next = document.querySelector(".next"),
    daysContainer = document.querySelector(".days");


let eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date');

let addEventInput = document.querySelector('.add-event-input');
let addBtn = document.querySelector('.add-button');
let noEvMes = document.querySelector('.no-events');

addBtn.addEventListener('click', () => {
    const currentActiveDate = document.querySelector('.date');
    const dateArr = currentActiveDate.textContent.split(' ');
    const month = dateArr[0];
    const year = dateArr[1];
    const day = document.querySelector('.active').textContent;
    const activeDate = eventsArr.filter(x => x.day === day && x.month === month && x.year === year);
    let eventInputValue = document.querySelector('.event-name');
    if (activeDate.length === 0) {
        let obj = {
            day,
            month,
            year,
            events: [eventInputValue.value]
        }
        eventsArr.push(obj);
    }
    else {
        activeDate[0].events.push(eventInputValue.value);
    }
    eventInputValue.value = '';
    removeChilElements();
    currentEventsHandler();
})
const removeChilElements = () => {
    const eventsWrapperEl = document.querySelector('.events');
    const prevEvents = document.querySelectorAll('.event');
    for (const event of prevEvents) {
        eventsWrapperEl.removeChild(event);
    }
}

const currentEventsHandler = () => {
    const currentActiveDate = document.querySelector('.date');
    const dateArr = currentActiveDate.textContent.split(' ');
    const month = dateArr[0];
    const year = dateArr[1];
    const day = document.querySelector('.active');

    const activeDateIndex = eventsArr.findIndex(x => x.day === day.textContent && x.month === month && x.year === year);
    if (activeDateIndex === -1 || eventsArr[activeDateIndex].events.length === 0) {
        noEvMes.style.display = 'block';
        day.classList.remove('underline');
    }
    else {
        const currentEvents = eventsArr[activeDateIndex].events;
        const eventsWrapperEl = document.querySelector('.events');
        noEvMes.style.display = 'none';
        for (const event of currentEvents) {
            const eventWrapper = document.createElement('div');
            eventWrapper.classList.add('event');
            const titleEl = document.createElement('div');
            titleEl.classList.add('title');
            // const iconEl = document.createElement('i');
            // iconEl.classList.add('fa', 'fa-check-circle');
            const eventEl = document.createElement('p');
            eventEl.classList.add('event-title');
            eventEl.textContent = event;
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa', 'fa-times-circle');
            closeIcon.addEventListener('click', () => {
                const eventIndex = currentEvents.findIndex(x => x === event);
                currentEvents.splice(eventIndex, 1);
                removeChilElements();
                currentEventsHandler();
            })
            // titleEl.appendChild(iconEl);
            titleEl.appendChild(eventEl);
            titleEl.appendChild(closeIcon);
            eventWrapper.appendChild(titleEl);
            eventsWrapperEl.appendChild(eventWrapper);
        }
        day.classList.add('underline');
    }
}

let today = new Date();
// today.toLocaleDateString('bg-BG');
let activeDay;
let todayDate = today.getDate();
let day = today.getDay();
let month = today.getMonth(); //1
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const eventsArr = [
    // {
    //     day: 4,
    //     month: 2,
    //     year: 2023,
    //     events: []
    // }


];

//function to add days
function initCalendar() {
    //to get prev month days and current month all days and rem next month days
    let firstDay = new Date(year, month, 1); 
    let lastDay = new Date(year, month + 1, 0); 
    let prevLastDay = new Date(year, month, 0); 
    let prevDays = prevLastDay.getDate(); 
    let lastDate = lastDay.getDate();
    let nextDays = 7 - lastDay.getDay();
    // console.log(nextDays);

    //update date top of calendar
    date.innerHTML = months[month] + " " + year;

    //adding days on dom
    let days = "";

    //PREV MONTH DAYS
    let dayOfWeek = prevLastDay.getDay(); 
    let daysArr = [];

    while (dayOfWeek !== 0) {
        daysArr.push(`<div class="day prev-date">${prevDays}</div>`); // 31 30
        prevDays--; // 30
        dayOfWeek--; // 1
    }
    daysArr.reverse();
    days = daysArr.join('');

    //CURRENT MONTH DAYS
    for (let i = 1; i <= lastDate; i++) {

        let event = false;

        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                //if event found
                event = true;
            }
        })
        //if day is today add class today
        if (i === new Date().getDate() && // 14
            year === new Date().getFullYear() && // 2023
            month === new Date().getMonth()) { // 1


            //if event found also add event class
            if (event) {
                days += `<div class="day today event" >${i}</div>`;
            } else {
                days += `<div class="day today" >${i}</div>` 
            };

        } else {
            //add remaing as it is
            if (event) {
                days += `<div class="day event">${i}</div>`
            } else {
                days += `<div class="day" >${i}</div>`
            }
        }

    }


    //NEXT MONTH DAYS
    if (nextDays <= 6) {

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date " >${j}</div>`
        }
    }


    daysContainer.innerHTML = days;
    //add listner after calendar initialized 
    addListner();
}

initCalendar();

//prev month
function prevMonth() {
    month--; // month = today.getMonth(); // 1
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//add eventlistener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

function addListner() {
    let days = document.querySelectorAll(".day");

    days.forEach((day) => {

        day.addEventListener('click', (e) => {
            removeChilElements();
            //call active day after click
            getActiveDay(e.target.innerHTML);

            //set current day as active day

            activeDay = Number(e.target.innerHTML);
            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            })
            e.target.classList.add("active");
            currentEventsHandler();
        });

    })

}

//lets show active day events and date at top
function getActiveDay(date) {
    let day = new Date(year, month, date);
    let dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}
