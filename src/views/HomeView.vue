<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Eshop {
  id: number;
  name: string;
  place: string;
  time: string;
}

const eshops = ref<Eshop[]>([]);

const fetchEshops = async () => {
  const response = await fetch('/api/eshops')
  const data = await response.json()
  eshops.value = data
}

onMounted(() => {
  fetchEshops()
})

</script>

<template>
  <main>
    <div>daftar eshop</div>

     <div>
      <RouterLink to="/eshop">Buat Eshop</RouterLink>
    </div>

    <div>
      <ul>
        <li v-for="eshop in eshops" :key="eshop.id">
          <div>{{ eshop.name }}</div>
          <div>{{ eshop.place }}</div>
          <div>{{ eshop.time }}</div>
        </li>
      </ul>
    </div>
  </main>
</template>
