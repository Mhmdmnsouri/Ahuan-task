<template>
    <dialog id="product_modal" class="modal">
        <div class="modal-box">
            <header class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-lg text-center">
                    {{ food?.id ? 'ویرایش محصول' : 'محصول جدید' }}
                </h3>
                <div class="modal-action mt-0">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost">
                            <Icon icon="solar:close-circle-linear" width="24" height="24" />
                        </button>
                    </form>
                </div>
            </header>
            <ProductForm :food="food" @submitted="handleSubmitted" />
        </div>
    </dialog>
</template>

<script setup>
import { Icon } from "@iconify/vue"
import ProductForm from '@/components/ProductForm.vue'

const emit = defineEmits(['submitted'])

const props = defineProps({
    food: {
        type: Object,
        default: null
    }
})

const handleSubmitted = () => {
    document.getElementById('product_modal')?.close()
    emit('submitted')
}
</script>