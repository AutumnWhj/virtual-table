<template>
  <input type="text" @input="handleSearch" />
</template>

<script>
export default {
  name: 'SearchCaption',
  props: {
    caption: {
      type: Object,
      default: function () {}
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
  data() {
    return {}
  },
  methods: {
    handleSearch: function (e) {
      console.log('handleSearch: ')
      const value = e.target.value.trim()
      this.action(this.caption.action, (i) => {
        if (!value) return true
        return i[this.namekey].toUpperCase().includes(value.toUpperCase())
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
