// import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";
// import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";

// const dataTest = new TaiKhoanNVBUS("admin", "@Admin123");
// const result = await TaiKhoanNVDAO.LayTTTK(dataTest);
// console.log("------Ket Qua: ", result?.[0]);

// process.exit(0);

import KhachHangDAO from "../DAO/KhachHangDAO.ts";

const result = await KhachHangDAO.LayDSKH();
console.log("----------Kết quả: \n", result);
