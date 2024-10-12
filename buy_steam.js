async function postData(url = "", params) {
  const formData = new FormData();
  for (let key of Object.keys(params)) {
    formData.append(key, params[key]);
  }
  const data = new URLSearchParams();
  for (const pair of formData) {
    data.append(pair[0], pair[1]);
  }
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  return response.json();
}

function steamBuyRequiredBulk(input, balance, i) {
  if (input.length <= 0) {
    return;
  }

  if (i > input.length) {
    return;
  }

  const subtotal = input[i]["price"];
  const fee1 = (subtotal * 10) / 100;
  const fee2 = (subtotal * 5) / 100;
  const fee = fee1 + fee2;
  const total = subtotal + fee;
  reponseArr.push(
    postData(`https://steamcommunity.com/market/buylisting/${input[i][id]}`, {
      // sessionid: "29e8f0efdc809cef73d590e4",
      currency: "15",
      subtotal: subtotal,
      fee: fee,
      total: total,
      quantity: "1",
    }).then((data) => {
      balance -= total;
      steamBuyRequiredBulk(input, balance, i + 1);
    })
  );
}

// postData("https://steamcommunity.com/market/buylisting/4858898310702656227", {
//   sessionid: "29e8f0efdc809cef73d590e4",
//   currency: "15",
//   subtotal: "19844",
//   fee: "2976",
//   total: "22820",
//   quantity: "1",
// }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
