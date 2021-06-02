<template>
  <d2-container type="ghost">
    <d2-module-index-banner slot="header" v-bind="banner"/>
    <d2-module-index-menu :menu="menu"/>
  </d2-container>
</template>

<script>
import menu from '@/menu/modules/demo-plugins'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'PLUGIN',
        subTitle: 'D2Admin 集成了许多d】但是肯定是到付即可收看s实用插件'
      }
    }
  }
}
</script>
