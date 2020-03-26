<template>
  <div @click="$emit('click',$event)" :class='{[name]:true}' ></div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
div {
  background-position: center center;
  background-repeat: no-repeat;
  height: 25px;
  width:25px;
  cursor: pointer;
  display:inline-block
}
.visibility {
  background-image: url("~@/assets/icons/visibility.svg")
}
.visibility-off {
  background-image: url("~@/assets/icons/visibility_off.svg")
}
</style>
