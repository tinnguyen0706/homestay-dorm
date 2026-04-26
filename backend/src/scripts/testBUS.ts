import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";

const TaiKhoanNV = { Username: "admin", Password: "@Admin12" };
const bus = new TaiKhoanNVBUS(TaiKhoanNV);
const result = await bus.KTraTK();

console.log("-----------KET QUA: ", result);

process.exit(0);
