<template>
    <div class="content">
        <div class="nav-bar">
            <router-link to="/" class="nav-item" exact>
               <i class="iconfont icon-home"></i> 首页
            </router-link>
        </div>
        <div class="card" style="width: 100%;">
            <div class="card-content">
                <div class="card-header card-big">
                    后台信息
                </div>
                <div class="card-text" style="padding:10px;">
                    <div class="min-card">
                        <div class="card-title">用户</div>
                        <div class="card-content">
                            <h4 class="bigp">{{ server_msg.user }} 人</h4>
                            <div class="card-action">
                                <router-link to="/user" class="nav-item" exact>
                                  管理
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="min-card">
                        <div class="card-title">服务器</div>
                        <div class="card-content">
                            <h4 class="bigp">{{ server_msg.server }} 台</h4>
                            <div class="card-action">
                                <router-link to="/server" class="nav-item" exact>
                                  管理
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" style="width: 100%;">
            <div class="card-content">
                <div class="card-header card-big">
                    服务器信息
                    <select id="server-msg" class="ipt-text card-select" @change="server_change" v-model="now_server_ip">
                        <option v-for="(serv,index) in server" :key="index" :value="serv.ip">{{ serv.name }}</option>
                    </select>
                </div>
                <div class="card-text" style="padding:10px;">
                    <div class="system-msg-box">
                        <span class="msg">系统负载</span>
                        <circle-progress class="inline" :percent='parseFloat(sys_msg.load[0])'></circle-progress>
                        <span class="msg">{{ runStatus() }}</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">CPU使用率</span>
                        <circle-progress class="inline" :percent='sys_msg.cpu.use'></circle-progress>
                        <span class="msg">{{ sys_msg.cpu.num }}核</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">内存使用</span>
                        <circle-progress class="inline" :percent='Math.round(sys_msg.mem.use/sys_msg.mem.total*100)'></circle-progress>
                        <span class="msg">{{ kb2big(sys_msg.mem.use) }}/{{ kb2big(sys_msg.mem.total) }}</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">磁盘空间</span>
                        <circle-progress class="inline" :percent='Math.round(sys_msg.disk.use/sys_msg.disk.total*100)'></circle-progress>
                        <span class="msg">{{ kb2big(sys_msg.disk.use/1024) }}/{{ kb2big(sys_msg.disk.total/1024) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import circleProgress from "./progress.vue";
import config from "./../config";
import { formatDate, get, req_json } from "./../common";

export default {
  name: "app",
  components: {
    "circle-progress": circleProgress
  },
  data() {
    return {
      websocket: null,
      now_server_ip: "",
      server: {},
      sys_msg: {
        load: 0,
        cpu: {
          use: 0
        },
        mem: {
          total: 1,
          use: 0
        },
        disk: {
          total: 1,
          use: 0
        }
      },
      server_msg: {
        user: 0,
        server: 0
      }
    };
  },
  created() {
    this.now_server_ip = localStorage["record"];
    if (this.$parent.ws == null) {
      this.$parent.ws = new WebSocket(
        "ws://" + this.now_server_ip + ":5135/?key=xiajibada"
      );
    }
    this.websocket = this.$parent.ws;
    var ws = this.websocket;
    var vue = this;
    this.websocket.onmessage = function(evt) {
      var json = JSON.parse(evt.data);
      vue.sys_msg = json;
    };
    get(config.url + config.aapi + "server?simple=0")
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        vue.server = json.rows;
        if (vue.now_server_ip == undefined) {
          vue.now_server_ip = vue.server[0].ip;
          setTimeout(function() {
            vue.server_change({
              target: document.getElementById("server-msg")
            });
          }, 200);
        }
      });
    get(config.url + config.aapi + "sysmsg")
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        vue.server_msg = json;
      });
  },
  methods: {
    server_change(event) {
      this.$parent.ws.close();
      console.log(event.target.value);
      this.sys_msg = {
        load: 0,
        cpu: {
          use: 0
        },
        mem: {
          total: 1,
          use: 0
        },
        disk: {
          total: 1,
          use: 0
        }
      };
      this.websocket = new WebSocket(
        "ws://" + event.target.value + ":5135/?key=xiajibada"
      );
      var vue = this;
      this.websocket.onmessage = function(evt) {
        var json = JSON.parse(evt.data);
        vue.sys_msg = json;
      };
      this.$parent.ws = this.websocket;
      this.now_server_ip = event.target.value;
      localStorage["record"] = event.target.value;
    },
    runStatus() {
      var load = this.sys_msg.load[0],
        num = this.sys_msg.cpu.num;
      if (load < num) {
        return "运行流畅";
      } else if (load < num * 2) {
        return "<span style='color:#f5945a'>系统繁忙</span>";
      }
      return "-";
    },
    kb2big(kb) {
      var ret = kb / 1024;
      if (ret > 1024) {
        ret = Math.round(ret / 1024 * 100) / 100 + "GB";
      } else {
        ret = Math.round(ret) + "MB";
      }
      return ret;
    }
  }
};
</script>