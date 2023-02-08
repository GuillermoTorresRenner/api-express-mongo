<template>
  <q-page>
    <q-card class="q-mx-md">
        <h4 class="text-center text-positive" v-if="!edit">Agregar nuevo usuario</h4>
        <h4 class="text-center text-warning" v-if="edit">Editar nuevo usuario</h4>
    <q-form
      @submit.prevent="createUser"
      class="q-gutter-md"
    >
    <q-card-section>
      <q-input v-model="newUser.nombre" type="text" label="Nombre"  :rules="[ val => val.length >3 || 'Debe ingresar un Nombre' ]" lazy-rules="ondemand"/>
      <q-input v-model="newUser.email" type="email" label="Email"  :rules="[ val => val.length >3 || 'Debe ingresar un Email' ]" lazy-rules="ondemand"/>
    <p class="text-center text-purple q-my-md">Default Password: 123123</p>
      </q-card-section>
      <q-card-section class="text-center">
           <q-btn size="lg" type="submit" color="green" icon="ion-save" v-if="!edit"/>
           <q-btn size="lg"  color="warning" icon="ion-save" @click="editar" v-if="edit"/>
           <q-btn size="lg"  color="grey" icon="ion-close" @click="cancel" v-if="edit" class="q-ml-md"/>
      </q-card-section>
      
    </q-form>
  </q-card>
    
    <q-table
      title="Usuarios"
      :rows="data"
      :columns="columns"
      row-key="_id"
      no-data-label="Sin usuarios que mostrar"
      :filter="filter"
      dense
      separator="cell"
       class="q-mt-xl q-mx-md"

    >
    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="warning"
              icon="ion-create"
              @click="editrUser(props.row)"
              size="sm"
              dense
              class="q-mr-md"
            />
            <q-btn
              color="negative"
              icon="ion-trash"
              @click="deleteUser(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useUser } from 'src/stores/useUser';
import { onMounted, ref } from 'vue';
const $q=useQuasar();
const user=useUser();
const data=ref([]);
const filter=ref("");
const edit=ref(false)
let _id;
const header={headers:{token:user.getToken}};
const columns = [
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'rol', align: 'center', label: 'Rol', field: 'role', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: true },
 ]
 const newUser=ref({nombre:"", email:"", password:"123123"})

function getUsuarios(){
  api.get("/read-user",header)
.then((res)=>{
  console.log(res.data)
  data.value=res.data;
 
})
.catch((e)=>{
  console.log(e.error);
})
}

onMounted(()=>{
  getUsuarios();
}
)

function editrUser(selectedUser){
edit.value=true;
newUser.value.email=selectedUser.email;
newUser.value.nombre=selectedUser.nombre;
_id=selectedUser._id;

}

function editar(){
api.put(`update-user/${_id}`,newUser.value,header)
.then((res)=>{
  $q.notify({
              message:"Usuario Editado",
              caption:res.data.nombre,
              position:"bottom",
              color:"green",
              icon:"ion-create",
              });
              const index=data.value.findIndex(n=> data.value._id===res._id);
              data.value.splice(index,1,newUser.value);
})
.catch((e)=>{
  $q.notify({
              message:"Usuario No Editado",
              caption:res.data.nombre,
              position:"bottom",
              color:"red",
              icon:"ion-create",
              });

})
}

function cancel(){
edit.value=false;
newUser.value={nombre:"", email:"", password:"123123"};
}
function createUser(){
  
  api.post("/create-user",newUser.value,header)
  
  .then((res)=>{
    $q.notify({
              message:"Usuario Creado",
              caption:res.data.nombre,
              position:"bottom",
              color:"green",
              icon:"ion-save",
              });
              data.value.push(newUser.value);
              newUser.value={nombre:"", email:"", password:"123123"}
  })
  .catch((e)=>{
    console.log(e.data)
  })
}

function deleteUser(userSelected){
  $q.dialog({
        title: 'Eliminar Usuario',
        message: `Desea eliminar al usuario: ${userSelected.nombre}?`,
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        api.delete(`/delete-user/${userSelected._id}`,header)
        .then((res)=>{
          const index=data.value.findIndex(item=>item._id===res.data._id);
          data.value.splice(index,1);
            $q.notify({
              message:"Usuario Eliminado",
              position:"bottom",
              color:"green",
              icon:"ion-checkmark",
              

            });
            
        })
        .catch((e)=>{

        })
      })
   
}


</script>