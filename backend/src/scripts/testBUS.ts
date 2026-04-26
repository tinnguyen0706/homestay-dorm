import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";
import type { ITaiKhoanNV, ITaiKhoanUsername } from "../types/ITaiKhoanNV.ts";

const TaiKhoanNV: ITaiKhoanNV = { Username: "admin", Password: "@Admin12" };
const result = await TaiKhoanNVBUS.KTraTK(TaiKhoanNV);

console.log("-----------KET QUA: ", result);

process.exit(0);
