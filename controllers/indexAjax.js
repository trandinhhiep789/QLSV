// console.log(axios)

var svService = new SInhVienServices();

var layThongTinSInhVien = function(){
    var promise = svService.layDanhSachSinhVien()

    promise.then(function(result){
        var content = ''
        //từ dữ liệu tạo table
        for(var i = 0; i < result.data.length; i++){

            //lấy ra từng sinh viên
            var sv = result.data[i];

            var sinhVien = new SinhVien()
            sinhVien.tenSV = sv.tenSinhVien
            sinhVien.maSV = sv.maSinhVien
            sinhVien.emailSV = sv.email
            sinhVien.diemToan = sv.diemToan
            sinhVien.diemLy = sv.diemLy
            sinhVien.diemHoa = sv.diemHoa
            sinhVien.loaiSV = sv.loaiSinhVien
            sinhVien.diemRenLuyen = sv.diemRenLuyen

            content += `
                <tr>
                <td>${sinhVien.maSV}</td>
                <td>${sinhVien.tenSV}</td>
                <td>${sinhVien.emailSV}</td>
                <td>${sinhVien.loaiSV}</td>
                <td>${sinhVien.diemTB().toFixed(2)}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')">Xóa</button></td>
                <td><button class="btn btn-info" onclick="suaSinhVien('${sinhVien.maSV}')">Chỉnh Sửa</button></td>
                </tr>            
            `
        }
        document.getElementById('tblSinhVien').innerHTML = content;
        
    }).catch (function(err){
        alert(err.response.data)
    })
}

layThongTinSInhVien()

//note1 buoi16


// POST: Chức năng thêm sinh viên vào server
document.getElementById('btnThemSV').onclick = function(){
    //lấy thông tin ng dùng nhập từ giao diện

    var st = new SinhVien()

    st.maSV = document.getElementById('maSinhVien').value;
    st.tenSV = document.getElementById('tenSinhVien').value;
    st.emailSV = document.getElementById('emailSinhVien').value;
    st.diemToan = document.getElementById('toan').value;
    st.diemLy = document.getElementById('ly').value;
    st.diemHoa = document.getElementById('hoa').value;
    st.diemRenLuyen = document.getElementById('renLuyen').value;
    st.loaiSV = document.getElementById('loaiSinhVien').value;

    console.log(st)

    // tạo ra object bacl end cần!
    var objectmodel = {
        "maSinhVien": st.maSV,
        "tenSinhVien": st.tenSV,
        "loaiSinhVien": st.loaiSV,
        "diemToan": st.diemToan,
        "diemLy": st.diemLy,
        "diemHoa": st.diemHoa,
        "diemRenLuyen": st.diemRenLuyen,
        "email": st.emailSV
    }

    axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: objectmodel
    }).then(function(result){ // cách 2
        alert(result.data)// thành công
        //cách 1
        //location.reload => load lại file script => gọi api
        //lấy ds sv mới về lại
        // location.reload();

        //cách 2: gọi lại api danhsachThemSinhVien
        layThongTinSInhVien()

    }).catch(function(err){
        console.log(err.response.data) // Thất bại
    })
    
}

var xoaSinhVien = function(maSinhVien){
    alert(maSinhVien)

    //gọi api từ back end => tra promise
    var promise = svService.xoaSinhVien(maSinhVien)
    promise.then(function(result){
        alert(result.data)
        //load lại
        layThongTinSInhVien()
    }).catch(function(err){
        alert(err.response.data)
    })
}

var suaSinhVien= function(maSinhVien){
    // alert(maSinhVien)

    //gọi api lấy thông tin sinh viên về
    var promise = svService.layThongTinSinhVien(maSinhVien)
    promise.then(function(result){
        alert(result.data)

        var SV = result.data
        document.getElementById('maSinhVien').value = SV.maSinhVien 
        document.getElementById('tenSinhVien').value = SV.tenSinhVien
        document.getElementById('emailSinhVien').value = SV.email
        document.getElementById('loaiSinhVien').value = SV.loaiSinhVien
        document.getElementById('toan').value = SV.diemToan
        document.getElementById('ly').value = SV.diemLy
        document.getElementById('hoa').value = SV.diemHoa
        document.getElementById('renLuyen').value =SV.diemRenLuyen

        
    }).catch(function(err){
        alert(err.response.data)
    })
}

document.getElementById('btnCapNhatSV').onclick = function(){
    //khóa nút ko cho sửa mã SV
    document.getElementById('maSinhVien').disabled = true
    
    var SVupdate = new SinhVien()

    SVupdate.maSV = document.getElementById('maSinhVien').value
    SVupdate.tenSV = document.getElementById('tenSinhVien').value
    SVupdate.emailSV = document.getElementById('emailSinhVien').value
    SVupdate.loaiSV = document.getElementById('loaiSinhVien').value
    SVupdate.diemToan = document.getElementById('toan').value
    SVupdate.diemLy = document.getElementById('ly').value
    SVupdate.diemHoa = document.getElementById('hoa').value
    SVupdate.diemRenLuyen = document.getElementById('renLuyen').value
    // console.log(SVupdate.maSV,SVupdate.tenSV);


    // tạo ra object bacl end cần!
    var objectmodel = {
        "maSinhVien": SVupdate.maSV,
        "tenSinhVien": SVupdate.tenSV,
        "loaiSinhVien": SVupdate.loaiSV,
        "diemToan": SVupdate.diemToan,
        "diemLy": SVupdate.diemLy,
        "diemHoa": SVupdate.diemHoa,
        "diemRenLuyen": SVupdate.diemRenLuyen,
        "email": SVupdate.emailSV
    }

    //gọi api cập nhật sinh viên từ back end cung cấp
    var promise = svService.capNhatSinhVien(objectmodel.maSinhVien, objectmodel)
    

    promise.then(function(result){
        console.log(result.data);
        layThongTinSInhVien()
    }).catch(function(err){
        alert(err.response.data)
    })

}

