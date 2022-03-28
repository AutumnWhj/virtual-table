<template>
  <div id="app">
    <h1 class="title">homework--wanghuajin</h1>
    <acho-virtual-table
      class="virtual-table"
      :columns="columns"
      :dataSource="dataSource"
    />
  </div>
</template>
<script>
import AchoVirtualTable from './components/AchoVirtualTable/index.vue'
import { nanoid } from 'nanoid'
import { request } from './utils'
export default {
  name: 'App',
  components: { AchoVirtualTable },
  computed: {
    columns({ dataSource = [], updateRow, columnConfig = [], cacheSource }) {
      const data = [...dataSource]
      return columnConfig.map((prop) => {
        return {
          label: prop,
          prop,
          width: 100,
          header: {
            slot: 'FilterHeader',
            actions: {
              up: function (done = function () {}) {
                updateRow(data.sort(done))
              },
              down: function (done = function () {}) {
                updateRow(data.sort(done))
              }
            }
          },
          caption: {
            slot: 'SearchCaption',
            value: '',
            action: function (done = function () {}) {
              const { value, prop } = done() || {}
              if (value) {
                updateRow(
                  data.filter((item) => {
                    return item[prop]
                      .toUpperCase()
                      .includes(value.toUpperCase())
                  })
                )
              } else {
                updateRow(cacheSource)
              }
            }
          }
        }
      })
    }
  },
  data() {
    return {
      dataSource: [],
      columnConfig: [],
      cacheSource: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    updateRow(value = []) {
      this.dataSource = value
    },
    async initData() {
      const { data } = await request({
        url: 'http://localhost:4000/api/virtualTable'
      })
      const { data: innerData } = JSON.parse(data) || {}
      const { columnConfig, tableData } = innerData || {}

      this.dataSource = tableData.map((item) => {
        return {
          ...item,
          id: nanoid()
        }
      })
      this.cacheSource = [...this.dataSource]
      this.columnConfig = columnConfig
    }
  }
}
</script>
<style scoped>
.virtual-table {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.title {
  text-align: center;
}
</style>
