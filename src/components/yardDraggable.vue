<template>
  <draggable v-bind="$attrs" :list="list" class="yard draggable-area">
    <div v-for="(item,index) in list" :key="index" class="draggable-item removable">
      {{item}}
    </div>
  </draggable>
</template>

<script>
  export default {
    name: "yardDraggable",
    props: {
      list: {
        type: Array,
        required: true,
      }
    },
    methods: {

    },
  }
</script>

<style scoped>

</style>