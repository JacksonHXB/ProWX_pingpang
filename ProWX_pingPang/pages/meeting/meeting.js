var QQMapWX = require('../../js/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
    data:{
        userLongitude: null,                    //用户地址经度
        userLatitude: null,                     //用户地址维度
        userAddress: null,                      //用户地址
        meetingItems: ["","","","","",""],      //模块
        showFlag: false,                        //false表示显示个人组团，true表示显示热门活动
        personGroups: ["","","","",""],         //个人组团列表
        hotActivites: ["", "", "", "", ""],      //热门活动
        hiddenmodalput: true,                   //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
        region: ['广东省', '广州市', '海珠区'],     //默认值
        customItem: '全部',                         //地区选择的默认值
        personGroupList: [],                        //个人组团
        activityList: []                            //活动列表
    },
    onLoad: function() {
        //获取用户位置,并转化为文字
        this.getUserLocation()
        //从服务器获取个人组团的列表
        this.getPersonGroupList()
        //从服务器获取活动的列表
        this.getActivityList()
    },
    onShow: function(){
        //将用户地址存储到本地内存中
        var userLocation = {
            "longtitude": this.data.userLongitude,
            "latitude": this.data.userLatitude,
            "address": this.data.userAddress
        }
        wx.setStorageSync("userLocation", userLocation)
    },
    //获取用户位置并存储到本地内存
    getUserLocation: function () { 
        var that = this
        wx.getLocation({
            success: function(res) {
                var myLatitude = res.latitude
                var myLongitude = res.longitude
                console.log("经度：" + myLongitude + "  维度：" + myLatitude)
                that.setData({ userLongitude: myLongitude, userLatitude: myLatitude})
                //将坐标转化为文字
                that.convertToName()             
            },
        })
    },
    //手动设置我的位置
    setMyAddress: function(){
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                })
            }
        })
    },
    //将经纬度转换为名称
    convertToName: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'SNJBZ-NTH6U-MV5VN-2QX45-YFUVV-GJBDK'
        });
        var that = this
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: that.data.userLatitude,       //传入用户所在位置的经度
                longitude: that.data.userLongitude      //传入用户所在位置的维度
            },
            success: function (res) {
                //获取转换后的用户地址
                that.setData({userAddress: res.result.address})
                //将用户地址存储到本地内存中
                var userLocation = {
                    "longitude": that.data.userLongitude,
                    "latitude": that.data.userLatitude,
                    "address": res.result.address
                }
                wx.setStorageSync("userLocation", userLocation)
            },
            fail: function (res) {
                console.log("convertToName()经纬转换为位置失败！");
            }
        });
    },
    //获取个人组团列表
    personGroupsClick: function(){
        this.setData({showFlag: false})   
    },
    //获取热门活动列表
    hotActivitesClick: function(){
        this.setData({ showFlag: true })
    },
    //点击了筛选按钮
    filter: function () {
        this.setData({hiddenmodalput: !this.data.hiddenmodalput})
    },
    //筛选面板的取消按钮  
    cancel: function () {
        this.setData({hiddenmodalput: true});
    },
    //筛选面板的确认按钮  
    confirm: function () {
        this.setData({hiddenmodalput: true})
    },
    //获取用户选择的地址
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({region: e.detail.value})
    },
    //获取服务器个人组团
    getPersonGroupList: function () {
        var that = this
        wx: wx.request({
            url: 'http://localhost:8000/getPersonGroupList',
            success: function (res) {
                console.log(res.data.data)
                that.setData({ personGroupList: res.data.data })
            }
        })
    },
    //获取服务器活动
    getActivityList: function () {
        var that = this
        wx: wx.request({
            url: 'http://localhost:8000/getActivityList',
            success: function (res) {
                console.log(res.data.data)
                that.setData({ activityList: res.data.data })
            }
        })
    },
    //点击个人组团对象
    personGroupClick: function(e){
        var personGroupId = e.currentTarget.dataset.id          //获取需要传递的ID
        wx.setStorageSync("personGroupId", personGroupId)       //将ID存入到本地内存中
        wx.navigateTo({                                         //跳转到个人组团详情页面
            url: '/pages/personGroup/personGroup',
        })
    },
    //点击热门活动对象
    activityClick: function(e) {
        var personGroupId = e.currentTarget.dataset.id          //获取需要传递的ID
        wx.setStorageSync("activityId", personGroupId)          //将ID存入到本地内存中
        wx.navigateTo({                                         //跳转到个人活动详情页面
            url: '/pages/activity/activity',
        })
    },
    //发布约球
    toPublishGroup: function(){
        wx.navigateTo({                                         
            url: '../publishGroup/publishGroup',
        })
    }
})

