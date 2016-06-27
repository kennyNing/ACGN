// 文件名称: LoginBox
//
// 创 建 人: fishYu
// 创建日期: 2016/6/27 22:52
// 描    述: 登录弹出框
define([
    'text!common/templates/loginBoxUI.html',
    "showbox"
],function(tpl,ShowBox) {

    if(!ShowBox){
        require(["showbox"],function(showbox){
            ShowBox = showbox;
        });
    }

    var LoginBoxUI = function(){
        this._template = _.template(this._tpl || tpl);
        this.$el = $("<div>");
        this.el = this.$el.get(0);
        this.$el.html(this._template);

        this.loginContainerMask = this.el.querySelector(".login-container-mask");
        this.loginAccount = this.el.querySelector(".account-txt");
        this.loginPassword = this.el.querySelector(".password-txt");
        this.loginBtn = this.el.querySelector(".login-btn");
        this.forgotPassword = this.el.querySelector(".forgot-password");
        this.goSignUp = this.el.querySelector(".go-sign-up");
        this.microBlogLogin = this.el.querySelector(".micro-blog-login");
        this.qqLogin = this.el.querySelector(".qq-login");

        this._initView();
    };
    var p = LoginBoxUI.prototype;
    p._initView = function(){
        var self = this;
        self.addListener();
    };
    p.addListener = function(){
        var self = this;
        /**
         * 朦层点击
         */
        self._loginMaskHandle = self.loginMaskHandle.bind(self);
        self.loginContainerMask.addEventListener("click", self._loginMaskHandle, false);

        /**
         * 登录
         */
        self._bindLoginHandle = self.loginHandle.bind(self);
        self.loginBtn.addEventListener("click", self._bindLoginHandle, false);
        /**
         * 忘记密码
         */
        self._forgotPasswordHandle = self.forgotPasswordHandle.bind(self);
        self.forgotPassword.addEventListener("click", self._forgotPasswordHandle, false);
        /**
         * 去注册
         */
        self._goSignUpHandle = self.goSignUpHandle.bind(self);
        self.goSignUp.addEventListener("click",self._goSignUpHandle, false);
        /**
         * 微博登录
         */
        self._microBlogLoginHandle = self.microBlogLoginHandle.bind(self);
        self.microBlogLogin.addEventListener("click",self._microBlogLoginHandle, false);
        /**
         * QQ登录
         */
        self._qqLoginHandle = self.qqLoginHandle.bind(self);
        self.qqLogin.addEventListener("click", self._qqLoginHandle, false);
    };
    p.removeListener = function(){
        var self = this;
        /**
         * 朦层点击
         */
        self.loginContainerMask.removeEventListener("click", self._loginMaskHandle, false);
        self._loginMaskHandle = null;
        /**
         * 登录
         */
        self.loginBtn.removeEventListener("click", self._bindLoginHandle, false);
        self._bindLoginHandle = null;
        /**
         * 忘记密码
         */
        self.forgotPassword.removeEventListener("click", self._forgotPasswordHandle, false);
        self._forgotPasswordHandle = null;
        /**
         * 去注册
         */
        self.goSignUp.removeEventListener("click",self._goSignUpHandle, false);
        self._goSignUpHandle = null
        /**
         * 微博登录
         */
        self.microBlogLogin.removeEventListener("click",self._microBlogLoginHandle, false);
        self._microBlogLoginHandle = null;
        /**
         * QQ登录
         */
        self.qqLogin.removeEventListener("click", self._qqLoginHandle, false);
        self._qqLoginHandle = null;

    };
    /**
     * 蒙层点击事件
     * @param e
     */
    p.loginMaskHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        console.log( e, "loginMaskHandle");
        self._hide();
    }
    /**
     * 登录按钮点击事件
     * @param e
     */
    p.loginHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        var account = self.loginAccount.value;
        var password = self.loginPassword.value;
        console.log(self.loginAccount,self.loginPassword, e, "loginHandle", account, "----", password);
        self._hide();
        //派发自定义事件
        app.triggerMethod("login:ok");
    };
    /**
     * 忘记密码点击事件
     * @param e
     */
    p.forgotPasswordHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        console.log(e, "forgotPasswordHandle");
    };
    /**
     * 去注册点击事件
     * @param e
     */
    p.goSignUpHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        console.log(e, "goSignUpHandle");
        self._hide();
        ShowBox.register();
    };
    /**
     * 第三方登录--微博登录点击事件
     * @param e
     */
    p.microBlogLoginHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        console.log(e, "microBlogLoginHandle");
    };
    /**
     *第三方登录--QQ登录点击事件
     * @param e
     */
    p.qqLoginHandle = function(e){
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        console.log(e, "qqLoginHandle");
    };
    p._hide = function(){
        var self = this;
        self.removeListener();
        ShowBox.remove(this);
        self.destroy();
    };

    p.destroy = function(){
        var self = this;
        self._template = null;
        self.$el = null;
        self.el = null;

        self.loginContainerMask = null;
        self.loginAccount = null;
        self.loginPassword = null;
        self.loginBtn = null;
        self.forgotPassword = null;
        self.goSignUp = null;
        self.microBlogLogin = null;
        self.qqLogin = null;
    };

    p.show = function(){
        ShowBox.add(this);
    };

    return LoginBoxUI;

});