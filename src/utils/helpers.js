export function jsonToUrlEncoded(jsonObj) {
  return Object.keys(jsonObj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(jsonObj[key]))
    .join('&');
}

// 使用示例
// const jsonData = {
//   username: 'JohnDoe',
//   password: 'SecureP@ss',
//   rememberMe: true
// };

// const urlEncodedData = jsonToUrlEncoded(jsonData);
// console.log(urlEncodedData);