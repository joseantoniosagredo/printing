
<template>
  <div>
    <v-text-field :name="label" v-if="type==='string'" :value="value" @input="$emit('input',$event)" :label="label"></v-text-field>
    <v-text-field
    :name="label"
      v-else-if="type==='number'"
      type="number"
      :value="value"
      @input="$emit('input',$event)"
      :label="label"
    />
    <v-text-field
    :name="label"
      v-else-if="type==='date'"
      type="date"
      :value="value"
      @input="$emit('input',$event)"
      :label="label"
    />
    <v-select :name="label" v-else-if="Array.isArray(type)" :items="type" :label="label" @input="$emit('input',$event)" :value="value"></v-select>
  </div>
</template>

<script>
//const types = ['text','number','array']
export default {
  props: ["type", "value", "label"]
};
</script>