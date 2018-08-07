<template>
    <div class="content">
        <div class="card" style="width: 100%;min-height: 200px;">
            <div class="card-content" style="width: 100%;height: 100%;min-height: 200px;">
                <div class="card-header">
                    系统设置
                </div>
                <div class="card-text">
                    <div class="box-content form">
                        <div class="ipt-group">
                           <label class="tag">同时在线:</label><input class="ipt-text" type="number" placeholder="允许同时在线的个数" name="online_num" v-model.number="config.online_num">
                        </div>
                        <div class="ipt-group">
                           <label class="tag">注册间隔:</label><input class="ipt-text" type="number" placeholder="注册间隔长度(秒)" name="reg_interval" v-model.number="config.reg_interval">
                        </div>
                        <div class="ipt-group" style="text-align: right;margin-top:20px;">
                            <button class="btn" style="background:#f23b3b;color:#fff;height:30px;width:80px;font-size:14px;">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import config from "./../config";
import { formatDate, get, req_json } from "./../common";

export default {
  name: "setting",
  data() {
    return {
      config: {
        online_num: 1,
        reg_interval: 3600
      }
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      var vue = this;
      get(config.url + config.aapi + "setting")
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          vue.config = json["config"];
        });
    }
  }
};
</script>