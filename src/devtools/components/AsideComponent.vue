<template>
  <div id="aside">
    <div class="bar">
      <div class="title">请求列表</div>
      <Icon class="bar-button" type="md-menu" size="18" @click.native="selectCard = !selectCard" />&nbsp;&nbsp;
      <Icon class="bar-button" type="ios-trash-outline" size="18" @click.native="clearLogList()" />&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <div class="list">
      <Card padding="10" v-show="selectCard">
        <h6>上报请求类型筛选</h6>
        <br />
        <CheckboxGroup v-model="showTypeList">
          <Checkbox v-for="item in eventTypeList" :key="item" :label="item"></Checkbox>
        </CheckboxGroup>
      </Card>
      <div v-for="log in bee.logList" :key="log.requestId">
        <Card
          class="card"
          v-show="showTypeList.indexOf(log.data.t) > -1"
          :class="{active: isActiveCard(log)}"
          padding="10"
          @click.native="showLogInfo(log)"
        >
          <div>
            <span class="title">{{log.data.t}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{log.type === 'ping'? '(Beacon)' :''}}</span>
          </div>

          <p style="font-size: 10px;">{{log.data.tm | time}}</p>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aside-component',
  // 重申，这里用了bug，不可取
  props: ['bee'],
  filters: {
    /**
     * 根据时间戳计算时间
     */
    time(tm) {
      let date = new Date(parseInt(tm))
      let h =
        parseInt(date.getHours()) > 10 ? date.getHours() : `0${date.getHours()}`
      let m =
        parseInt(date.getMinutes()) > 10
          ? date.getMinutes()
          : `0${date.getMinutes()}`
      let s =
        parseInt(date.getSeconds()) > 10
          ? date.getSeconds()
          : `0${date.getSeconds()}`
      return h + ':' + m + ':' + s
    }
  },
  data() {
    return {
      // 筛选卡片是否显示
      selectCard: false,
      // 全部事件列表
      eventTypeList: ['page', 'clck', 'imp', 'chng', 'event'],
      // 被选中的
      showTypeList: ['page', 'clck', 'imp', 'chng', 'event']
    }
  },
  mounted() {
    // 添加监听
    this.addListener()
  },
  methods: {
    /**
     * 监听浏览器发出的请求，并过滤出Bee的log信息
     */
    addListener() {
      console.log('addListener')
      chrome.webRequest.onBeforeRequest.addListener(
        details => {
          /**
           * 判断是否为被监听url,
           * 这块逻辑写的不是很好，有时间需要改一下
           */
          for (let i = this.bee.urlList.length - 1; i > -1; i--) {
            if (details.url.indexOf(this.bee.urlList[i]) > -1) {
              let req = {
                url: details.url,
                requestId: details.requestId,
                type: details.type
              }
              // 取请求体数据
              req.data = JSON.parse(
                new TextDecoder('utf-8').decode(
                  new Uint8Array(details.requestBody.raw[0].bytes)
                )
              )
              this.bee.logList.unshift(req)
            }
          }
        },
        {
          // 正常应该在这里筛选url
          urls: ['<all_urls>'],
          // ping 主要是为了匹配 sendBeacon
          types: ['xmlhttprequest', 'ping']
        },
        ['blocking', 'requestBody']
      )
    },
    /**
     * 选择Log
     */
    showLogInfo(log) {
      this.$set(this.bee, 'activeLog', log)
    },
    /**
     * 判断当前卡片是否为active
     */
    isActiveCard(log) {
      if (log.requestId === this.bee.activeLog.requestId) {
        return true
      }
      return false
    },
    /**
     * 清空日志列表
     */
    clearLogList() {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>是否清空日志列表？</p>',
        onOk: () => {
          this.bee.logList = []
          this.bee.activeLog = {}
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../var.scss';

#aside {
  .bar {
    display: flex;
    height: 40px;
    padding: 10px;
    border-bottom: $broder;
    .title {
      flex: 1;
      font-size: 14px;
    }
  }
  .list {
    height: calc(100vh - 40px);
    max-height: 100%;
    padding-bottom: 10px;
    overflow: auto;
    .active {
      border-left: solid 3px #2d8cf0;
      font-size: 13px !important;
    }
    .card {
      margin: 10px 10px 0 10px;
      padding-left: 5px;
      font-size: 10px;
      .title {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}
</style>
