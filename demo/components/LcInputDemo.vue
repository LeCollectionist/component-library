<template>
  <div class="lc-input">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcInput = !lcInput">
      LcInput
    </h2>

    <div v-if="lcInput" class="w-full">
      <lc-input
        v-model="formInput[0].model"
        placeholder="Ecrit dedans :)"
        label="Prénom"
        name="firstname"
      />
      <pre>{{ formInput[0].model }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcInputDemo',
  data() {
    return {
      lcInput: false,
      formInput: [{
        model: '',
        inputType: 'input',
        attr: {
          inputClass: 'w-full lc-col',
          placeholder: 'Ecrit dedans :)',
          label: 'Nom',
          name: 'lastname',
          rules: 'required',
        },
      }],
    }
  },
})
</script>
