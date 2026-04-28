export default class KhachHangBUS {
  private _MaKH: string;
  private _HoTen: string;
  private _GioiTinh: "Nam" | "Nữ";
  private _Email: string;
  private _QuocTich: string;
  private _SDT: string;
  private _MaNhomThue: string;
  private _Phong: string;

  constructor(
    MaKH: string = "",
    HoTen: string = "",
    GioiTinh: "Nam" | "Nữ" = "Nam",
    Email: string = "",
    QuocTich: string = "",
    SDT: string = "",
    MaNhomThue: string = "",
    Phong: string = "",
  ) {
    this._MaKH = MaKH;
    this._HoTen = HoTen;
    this._GioiTinh = GioiTinh;
    this._Email = Email;
    this._QuocTich = QuocTich;
    this._SDT = SDT;
    this._MaNhomThue = MaNhomThue;
    this._Phong = Phong;
  }

  get MaKH(): string {
    return this._MaKH;
  }

  set MaKH(value: string) {
    this._MaKH = value;
  }

  get HoTen(): string {
    return this._HoTen;
  }

  set HoTen(value: string) {
    this._HoTen = value;
  }

  get GioiTinh(): "Nam" | "Nữ" {
    return this._GioiTinh;
  }

  set GioiTinh(value: "Nam" | "Nữ") {
    this._GioiTinh = value;
  }

  get Email(): string {
    return this._Email;
  }

  set Email(value: string) {
    this._Email = value;
  }

  get QuocTich(): string {
    return this._QuocTich;
  }

  set QuocTich(value: string) {
    this._QuocTich = value;
  }

  get SDT(): string {
    return this._SDT;
  }

  set SDT(value: string) {
    this._SDT = value;
  }

  get MaNhomThue(): string {
    return this._MaNhomThue;
  }

  set MaNhomThue(value: string) {
    this._MaNhomThue = value;
  }

  get Phong(): string {
    return this._Phong;
  }

  set Phong(value: string) {
    this._Phong = value;
  }
}
