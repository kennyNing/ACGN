// 文件名称: loginBar.js
//
// 创 建 人: zhao
// 创建日期: 2016/6/22 15:22
// 描    述: 登陆通用栏
define([
    'common/base/item_view',
    'text!common/templates/loginBar.html',
    'marionette'
],function(ItemView, tpl, mn){
    return ItemView.extend({
        className : "loginBarContainer",
        template : _.template(tpl),

        _mouseLock : false,

        // key : selector
        ui : {
            userPic : ".loginBar-headPic",
            userName: ".loginBar-username",
            bnPublish : ".loginBar-bnPublish"
        },
        //事件添加
        events : {
            "click @ui.bnPublish" : "onPublishHandle"
        },
        /**初始化**/
        initialize : function(){
        },

        //在开始渲染模板前执行，此时当前page没有添加到document
        onBeforeRender : function(){
        },

        //渲染完模板后执行,此时当前page没有添加到document
        onRender : function(){
        },

        //页间动画已经完成，当前page已经加入到document
        pageIn : function(){
            var self = this;
            self.init();
            self.$el.show();

        },

        init : function(){
            var self = this;
            var headUrl = 'images/temp/smallhead/head.png';
            var userName = "道道好厉害";
            self.ui.userPic.css({"background" : "url('"+headUrl+"') repeat center", "background-size" : "100%"});
            self.ui.userName.html(userName);
        },

        onPublishHandle : function(e){

        },

        /*点击事件不可以重复点*/
        _checkMouseLock : function () {
            var self = this;
            if (self._mouseLock) return true;
            self._mouseLock = true;
            setTimeout(function () {
                self._mouseLock = false;
            }, 200);
            return false;
        },

        /**页面关闭时调用，此时不会销毁页面**/
        close : function(){
            this.$el.hide();
        },

        //当页面销毁时触发
        onDestroy : function(){
        }

    });
});