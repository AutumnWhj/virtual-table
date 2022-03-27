<template>
  <div
    class="acho-table"
    :style="{ width: width + 'px', height: height + 'px' }"
    @scroll="handleBodyScrollLeft"
  >
    <div class="table-container" :style="{ width: containerWidth + 'px' }">
      <div :style="{ transform }" class="table-header">
        <acho-table-header :columns="visibleColumns" ref="cnTableHeader">
          <template v-slot:colcaption="slotProps">
            <slot name="colcaption" v-bind="slotProps"> </slot>
          </template>
          <template v-slot:header="slotProps">
            <slot name="header" v-bind="slotProps"> </slot>
          </template>
        </acho-table-header>
      </div>
      <div :style="{ transform }">
        <acho-table-body
          v-if="dataSource.length"
          :columns="visibleColumns"
          :dataSource="dataSource"
          @hook:mounted="calculateTableWidth"
        >
          <template v-slot:body="slotProps">
            <slot name="body" v-bind="slotProps"> </slot>
          </template>
        </acho-table-body>
      </div>
    </div>
    <slot name="loading"></slot>
    <div v-if="!dataSource.length" class="acho-table-data-empty">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script>
import AchoTableHeader from './TableHeader.vue'
import AchoTableBody from './TableBody.vue'

export default {
  name: 'AchoTable',
  components: {
    AchoTableHeader,
    AchoTableBody
  },
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      itemWidth: 100,
      scrollLeft: 0,
      start: 0,
      end: 2,
      transform: ''
    }
  },
  computed: {
    containerWidth({ columns, itemWidth }) {
      return columns.length * itemWidth
    },
    visibleColumns({ columns }) {
      return columns.slice(
        Math.max(this.start, 0),
        Math.min(this.end, columns.length)
      )
    }
  },
  methods: {
    handleBodyScrollLeft(event) {
      const scrollLeft = event.target.scrollLeft
      let start = Math.floor(scrollLeft / this.itemWidth)

      this.start = Math.max(start, 0)
      this.end = this.start + this.visibleCount

      this.transform = `translate3d(${this.itemWidth * this.start}px,0,0)`
    },
    calculateTableWidth() {
      const target = this.$el.getBoundingClientRect()
      const { width } = target || {}
      if (this.dataSource.length) {
        this.visibleCount = Math.max(Math.ceil(width / this.itemWidth), 10)
        this.end = this.start + this.visibleCount
      }
    }
  }
}
</script>

<style>
table {
  width: 800px;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  table-layout: fixed;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td {
  background: #fff;
}
table td,
table th {
  border: 1px solid #e9e9e9;
}
table th {
  padding: 8px 16px;
}

.acho-table {
  border: 1px solid #ccc;
  position: relative;
  background: #fff;
  overflow: auto;
}
.table-header {
  height: 100%;
  position: relative;
  overflow-y: hidden;
  border: 1px solid #e9e9e9;
  position: sticky;
  top: 0;
  z-index: 1;
}
.table-container {
  position: sticky;
  top: 0;
  z-index: 1;
}

.acho-table-data-empty {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.table-fixed-left {
  box-shadow: none;
  transition: box-shadow 0.3s ease;
  width: 0;
  /* height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  background: #fff;
  border: 1px solid #e9e9e9;
  border-right: 0;
}
.table-fixed-left.table-fixed-left-scroll {
  box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.2);
}
</style>
