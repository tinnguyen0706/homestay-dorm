import KhachHangBUS from "./KhachHangBUS.ts";

export default class NhomThueBUS {
  private _MaNhomThue: string;
  private _KH: KhachHangBUS[];

  constructor(MaNhom: string = "", khachHangs: KhachHangBUS[] = []) {
    this._MaNhomThue = MaNhom;
    this._KH = khachHangs;
  }

  get MaNhomThue(): string {
    return this._MaNhomThue;
  }

  set MaNhomThue(value: string) {
    this._MaNhomThue = value;
  }

  get KH(): KhachHangBUS[] {
    return this._KH;
  }

  set KH(value: KhachHangBUS[]) {
    this._KH = value;
  }
}
