var express = require("express");
var router = express.Router();

var User = require("./../models/user"); //获取这个模型才可以通过User，通过mongoose操作MongoDB的API

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
router.get("/test", function(req, res, next) {
  res.send("test");
});

//登录接口
router.post("/login", function(req, res, next) {
  var param = {
    userName: req.body.userName, //post是通过.body拿到请求的参数
    userPwd: req.body.userPwd
  };
  User.findOne(param, function(err, doc) {
    if (err) {
      //异常情况
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      //成功获取到用户
      if (doc) {
        //用户名保存到cookie
        // server/routes/app.js：cookieParser插件--中间件--专门作cookie处理的
        //在res里面写前端才可以拿得到这个cookie
        res.cookie("userId", doc.userId, {
          path: "/",
          maxAge: 1000 * 60 * 60 //cookie的周期,1小时
        });
        res.cookie("userName", doc.userName, {
          path: "/",
          maxAge: 1000 * 60 * 60 //cookie的周期,1小时
        });
        /*         Cookie的数据信息存放在客户端浏览器上。
Session的数据信息存放在服务器上。 */

        //也可以通过session去存,存到req
        //req是客户端发过来的请求,session是在request里面
        //存到cookie也行,但是cookie会伪造,session可以实时拿到用户信息
        // req.session.user = doc;


        // 后端把用户信息写进去res,前端才能拿
        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName
          }
        });
      }
    }
  });
});

//登出接口
router.post("/logout", function (req,res,next) {
  //登出所以清除cookie,maxAge:-1cookie失效
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  //清除userName自己写的
  res.cookie("userName","",{
    path:"/",
    maxAge:-1
  });
  //登出不涉及数据库,没有异常err情况
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

// 校验是否登录
router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
      res.json({
        status:'0',
        msg:'',
        result:req.cookies.userName || ''
      });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

//查询当前用户的购物车数据
router.get("/cartList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
          if(doc){
            res.json({
              status:'0',
              msg:'',
              result:doc.cartList
            });
          }
      }
  });
});

module.exports = router;
