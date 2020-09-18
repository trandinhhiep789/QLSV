//tạo ra mảng dữ liệu quản lý các sinh viên 
//(thực chất danh sách liên kết)
var mangSinhVien = []

var validate = new Validatioin();


// định nghĩa sự kiện khi click
document.getElementById('btnThemSV').onclick = function(){
    var sv = new SinhVien();

    sv.maSV = document.getElementById('maSinhVien').value;
    sv.tenSV = document.getElementById('tenSinhVien').value;
    sv.emailSV = document.getElementById('emailSinhVien').value;
    sv.diemToan = document.getElementById('toan').value;
    sv.diemLy = document.getElementById('ly').value;
    sv.diemHoa = document.getElementById('hoa').value;
    sv.diemRenLuyen = document.getElementById('renLuyen').value;
    sv.loaiSV = document.getElementById('loaiSinhVien').value;
    
    var diemTB = sv.diemTB().toFixed(2);
    //kiểm tra
    // console.log(sv)

    //kiểm tra dữ liệu hợp lệ

    //đặt cờ hiệu
    var value = true;

    // kt rỗng
    value &= validate.kiemTraRong(sv.maSV,'Mã sinh viên','#loi_MaSV')
    & validate.kiemTraRong(sv.tenSV,'Tên sinh viên','#loi_TenSV')
    & validate.kiemTraRong(sv.emailSV,'Email','#loi_EmailSV')
    
    // kt tất cả ký tự
    // value &= validate.kiemTraChu(sv.maSV,'Mã sinh viên','#loi_MaSV')

    //kt định dạng email
    value &= validate.kiemTraDinhDangEmail(sv.emailSV,'Email','#loi_DinhDangEmailSV')


    //kt điểm
    value &= validate.kiemTraDiem(sv.diemToan,'Diem Toan','#loi_So')

    //kt giá trị điểm
    value &= validate.kiemTraGiaTriDiem(sv.diemToan,'Diem Toan','#loi_GiaTri',0,10)

    //kt độ dài mã sinh viên
    value &= validate.kiemTraDoDai(sv.maSV,'Ma Sinh Vien','#loi_DoDai',5,5)

    

    // console.log(regex.test(textabc))


    //đưa sv vừa tạo vô mảng
    mangSinhVien.push(sv);


    //goi hàm tạo bảng (cập nhật sinh viên trong mảng (dslk))
    taoBang(mangSinhVien)

    LocalStorage()
}


//phương thức cập nhật
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

    console.log(SVupdate)

    // giờ gán cho mảng để nó hiện dưới table

    for(var i = 0; i < mangSinhVien.length; i++)
    {
        if(SVupdate.maSV === mangSinhVien[i].maSV)
        {
            mangSinhVien[i].tenSV = SVupdate.tenSV
            mangSinhVien[i].maSV = SVupdate.maSV
            mangSinhVien[i].emailSV = SVupdate.emailSV
            mangSinhVien[i].diemToan = SVupdate.diemToan
            mangSinhVien[i].diemLy = SVupdate.diemLy
            mangSinhVien[i].diemHoa = SVupdate.diemHoa 
            mangSinhVien[i].loaiSV = SVupdate.loaiSV 
            mangSinhVien[i].diemRenLuyen = SVupdate.diemRenLuyen


        }
    }

    // gọi hàm tạo lại cái bảng!
    taoBang(mangSinhVien)
    LocalStorage()

    // clear tất cả thông tin và bật lại thẻ input mã sv
    document.getElementById('maSinhVien').disabled = false
    var mangTheInput = document.querySelectorAll('input')

    for( var i = 0; i < mangTheInput.length; i++)
    {
        var tag = mangTheInput[i]
        tag.value = ''
    }
    
}



//tạo bảng để xuất phần tử trong mang
var taoBang = function (arrSinhVien){
    var contentTable = ''

    // duyệt mảng
    for(var i = 0; i < arrSinhVien.length; i ++)
    {
        //lấy ra từng sc trong mảng
        var sv = arrSinhVien[i]

        //lấy dữ liệu cục bộ (hiện phương thức của đối tượng)
        //vì lưu trữ cục bộ ko lưu trữ dc phương thức!
        var sinhVien = new SinhVien(
            sv.maSV,
            sv.tenSV,
            sv.emailSV,
            sv.diemToan,
            sv.diemLy,
            sv.diemHoa,
            sv.diemRenLuyen,
            sv.loaiSV
        )


        //tạo thẻ tr cộng dồn nd contentTable
        // `` nút bên trái số 1
        contentTable += `
        <tr>
            <td>${sinhVien.maSV}</td>
            <td>${sinhVien.tenSV}</td>
            <td>${sinhVien.emailSV}</td>
            <td>${sinhVien.loaiSV}</td>
            <td>${sinhVien.diemTB().toFixed(2)}</td>
            <td>${sinhVien.diemRenLuyen}</td>

            <td><button class="btn btn-info" 
            onclick=" suaSinhVien('${sv.maSV}') ">Chinh Sua</button></td>
            <td><button class="btn btn-danger" 
            onclick=" xoaSinhVien('${sv.maSV}') ">Xoa</button></td>
        </tr>
        `
    }

    // var tbodySinhVien = document.getElementById('tblSinhVien');
    // tbodySinhVien.appendChild(contentTable)
    // console.log(contentTable)

    document.getElementById('tblSinhVien').innerHTML = contentTable
}

//hàm sửa sinh viên
var suaSinhVien = function(masv){
    //tìm sv theo masv

    for(var i = 0; i < mangSinhVien.length; i++)
    {
        var SV = mangSinhVien[i]
        if( SV.maSV === masv){
            //gán thông tin sv lên thẻ input ở trên
            document.getElementById('maSinhVien').value = SV.maSV 
            document.getElementById('tenSinhVien').value = SV.tenSV
            document.getElementById('emailSinhVien').value = SV.emailSV
            document.getElementById('loaiSinhVien').value = SV.loaiSV
            document.getElementById('toan').value = SV.diemToan
            document.getElementById('ly').value = SV.diemLy
            document.getElementById('hoa').value = SV.diemHoa
            document.getElementById('renLuyen').value =SV.diemRenLuyen
        }
    }
}

//hàm xóa sv
var xoaSinhVien = function (maCuaSinhVien){
    alert(maCuaSinhVien);


    //duyệt ngược để xóa những nv
    //có mã số trùng nhau
    for(var i = mangSinhVien.length - 1; i >= 0; i--)
    {
        var sv = mangSinhVien[i];

        if(sv.maSV === maCuaSinhVien)
        {
            mangSinhVien.splice(i,1)//hàm xóa trong js
            //i : vị trí xóa
            //1 : tại i xóa 1 phần tử
        }
    }

    // sau khi xóa tạo lại bảng (như cập nhật lại v)
    taoBang(mangSinhVien)
    LocalStorage()
}


// lưu cục bộ, KHÔNG LƯU ĐƯỢC PHƯƠNG THỨC!
//các bước lưu trữ mảng SV xuống LocalStorage
//JSON.stringify biến mảng SV thành chuỗi
var LocalStorage = function(){
    var SMangSV = JSON.stringify(mangSinhVien)
    localStorage.setItem('mangSinhVien',SMangSV)
}

//lấy dữ liệu từ LocalStorage
var layDuLieuLocalStorage = function(){
    //kt dữ liệu có trong LS chưa
    if(localStorage.getItem('mangSinhVien')){

        //lấy dữ liệu từ LS
        var sMangSinhVien = localStorage.getItem('mangSinhVien')
        //biến đổi từ chuỗi về mảng
        mangSinhVien = JSON.parse(sMangSinhVien)

        taoBang(mangSinhVien)
    }
}

//trình duyệt vừa load lên thì nó gọi hàm này
layDuLieuLocalStorage()