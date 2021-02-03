export const CounterButton = {
  // Шаблон потребуется отредактировать
  template:
    '<button @click="increment" type="button">{{ this.count }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    },
  },
};
