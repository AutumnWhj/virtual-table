<template>
  <table>
    <colgroup>
      <col v-for="col in columns" :key="col.prop" :width="col.width || ''" />
    </colgroup>
    <thead>
      <tr v-if="columns.length" class="acho-table-header-caption">
        <template v-for="col in columns">
          <th :key="col.prop" class="th-caption">
            <slot
              v-if="col.caption && col.caption.slot"
              name="colcaption"
              v-bind:namekey="col.prop"
              v-bind:value="col.caption.value"
              v-bind:caption="col.caption"
            ></slot>
          </th>
        </template>
      </tr>
      <tr>
        <th v-for="col in columns" :key="col.prop">
          <slot v-if="col.header" name="header" v-bind:column="col"></slot>
          <span v-else>{{ col.label }}</span>
        </th>
      </tr>
    </thead>
  </table>
</template>
<script>
export default {
  name: 'AchoTableHeader',
  props: {
    columns: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style>
.acho-table-header-caption th {
  background: transparent;
  border: none;
}
.acho-table-header-caption th.th-caption {
  padding: 0;
}
</style>
