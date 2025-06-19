<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const router = useRouter()

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
  const newEshop = JSON.stringify({
    name: name.value,
    place: place.value,
    time: Date.parse(time.value) / 1000,
  })

  const response = await fetch('/api/eshops', {
    method: 'POST',
    body: newEshop,
  })

  if (response.ok) {
    router.push('/')
  }
}
</script>

<template>
  <main class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
    <!-- Background Glow Animation -->
    <div class="absolute inset-0 -z-10 animate-gradient opacity-30"></div>

    <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-8 w-full max-w-xl text-white">
      <h1 class="text-3xl font-bold text-center mb-6">Buat Eshop Baru</h1>
      <form @submit.prevent="saveData" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">Nama</label>
          <Input type="text" v-model="name" class="w-full text-black" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Tempat</label>
          <Input type="text" v-model="place" class="w-full text-black" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Waktu</label>
          <Input type="datetime-local" v-model="time" class="w-full text-black" />
        </div>
        <div class="pt-4 text-center">
          <Button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Simpan
          </Button>
        </div>
      </form>
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
