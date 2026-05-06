import KhachHangBUS from "./KhachHangBUS.ts";

export default class NhomThueBUS {
  private MaNhomThue: string;
  private KH: KhachHangBUS[];

  constructor(MaNhom: string = "", khachHangs: KhachHangBUS[] = []) {
    this.MaNhomThue = MaNhom;
    this.KH = khachHangs;
  }

  get _MaNhomThue(): string {
    return this.MaNhomThue;
  }

  set _MaNhomThue(value: string) {
    this.MaNhomThue = value;
  }

  get _KH(): KhachHangBUS[] {
    return this.KH;
  }

  set _KH(value: KhachHangBUS[]) {
    this.KH = value;
  }
}
