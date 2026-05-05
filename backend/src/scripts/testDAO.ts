// import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";
// import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";

// const dataTest = new TaiKhoanNVBUS("admin", "@Admin123");
// const result = await TaiKhoanNVDAO.LayTTTK(dataTest);
// console.log("------Ket Qua: ", result?.[0]);

// process.exit(0);

import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";
import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

const result = await TaiKhoanNVDAO.LayTTTK(
  new TaiKhoanNVBUS("admin", "@Admin123"),
);

console.log(result);