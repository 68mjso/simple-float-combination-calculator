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

function steamBuyRequiredBulk(input, sessionId, i) {
  if (input.length <= 0) {
    return;
  }

  if (i >= input.length) {
    return;
  }

  const subtotal = Math.ceil((input[i]["price"] / 115) * 100);
  const fee1 = Math.floor((subtotal * 10) / 100);
  const fee2 = Math.floor((subtotal * 5) / 100);
  const fee = fee1 + fee2;
  const total = input[i]["price"];
  postData(`https://steamcommunity.com/market/buylisting/${input[i]["id"]}`, {
    sessionid: sessionId,
    currency: "15",
    subtotal: total - fee,
    fee: fee,
    total: total,
    quantity: "1",
  }).then((data) => {
    steamBuyRequiredBulk(input, sessionId, i + 1);
  });
}
