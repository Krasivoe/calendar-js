import { createDayCell, createDayCellInfo, getDayName } from './utils/calendarUtils.js';
import { getFullDate, getId } from './utils/index.js';
import { eventsArr, openEvent } from './popup/event.js';

let dt = new Date();

const calendar = getId('calendarApp');
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const renderCalendar = () => {
  calendar.innerHTML = '';
  getId('todayDate').innerHTML = `${months[dt.getMonth()]} ${dt.getFullYear()}`;

  // Cколько дней пропустить вначале
  const firstDayMonth = new Date(dt.getFullYear(), dt.getMonth(), 7).getDay();
  // Последний день текущего месяца
  const lastDayMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
  const lastDayIndex = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDay();
  // Последний день предыдущего месяца
  const lastDayPrevMonth = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  const lastDayFinalIndex = lastDayIndex === 0 ? 0 : 7 - lastDayIndex;

  let current = 1;

  // Дни прошедшего месяца
  if (firstDayMonth > 0) {
    for (let i = firstDayMonth; i > 0; i--) {
      // Название дней недели
      const name = getDayName(current);
      current += 1;

      // Создание дня
      const idx = lastDayPrevMonth - i + 1;
      const day = createDayCell(`${name}${idx}`);

      // Получение даты дня
      let dayString = getFullDate(`${dt.getFullYear()}-${dt.getMonth()}-${idx}`);
      if (dt.getMonth() + 1 === 1) {
        // Предыдущий год
        dayString = getFullDate(`${dt.getFullYear() - 1}-${12}-${idx}`);
      }

      // Запись события, если оно есть
      const eventForDay = eventsArr.find(e => e.date === dayString);
      if (eventForDay) {
        createDayCellInfo(day, eventForDay.event, eventForDay.people);
      }

      day.addEventListener('click', e => openEvent(dayString, e));
      calendar.appendChild(day);
    }
  }

  // Дни теущего месяца
  for (let i = 1; i <= lastDayMonth; i++) {
    // Название дней недели
    let name = '';
    if (current <= 7) {
      name = getDayName(current);
      current += 1;
    }

    // Создание дня
    const day = createDayCell(`${name}${i}`);

    // Получение даты дня
    const dayString = getFullDate(`${dt.getFullYear()}-${dt.getMonth() + 1}-${i}`);

    // Запись события, если оно есть
    const eventForDay = eventsArr.find(e => e.date === dayString);
    if (eventForDay) {
      createDayCellInfo(day, eventForDay.event, eventForDay.people);
    }

    day.addEventListener('click', e => openEvent(dayString, e));
    calendar.appendChild(day);
  }

  // Дни следующего месяца
  if (lastDayFinalIndex !== 0) {
    for (let i = 1; i <= lastDayFinalIndex; i++) {
      // Создание дня
      const day = createDayCell(`${i}`);

      // Получение даты дня
      let dayString = getFullDate(`${dt.getFullYear()}-${dt.getMonth() + 2}-${i}`);
      if (dt.getMonth() + 1 === 12) {
        dayString = getFullDate(`${dt.getFullYear() + 1}-${dt.getFullYear() + 1}-${i}`);
      }

      // Запись события, если оно есть
      const eventForDay = eventsArr.find(e => e.date === dayString);
      if (eventForDay) {
        createDayCellInfo(day, eventForDay.event, eventForDay.people);
      }

      day.addEventListener('click', e => openEvent(dayString, e));
      calendar.appendChild(day);
    }
  }
};
renderCalendar();

export const renderCalendarWithDate = date => {
  const newDate = new Date(date);

  if (newDate.getMonth() === dt.getMonth() && newDate.getFullYear() === dt.getFullYear()) return;

  dt = newDate;
  renderCalendar();
};

// Инициализация кнопок
(function () {
  // Предыдущий/Следующий месяцы
  getId('previous').addEventListener('click', () => {
    dt.setMonth(dt.getMonth() - 1);
    renderCalendar();
  });
  getId('next').addEventListener('click', () => {
    dt.setMonth(dt.getMonth() + 1);
    renderCalendar();
  });

  // Сегодня
  getId('today').addEventListener('click', () => {
    dt = new Date();
    renderCalendar();
  });
})();
