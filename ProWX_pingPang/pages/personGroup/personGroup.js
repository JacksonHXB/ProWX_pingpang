Page({
    data:{
        userLocation: {},                   //用户位置及地址
        groupInfo: {},                      //个人组团简介
        content: null
         
    },
    onLoad: function(){
        this.init()
        //初始化个人组团简介
        this.getGroupInfo()
    },
    init: function(){
        //获取用户位置
        location = wx.getStorageSync("userLocation")
        this.setData({ userLocation: location })
    },
    //获取个人组团简介
    getGroupInfo: function(){
        var groupId = wx.getStorageSync("personGroupId")
        var that = this
        wx.request({
            url: 'http://localhost:8000/getGroupDetail/'+groupId,
            success: function(res){
                console.log(wx.getStorageSync("userLocation"))
                console.log(res.data.data[0])
                that.setData({groupInfo: res.data.data[0]})
            }
        })
    },
    test: function(e){
        var mycontent = e.detail.value        //评论的内容
        this.setData({content: mycontent})
    },
    test2: function(){
        var noteId = 1                     //帖子（组团/活动）的ID
        var commentId = 0                   //评论的ID
        wx.request({
            url: 'http://localhost:8000/publishComment',                        //请求地址
            method: "POST",                 //请求类型
            data: {
                "content": this.data.content,
                "noteId": noteId,
                "commentId": commentId
            },
            success: function (res) {
                console.log(res)
            },
            fail: function () {
                console.log("评论失败！")
            }
        })
    },
    //发布评论
    publishCommentClick: function(e){
        var userComment = e.detail.value
    }
})