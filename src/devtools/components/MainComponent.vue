<template>
  <div id="main">
    <Drawer title="管理监听URL" :closable="false" v-model="urlDrawer">
      <CellGroup>
        <Cell v-for="(url,index) in bee.urlList" :key="url">
          {{url}}
          <Icon
            slot="extra"
            color="#ed4014"
            type="ios-trash-outline"
            size="16"
            @click.native="deleteUrl(index)"
          />&nbsp;&nbsp;&nbsp;&nbsp;
        </Cell>
      </CellGroup>
      <div style="margin-top: 10px">
        <Button type="success" long @click.native="addUrl()">添加URL</Button>
      </div>
    </Drawer>
    <div class="bar">
      <div class="add">
        <Tooltip content="点击添加监听接口" placement="bottom">
          <Icon type="ios-add-circle-outline" size="17" @click.native="urlDrawer = true" />
        </Tooltip>
      </div>
      <div class="url">
        <b>URL:</b>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {{logUrl}}
      </div>
    </div>
    <div class="cotent">
      <json-viewer class="box" :value="logInfo" :expand-depth="5" copyable></json-viewer>
    </div>
  </div>
</template> 
<script>
export default {
  name: 'main-component',
  // 重申，这里用了bug，不可取
  props: ['bee'],
  computed: {
    logUrl() {
      let url = ''
      if (Reflect.has(this.bee.activeLog, 'url')) {
        url = this.bee.activeLog.url
      }
      return url
    },
    logInfo() {
      let json = {}
      if (Reflect.has(this.bee.activeLog, 'data')) {
        json = this.bee.activeLog.data
      }
      return json
    }
  },
  data() {
    return {
      // url修改窗口
      urlDrawer: false
    }
  },
  methods: {
    /**
     * 删除指定URL，取消对其监听
     */
    deleteUrl(index) {
      this.$Modal.confirm({
        title: '确认',
        content: `<p>是否删除URL: ${this.bee.urlList[index]} ？</p>`,
        onOk: () => {
          this.bee.urlList.splice(index, 1)
        }
      })
    },
    /**
     * 添加URL， 没加check
     */
    addUrl() {
      let url = ''
      this.$Modal.confirm({
        title: '添加URL',
        render: h => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '请输入希望监听的URL'
            },
            on: {
              input: val => {
                url = val
              }
            }
          })
        },
        onOk: () => {
          this.bee.urlList.push(url)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../var.scss';

#main {
  .bar {
    display: flex;
    height: 40px;
    padding: 10px;
    border-bottom: $broder;
    .add {
      margin-right: 10px;
    }
    .url {
      flex: 1;
      font-size: 14px;
    }
  }
  .cotent {
    height: calc(100vh - 40px);
    overflow: auto;
  }
}
</style>
