<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>Нагрузочное тестирование /items</h2>

    <div style="margin-bottom: 10px;">
      <label>
        Количество запросов:
        <input type="number" v-model.number="requestsCount" min="1" />
      </label>
    </div>

    <div style="margin-bottom: 10px;">
      <label>
        Задержка между запросами (мс):
        <input type="number" v-model.number="delayMs" min="0" />
      </label>
    </div>

    <button @click="startTest" :disabled="running" style="margin-bottom: 20px;">
      {{ running ? 'Тест идет...' : 'Старт нагрузочного теста' }}
    </button>

    <div>
      <p>Отправлено запросов: {{ sent }}</p>
      <p>Успешно: {{ success }}</p>
      <p>Ошибки: {{ error }}</p>
      <p>Время выполнения: {{ elapsed }} мс</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const requestsCount = ref(10);
const delayMs = ref(100);
const sent = ref(0);
const success = ref(0);
const error = ref(0);
const elapsed = ref(0);
const running = ref(false);

async function startTest() {
  sent.value = 0;
  success.value = 0;
  error.value = 0;
  elapsed.value = 0;
  running.value = true;

  const startTime = performance.now();

  for (let i = 0; i < requestsCount.value; i++) {
    try {
      await axios.get('http://localhost:3001/items');
      success.value++;
    } catch (err) {
      error.value++;
    }
    sent.value++;
    await new Promise(resolve => setTimeout(resolve, delayMs.value));
  }

  elapsed.value = Math.round(performance.now() - startTime);
  running.value = false;
}
</script>

<style scoped>
input {
  width: 80px;
  margin-left: 5px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
