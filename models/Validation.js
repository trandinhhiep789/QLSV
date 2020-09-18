var Validatioin =  function(){

    //phương thức kiểm tra rỗng
    this.kiemTraRong = function(value, name, selectorError){
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML 
            = `${name} Khong Duoc Trong!`
            return false
        }
        document.querySelector(selectorError).innerHTML 
        = ''
        return true
    }

    //kiểm tra chữ
    this.kiemTraChu = function(value, name, selectorError){
        var regexAll =  /^[A-Za-z]+$/
        if(regexAll.test(value)){
            document.querySelector(selectorError).innerHTML=''
            return true
        }
        document.querySelector(selectorError).innerHTML 
        = `${name} Phai la chu!`
        return false
    }

    //kiểm tra định dạng email
    this.kiemTraDinhDangEmail = function(value, name, selectorError){
        var regexEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexEmail.test(value)){
            document.querySelector(selectorError).innerHTML=''
            return true
        }
        document.querySelector(selectorError).innerHTML 
        = `${name} Dinh dang Khong hop le!`
        return false
    }

    this.kiemTraDiem = function(value, name, selectorError){
        var regexDiem =  /^[0-9]+$/
        if(regexDiem.test(value)){
            document.querySelector(selectorError).innerHTML=''
            return true
        }
        document.querySelector(selectorError).innerHTML 
        = `${name} Khong hop le!`
        return false
    }

    this.kiemTraGiaTriDiem = function(value, name, selectorError, minValue, maxValue){
        // var regexDiem =  /^[0-9]+$/
        if(value > maxValue || value < minValue){
            document.querySelector(selectorError).innerHTML 
            = `${name} Diem phai tu 0-10!`
            return false
        }
        document.querySelector(selectorError).innerHTML=''
            return true
    }

    this.kiemTraDoDai = function(value, name, selectorError, minLength, maxLength){

        if(value.trim().length > maxLength || value.trim().length < minLength){
            document.querySelector(selectorError).innerHTML 
            = `${name} từ ${minLength} tới ${maxLength} ký tự`
            return false
        }
        document.querySelector(selectorError).innerHTML=''
            return true
    }
}