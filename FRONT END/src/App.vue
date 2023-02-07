<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useUser } from "./stores/useUser";
const user=useUser()
onMounted(()=>{
  user.sesionActiva();
})
</script>
