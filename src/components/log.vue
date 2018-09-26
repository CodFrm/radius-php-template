<template>
    <div class="content">
        <div class="nav-bar">
           <router-link to="/" class="nav-item" exact>
               <i class="iconfont icon-home"></i> 首页
            </router-link>/
            <router-link to="/log" class="nav-item" exact>
               日志记录
            </router-link>
        </div>
        <div class="card" style="width: 100%;min-height: 200px;">
            <div class="card-content" style="width: 100%;height: 100%;min-height: 200px;">
                <div class="card-header">
                    日志记录
                </div>
                <div class="card-text">
                    <div class="tools-bar">
                      <input type="text" class="ipt-text" placeholder="搜索记录" v-model="keyword">
                      <button class="btn" style="background: #00a5d8;color: #fff;" @click="fetchData">搜索</button>
                    </div>
                    <div id="user-table">
                        <v-table is-horizontal-resize style="width:100%" 
                        :columns="columns" :table-data="tableData" row-hover-color="#eee"
                        row-click-color="#edf7ff">
                        </v-table>
                    </div>
                    <div class="pagination">
                        <v-pagination :total="total" :page-size="20" :page-index="pageIndex" @page-change="pageChange"></v-pagination>
                    </div>
                </div>
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
import { formatDate, formatTime, formatByte, get, req_json } from "./../common";

export default {
  name: "log",
  data() {
    return {
      keyword: "",
      pageIndex: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          field: "account_id",
          title: "记录id",
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
          field: "server",
          title: "服务器名称",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "time",
          title: "连接时间",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            return formatDate(rowData["time"]);
          }
        },
        {
          field: "connect_time",
          title: "连接时长",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            if (rowData["end_time"] <= 0) {
              return '<span style="color:red">在线</span>';
            }
            return formatTime(rowData["end_time"] - rowData["time"]);
          }
        },
        {
          field: "octets",
          title: "流量",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData) {
            return formatByte(
              parseInt(rowData["input_octets"]) + parseInt(rowData["output_octets"])
            );
          }
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var vue = this;
      fetch(
        config.url +
          config.aapi +
          "account?page=" +
          this.pageIndex +
          "&keyword=" +
          this.keyword,
        {
          credentials: "include"
        }
      )
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
    }
  }
};
</script>
