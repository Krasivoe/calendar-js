// Получение дней недели
export const getDayName = day => {
  const date = new Date(Date.UTC(2021, 10, day));
  let newDate = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
  newDate = `${newDate[0].toUpperCase() + newDate.slice(1)}, `;
  return newDate;
};

// Создание пустой плашки дня
export const createDayCell = innerHtml =>
  Object.assign(document.createElement('div'), {
    classList: 'day',
    innerHTML: innerHtml
  });

// Создание заполненной плашки дня
export const createDayCellInfo = (day, titleText, peopleText) => {
  const titleDiv = Object.assign(document.createElement('div'), {
    classList: 'title',
    innerText: titleText
  });

  const peopleDiv = Object.assign(document.createElement('div'), {
    classList: 'people',
    innerText: peopleText
  });

  day.appendChild(titleDiv);
  day.appendChild(peopleDiv);
  day.classList.add('fill');
};
