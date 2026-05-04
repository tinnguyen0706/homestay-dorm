export default class DichVuBUS {
  MaDV: string;
  TenDV: string;
  DonGia: number;
  DonViTinh: string;

  constructor(
    MaDV: string = "",
    TenDV: string = "",
    DonGia: number = 0,
    DonViTinh: string = "",
  ) {
    this.MaDV = MaDV;
    this.TenDV = TenDV;
    this.DonGia = DonGia;
    this.DonViTinh = DonViTinh;
  }
}
