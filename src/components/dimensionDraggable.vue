<template>
  <draggable v-bind="$attrs" :list="list" class="draggable-area dimension">
    <div v-for="(item,index) in list" :key="index" class="draggable-item">
      {{item}}
    </div>
  </draggable>
</template>

<script>
  export default {
    name: "dimensionDraggable",
    props: {
      list: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>