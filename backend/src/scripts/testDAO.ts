import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

const dataTest = {
  Username: "admin",
  Password: "@Admin123",
};
const result = await TaiKhoanNVDAO.LayTTTK(dataTest);
console.log("------Ket Qua: ", result?.[0]);

process.exit(0);
