const getEle = (selector) => {
  return document.querySelector(selector);
}
let listItemImg = [];
let listItemHighlight = [];
const addItem = (event, element) => {
  event.preventDefault();
  let div = document.createElement("div");
  div.innerHTML = element.childNodes[1].outerHTML
  element.appendChild(div);
  changeValue();
  renderJson();
}

const renderJson = () => {
  let input = document.querySelectorAll("input, textarea");
  let flag = true;
  input.forEach(item => {
    if (item.value.trim() == "") {
      flag = false;
      item.style.border = "1px solid red";
    } else {
      item.style.border = "2px solid green";
    }
  });
  if (flag) {
    getEle(".message").innerHTML = "Success";
    getEle(".form").style.border = "2px solid green";
  } else {
    getEle(".message").innerHTML = "Error";
    getEle(".form").style.border = "1px solid red";
  }
  let arrImg = [];
  let arrhighlight = [];
  let img = document.querySelectorAll("#images");
  let highlight = document.querySelectorAll("#highlight");
  img.forEach(item => arrImg.push(`"${item.value}"`));
  highlight.forEach(item => arrhighlight.push(`"${item.value}"`));
  let json = `
          {
            "id": 1,
            "name": "${getEle("#name").value}",
            "price": ${parseInt(getEle("#price").value)},
            "description": "${getEle("#description").value}",
            "color": ["red", "blue", "white", "gray"],
            "promotion": ${parseInt(getEle("#promotion").value)},
            "imageThumb": "${getEle("#imageThumb").value}",
            "listImage": [${arrImg.join()}],
            "quantitySold": 472,
            "highlights": [${arrhighlight.join()}],
            "specifications": {
              "length": ${parseInt(getEle("#length").value)},
              "width": ${parseInt(getEle("#width").value)},
              "height": ${parseInt(getEle("#height").value)},
              "mass": ${parseInt(getEle("#mass").value)},
              "loadBearing": "${getEle("#loadBearing").value}",
              "material": "${getEle("#material").value}",
              "attach": "${getEle("#attach").value}",
              "deliveryTime": {
                "sameProvince": "${getEle("#sameProvince").value}",
                "otherProvince": "${getEle("#otherProvince").value}"
              },
              "insurance": {
                "time": "${getEle("#time").value}",
                "warrantyVoucher": "${getEle("#warrantyVoucher").value}"
              }
            },
            "evaluate": [
              {
                "id": 1,
                "name": "Nguyễn Văn Bảo",
                "star": 4,
                "comment": "sản phẩm tốt, rất xứng đáng",
                "recomment": [
                  {
                    "id": 1,
                    "name": "admin",
                    "note": "Cảm ơn bạn"
                  }
                ]
              }
            ]
          }
      `;
  const eleJson = getEle(".json");
  eleJson.value = json;
}
const changeValue = () => {
  let input = document.querySelectorAll("input, textarea");
  input.forEach(item => {
    item.addEventListener("keyup", renderJson)
  });
}

const addImages = getEle("#addImage");
const addHighlight = getEle("#addHighlight");
addImages.addEventListener("click", (event) => { addItem(event, getEle(".form__render--image")) });
addHighlight.addEventListener("click", (event) => { addItem(event, getEle(".form__highlights")) });
renderJson();
changeValue();