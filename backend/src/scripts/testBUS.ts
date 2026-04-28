import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";

const bus = new TaiKhoanNVBUS("admin", "@Admin12");
const result = await bus.KTraTK();

console.log("-----------KET QUA: ", result);

process.exit(0);
