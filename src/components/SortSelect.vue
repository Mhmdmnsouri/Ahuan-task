<template>
    <div class="form-control w-full max-w-xs mb-4">
        <select class="select select-bordered pr-8" v-model="sortOrder" @change="emitSort">
            <option value="">مرتب‌سازی بر اساس عنوان</option>
            <option value="asc">صعودی</option>
            <option value="desc">نزولی</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const sortOrder = ref('')
const emit = defineEmits(['update:modelValue'])

const emitSort = () => {
    emit('update:modelValue', sortOrder.value)
}
</script>