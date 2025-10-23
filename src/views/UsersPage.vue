<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="users.length < 11"
      :items="users"
    >
      <template v-slot:top>
        <v-toolbar flat color="blue">
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-user-multiple" size="x-small" start></v-icon>

            Registered users
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a User"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-user" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite user`"
      :title="`${isEditing ? 'Edit' : 'Add'} a User`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formModel.name" label="Name"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.email" label="Email"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.password" label="Password"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.password_confirmation" label="Confirm Password"></v-text-field>
          </v-col>

        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import { onMounted, ref, shallowRef, toRef } from 'vue'
  import api from '../services/api'

  function createNewRecord () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  }

  const users = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)

  const headers = [
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  onMounted(() => {
    reset()
    getUsers()
  })

  function add () {
    formModel.value = createNewRecord()
    dialog.value = true
  }

  function edit (id) {
    const found = users.value.find(user => user.id === id)

    formModel.value = {
      id: found.id,
      name: found.name,
      email: found.email,
      password: found.password,
      password_confirmation: found.password_confirmation,
    }

    dialog.value = true
  }

  function remove (id) {
    const index = users.value.findIndex(user => user.id === id)
    users.value.splice(index, 1)
  }

  async function getUsers(){
    try{
        const response = await api.get('/getUser')
        users.value = response.data.User
    }
    catch(error){
        console.error('Failed to fetch Users', error.response?.data)
    }
  }

  async function save () {
    if (isEditing.value) {
      const index = users.value.findIndex(user => user.id === formModel.value.id)
      try{
        const response = await api.post('/register', formModel.value);
        alert('Save Successful!');
        router.push('/welcome');
      }
      catch(error){
        console.error('Failed to save User', error.response?.data);
      }
    //   users.value[index] = formModel.value
    } else {
      formModel.value.id = users.value.length + 1
      users.value.push(formModel.value)
    }

    dialog.value = false
  }

  function reset () {
    dialog.value = false
    formModel.value = createNewRecord()
    users.value = []
  }
</script>