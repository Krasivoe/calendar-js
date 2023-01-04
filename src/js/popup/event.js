import { renderCalendar } from '../calendar.js';
import { errorEventName, errorEventPeople, getEventDate } from '../utils/eventUtils.js';
import { getId, getShortDate, query } from '../utils/index.js';
import setPopup from '../utils/popupUtils.js';

let clicked = null;
export let eventsArr = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const modal = getId('modalWindow');

// Создание события
const eventModal = getId('eventPopup');
const inpEvName = getId('eventName');
const inpEvDate = getId('eventDate');
const inpEvPeople = getId('eventPeople');
const inpEvDesc = getId('eventDesc');

// Просмотр события
const viewModal = getId('viewPopup');
const viewTitle = getId('viewTitle');
const viewDate = getId('viewDate');
const viewPeople = getId('viewPeople');
const viewTooltip = getId('peopleTooltip');
const inpViewDesc = getId('viewDesc');

const closeEvent = () => {
  errorEventName.call(inpEvName, false);
  errorEventPeople.call(inpEvPeople, false);
  eventModal.classList.remove('open');
  viewModal.classList.remove('open');
  modal.classList.remove('open');

  const currentEmptyDay = query('.day.selected');
  const currentFillDay = query('.day.fill.selected');

  if (currentEmptyDay) {
    currentEmptyDay.classList.remove('selected');
  }
  if (currentFillDay) {
    currentFillDay.classList.remove('selected');
  }

  inpEvName.value = '';
  inpEvDate.value = '';
  inpEvPeople.value = '';
  inpEvDesc.value = '';
  clicked = null;
};

export const openEvent = (date, day) => {
  clicked = date;
  const event = eventsArr.find(e => e.date === clicked);
  const dayClassList = day.currentTarget.classList;

  dayClassList.add('selected');
  modal.classList.add('open');

  if (!event) {
    if (document.documentElement.clientWidth > 768) {
      setPopup(day.currentTarget, eventModal, eventModal.children[0]);
    }

    inpEvDate.disabled = true;
    inpEvDate.value = getEventDate(date);

    eventModal.classList.add('open');
  } else {
    if (document.documentElement.clientWidth > 768) {
      setPopup(day.currentTarget, viewModal, viewModal.children[0]);
    }

    // Установка текста
    viewTitle.innerText = event.event;
    viewDate.innerText = getShortDate(event.date);
    viewPeople.innerText = event.people;
    inpViewDesc.value = event.description;

    // Добавление вспывающей подсказки
    viewTooltip.innerText = event.people;
    event.people.length > 41
      ? viewTooltip.classList.add('visible')
      : viewTooltip.classList.remove('visible');

    viewModal.classList.add('open');
  }
};

const createEvent = () => {
  if (inpEvName.value && inpEvPeople.value) {
    errorEventName.call(inpEvName, false);
    errorEventPeople.call(inpEvPeople, false);

    eventsArr.push({
      date: clicked,
      event: inpEvName.value,
      people: inpEvPeople.value,
      description: inpEvDesc.value
    });
    localStorage.setItem('events', JSON.stringify(eventsArr));

    closeEvent();
    renderCalendar();
  } else {
    if (!inpEvName.value) errorEventName.call(inpEvName, true);
    if (!inpEvPeople.value) errorEventPeople.call(inpEvPeople, true);
  }
};

const editEvent = () => {
  if (inpViewDesc.value) {
    inpViewDesc.classList.remove('error');
    inpViewDesc.placeholder = 'Описание';

    const newDesc = inpViewDesc.value;
    const newEvents = eventsArr.map(item => {
      if (item.date === clicked) item.description = newDesc;
      return item;
    });
    localStorage.setItem('events', JSON.stringify(newEvents));

    closeEvent();
    renderCalendar();
  } else {
    inpViewDesc.classList.add('error');
    inpViewDesc.placeholder = 'Укажите описание';
  }
};

const deleteEvent = () => {
  eventsArr = eventsArr.filter(e => e.date !== clicked);
  localStorage.removeItem('events');
  localStorage.setItem('events', JSON.stringify(eventsArr));
  closeEvent();
  renderCalendar();
};

// Инициализация кнопок
(function () {
  // Обновить календарь
  getId('updateAll').addEventListener('click', () => {
    renderCalendar();
  });

  // Закрытие модальных окон
  getId('viewClose').addEventListener('click', closeEvent);
  getId('eventClose').addEventListener('click', closeEvent);

  modal.addEventListener('click', e => {
    const event = query('.event.open');
    const view = query('.view.open');

    if (
      (event && event !== e.target && !event.contains(e.target)) ||
      (view && view !== e.target && !view.contains(e.target))
    ) {
      closeEvent();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('open')) {
      closeEvent();
    }
  });

  // Создание/Редактирование/Удаление события
  getId('eventDone').addEventListener('click', createEvent);
  getId('viewDone').addEventListener('click', editEvent);
  getId('viewDelete').addEventListener('click', deleteEvent);

  // Удаление класса ошибок
  inpEvName.addEventListener('click', function () {
    if (this.classList.contains('error')) {
      errorEventName.call(inpEvName, false);
    }
  });
  inpEvPeople.addEventListener('click', function () {
    if (this.classList.contains('error')) {
      errorEventPeople.call(inpEvPeople, false);
    }
  });
})();
