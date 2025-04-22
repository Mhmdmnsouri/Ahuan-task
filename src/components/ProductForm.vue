<template>
    <form @submit.prevent="submit" class="space-y-4">
        <div>
            <label class="label mb-1">عنوان</label>
            <input v-model="form.Title" class="input input-bordered w-full" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="label mb-1">قیمت</label>
                <input v-model="form.Price" type="number" class="input input-bordered w-full" required />
            </div>
            <div>
                <label class="label mb-1">دسته‌بندی</label>
                <input v-model="form.Category" class="input input-bordered w-full" />
            </div>
        </div>

        <div>
            <label class="label mb-1">C/R</label>
            <input v-model="form.C_OR_R" class="input input-bordered w-full" />
        </div>
        <div>
            <label class="label mb-1">توضیحات</label>
            <textarea v-model="form.Description" class="textarea textarea-bordered w-full" rows="3" />
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary">
                {{ props.food?.id ? 'ذخیره تغییرات' : 'افزودن محصول' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
import { useFoods } from '@/composables/useFoods'

const emit = defineEmits(['submitted'])

const props = defineProps({
    food: {
        type: Object,
        default: null
    }
})

const form = reactive({
    Title: '',
    Description: '',
    Price: null,
    Category: '',
    Image: '',
    C_OR_R: ''
})

const initializeForm = (data = null) => {
    form.Title = data?.title || ''
    form.Description = data?.description || ''
    form.Price = data?.price || null
    form.Category = data?.category || ''
    form.Image = data?.image || ''
    form.C_OR_R = data?.c_or_r || ''
}

watch(
    () => props.food,
    (newVal) => {
        initializeForm(newVal)
    },
    { immediate: true }
)

const { createFood, updateFood } = useFoods()

const submit = async () => {
    try {
        const payload = {
            title: form.Title,
            description: form.Description,
            price: form.Price,
            category: form.Category,
            image: form.Image,
            c_or_r: form.C_OR_R
        }

        if (props.food?.id) {
            await updateFood(props.food.id, payload)
        } else {
            await createFood(payload)
        }

        emit('submitted')
    } catch (e) {
        console.error('خطا:', e)
        alert('خطا در ذخیره محصول')
    }
}
</script>