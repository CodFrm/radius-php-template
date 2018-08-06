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
                           <label class="tag">同时在线:</label><input class="ipt-text" type="number" placeholder="允许同时在线的个数" name="online_num" v-model.number="online_num">
                        </div>
                        <div class="ipt-group">
                           <label class="tag">测试巴打实:</label><input class="ipt-text" type="text" placeholder="允许同时在线的个数">
                        </div>
                        <div class="ipt-group" style="text-align: right;margin-top:20px;">
                            <button class="btn" style="background: #f23b3b;color: #fff;">修改</button>
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
      online_num: 1
    };
  }
};
</script>