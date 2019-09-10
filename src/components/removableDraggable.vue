<template>
  <draggable v-bind="$attrs" :list="list" class="draggable-area">
    <div v-for="(item,index) in list" :key="index" class="draggable-item removable"
         @click="removeAt(list,index)">
      {{item}}
    </div>
  </draggable>
</template>

<script>
  export default {
    name: "removableDraggable",
    props: {
      list: {
        type: Array,
        required: true,
      }
    },
    methods: {
      removeAt(arr, index) {
        arr.splice(index, 1);
      }
    },
  }
</script>

<style scoped>

</style>