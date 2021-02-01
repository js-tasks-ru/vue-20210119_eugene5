import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
    };
  },

  async mounted() {
    // Требуется получить данные митапа с API
    await this.getRawMeetup();
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return null;
      }

      return {
        ...this.rawMeetup,
        agenda: this.rawMeetup.agenda.map((item) => {
          return {
            ...item,
            title: item.title ? item.title : agendaItemTitles[item.type],
            icon: `/assets/icons/icon-${agendaItemIcons[item.type]}.svg`,
          };
        }),
      };
    },

    meetupCover() {
      if (this.meetup.imageId) {
        return { '--default-cover': `url(${getMeetupCoverLink(this.meetup)})` };
      }

      return null;
    },

    dateTime() {
      const date = new Date(this.meetup.date);

      return date.toISOString().split('T')[0];
    },

    localDate() {
      const date = new Date(this.meetup.date);
      return date.toLocaleString(navigator.language, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    async getRawMeetup() {
      const response = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
      this.rawMeetup = await response.json();
    },
  },
});
