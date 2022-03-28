<template>
  <input type="text" @input="handleSearch" :value="value" />
</template>

<script>
export default {
  name: 'SearchCaption',
  props: {
    caption: {
      type: Object,
      default: function () {}
    },
    value: {
      type: String,
      default: ''
    },
    namekey: {
      type: String,
      default: ''
    },
    action: {
      type: Function,
      default: function () {}
    }
  },
  methods: {
    handleSearch(e) {
      const value = e.target.value.trim()
      this.action(this.caption.action, () => {
        return {
          value,
          prop: this.namekey
        }
      })
    }
  }
}
</script>

<style scoped>
th {
  padding: 0;
}
input {
  width: calc(100% - 15px);
}
</style>
