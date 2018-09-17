Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        hotActivites: [         //热门活动
            { "title": "上海市第十四届乒乓球运动会！", "publishTime": "2019-09-08" },
            { "title": "上海市第十四届乒乓球运动会！", "publishTime": "2019-09-08" },
        ],                      
        error: null,            //错误信息
        personGroups: [         //个人组团
            { "title": "上海北方体育馆有没有人来的？", "publishTime": "2019-09-08" },
            { "title": "这里有两个人，还差一个。", "publishTime": "2019-09-08" },
        ],                      
    },
    //获取服务器热门活动信息
    getHotActivties: function () {
        var that = this
        wx: wx.request({
            url: 'http://localhost:8000/getActivites',
            success: function (res) {
                console.log(res.data.data)
                that.setData({ hotActivites: res.data.data })
            }
        })
    },
    //获取服务器个人组团信息
    getPersonGroups: function(){
        var that = this
        wx: wx.request({
            url: 'http://localhost:8000/getPersonGroups',
            success: function (res) {
                console.log(res.data.data)
                that.setData({ personGroups: res.data.data })
            }
        })
    },
    toMeeting: function(){
        wx.redirectTo({
            url: '../meeting/meeting',
        })
    },
    onLoad: function(){
        //初始化热门活动
        this.getHotActivties()
        //初始化个人组团
        this.getPersonGroups()
    }
})








































