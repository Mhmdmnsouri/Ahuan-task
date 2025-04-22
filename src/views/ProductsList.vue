<template>
    <div class="p-6 ">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">لیست محصولات</h1>
        </div>

        <div v-if="loading" class="flex justify-center">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-if="error" class="alert alert-error shadow-lg mb-4">
            <div class="flex gap-2 items-center">
                <Icon icon="solar:close-circle-linear" width="24" height="24" />
                <span>{{ error || "خطا در نمایش اطلاعات " }}</span>
            </div>
        </div>

        <div v-if="!loading && !error">
            <div class="flex justify-between mb-4">
                <div class="flex gap-4 w-1/2">
                    <SearchInput v-model="searchQuery" />
                    <SortSelect v-model="sortOrder" />
                </div>
                <button class="btn btn-primary" @click="openCreateModal">افزودن محصول جدید</button>

            </div>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead class="bg-base-200">
                        <tr>
                            <th>عنوان</th>
                            <th>قیمت</th>
                            <th>دسته‌بندی</th>
                            <th>C/R</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="food in filteredFoods" :key="food.id">
                            <td>{{ food.title }}</td>
                            <td>{{ food.price }}</td>
                            <td>{{ food.category }}</td>
                            <td>{{ food.c_or_r }}</td>
                            <td>{{ food.description }}</td>
                            <td class="flex gap-2 justify-end">
                                <button @click="openEditModal(food)" class="btn btn-sm btn-info">ویرایش</button>
                                <button @click="deleteFoodHandler(food.id)" class="btn btn-sm btn-error">حذف</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="!loading && filteredFoods.length === 0" class="text-center mt-16 text-gray-500 py-4">
            محصولی با این عنوان یافت نشد.
        </div>
        <ProductModal :food="selectedFood" @submitted="fetchFoods()" />
        <dialog id="confirm_modal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">آیا مطمئن هستید؟</h3>
                <p class="py-4">آیا واقعاً می‌خواهید این محصول را حذف کنید؟</p>
                <div class="modal-action">
                    <form method="dialog" class="flex gap-2">
                        <button class="btn">لغو</button>
                        <button class="btn btn-error" @click.prevent="confirmDelete">بله، حذف شود</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from "@iconify/vue"
import { useFoods } from '@/composables/useFoods'
import ProductModal from '@/components/ProductModal.vue'
import SearchInput from '@/components/SearchInput.vue'
import SortSelect from '@/components/SortSelect.vue'


const { foods, fetchFoods, deleteFood, loading, error } = useFoods()
const router = useRouter()

const selectedFood = ref(null)
const deleteId = ref(null)
const searchQuery = ref('')
const sortOrder = ref('')

const openCreateModal = () => {
    selectedFood.value = null
    document.getElementById('product_modal')?.showModal()
}

const openEditModal = (food) => {
    selectedFood.value = { ...food }
    document.getElementById('product_modal')?.showModal()
}

const deleteFoodHandler = (id) => {
    deleteId.value = id
    document.getElementById('confirm_modal')?.showModal()
}

const confirmDelete = async () => {
    if (!deleteId.value) return
    try {
        await deleteFood(deleteId.value)
        fetchFoods()
    } catch (err) {
        console.error('خطا در حذف محصول:', err)
    } finally {
        deleteId.value = null
        document.getElementById('confirm_modal')?.close()
    }
}

const filteredFoods = computed(() => {
    let result = [...foods.value]

    if (searchQuery.value.trim()) {
        result = result.filter(food =>
            food.title.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
        )
    }

    if (sortOrder.value === 'asc') {
        result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder.value === 'desc') {
        result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
})



onMounted(() => {
    fetchFoods()
})
</script>