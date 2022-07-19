<template>
  <q-page class="row items-center justify-evenly">
    {{entities}}
  </q-page>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue';
import { Entity, entityApiKey } from 'boot/feathers';
import { uid } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const entityApi = inject(entityApiKey)
    const entities = ref<Entity[]>([])
    async function doSomething () {
      await entityApi?.create({
        id: uid(),
        name: 'new entity '
      })

      const result = await entityApi?.find()
      if (Array.isArray(result)) {
        entities.value = result
        console.log(entities.value)
      }
    }
    onMounted(() => {
      doSomething()
    })
    return { entities };
  }
});
</script>
