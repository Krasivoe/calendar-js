import { getFullDate, getId } from '../utils/index.js';
import { errorQuickEvent, getQuickDate } from '../utils/eventUtils.js';
import { eventsArr } from './event.js';

const quickEvent = getId('quickPopup');
const quickInput = getId('quickEvent');
const quickButton = getId('addQuick');

const openQuickEvent = () => {
  if (quickButton.classList.contains('active')) return;
  quickButton.classList.add('active');
  quickEvent.classList.add('open');
};

const closeQuickEvent = () => {
  errorQuickEvent.call(quickInput, false);
  quickInput.value = '';
  quickButton.classList.remove('active');
  quickEvent.classList.remove('open');
};

const saveQuickEvent = () => {
  const inputValue = quickInput.value.split(',');
  if (!quickInput.value && inputValue.length < 3) {
    errorQuickEvent.call(quickInput, true);
    return;
  }

  const date = getFullDate(getQuickDate(inputValue[0]));
  const event = inputValue[1];
  const people = inputValue.slice(2, inputValue.length).join(', ');

  if (!date) {
    quickInput.classList.add('error');
    quickInput.value = '';
    quickInput.placeholder = 'Некорректная дата';
    return;
  }

  if (eventsArr.find(e => e.date === date)) {
    // Перезапись существующего события
    eventsArr.map(item => {
      if (item.date === date) {
        item.event = event;
        item.people = people;
      }
      return item;
    });
  } else {
    eventsArr.push({
      date,
      event,
      people,
      description: 'Описание'
    });
  }

  localStorage.setItem('events', JSON.stringify(eventsArr));
  closeQuickEvent();
};

// Инициализация кнопок
(function () {
  getId('quickClose').addEventListener('click', closeQuickEvent);
  getId('quickCreate').addEventListener('click', saveQuickEvent);

  quickButton.addEventListener('click', openQuickEvent);

  quickInput.addEventListener('click', function () {
    if (this.classList.contains('error')) {
      errorQuickEvent.call(quickInput, false);
    }
  });

  // Обработка нажатия вне формы добавления события
  document.addEventListener('mouseup', e => {
    if (
      quickEvent &&
      quickEvent !== e.target &&
      !quickEvent.contains(e.target) &&
      quickButton !== e.target
    ) {
      closeQuickEvent();
    }
  });
})();
