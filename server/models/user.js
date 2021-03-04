// 对应数据库用户数据在resource文件夹的dumall-users
var mongoose = require('mongoose');

// 定义一个Schema
var userSchema = new mongoose.Schema({
  //定义用户信息的字段
  "userId":String,// 或者 'userId':{type:String}
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  // 购物车列表
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,// 是否选中
      "productNum":Number// 商品数量
    }
  ],
  //用户的地址列表
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});
// 输出(导出)
module.exports = mongoose.model('User',userSchema,'users'); 
//加【,'users'】的话:指定后面注明链接的是数据库的users集合

// module.exports = mongoose.model("User",userSchema);
/* 定义一个user模型，可以根据这个模型调用其API方法。
不加【,'users'】的话:这个模型定义的是数据库dumall的users集合数据，所以这个model取名user是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"users"来查找数据集合 [默认这样子操作的]。 */
