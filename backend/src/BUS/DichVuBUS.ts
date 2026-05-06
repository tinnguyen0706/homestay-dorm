export default class DichVuBUS {
  private MaDV: string;
  private TenDV: string;
  private DonGia: number;
  private DonViTinh: string;

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

  // Getters
  get _MaDV(): string {
    return this.MaDV;
  }

  get _TenDV(): string {
    return this.TenDV;
  }

  get _DonGia(): number {
    return this.DonGia;
  }

  get _DonViTinh(): string {
    return this.DonViTinh;
  }

  // Setters
  set _MaDV(value: string) {
    this.MaDV = value;
  }

  set _TenDV(value: string) {
    this.TenDV = value;
  }

  set _DonGia(value: number) {
    this.DonGia = value;
  }

  set _DonViTinh(value: string) {
    this.DonViTinh = value;
  }
}
