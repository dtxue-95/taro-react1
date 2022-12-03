export default {
  pages: [ // 页面路径列表
    'pages/index/index',
    'pages/user/index',
    'pages/category/index',
    'pages/detail/index',
    'pages/user/img',
  ],
  window: { // 全局默认窗口表现
    backgroundTextStyle: 'light', // 下拉loading的样式 默认值 dark
    navigationBarBackgroundColor: '#54c7ec',  // 导航栏背景色
    navigationBarTitleText: 'We', // 导航栏标题文字内容
    navigationBarTextStyle: 'white',// 导航栏标题颜色，仅支持 black / white
    backgroundColor: '#cfe6ed', // 窗口的背景色  下拉刷新时可见
    enablePullDownRefresh: true, // 是否开启当前页面的下拉刷新
    onReachBottomDistance: 200, // 页面上拉触底事件触发时距页面底部距离，单位为 px
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    },
    'scope.writePhotosAlbum': {
      desc: '写入相册'
    }
  },
  tabBar: { // 底部tab栏
    color: "#8a8a8a",  // tab 上的文字默认颜色 
    selectedColor: "#f00", // tab 上的文字选中时的颜色 #f00
    backgroundColor: "#fafaf0", // tab背景色 fafafa
    borderStyle: 'black', // tabbar 上边框的颜色
    position: 'bottom', // tabBar的位置，仅支持 bottom / top
    list: [ // tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab
      {
        pagePath: "pages/index/index", // 页面路径，必须在 pages 中先定义
        iconPath: "./static/tabBar/home.png", // 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，不支持网络图片。当 position 为 top 时，不显示 icon
        selectedIconPath: "./static/tabBar/home_selected.png",
        text: "首页" // tab 上按钮文字
      },
      {
        pagePath: "pages/category/index",
        iconPath: "./static/tabBar/category.png",
        selectedIconPath: "./static/tabBar/category_selected.png",
        text: "分类"
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/tabBar/user.png",
        selectedIconPath: "./static/tabBar/user_selected.png",
        text: "我的"
      }
    ]
  }
}
