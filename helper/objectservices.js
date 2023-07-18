 
class helper{
   convertToDynamoDBFormat(obj) {
    const dynamoDBObj = {};
  
    for (const prop in obj) {
      const value = obj[prop];
  
      switch (typeof value) {
        case 'string':
          dynamoDBObj[prop] = { S: value };
          break;
        case 'number':
          dynamoDBObj[prop] = { N: value.toString() };
          break;
        case 'boolean':
          dynamoDBObj[prop] = { BOOL: value };
          break;
        case 'object':
          if (Array.isArray(value) && value.length > 0) {
            const firstItemType = typeof value[0];
  
            switch (firstItemType) {
              case 'string':
                dynamoDBObj[prop] = { SS: value };
                break;
              case 'number':
                dynamoDBObj[prop] = { NS: value.map((num) => num.toString()) };
                break;
              // Handle additional array data types here
              default:
                dynamoDBObj[prop] = { L: value.map((item) => convertToDynamoDBFormat(item)) };
                break;
            }
          } else {
            dynamoDBObj[prop] = { M: convertToDynamoDBFormat(value) };
          }
          break;
        // Handle additional data types here
        default:
          dynamoDBObj[prop] = { NULL: true };
          break;
      }
    }
  
    return dynamoDBObj;
  }
  
}
module.exports=helper;
