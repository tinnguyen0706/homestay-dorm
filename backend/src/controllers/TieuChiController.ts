import type { Request, Response } from "express";
import TieuChiBUS from "../BUS/TieuChiBUS.ts";

export default class TieuChiController {
  static async LayDSTC(req: Request, res: Response) {
    try {
      const result = await TieuChiBUS.LayDSTC();
      res.json(result);
    } catch (error) {
      console.log("--------------Lỗi LayDSTC: ", error);
      res.status(400).json({ message: error });
    }
  }
}
