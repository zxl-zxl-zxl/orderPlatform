var express = require("express");
var router = express.Router(); // 拿到express框架的路由
var mongoose = require("mongoose");
var Goods = require("../models/goods");

//连接MongoDB数据库,数据库的名称叫dumall
mongoose.connect("mongodb://127.0.0.1:27017/dumall");

// 连接成功操作
mongoose.connection.on("connected", function() {
  console.log("MongoDB connected success.");
});

// 连接失败操作
mongoose.connection.on("error", function() {
  console.log("MongoDB connected fail.");
});

// 连接断开操作
mongoose.connection.on("disconnected", function() {
  console.log("MongoDB connected disconnected.");
});

//查询商品列表数据
//二级路由
router.get("/list", function(req, res, next) {
  // res.send('hello,goods list');  // 测试路由，连接成功页面出现'hello,goods list'
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel"); //传过来的价格区间
  let sort = req.param("sort");
  let skip = (page - 1) * pageSize;
  var priceGt = "",
    priceLte = "";
  let params = {};
  
  if (priceLevel != "all") {
    //价格区间过滤功能
    switch (priceLevel) {
      case "0":
        priceGt = 0;
        priceLte = 100;
        break;
      case "1":
        priceGt = 100;
        priceLte = 500;
        break;
      case "2":
        priceGt = 500;
        priceLte = 1000;
        break;
      case "3":
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    //1)条件查询
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    };
  }
//2)分页skip+limit
  let goodsModel = Goods.find(params)
    .skip(skip)
    .limit(pageSize);
  //3)sort排序
  goodsModel.sort({ salePrice: sort });
  // 连接成功之后，用model的good商品模型查询到数据库的goods集合。
  goodsModel.exec(function(err, doc) {
    // Goods来自models/goods.js;导出的是mongoose的商品模型，可使用mongoose的API方法
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        msg: "",
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

//加入到购物车
//二级路由,一级路由在app.js
router.post("/addCart", function (req,res,next) {
  var userId = '100000077',productId = req.body.productId;
  var User = require('../models/user');
  // 查询第一条:拿到用户信息
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        console.log("userDoc:"+userDoc); // 用户数据
        if(userDoc){//用户存在
          var goodsItem = '';
          // 遍历用户购物车，判断加入购物车的商品是否已经存在
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);// 添加信息到用户购物车列表中//与MySQL不一样
                  userDoc.save(function (err2,doc2) {// 保存数据库
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});

// //查询商品列表数据
// router.get("/list", function (req,res,next) {
//   let page = parseInt(req.param("page"));
//   let pageSize = parseInt(req.param("pageSize"));
//   let priceLevel = req.param("priceLevel");
//   let sort = req.param("sort");
//   let skip = (page-1)*pageSize;
//   var priceGt = '',priceLte = '';
//   let params = {};
//   if(priceLevel!='all'){
//     switch (priceLevel){
//       case '0':priceGt = 0;priceLte=100;break;
//       case '1':priceGt = 100;priceLte=500;break;
//       case '2':priceGt = 500;priceLte=1000;break;
//       case '3':priceGt = 1000;priceLte=5000;break;
//     }
//     params = {
//       salePrice:{
//           $gt:priceGt,
//           $lte:priceLte
//       }
//     }
//   }
//   let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
//   goodsModel.sort({'salePrice':sort});
//   goodsModel.exec(function (err,doc) {
//       if(err){
//           res.json({
//             status:'1',
//             msg:err.message
//           });
//       }else{
//           res.json({
//               status:'0',
//               msg:'',
//               result:{
//                   count:doc.length,
//                   list:doc
//               }
//           });
//       }
//   })
// });

// //加入到购物车
// router.post("/addCart", function (req,res,next) {
//   var userId = '100000077',productId = req.body.productId;
//   var User = require('../models/user');
//   User.findOne({userId:userId}, function (err,userDoc) {
//     if(err){
//         res.json({
//             status:"1",
//             msg:err.message
//         })
//     }else{
//         console.log("userDoc:"+userDoc);
//         if(userDoc){
//           var goodsItem = '';
//           userDoc.cartList.forEach(function (item) {
//               if(item.productId == productId){
//                 goodsItem = item;
//                 item.productNum ++;
//               }
//           });
//           if(goodsItem){
//             userDoc.save(function (err2,doc2) {
//               if(err2){
//                 res.json({
//                   status:"1",
//                   msg:err2.message
//                 })
//               }else{
//                 res.json({
//                   status:'0',
//                   msg:'',
//                   result:'suc'
//                 })
//               }
//             })
//           }else{
//             Goods.findOne({productId:productId}, function (err1,doc) {
//               if(err1){
//                 res.json({
//                   status:"1",
//                   msg:err1.message
//                 })
//               }else{
//                 if(doc){
//                   doc.productNum = 1;
//                   doc.checked = 1;
//                   userDoc.cartList.push(doc);
//                   userDoc.save(function (err2,doc2) {
//                     if(err2){
//                       res.json({
//                         status:"1",
//                         msg:err2.message
//                       })
//                     }else{
//                       res.json({
//                         status:'0',
//                         msg:'',
//                         result:'suc'
//                       })
//                     }
//                   })
//                 }
//               }
//             });
//           }
//         }
//     }
//   })
// });

module.exports = router;
