<template>
  <div id="app">
    <div class="flex-box">
      <div class="aside">
        <aside-component :bee="bee"></aside-component>
      </div>
      <div class="main">
        <main-component :bee="bee"></main-component>
      </div>
    </div>
  </div>
</template>

<script>
import AsideComponent from './components/AsideComponent'
import MainComponent from './components/MainComponent'

export default {
  name: 'app',
  components: {
    AsideComponent,
    MainComponent
  },
  data() {
    return {
      /**
       * 这里要注意，我用了 Vue 本身的一个 Bug
       *
       * 正常情况下，为了保证数据的单向流动，prop是不允许在子组件修改的。
       * 但是prop在做响应化的时候并没有进行深度响应化（对于Object没有监听属性）。
       * 所以当传入Object时，是可以进行双向修改的。
       *
       * 因为本项目相对简单，所以利用了这个 Bug 来处理数据，其他情况下不建议使用。
       *
       */
      bee: {
        urlList: ['clew.fun/log'],
        logList: [],
        activeLog: {}
      }
    }
  }
}
</script>

<style lang="scss">
@import './var.scss';
html,
body {
  background: $background-color;
  color: $font-color;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  .header {
    height: 40px;
    width: 100%;
    border-bottom: $broder;
  }
  .flex-box {
    flex: 1;
    display: flex;
    align-items: stretch;
    .aside {
      width: $aside-width;
      height: 100%;
      border-right: $broder;
    }
    .main {
      flex: 1;
    }
  }
}
</style>
