<template>
    <div class="form-control w-full max-w-xs mb-4">
        <input type="text" class="input input-bordered w-full" v-model="searchTerm" @input="emitSearch"
            placeholder="جستجو بر اساس عنوان..." />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const searchTerm = ref('')
const emit = defineEmits(['update:modelValue'])

const emitSearch = () => {
    emit('update:modelValue', searchTerm.value)
}
</script>