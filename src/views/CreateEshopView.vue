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
            time: Math.floor(Date.parse(time.value) / 1000),
        }

        console.log('Data yang akan dikirim:', newEshop);
        console.log('JSON yang akan dikirim:', JSON.stringify(newEshop));

        const response = await fetch('/api/eshops', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEshop),
        })

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        // Cek apakah response adalah JSON
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!response.ok) {
            // Coba ambil error message dari server
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage += ` - ${JSON.stringify(errorData)}`;
                } else {
                    const errorText = await response.text();
                    errorMessage += ` - ${errorText}`;
                }
            } catch (e) {
                console.log('Tidak bisa membaca error response:', e);
            }
            throw new Error(errorMessage);
        }

        let data;
        try {
            data = await response.json();
        } catch (e) {
            console.log('Response bukan JSON, menggunakan text:', e);
            data = await response.text();
        }
        
        console.log('Data response:', data);
        alert('Data berhasil disimpan!');
        
        // Reset form
        name.value = '';
        place.value = '';
        time.value = '';
        
        router.push('/');
    } catch (error) {
        console.error('Full error details:', error);
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        alert(`Gagal menyimpan data: ${errorMessage}`);
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