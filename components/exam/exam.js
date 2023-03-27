Component({
  properties: {},
  data: {
    status: 0, //状态
    left_time: '', //剩余时间
    end_time: '',
    show_tip: true, //用来展示10分钟提示
    list: [{
        id: 1,
        question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
        question_type: 1, //单选题
        option_list: [{
            id: 1001,
            option_label: 'A',
            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分',
          },
          {
            id: 1002,
            option_label: 'B',
            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题',
          },
          {
            id: 1003,
            option_label: 'C',
            option_name: 'RTS/CTS机制适合于传输较大的帧时使用',
          },
          {
            id: 1004,
            option_label: 'D',
            option_name: '以上均不正确',
          },
        ]
      },
      {
        id: 2,
        question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
        question_type: 2, //单选题
        option_list: [{
            id: 2001,
            option_label: 'A',
            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分',
          },
          {
            id: 2002,
            option_label: 'B',
            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题',
          },
          {
            id: 2003,
            option_label: 'C',
            option_name: 'RTS/CTS机制适合于传输较大的帧时使用',
          },
          {
            id: 2004,
            option_label: 'D',
            option_name: '以上均不正确',
          },
        ]
      },
    ],
    left_time_out: "",
  },
  methods: {
    //单选
    radioChange(e) {
    },
    //多选
    checkboxChange(e) {
      var list = this.data.list
      var index = e.currentTarget.dataset.index
      var values = e.detail.value
      for (let i = 0, lenI = list.length; i < lenI; ++i) {
        for (let j = 0; j < list[i].option_list.length; j++) {
          if (i == index) {
            for (let g = 0, lenG = values.length; g < lenG; ++g) {
              if (list[i].option_list[j].id == values[g]) {
                list[i].option_list[j].checked = true
                // list[i].checked = true
                break
              }
            }
          }else{
            list[i].option_list[j].checked = false
          }
          
        }
      }
      this.setData({
        list: list
      })
    },

    //提交试卷
    submitPaper: function () {
      var _this = this
      var list = _this.data.list
      let unIndex = [];
      list.forEach((item, index) => {
        let chosed = [];
        item.option_list.forEach(item0 => {
          if (item0.checked) {
            chosed.push({
              id: item0.id
            })
          }
        })
        item.chosed = chosed.length > 0 ? true : false

        if (!item.chosed) {
          unIndex.push(index + 1)
        }
      })

      if (unIndex.length > 0) {
        wx.showToast({
          title: '第' + unIndex[0] + '题目未作答',
          icon: "error"
        })
        return false
      }
      // _this.savePaper()
    },
  }
})