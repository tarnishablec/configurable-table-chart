<template>
  <div class="configurable-dashboard">
    <div class="parameter-panel">
      <draggable :list="parameters" :group="{name:'parameters',pull:'clone',put:false}" :sort="false"
                 class="draggable-area">
        <div v-for="(item,index) in parameters" :key="index" class="draggable-item">
          {{item}}
        </div>
      </draggable>
    </div>
    <div class="config-panel">
      <removable-draggable :list="xAxises" group="parameters"/>
      <removable-draggable :list="legend" group="parameters"/>
    </div>
    <div class="chart-panel">
      <v-chart :options="options" autoresize/>
    </div>
    <div class="choose-panel">

    </div>
  </div>
</template>

<script>
  import RemovableDraggable from "./removableDraggable";

  export default {
    name: "configurableDashboard",
    components: {RemovableDraggable},
    props: {
      sourceData: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        xAxises: [],
        legend: [],
        chart: {}
      }
    },
    computed: {
      parameters() {
        let source = this.sourceData;
        return ((source && source.length > 0) ? Object.getOwnPropertyNames(source[0]) : []).filter(item => {
          return item !== '__ob__';
        });
      },
      options() {
        let xA = new Map();

        return {
          legend: {
            data: this.legend,
          },
          xAxis: [
            {}
          ],
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>