<template>
  <q-page class="row items-center justify-evenly">
    <q-table
      title="Treats"
      :rows="entities"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" class="full-width" label="Create New Entity" icon="create" :to="{ name: 'create-entity' }"></q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn class="q-mx-xs" color="primary" size="sm" round icon="edit" :to="{ name: 'update-entity', params: { id: props.value } }"></q-btn>
          <q-btn class="q-mx-xs" color="negative" size="sm" round icon="delete" @click="remove(props.value)"></q-btn>
        </q-td>
      </template>
    </q-table>
    <router-view />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { EntityModel } from 'boot/feathers';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { useEntitiesStore } from 'src/stores/entities';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const quasar = useQuasar()
    const route = useRoute()
    const columns = computed(() => ([
      { name: 'id', label: 'Id', field: 'id', sortable: true, align: 'center' },
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'actions', label: 'Actions', field: 'id', align: 'center' }
    ] as never[]))

    const entitiesStore = useEntitiesStore()
    const entities = ref<EntityModel[]>([])
    
    async function init () {
      const result = await entitiesStore.find({ query: {} })
      if (Array.isArray(result)) {
        entities.value = result
      } else {
        entities.value = result.data
      }
    }
    watch(() => route.name, () => {
      if (route.name === 'entities') {
        init()
      }
    }, { immediate: true })

    return {
      columns,
      entities,
      remove(id: EntityModel['id']) {
        const index = entities.value.findIndex(e => e.id === id)
        if (index === -1) {
          return;
        }
        quasar.dialog({
          color: 'negative',
          ok: 'Yes',
          cancel: 'No',
          message: 'Do you sure?'
        }).onOk(async () => {
          try {
            await entitiesStore.remove(id)
            quasar.notify({
              color: 'positive',
              message: 'Bye Bye Entity!'
            })
            entities.value.splice(index, 1)
          } catch {
            quasar.notify({
              color: 'negative',
              message: 'Ops! unable to delete'
            })
          }
        })
      }
    };
  }
});
</script>
