/**
 * Created by Administrator on 2016/6/29.
 */
define([
    'common/base/base_view',
    'text!module/Associations/templates/associations.html',
    'marionette',
    'common/region/switch_view_region',
    'common/views/loginBar',
    'module/Associations/views/associationsHeadView',
    'module/Associations/views/associationsMemberView',
    'module/Associations/views/associationsFansView',
    'module/userCenter/views/workListView',
    'module/home/views/home_footer',
    'msgbox'
],function(BaseView,AssociationsTpl,mn,SwitchViewRegion,LoginBarView,AssociationsHeadView,AssociationsMemberView,AssociationsFansView,WorkListView,FooterView,MsgBox){
    var associationsView = BaseView.extend({
        id:"AssociationsContainer",
        template: _.template(AssociationsTpl),
        _assoId:"", //当前社团ID
        initialize:function(){
            var self = this;
            self._loginBarView = new LoginBarView();
            self._associationsHeadView = new AssociationsHeadView();
            self._associationsMemberView = new AssociationsMemberView();
            self._associationsFansView = new AssociationsFansView();
            self._workListView = new WorkListView();
            self._workListView.on("workListView:change",self._workListChangeHandler,self);
            self._footerView = new FooterView();
        },
        ui:{
            "loadingContainer":".loading-gif",
            "loadMsg":"#mz-square-sk-text",
            "mainLeft":"#main_left"
        },
        regions : {
            LoginBarRegion: {
                el: "#associationsLogin",
                regionClass: SwitchViewRegion
            },
            "headInfo":"#associations_header",
            "memberList":"#associateMember",
            "fansList":"#associateAttention",
            "workList":"#main_left",
            "footerCon":"#footer"
        },
        onRender:function(){
            var self = this;
            self.getRegion("headInfo").show(self._associationsHeadView);
            self.getRegion("memberList").show(self._associationsMemberView);
            self.getRegion("fansList").show(self._associationsFansView);
            self.getRegion("workList").show(self._workListView);
            self.getRegion("footerCon").show(this._footerView);
        },
        show:function(){
            var self = this;
            //查询当前登录用户已关注用户ID列表 已点赞话题(插画)ID列表 add by guYY 7/14 20:50
            var _user = gili_data.getCurrentUser();
            utils.loadAttentionList(_user.id);
            utils.loadLikedTplList(_user.id);
            self.LoginBarRegion.show(self._loginBarView);
            self._assoId = self.getOption("assoId");
            if(!self._assoId) {
                MsgBox.alert("无效路由");
                return;
            }
            self.data_finish = false;
            self.updateMsg([1]);
            self.addOnScroll();
            //根据社团ID查询社团对象
            self._associationsHeadView._loadData(self._assoId);
            self._associationsMemberView._loadData(self._assoId);
            self._associationsFansView._loadData(self._assoId);
            self._workListView.loadAssociationsData(self._assoId);
        },
        onLoginOkHandler:function(){
            this.show();
        },
        pageIn:function(){
            var self = this;
            //点赞列表发生变化
            app.on("common:works:liked",self.likedChangeHandler,self);
            //登录登出刷新
            app.on("login:ok", self.onLoginOkHandler, self);
        },
        //列表状态更新
        _workListChangeHandler:function(type){
            var self = this;
            self.updateMsg(type);
        },
        //点赞插画列表发生变化触发  全局
        likedChangeHandler:function(arr){
            this._workListView.collection.reset(this._workListView.collection.models);
        },
        /**
         * 更新状态
         * @param typeArr 数组
         *         索引0： 0:加载出错  1:数据正常加载  2:数据加载结束
         */
        updateMsg:function(typeArr){
            var self = this;
            self.ui.loadingContainer.find("img").show();
            self.ui.loadMsg.html("你的大片正在加载...");
            self.ui.mainLeft.remove("#noContent");
            if(typeArr && typeArr.length > 0){
                if(typeArr[0] == 0){   //加载出错时，有数据只文案提示  无数据显示缺省无网状态且文案提示
                    self.ui.loadingContainer.find("img").hide();
                    self.ui.loadMsg.html("网络不好,请重试");
                }else if(typeArr[0] == 1){ //数据正常加载
                    self.ui.loadingContainer.find("img").show();
                    self.ui.loadMsg.html("正在加载");
                }else if(typeArr[0] == 2){ //数据加载结束
                    self.data_finish = true;
                    self.ui.loadingContainer.find("img").hide();
                    self.ui.loadMsg.html("没有更多了");
                    if(self.ui.mainLeft.find(".uc_info_item").length <= 0){
                        self.ui.loadMsg.html("");
                        self.ui.mainLeft.append("<div id='noContent'>该社团暂无动态消息</div>");
                    }
                }
            }
        },
        //滚动容器添加滚动事件
        addOnScroll:function(){
            var self = this;
            window.onscroll = function(e){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                if(scrollTop + window.innerHeight > document.body.offsetHeight-600){
                    if(!self.data_finish)
                        self._workListView.scrollUpdate();
                }
            }
        },
        close:function(){
            window.onscroll = null;
            app.off("common:works:liked",this.likedChangeHandler,this);
            this.LoginBarRegion.hide(this._loginBarView);
            //登录登出刷新
            app.off("login:ok", this.onLoginOkHandler, this);
        }
    });
    return associationsView;
});
