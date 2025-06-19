<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Eshop {
  id: string
  name: string
  place: string
  time: string
}

const eshops = ref<Eshop[]>([])

const fetchEshops = async () => {
  const response = await fetch('/api/eshops')
  const data = await response.json()
  eshops.value = data
}

onMounted(() => {
  fetchEshops()
})

const removeEshop = async (id: string) => {
  const response = await fetch(`/api/eshops/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    fetchEshops()
  }
}
</script>

<template>
  <main class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Background Glow Animation -->
    <div class="absolute inset-0 -z-10 animate-gradient opacity-30"></div>

    <h1 class="text-4xl font-bold text-white mb-6">Daftar Eshop</h1>

    <RouterLink
      to="/eshop"
      class="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Buat Eshop
    </RouterLink>

    <div class="grid gap-8 w-full px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <div
        v-for="eshop in eshops"
        :key="eshop.id"
        class="bg-white/10 backdrop-blur-md text-white rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-blue-500/50 transition"
      >
        <h2 class="text-2xl font-semibold mb-2">{{ eshop.name }}</h2>
        <p class="mb-1 text-gray-200">Tempat: {{ eshop.place }}</p>
        <p class="mb-4 text-gray-300">
          Tanggal: {{ new Date(Number(eshop.time) * 1000).toLocaleString() }}
        </p>
        <div class="flex justify-between">
          <RouterLink :to="`/eshop/${eshop.id}`" class="text-blue-400 hover:underline">Edit</RouterLink>
          <button @click="removeEshop(eshop.id)" class="text-red-400 hover:underline">Hapus</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background: linear-gradient(270deg, #1e3a8a, #9333ea, #06b6d4);
  background-size: 600% 600%;
  animation: gradient 10s ease infinite;
}
</style>
