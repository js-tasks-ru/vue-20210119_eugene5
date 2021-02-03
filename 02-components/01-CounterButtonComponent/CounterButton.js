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
      currentCount: this.count || this.value,
    };
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increment() {
      ++this.currentCount;
      this.$emit('increment', this.currentCount);
      this.$emit('input', this.currentCount);
    },
  },
};
