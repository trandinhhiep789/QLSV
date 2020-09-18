var SinhVien = function(masv,tensv,email,toan,ly,hoa,renluyen,loaisv){
    this.maSV = masv;
    this.tenSV = tensv;
    this.emailSV = email;
    this.diemToan = toan;
    this.diemLy = ly;
    this.diemHoa = hoa;
    this.diemRenLuyen = renluyen;
    this.loaiSV = loaisv;

    this.diemTB = function(){
        return (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3
    }
}