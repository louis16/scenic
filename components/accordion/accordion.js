// components/accordion/accordion.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    selected: [false, false, false, false, false], // // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
    active: null, // 当前展开的项的index值
    listDatas: [{
        list_name: '简介',
        list_content: '一个靠前排的90后帅小伙,具有情怀的技匠,路上正追逐斜杠青年的践行者',
      },

      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },

      {
        list_name: '微信ID',
        list_content: 'suibichuanji',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },

      {
        list_name: '微信ID',
        list_content: 'suibichuanji',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },

      {
        list_name: '微信ID',
        list_content: 'suibichuanji',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },

      {
        list_name: '微信ID',
        list_content: 'suibichuanji',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },
      {
        list_name: '开发者',
        list_content: '随笔川迹',
      },

      {
        list_name: '微信ID',
        list_content: 'suibichuanji',
      },
      {
        list_name: '其他业务',
        list_content: '广告文案策划编写/短视频制作(特效,后期视频处理)/配音/公众号代运营广告文案策划编写/短视频制作(特效,后期视频处理)/配音/公众号代运营广告文案策划编写/短视频制作(特效,后期视频处理)/配音/公众号代运营广告文案策划编写/短视频制作(特效,后期视频处理)/配音/公众号代运营',
      },
      {
        list_name: '微信公众号',
        list_content: 'itclanCoder',
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击列表,收缩与展示
    onListClick(event) {
      let index = event.currentTarget.dataset.index;
      let active = this.data.active;

      this.setData({
        [`selected[${index}]`]: !this.data.selected[`${index}`],
        active: index,
      });

      // 如果点击的不是当前展开的项，则关闭当前展开的项
      // 这里就实现了点击一项，隐藏另一项
      if (active !== null && active !== index) {
        this.setData({
          [`selected[${active}]`]: false,
        });
      }
    },
  }
})