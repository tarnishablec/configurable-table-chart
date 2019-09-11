<template>
  <div class="configurable-dashboard">
    <div class="parameter-panel">
      <draggable
          :list="parameters"
          :group="{name:'parameters',pull:'clone',put:false}"
          :sort="false"
          class="draggable-area"
      >
        <div v-for="(item,index) in parameters" :key="index" class="draggable-item">{{item}}</div>
      </draggable>
    </div>
    <div class="config-panel">
      <draggable
          :list="drag0"
          group="parameters"
          class="draggable-area"
          style="min-height: 30px"
          @clone="onlyOne"
      >
        <div v-for="(item,index) in drag0" :key="index" class="draggable-item">{{item}}</div>
      </draggable>
      <yard-draggable :list="drag1" group="parameters"/>
      <dimension-draggable :list="drag2" group="parameters"/>
    </div>
    <div class="chart-panel">
      <v-chart v-if="drag0.length >= 1" :options="options" autoresize/>
    </div>
    <div class="choose-panel"></div>
  </div>
</template>

<script>
  import yardDraggable from "./yardDraggable";
  import DimensionDraggable from "./dimensionDraggable";
  import _ from "lodash";
  import {sumByIndex} from '@/utils/dataUtils'

  export default {
    name: "configurableDashboard",
    components: {DimensionDraggable, yardDraggable},
    props: {
      sourceData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        drag0: [],
        drag1: [],
        drag2: [],
        chart: {}
      };
    },
    computed: {
      legend: {
        get() {
          return this.drag0[0];
        }
      },
      parameters() {
        let source = this.sourceData;
        return (source && source.length > 0
                ? Object.getOwnPropertyNames(source[0])
                : []
        ).filter(item => {
          return item !== "__ob__";
        });
      },
      options() {
        let fieldStore = this.sourceData.reduce((acc, cur) => {
          [this.drag0, this.drag1].forEach(dr => {
            dr.forEach(d => {
              acc.set(d, _.uniq((acc.get(d) ? acc.get(d) : []).concat(cur[d])))
            });
          });
          return acc;
        }, new Map());
        console.log(fieldStore);
        let xA = this.drag0.reduce((acc, cur) => {
          acc.push({
            type: 'category',
            data: fieldStore.get(cur),
          });
          return acc;
        }, []);


        console.log(xA);
        let le = this.drag1.reduce((acc, cur) => acc.concat(fieldStore.get(cur)), []).flat();

        console.log(le);
        let dataWarehouse = this.sourceData.reduce((acc, cur) => {
          this.drag0.forEach(d => {
            acc.set(cur[d], (acc.get(cur[d]) ? acc.get(cur[d]) : []).concat(cur));
          });
          return acc;
        }, new Map());
        console.log(dataWarehouse);

        let dataMarket = new Map();

        dataWarehouse.forEach((v, k) => {
          this.drag2.forEach(u => {
            this.drag1.forEach(d => {
              fieldStore.get(d).forEach(f => {
                dataMarket.set(`${k},${d},${f},${u}`, sumByIndex(v, d, f, u));
              })
            });
          })
        });

        console.log(dataMarket);

        let se = [];

        this.drag1.forEach(d => {
          let stack = d;
          fieldStore.get(d).forEach(f => {
            se.push({
              name: f,
              type: 'bar',
              stack: stack,
              data: (() => {
                let res = [];
                xA.forEach(x => {
                  x.data.forEach(xd=>{
                    console.log(`${xd},${stack},${f},${this.drag2[0]}`);
                    res.push(dataMarket.get(`${xd},${stack},${f},${this.drag2[0]}`))
                  })
                });
                return res;
              })()
            })
          });

          return se;
        });
        console.log(se);
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: le,
          },
          xAxis: xA,
          yAxis: [
            {
              type: 'value',
            }
          ],
          series: se,
        };
      }
    },
    methods: {
      onlyOne(evt) {
        console.log(evt);

      }
    }
  };
</script>

<style lang="scss" scoped>
</style>