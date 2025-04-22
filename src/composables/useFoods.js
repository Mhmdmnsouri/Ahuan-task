import { ref } from "vue";

const API_URL = "https://ahuan.ir/api/foods";

export function useFoods() {
  const foods = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const normalizeFood = (item) => ({
    id: item.Id,
    title: item.Title,
    description: item.Description,
    price: item.Price,
    category: item.Category,
    image: item.Image,
    c_or_r: item.C_OR_R,
  });

  const fetchFoods = async (type = "T", cat = "test") => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API_URL}?type=${type}&cat=${cat}`);
      const data = await res.json();
      foods.value = Array.isArray(data) ? data.map(normalizeFood) : [];
    } catch (err) {
      error.value = err.message || "خطایی رخ داده است";
    } finally {
      loading.value = false;
    }
  };

  const createFood = async (foodData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`خطا: ${text}`);
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return {};
      }
    } catch (err) {
      throw err;
    }
  };

  const updateFood = async (id, foodData) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`خطا: ${text}`);
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return {};
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteFood = async (id) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`خطا: ${text}`);
      }

      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch (err) {
      throw err;
    }
  };
  return {
    foods,
    loading,
    error,
    fetchFoods,
    createFood,
    updateFood,
    deleteFood,
  };
}
