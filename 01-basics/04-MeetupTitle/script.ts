import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const length = 5;

type Meetup = {
  id: string;
  title: string;
  isLoaded: boolean;
};

type AppData = {
  meetupList: Array<Meetup>;
  selectedId: string;
};

const App = defineComponent({
  name: 'VueMeetupTitleApp',
  data(): AppData {
    return {
      meetupList: [],
      selectedId: '',
    };
  },
  watch: {
    async selectedId(newValue, oldValue) {
      const selectedMeetup = this.meetupList[newValue];

      if (!selectedMeetup) {
        this.selectedId = oldValue || '1';
        return;
      }

      if (selectedMeetup.isLoaded) {
        return;
      }

      const result = await fetchMeetupById(newValue);

      this.meetupList[this.selectedId].title = result?.title || 'Такой митап отсутствует';
      this.meetupList[this.selectedId].isLoaded = true;
    },
  },

  computed: {
    selectedMeetupTitle(): string {
      return this.meetupList[this.selectedId]?.title || '...loading';
    },
  },

  created() {
    this.meetupList = new Array(length).fill('').map((_, index) => ({
      id: index + 1,
      title: '',
      isLoaded: false,
    }));
    this.selectedId = '1';
  },
});

const app = createApp(App);

app.mount('#app');
