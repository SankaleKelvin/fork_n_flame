import { defineStore } from 'pinia'
import { ref, shallowRef, toRef } from 'vue'
import api from '../services/api'

export const useRestaurantStore = defineStore('restaurant', () => {
  function createNewRecord() {
    return {
      name: '',
      address: '',
      description: '',
    }
  }

  const restaurants = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)

  function add() {
    formModel.value = createNewRecord()
    dialog.value = true
  }

  function edit(id) {
    const found = restaurants.value.find((restaurant) => restaurant.id === id)

    formModel.value = {
      id: found.id,
      name: found.name,
      address: found.address,
      description: '',
    }

    dialog.value = true
  }

  async function remove(id) {
    //Delete Function
    try {
      await api.delete(`/deleteRestaurant/${id}`)
      location.reload()
    } catch (error) {
      console.error('Failed to Delete Restaurant.', error?.response?.message)
    }
  }

  async function save() {
    if (isEditing.value) {
      //Update Function
      try {
        await api.post(`/updateRestaurant/${formModel.value.id}`, formModel.value)
        location.reload()
      } catch (error) {
        console.error('Failed to Save Restaurant.', error?.response?.message)
      }
    } else {
      //Save Function
      try {
        await api.post('/saveRestaurant', formModel.value)
        location.reload()
      } catch (error) {
        console.error('Failed to Save Restaurant.', error?.response?.message)
      }
    }

    dialog.value = false
  }

  function reset() {
    dialog.value = false
    formModel.value = createNewRecord()
    restaurants.value = []
  }

  async function getRestaurants() {
    try {
      const response = await api.get('/getRestaurant')
      restaurants.value = response.data.Restaurant
    } catch (error) {
      console.error('Failed to fetch Restaurants', error?.response?.message)
    }
  }

  return {
    restaurants,
    formModel,
    isEditing,
    dialog,
    add,
    edit,
    remove,
    save,
    reset,
    getRestaurants

  }
})
