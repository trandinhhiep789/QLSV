var SInhVienServices = function(){
    //p thức giao tiếp backend qua API => lấy từ server về
    this.layDanhSachSinhVien = function(){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien`, // đường dẫn back end cung cấp
            method: 'GET' //giao thức back end cung cấp
        })
        return promise
    }

    this.xoaSinhVien = function(maSinhVien){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`, // đường dẫn back end cung cấp
            method: 'DELETE' //giao thức back end cung cấp
        })
        return promise
    }

    this.layThongTinSinhVien = function(maSinhVien){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`, // đường dẫn back end cung cấp
            method: 'GET' //giao thức back end cung cấp
        })
        return promise
    }


    this.capNhatSinhVien = function(maSinhVien, sinhVienUpdate){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${maSinhVien}`, // đường dẫn back end cung cấp
            method: 'PUT', //giao thức back end cung cấp
            data: sinhVienUpdate
        })
        return promise
    }

    //tính năng tìm kiếm SV
    this.timKiemSinhVien = function(){
        console.log('chức năng tìm kiếm sv')
        return ''
    }
}
