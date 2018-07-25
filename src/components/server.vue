<template>
    <div class="content">
        <div class="card" style="width: 100%;min-height: 200px;">
            <div class="card-content" style="width: 100%;height: 100%;min-height: 200px;">
                <div class="card-header">
                    服务器管理
                </div>
                <div class="card-text">
                    <div class="tools-bar">
                      <button class="btn" style="background: #78c336;color: #fff;" onclick="show_box('pop-wind')" @click="showMsg(-1)">添加服务器</button>
                    </div>
                    <div id="user-table">
                        <v-table is-horizontal-resize style="width:100%" 
                        :columns="columns" :table-data="tableData" row-hover-color="#eee" 
                        @on-custom-comp="customCompFunc"
                        row-click-color="#edf7ff">
                        </v-table>
                    </div>
                    <div class="pagination">
                        <v-pagination :total="total" :page-size="20" :page-index="pageIndex" @page-change="pageChange"></v-pagination>
                    </div>
                </div>
            </div>
        </div>

        <div id="pop-wind" class="pop-box box">
    <div class="box-header">
        服务器信息
        <button class="btn pop-close" onclick="close_box('pop-wind')">X</button>
    </div>
    <div class="box-content">
        <div class="box spk-box">
            <span>服务器名:<input class="ipt-text" name="sname" v-model="server.name" placeholder="请输入服务器名称" /></span><br>
            <span>IP:<input class="ipt-text" name="ip" v-model="server.ip" placeholder="请输入服务器ip" /></span><br>
            <span>连接配置:</span><textarea cols="30" rows="10" class="ipt-text" style="resize:none" v-model="server.config"></textarea>
            <span>秘钥:<input class="ipt-text" name="secret" v-model="server.secret" placeholder="请输入验证秘钥" /></span><br>
        </div>
        <div class="box spk-box" style="text-align: right;">
            <button class="btn" style="background: #00a5e0;color: #fff;width:60px;" @click="editServer">{{ action }}</button>
        </div>
    </div>
    <div class="box-footer">
        <span class="spk">{{ action }}</span>
        <button class="pop-close btn" onclick="close_box('pop-wind')">关闭</button>
    </div>
</div>
    </div>
</template>
<style>
.pagination {
  width: 100%;
  text-align: right;
}
.datepicker__buttons .datepicker__button-cancel {
  display: none;
}
</style>
<script>
import Vue from "vue";
import config from "./../config";
import { formatDate, get, req_json } from "./../common";
Vue.component("server-action-btn-group", {
  template:
    '<div><button class="btn" onclick="show_box(\'pop-wind\')" @click="edit" style="background:#00a5e0;color:#fff;">编辑</button> ' +
    '<button class="btn" @click="ban" style="background:#2ba535;color:#fff;">{{ button_ban }}</button> ' +
    '<button class="btn" @click="del" style="background:red;color:#fff;">删除</button></div>',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data() {
    return { button_ban: "开启" };
  },
  created() {
    if (this.rowData["status"] == 0) {
      this.button_ban = "关闭";
    }
  },
  methods: {
    edit() {
      let params = {
        type: "editServer",
        uid: this.rowData["uid"],
        row: this.rowData
      };
      this.$emit("on-custom-comp", params);
    },
    ban() {
      let params = {
        type: "banServer",
        server_id: this.rowData["server_id"],
        row: this.rowData,
        index: this.index
      };
      this.$emit("on-custom-comp", params);
      if (this.rowData["status"] == 0) {
        this.button_ban = "开启";
      } else {
        this.button_ban = "关闭";
      }
    },
    del() {
      let params = {
        type: "delServer",
        server_id: this.rowData["server_id"],
        row: this.rowData,
        index: this.index
      };
      this.$emit("on-custom-comp", params);
    }
  }
});

import VueDatepickerLocal from "vue-datepicker-local";

export default {
  components: {
    VueDatepickerLocal
  },
  name: "server",
  data() {
    return {
      server: {
        server_id: -1,
        name: "",
        ip: "",
        config: "",
        secret: ""
      },
      action: "添加",
      pageIndex: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          field: "server_id",
          title: "服务器id",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "name",
          title: "服务器名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "ip",
          title: "服务器ip",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "secret",
          title: "服务器秘钥",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "status",
          title: "服务器状态",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            if (rowData["status"] == 0) {
              return "运行中";
            } else {
              return "<span style='color:red'>关闭状态</span>";
            }
          }
        },
        {
          field: "action",
          title: "操作",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          componentName: "server-action-btn-group"
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    pageChange: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchData();
    },
    editServer() {
      var vue = this;
      var method = "post";
      if (this.server.server_id != -1) {
        method = "put";
      }
      var data = this.server;
      req_json(
        config.url + config.aapi + "server",
        method,
        JSON.stringify(data)
      )
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          alert(json.msg);
          if (json.code == 0) {
            vue.pageChange(vue.pageIndex);
            close_box("pop-wind");
          }
        });
    },
    showMsg(server_id, row) {
      if (server_id == -1) {
        this.server.server_id = -1;
        this.server.name = "";
        this.server.ip = "";
        this.server.config = "";
        this.server.secret = "";
        this.action = "添加";
      } else {
        this.server.server_id = row.server_id;
        this.server.name = row.name;
        this.server.ip = row.ip;
        this.server.config = row.config;
        this.server.secret = row.secret;
        this.action = "修改";
      }
    },
    fetchData() {
      var vue = this;
      fetch(config.url + config.aapi + "server?page=" + this.pageIndex, {
        credentials: "include"
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          vue.tableData = json["rows"];
          vue.total = json["total"];
        });
    },
    banServer(server_id, row, index) {
      var vue = this;
      var status = row["status"] == 0 ? 1 : 0;
      req_json(
        config.url + config.aapi + "server?type=1",
        "delete",
        JSON.stringify({
          server_id: server_id,
          status: status
        })
      )
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          if (json.code == 0) {
            vue.tableData[index].status = status;
          } else {
            alert(json.msg);
          }
        });
    },
    delServer(server_id) {
      var vue = this;
      req_json(
        config.url + config.aapi + "server?type=2",
        "delete",
        JSON.stringify({
          server_id: server_id
        })
      )
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          if (json.code == 0) {
            vue.pageChange(vue.pageIndex);
          } else {
            alert(json.msg);
          }
        });
    },
    customCompFunc(params) {
      if (params.type == "editServer") {
        this.showMsg(params.server_id, params.row);
      } else if (params.type == "banServer") {
        this.banServer(params.server_id, params.row, params.index);
      } else if (params.type == "delServer") {
        this.delServer(params.server_id, params.row, params.index);
      }
    }
  }
};
</script>
