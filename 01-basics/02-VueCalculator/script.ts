import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'VueCalculatorApp',
  data() {
    return {
      valueFirst: 0,
      valueSecond: 0,
      action: 'sum',
    };
  },
  methods: {
    sum(valueFirst: number, valueSecond: number) {
      return valueFirst + valueSecond;
    },
    subtract(valueFirst: number, valueSecond: number) {
      return valueFirst - valueSecond;
    },
    multiply(valueFirst: number, valueSecond: number) {
      return valueFirst * valueSecond;
    },
    divide(valueFirst: number, valueSecond: number) {
      return valueFirst / valueSecond;
    },
  },
  computed: {
    result: function (): string {
      const func = this[this.action];

      if (typeof func !== 'function') {
        return 'Выберете математическую операцию';
      }

      const result = func(this.valueFirst, this.valueSecond);

      return isNaN(result)
        ? 'Математически не определено'
        : result.toLocaleString('ru', {
            maximumFractionDigits: 2,
          });
    },
  },
});

const app = createApp(App);

app.mount('#app');
