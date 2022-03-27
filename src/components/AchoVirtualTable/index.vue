<template>
  <div ref="table">
    <acho-table
      :height="500"
      :width="800"
      :dataSource="dataSource"
      :columns="columns"
    >
      <template v-slot:colcaption="slotProps">
        <component
          :is="slotProps.caption.slot"
          v-bind="slotProps"
          :action="handleAction"
        ></component>
      </template>
      <template v-slot:header="slotProps">
        <component
          :is="slotProps.column.header.slot"
          v-bind="slotProps"
          :action="handleAction"
        ></component>
      </template>
      <template v-slot:body="slotProps">
        <component
          :is="slotProps.column.body.slot"
          :action="handleAction"
          v-bind="slotProps"
        ></component>
      </template>
      <template v-slot:empty>
        <div>data empty</div>
      </template>
    </acho-table>
  </div>
</template>

<script>
import AchoTable from './Table.vue'
import SearchCaption from './InnerComponents/SearchCaption.vue'
import FilterHeader from './InnerComponents/FilterHeader.vue'

export default {
  name: 'AchoVirtualTable',
  components: {
    AchoTable,
    SearchCaption,
    FilterHeader
  },
  props: {
    dataSource: {
      typeof: Array,
      default: () => []
    },
    columns: {
      typeof: Array,
      default: () => []
    }
  },
  methods: {
    handleAction(action = function () {}, ...v) {
      return action.apply(this, v)
    }
  }
}
</script>
