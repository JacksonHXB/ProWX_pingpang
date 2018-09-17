Page({
    data:{
        date: null,                                 //预定日期
        time: null,                                 //预定时间
        publishData: {
            "title": "标题",                        //组团的标题
            "groupContent": "发布内容",              //组团的内容
            "groupTime": null,                      //组团时间
            "inviteNum":2,                          //邀请的人数
            "groupLongtitude": 100.00,               //组团的精度
            "groupLatitude": 100.00,                 //组团的维度
            "addrDetail": "上海市浦东软件园",          //组团的地址
        } 
    },
    //人数选择拖动一次触发的事件
    sliderClick: function(e){
        //邀请人数赋值
        var inviteNum = "publishData.inviteNum"
        this.setData({
            [inviteNum]: e.detail.value
        })
    },
    //点击发布
    publishClick:function(e){
        console.log(e)
        // 给字典类型的全局变量赋值
        // var title = "publishData.title"
        // this.setData({
        //     [title]: e.detail.value.title,
        // })
        wx.request({
            url: 'http://localhost:8000/publishGroup/',         //这里一定要加“/”，否则会报301错误
            method:"POST",
            header:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data:{
                title: e.detail.value.title,                        
                groupContent: e.detail.value.groupContent,                    
                groupTime: this.data.date + " " + this.data.time,                      
                inviteNum: this.data.publishData.inviteNum,                          
                groupLongtitude: 100.00,               
                groupLatitude: 100.00,                 
                addrDetail: e.detail.value.addrDetail,
                userId: 2                                   //这个userId需要更改
            },
            success: function(){
                console.log("发布成功！")
            },
            fail: function(){
                console.log("发布失败！")
            }
        })
    },
    formReset: function(e){
        console.log("重置")
    },
    //预定日期
    bindDateChange:function(e){
        this.setData({date: e.detail.value})
    },
    //预定时间
    bindTimeChange:function(e){
        this.setData({time: e.detail.value})
    },
})