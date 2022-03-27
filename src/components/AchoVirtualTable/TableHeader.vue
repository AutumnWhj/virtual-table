<template>
  <table class="acho-table-header">
    <colgroup>
      <col v-for="(col, i) in columns" :key="i" :width="col.width || ''" />
    </colgroup>
    <thead>
      <tr v-if="withColumnCaption.length" class="acho-table-header-caption">
        <template v-for="col in withColumnCaption">
          <th
            :key="col.name"
            class="th-caption"
            :colspan="col.caption && col.caption.colspan"
          >
            <slot
              v-if="col.caption && col.caption.slot"
              name="colcaption"
              v-bind:namekey="col.prop"
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
  },
  computed: {
    withColumnCaption() {
      let columns = [...this.columns]
      let hasCaption = columns.some((col) => col.caption)
      let result = []
      this.columns.reduce((output, v, i) => {
        if (output >= i) {
          console.log(i)
        } else {
          if (v.caption && v.caption.colspan) {
            output = i + v.caption.colspan - 1
            result.push(v)
          } else {
            if (output < i) {
              output = i
              result.push(v)
            }
          }
        }
        return output
      }, -1)
      return hasCaption ? result : []
    }
  },
  mounted() {}
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
