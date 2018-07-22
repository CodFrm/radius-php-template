<template>
    <div class="content">
        <div class="card" style="width: 100%;min-height: 200px;">
            <div class="card-content" style="width: 100%;height: 100%;min-height: 200px;">
                <div class="card-header">
                    用户管理
                </div>
                <div class="card-text">
                    <div class="tools-bar">
                      <button class="btn" style="background: #78c336;color: #fff;" onclick="show_box('pop-wind')" @click="editUser(-1)">添加用户</button>
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
        用户信息
        <button class="btn pop-close" onclick="close_box('pop-wind')">X</button>
    </div>
    <div class="box-content">
        <div class="box spk-box">
            <span>用户基本信息:</span><br>
            <span>用户名:<input class="ipt-text" id="user" name="name" v-model="user.name" placeholder="请输入用户名" /></span><br>
            <span>密码:<input class="ipt-text" id="pwd" v-model="user.pwd" placeholder="请输入密码" /></span><br>
            <span>邮箱:<input class="ipt-text" id="email" v-model="user.email" placeholder="请输入邮箱" /></span><br>
        </div>
        <div class="box spk-box">
            <span>用户组:</span><br>
            <template  v-for="(group,index) in user.group" >
              <div class="group" :key="index">
              <select class="ipt-text ipt-select group" @change="groupChange(index)" v-show="group.before=group.group_id || true" v-model="group.group_id">
                <option value="0">
                  未选择
                </option>
                <template v-for="(userGroup,s_index) in $parent.group" v-if="userGroup.group_id == group.group_id">
                <option :value="userGroup.group_id" selected :key="s_index">
                  {{ userGroup.name }}
                </option>
                </template>
                <template v-else>
                  <option :value="userGroup.group_id">
                  {{ userGroup.name }}
                  </option>
                </template>
                <option value="-1">
                  删除
                </option>
              </select>
              <template v-if="group.expire==-1">
                <vue-datepicker-local format="YYYY-MM-DD HH:mm:ss" @confirm="groupChange(index)" showButtons v-if="group.expire_=new Date((new Date().getTime())+2592000*1000)" v-model="group.expire_">

                </vue-datepicker-local>
                <input :id="'forever'+index" type="checkbox" @change="expireChange($event,index)" checked v-show="group.forever=true" />
              </template>
              <template v-else>
                <vue-datepicker-local format="YYYY-MM-DD HH:mm:ss" @confirm="groupChange(index)" showButtons v-show="group.expire_=isExpire(group.expire,index)" v-model="group.expire_">
           
                </vue-datepicker-local>
                <input :id="'forever'+index" type="checkbox" @change="expireChange($event,index)" v-show="!(group.forever=false)" />
              </template>
              <label :for="'forever'+index">永久</label>

              </div>
            </template>
            <button class="btn btn-min" @click="addUserGroup" style="padding: 4px 8px;background:#00a5e0;color:#fff;margin-top:4px;" >+</button>
        </div>
        <div class="box spk-box" style="text-align: right;">
            <button class="btn" @click="addUser" style="background: #00a5e0;color: #fff;width:60px;">{{ action }}</button>
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
Vue.component("action-btn-group", {
  template:
    '<div><button class="btn" onclick="show_box(\'pop-wind\')" @click="edit" style="background:#00a5e0;color:#fff;">编辑</button> ' +
    '<button class="btn" @click="del" style="background:red;color:#fff;">{{ ban }}</button></div>',
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
    return { ban: "解禁" };
  },
  created() {
    console.log(this.rowData["status"]);
    if (this.rowData["status"] == 0) {
      this.ban = "禁封";
    }
  },
  methods: {
    edit() {
      let params = {
        type: "editUser",
        uid: this.rowData["uid"],
        row: this.rowData
      };
      this.$emit("on-custom-comp", params);
    },
    del() {
      let params = {
        type: "delUser",
        uid: this.rowData["uid"],
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
  name: "user",
  data() {
    return {
      user: {
        uid: 0,
        name: "",
        pwd: "",
        email: "",
        group: []
      },
      action: "添加用户",
      pageIndex: 1,
      total: 1234,
      tableData: [],
      columns: [
        {
          field: "uid",
          title: "uid",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "user",
          title: "用户名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "email",
          title: "邮箱",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "reg_time",
          title: "注册时间",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            return formatDate(rowData["reg_time"]);
          }
        },
        {
          field: "last_login_time",
          title: "最后一次登录时间",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            return formatDate(rowData["last_login_time"]);
          }
        },
        {
          field: "status",
          title: "用户状态",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            if (rowData["status"] == 0) {
              return "正常用户";
            } else {
              return "<span style='color:red'>用户禁封</span>";
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
          componentName: "action-btn-group"
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    addUser() {
      var vue=this;
      var method = "put";
      var user = {
        user: this.user.name,
        passwd: this.user.pwd,
        email: this.user.email
      };
      if (this.user.uid == -1) {
        method = "post";
        user.group = [];
        for (var i = 0; i < this.user.group.length; i++) {
          var expire = 0;
          if (this.user.group[i].forever) {
            expire = -1;
          } else {
            expire = Date.parse(this.user.group[i].expire_) / 1000;
          }
          user.group.push({
            group_id: this.user.group[i].group_id,
            expire: expire
          });
        }
      } else {
        user.uid = this.user.uid;
      }
      req_json(config.url + config.aapi + "user", method, JSON.stringify(user))
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
    isExpire(time, index) {
      var now = new Date().valueOf() / 1000;
      this.user.group[index].forever = false;
      if (time == -1) {
        //无限期的
        this.user.group[index].forever = true;
        return new Date(new Date().getTime() + 2592000 * 1000);
      } else if (now > time) {
        //过期的
        return new Date(new Date().getTime() + 2592000 * 1000);
      }
      //有期限的
      return new Date(time * 1000);
    },
    expireChange(event, index) {
      this.user.group[index].forever = $(event.target).is(":checked");
      this.groupChange(index);
    },
    fetchData() {
      var vue = this;
      fetch(config.url + config.aapi + "user?page=" + this.pageIndex, {
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
    pageChange: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchData();
    },
    editUser(uid, row) {
      var vue = this;
      if (row == undefined) {
        vue.user.uid = -1;
        vue.user.name = "";
        vue.user.email = "";
        this.action = "添加";
      } else {
        vue.user.uid = row["uid"];
        vue.user.name = row["user"];
        vue.user.email = row["email"];
        this.action = "修改";
      }
      vue.user.pwd = "";
      vue.user.group = [];
      if (uid != -1) {
        //编辑用户,获取用户群组
        get(config.url + config.aapi + "usergroup?uid=" + uid)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            vue.user.group = json["rows"];
          });
      }
    },
    groupChange(index) {
      var vue = this;
      var gid = this.user.group[index].group_id;
      var expire = this.user.group[index].forever
        ? -1
        : Date.parse(this.user.group[index].expire_) / 1000;
      var method = "post";
      var before = this.user.group[index].before;
      for (var i = 0; i < this.user.group.length; i++) {
        if (gid == this.user.group[i].group_id && i != index) {
          //重复了
          if (before === true) {
            before = 0;
          }
          this.user.group[index].group_id = before;
          alert("已经存在这个用户组了");
          return;
        }
      }
      if (gid == -1) {
        gid = this.user.group[index].before;
        method = "delete";
        this.user.group.splice(index, 1);
      } else if (this.user.uid == -1) {
        return;
      } else {
        this.user.group[index].before = gid;
      }

      req_json(
        config.url + config.aapi + "usergroup",
        method,
        JSON.stringify({
          uid: this.user.uid,
          gid: gid,
          expire: expire,
          before: before
        })
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (method != "delete" && json.code == -1) {
            vue.user.group[index].group_id = before;
            vue.user.group[index].before = before;
            alert(json.msg);
          }
        });
    },
    addUserGroup: function() {
      this.user.group.push({
        expire: 0,
        group_id: 0,
        uid: this.user.uid,
        before: 0
      });
    },
    delUser(uid, row, index) {
      var vue = this;
      console.log(row);
      var status = row["status"] == 0 ? 1 : 0;
      req_json(
        config.url + config.aapi + "user",
        "delete",
        JSON.stringify({
          uid: uid,
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
    customCompFunc(params) {
      if (params.type == "editUser") {
        this.editUser(params.uid, params.row);
      }
      if (params.type == "delUser") {
        this.delUser(params.uid, params.row, params.index);
      }
    }
  }
};
</script>
