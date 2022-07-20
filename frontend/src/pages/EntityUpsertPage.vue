<template>
  <q-dialog v-model="open">
    <q-card class="full-width" style="max-width: 540px;">
      <q-card-section>
        <div class="text-h6">{{ entityId ? 'Update' : 'Delete' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled label="Name" v-model="name" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" icon="reply" color="primary" :to="{ name: 'entities' }" />
        <q-btn label="Save" icon="save" color="positive" @click="upsert" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { uid, useQuasar } from 'quasar';
import { entityApiKey, EntityModel } from 'src/boot/feathers';
import { defineComponent, computed, ref, watch, inject, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  props: {
    id: String
  },
  setup (props) {
    const quasar = useQuasar()
    const router = useRouter()
    const entityApi = inject(entityApiKey)
    const state = reactive<EntityModel>({
      id: '',
      name: ''
    });
    const { id: entityId, name } = toRefs(state);

    const _id = computed(() => props.id)
    async function init () {
      let result: EntityModel | undefined
      if (_id.value) {
        result = await entityApi?.get(_id.value)
      }
      if (!result) {
        entityId.value = ''
        name.value = ''
      } else {
        entityId.value = result.id
        name.value = result.name
      }
    }
    watch(() => _id.value, init, { immediate: true })

    async function create() {
      try {
        await entityApi?.create({
          id: uid(),
          name: name.value
        })
        quasar.notify({
          color: 'positive',
          message: 'Say Hello to the new Entity'
        })
      } catch {
        quasar.notify({
          color: 'negative',
          message: 'Ops! unable to create'
        })
      }
    }
    async function update(id: EntityModel['id']) {
      try {
        await entityApi?.update(id, {
          id: id,
          name: name.value
        })
        quasar.notify({
          color: 'positive',
          message: 'Old Entity, New Name!'
        })
      } catch {
        quasar.notify({
          color: 'negative',
          message: 'Ops! unable to update'
        })
      }
    }

    return {
      open: ref(true),
      entityId,
      name,
      
      async upsert() {
        if (entityId.value) {
          await update(entityId.value)
        } else {
          await create()
        }
        router.push({ name: 'entities' })
      }
    };
  }
});
</script>
