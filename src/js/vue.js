// const Vue = require('vue');
// const VueRouter = require('vue-router');
// // import css
// import 'vue-easytable/libs/themes-base/index.css'

// // import table and pagination comp
// import {
//     VTable,
//     VPagination
// } from 'vue-easytable'

// Vue.use(VueRouter);

// // Register to global
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)
// const routes = [{
//     path: '/',
//     component: {
//         template: '<v-table is-horizontal-resize style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>',
//         data() {
//             return {
//                 tableData: [
//                     { "name": "赵伟", "tel": "156*****1987", "hobby": "钢琴、书法、唱歌", "address": "上海市黄浦区金陵东路569号17楼" },
//                     { "name": "李伟", "tel": "182*****1538", "hobby": "钢琴、书法、唱歌", "address": "上海市奉贤区南桥镇立新路12号2楼" },
//                     { "name": "孙伟", "tel": "161*****0097", "hobby": "钢琴、书法、唱歌", "address": "上海市崇明县城桥镇八一路739号" },
//                     { "name": "周伟", "tel": "197*****1123", "hobby": "钢琴、书法、唱歌", "address": "上海市青浦区青浦镇章浜路24号" },
//                     { "name": "吴伟", "tel": "183*****6678", "hobby": "钢琴、书法、唱歌", "address": "上海市松江区乐都西路867-871号" }
//                 ],
//                 columns: [
//                     { field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
//                     { field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true },
//                     { field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true },
//                     { field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left', isResize: true }
//                 ]
//             };
//         }
//     }
// }]

// const route = new VueRouter({
//     routes
// })


// const app = new Vue({
//     route
// }).$mount('#user-table');