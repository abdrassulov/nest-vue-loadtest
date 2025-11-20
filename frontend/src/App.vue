<template>
  <div class="container">
    <h1>Нагрузочный тест /items</h1>

    <div class="form">
      <label>
        Количество запросов:
        <input type="number" v-model.number="requestsCount" min="1" />
      </label>
      <label>
        Задержка между запросами (мс):
        <input type="number" v-model.number="delayMs" min="0" />
      </label>
      <button @click="startTest" :disabled="running">
        {{ running ? "Тест идет..." : "Старт нагрузочного теста" }}
      </button>
    </div>

    <div class="stats" v-if="running || completed > 0">
      <p>Отправлено запросов: {{ sent }}</p>
      <p>Успешно: {{ success }}</p>
      <p>Ошибки: {{ error }}</p>
      <p>Время выполнения: {{ elapsedTime }} мс</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const requestsCount = ref(10);
    const delayMs = ref(100);
    const sent = ref(0);
    const success = ref(0);
    const error = ref(0);
    const running = ref(false);
    const startTime = ref(0);
    const completed = ref(0);
    const elapsedTime = ref(0);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const startTest = async () => {
      sent.value = 0;
      success.value = 0;
      error.value = 0;
      completed.value = 0;
      elapsedTime.value = 0;
      running.value = true;
      startTime.value = performance.now();

      for (let i = 0; i < requestsCount.value; i++) {
        sent.value++;
        fetch("http://localhost:3001/items")
          .then(res => {
            if (res.ok) success.value++;
            else error.value++;
          })
          .catch(() => error.value++)
          .finally(() => {
            completed.value++;
            elapsedTime.value = Math.round(performance.now() - startTime.value);
          });

        if (delayMs.value > 0) await sleep(delayMs.value);
      }

      // Ждем, пока все завершатся
      const waitForCompletion = () =>
        new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (completed.value >= requestsCount.value) {
              clearInterval(interval);
              resolve();
              running.value = false;
            }
          }, 50);
        });

      await waitForCompletion();
    };

    return {
      requestsCount,
      delayMs,
      sent,
      success,
      error,
      running,
      elapsedTime,
      startTest,
      completed,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 0.5rem;
  cursor: pointer;
}
.stats {
  margin-top: 2rem;
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
}
</style>
