console.log(1)


var renderTitleH1 = function(title){
    var tagBody = document.querySelector('body')
    tagBody.innerHTML = `<h1>${title}</h1>`
}




//tham số có thể là hàm!
var main = function (callback){
    callback('Hiep')
}

main(renderTitleH1)