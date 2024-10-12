let requestUrl = [];
for (let i = 0; i < urlData.length; i++) {
  requestUrl.push(getFloat(urlData[i]));
}

async function getURL() {
  const requestUrlArr = await Promise.all(requestUrl).then(
    async (responses) => {
      const arr = [];
      for (let i = 0; i < responses.length; i++) {
        arr.push(await responses[i].json());
      }
      return arr;
    }
  );
  console.log(requestUrlArr);
  let arr = [];
  for (let i = 0; i < requestUrlArr.length; i++) {
    arr.push(requestUrlArr[i].iteminfo.floatvalue);
  }
  console.log(arr.join(","));
}

function getFloat(url) {
  return fetch(`https://api.csfloat.com/?url=${url}&minimal=true`);
}

getURL();
