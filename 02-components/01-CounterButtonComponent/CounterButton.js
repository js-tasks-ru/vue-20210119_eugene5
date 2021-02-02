export const CounterButton = {
  // Шаблон потребуется отредактировать
  template:
    '<button @click="increment" type="button">{{ currentCount }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    value: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },

  // Компонент должен иметь модель
  data() {
    return {
      currentCount: this.value || this.count,
    };
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increment() {
      if (this.count) {
        this.$emit('increment', ++this.currentCount);
      } else {
        this.$emit('input', ++this.currentCount);
      }
    },
  },
};
