//输出的是一个object对象
// module.exports={
//   userName:"Jack",
//   sayHello:function(){
//     return 'Hello'
//   }
// }

//通过对象的key进行输出，暴露对象的key
exports.userName="Tom"
exports.sayHello=function(){
  return 'Hello'
}