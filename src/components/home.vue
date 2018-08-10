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
                            <h4 class="bigp">24 人</h4>
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
                            <h4 class="bigp">2 台</h4>
                            <div class="card-action">
                                <router-link to="/user" class="nav-item" exact>
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
                    <select class="ipt-text card-select">
                        <option value="">树莓派</option>
                        <option value="">PC</option>
                        <option value="">瞎写的</option>
                    </select>
                </div>
                <div class="card-text" style="padding:10px;">
                    <div class="system-msg-box">
                        <span class="msg">系统负载</span>
                        <circle-progress class="inline" :percent='30'></circle-progress>
                        <span class="msg">运行流畅</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">CPU使用率</span>
                        <circle-progress class="inline" :percent='40'></circle-progress>
                        <span class="msg">2核</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">内存使用</span>
                        <circle-progress class="inline" :percent='40'></circle-progress>
                        <span class="msg">10/1024(MB)</span>
                    </div>
                    <div class="system-msg-box">
                        <span class="msg">磁盘空间</span>
                        <circle-progress class="inline" :percent='40'></circle-progress>
                        <span class="msg">100/2000(G)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import circleProgress from "./progress.vue";

export default {
  name: "app",
  components: {
    "circle-progress": circleProgress
  }
};
</script>