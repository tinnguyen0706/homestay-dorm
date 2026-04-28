// import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";

// const bus = new TaiKhoanNVBUS("admin", "@Admin12");
// const result = await bus.KTraTK();
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";
import { PhongBUS } from "../BUS/PhongBUS.ts";

const result = await LoaiPhongBUS.LayDSLoaiPhong();

console.log("-----------KET QUA: ", result);

process.exit(0);
