import { getFullDate, months } from './index.js';

// Дата для eventPopup
export const getEventDate = date => {
  const newDate = getFullDate(date);
  const day = newDate.split('-')[2];
  const month = newDate.split('-')[1];
  const year = newDate.split('-')[0];

  return [day, month, year].join(', ');
};

// Дата для quickPopup
export const getQuickDate = date => {
  const dateData = date.trim().split(' ');
  if (dateData.length > 3 || dateData.length < 2) return '';

  const day = dateData[0];
  const monthTmp = dateData[1].toLowerCase();
  let month = '';

  if (day < 1 || day > 31) return '';
  if (!months.find(m => m === monthTmp)) return '';

  let year = new Date().getFullYear();
  if (dateData.length === 3) {
    [, , year] = dateData;
  }
  if (year.toString().split('').length < 4) return '';

  for (let i = 0; i < months.length; i++) {
    if (months[i] === monthTmp) {
      month = i + 1;
      break;
    }
  }
  if (!month) return '';

  return `${year}-${month}-${day}`;
};

// Валидация
export function errorEventName(flag) {
  if (flag) {
    this.classList.add('error');
    this.placeholder = 'Укажите событие';
  } else {
    this.classList.remove('error');
    this.placeholder = 'Событие';
  }
}

export function errorEventPeople(flag) {
  if (flag) {
    this.classList.add('error');
    this.placeholder = 'Укажите участников';
  } else {
    this.classList.remove('error');
    this.placeholder = 'Участники';
  }
}

export function errorQuickEvent(flag) {
  if (flag) {
    this.classList.add('error');
    this.value = '';
    this.placeholder = 'Укажите событие через 2 разделителя';
  } else {
    this.classList.remove('error');
    this.placeholder = '16 октября, Кутеж, Олег';
  }
}
