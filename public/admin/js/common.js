//处理表单数据为json格式
function serializeArrayToJson(form) {
    let formArr = form.serializeArray();
    let jsonObj = {}
    formArr.forEach(element => {
        jsonObj[element.name] = element.value;
    });
    return jsonObj;
}