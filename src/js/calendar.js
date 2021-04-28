const dateField = document.querySelector(".date");
const timeField = document.querySelector(".time");

dateIcon = `<i class="fas fa-calendar-alt"></i>`;
timeIcon = `<i class="fas fa-clock"></i>`;

weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();

    dateField.innerHTML =
        dateIcon +
        `${year}. ${month < 10 ? `0${month}` : `${month}`}. ${
            date < 10 ? `0${date}` : `${date}`
        }. ${weeks[day]}`;
}

function getTime() {
    const today = new Date();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    timeField.innerHTML =
        timeIcon +
        `${hour < 10 ? `0${hour}` : `${hour}`} : ${
            min < 10 ? `0${min}` : `${min}`
        } : ${sec < 10 ? `0${sec}` : `${sec}`}`;
}

function main() {
    getDate();
    setInterval(getTime, 1000);
}

main();
