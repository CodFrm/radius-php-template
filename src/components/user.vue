<template>
    <div class="content">
        <div class="card" style="width: 100%;min-height: 200px;">
            <div class="card-content" style="width: 100%;height: 100%;min-height: 200px;">
                <div class="card-header">
                    用户管理
                </div>
                <div class="card-text">
                    <div id="user-table">
                        <v-table is-horizontal-resize style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
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
</style>
<script>
export default {
  name: "user",
  data() {
    return {
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
          field: "group",
          title: "用户组",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "email",
          title: "邮箱",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log(this.pageIndex);
    },
    pageChange: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchData();
    }
  }
};
</script>
