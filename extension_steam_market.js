// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

window.addEventListener("load", function () {
  var resultTable = document.getElementById("searchResultsTable");
  var button = document.createElement("button");
  button.innerHTML = "Copy";
  resultTable.insertBefore(
    document.createElement("br"),
    resultTable.childNodes[0]
  );
  resultTable.insertBefore(button, resultTable.childNodes[0]);
  button.onclick = () => {
    exec();
  };
});

function exec() {
  var tags = document.getElementsByTagName("csfloat-item-row-wrapper");
  var marketListing = document.getElementsByClassName(
    "market_listing_item_name"
  );
  var marketPrice = document.getElementsByClassName(
    "market_listing_price market_listing_price_with_fee"
  );
  var found = [];
  for (var i = 0; i < tags.length; i++) {
    const marketItem = marketListing[i];
    const itemId = marketItem.id.split("listing_")[1].split("_name")[0];
    const itemPrice = marketPrice[i].innerText;
    const text = tags[i].shadowRoot
      .querySelector("div")
      .textContent.split(":")[1]
      .split("\n")[0]
      .trim();
    if (text.indexOf("0.") === -1) {
      continue;
    }
    found.push({
      id: itemId,
      float: text,
      price: itemPrice,
    });
  }
  console.log(JSON.stringify(found));
  // let str = found.join(",");
  // console.log(str);
  let temp = document.createElement("textarea");
  document.body.append(temp);
  temp.value = str;
  temp.select();
  document.execCommand("copy");
  temp.remove();
}
