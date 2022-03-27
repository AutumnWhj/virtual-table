<template>
  <div class="filter-container">
    <div>{{ renderLabel }}</div>
    <div class="filters">
      <a :class="{ active: status === 'up' }" @click="handleUp"> ↑</a
      ><a :class="{ active: status === 'down' }" @click="handleDown">↓</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterHeader',
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      status: ''
    }
  },
  computed: {
    renderLabel() {
      return this.column.label
    }
  },
  methods: {
    handleUp() {
      this.status = 'up'
      this.action(this.column.header.actions.up, (a, b) => {
        return a[this.column.prop] - b[this.column.prop]
      })
    },
    handleDown() {
      this.status = 'down'
      this.action(this.column.header.actions.down, (a, b) => {
        return b[this.column.prop] - a[this.column.prop]
      })
    }
  }
}
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  width: 15px;
  margin-left: 15px;
  cursor: pointer;
}
.active {
  color: red;
}
</style>
