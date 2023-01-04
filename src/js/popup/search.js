//  Импорт полосы прокрутки для поиска
import SimpleBar from 'simplebar';
import { renderCalendar, renderCalendarWithDate } from '../calendar.js';
import { getId, getShortDate, query } from '../utils/index.js';
import { eventsArr } from './event.js';

// Поиск
let searchTerm = ''; // Что вводим
let resultsArr = []; // Массив событий

const searchInput = getId('inpSearch');
const searchArea = query('.input-area');
const searchCross = query('.input_cross');
const btnSearch = getId('btnSearch');

// Результаты поиска
const searchPopup = getId('searchPopup');
const searchContent = getId('searchContent');

getId('searchPopup', new SimpleBar(searchPopup));

const openSearch = () => {
  renderCalendar();
  searchPopup.classList.add('open');
  searchCross.classList.add('visible');
  searchInput.classList.add('focus');
};

const closeSearch = () => {
  searchPopup.classList.remove('open');
  searchCross.classList.remove('visible');
  searchInput.classList.remove('focus');
  searchInput.blur();
  searchInput.value = '';
  searchContent.innerHTML = '';
};

// Создание результатов поиска
const createResult = (event, viewDate, date) => {
  const searchResult = Object.assign(document.createElement('li'), {
    classList: 'search__result'
  });
  const searchText = Object.assign(document.createElement('div'), {
    classList: 'search__text'
  });
  const searchTitle = Object.assign(document.createElement('div'), {
    classList: 'search__title',
    innerText: event
  });
  const searchDate = Object.assign(document.createElement('div'), {
    classList: 'search__date',
    innerText: viewDate
  });

  searchResult.setAttribute('data-date', date);

  searchText.appendChild(searchTitle);
  searchText.appendChild(searchDate);
  searchResult.appendChild(searchText);
  searchContent.appendChild(searchResult);
};

// Создание плашки оповещения если событий нет или они не найдены
const createInfoResult = text => {
  searchContent.innerHTML = '';
  const searchResult = Object.assign(document.createElement('li'), {
    classList: 'search__info'
  });
  const searchInfo = Object.assign(document.createElement('div'), {
    innerText: text
  });

  searchResult.appendChild(searchInfo);
  searchContent.appendChild(searchResult);
};

const addListenerResults = () => {
  const elements = document.querySelectorAll('.search__result');
  if (elements.length) {
    elements.forEach(elem => {
      elem.addEventListener('click', function () {
        const { date } = this.dataset;
        renderCalendarWithDate(date);
        closeSearch();
      });
    });
  }
};

const setSearchResults = () => {
  searchContent.innerHTML = '';
  if (!eventsArr.length) {
    const text = 'События отсутствуют...';
    createInfoResult(text);
  } else {
    eventsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    eventsArr.forEach(item => {
      if (item.date) {
        createResult(item.event, getShortDate(item.date), item.date);
      }
    });
  }
  // Добавление слушателей
  addListenerResults();
};

const getSearchResults = () => {
  // Сохранение data-attribute
  const date = [];
  const results = document.querySelectorAll('.search__result');
  results.forEach(item => {
    date.push(item.dataset.date);
  });
  // Запись в массив в качестве объекта
  if (results.length) {
    resultsArr = [];
    results.forEach((item, i) => {
      const resultsData = item.innerText.split('\n');
      const obj = {
        event: resultsData[0],
        viewDate: resultsData[1],
        date: date[i]
      };
      resultsArr.push(obj);
    });
  }
};

const search = () => {
  searchContent.innerHTML = '';
  resultsArr
    .filter(
      item =>
        item.event.toLowerCase().includes(searchTerm) ||
        item.date.toLowerCase().includes(searchTerm)
    )
    .forEach(elem => {
      createResult(elem.event, elem.viewDate, elem.date);
    });

  // Добавление слушателей
  addListenerResults();

  if (searchContent.innerHTML === '') {
    const text = 'Результаты отсутствуют...';
    createInfoResult(text);
  }
};

// Инициализация
(function () {
  // Нажатия вне поиска
  document.addEventListener('mouseup', e => {
    if (
      searchInput &&
      searchInput !== e.target &&
      searchCross !== e.target &&
      searchPopup !== e.target &&
      !searchPopup.contains(e.target) &&
      btnSearch !== e.target
    ) {
      closeSearch();
    }
  });

  // Нажатие на поле поиска
  searchArea.addEventListener('click', e => {
    openSearch();
    if (e.target === searchCross) {
      searchInput.value = '';
      searchInput.focus();
    }
    // Создание результатов поиска
    setSearchResults();
    // Добавление отформатированных результатов поиска в массив
    getSearchResults();
  });

  // Иконка поиска
  btnSearch.addEventListener('click', () => {
    const results = document.querySelectorAll('.search__area li');
    if (!searchPopup.classList.contains('open')) return;

    if (!results[0].dataset.date) {
      searchInput.value = '';
      searchInput.focus();
      setSearchResults();
      getSearchResults();
      return;
    }

    const { date } = results[0].dataset;
    renderCalendarWithDate(date);
    closeSearch();
  });

  // Ввод в поле поиска
  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase();
    search();
  });
})();
