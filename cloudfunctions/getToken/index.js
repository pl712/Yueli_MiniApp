// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.action) {
    case 'getcellphone':{
      return getCellphone(event);
    }
    default: {
      return
    }
  }
}

async function getCellphone(event){
  console.log(event.id.data.phoneNumber);
  return event.id.data.phoneNumber;
}