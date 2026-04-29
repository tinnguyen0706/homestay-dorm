import  KhachHangBUS from '../BUS/KhachHangBUS.ts';
import type { Request, Response } from "express";

export async function LayDSKH(req: Request, res: Response) {
    try {
        const MaKH = req.query.MaKH ? String(req.query.MaKH) : undefined;
        const HoTen = req.query.HoTen ? String(req.query.HoTen) : undefined;
        const SDT = req.query.SDT ? String(req.query.SDT) : undefined;
        const result = await KhachHangBUS.LayDSKH(MaKH, HoTen, SDT);
        res.json(result);
    } catch (error) {
        console.log("--------------Lỗi: ", error);
        return res.status(400).json({ message: error });
    }
}

export async function ThemKH(req: Request, res: Response) {
    try {
        const bus = new KhachHangBUS(req.body);
        const result = await bus.ThemKH();
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}