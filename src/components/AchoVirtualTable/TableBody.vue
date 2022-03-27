<template>
  <table>
    <colgroup>
      <col v-for="(col, i) in columns" :key="i" :width="col.width || ''" />
    </colgroup>
    <tbody>
      <tr v-for="(row, i) in dataSource" :key="i" :id="row.id">
        <td v-for="col in columns" :key="col.prop">
          <div :style="{ height: '30px' }">
            <slot
              v-if="col.body"
              name="body"
              v-bind:data="row"
              v-bind:column="col"
            ></slot>
            <span v-else>
              {{ row[col.prop] }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'AchoTableBody',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  mounted() {}
}
</script>

<style>
.acho-table-body table {
  will-change: transform;
  /* transition: all 0s linear; */
  /* pointer-events: none; */
  transform: translate3d(0, 0, 0);
}
.td-container {
  box-sizing: border-box;
  padding: 8px 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
