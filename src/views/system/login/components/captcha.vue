<template>
<div class='contain' v-html="imgsrc" @click="getCaptcha">
</div>
</template>

<script>
export default {
  data () {
    return {
      imgsrc: ''
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    async getCaptcha () {
      const data = await this.$api.getCaptcha()
      this.imgsrc = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
