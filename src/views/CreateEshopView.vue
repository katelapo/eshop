<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
    try {
        // Validasi input
        if (!name.value || !place.value || !time.value) {
            alert('Semua field harus diisi!');
            return;
        }

        const newEshop = {
            name: name.value,
            place: place.value,
            time: Math.floor(Date.parse(time.value) / 1000), // Pastikan integer
        }

        const response = await fetch('/api/eshops', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Header penting!
            },
            body: JSON.stringify(newEshop), // JSON.stringify di sini
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        console.log('Data berhasil disimpan:', data);
        
        // Reset form
        name.value = '';
        place.value = '';
        time.value = '';
        
        router.push('/');
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Gagal menyimpan data. Silakan coba lagi.');
    }
}
</script>

<template>
    <h1>Buat Eshop Baru</h1>
    <form @submit.prevent="saveData">
        <div>
            <label for="name">Nama</label>
            <input 
                id="name"
                type="text" 
                v-model="name"
                required
            >
        </div>
        <div>
            <label for="place">Tempat</label>
            <input 
                id="place"
                type="text" 
                v-model="place"
                required
            >
        </div>
        <div>
            <label for="time">Waktu</label>
            <input 
                id="time"
                type="datetime-local" 
                v-model="time"
                required
            >
        </div>

        <div>
            <button type="submit">Simpan Eshop</button>
        </div>
    </form>
</template>