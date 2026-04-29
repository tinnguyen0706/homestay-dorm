import  KhachHangBUS from '../BUS/KhachHangBUS.ts';
import type { Request, Response } from "express";

export async function LayDSKH(req: Request, res: Response) {
    try {
        const MaKH = String(req.query.MaKH || '');
        const HoTen = String(req.query.HoTen || '');
        const SDT = String(req.query.SDT || '');
        const result = await KhachHangBUS.LayDSKH(MaKH, HoTen, SDT);
        res.json(result);
    } catch (error) {
        console.log("--------------Lỗi: ", error);
        return res.status(400).json({ message: error });
    }
}

export async function ThemKH(req: Request, res: Response) {
    try {
        const formData = req.body;

        // BƯỚC 1: Gọi kiểm tra trước
        KhachHangBUS.KTraTTKH(formData);

        // BƯỚC 2: Nếu bước 1 không ném lỗi (throw error), thực hiện thêm
        const result = await KhachHangBUS.ThemKH(formData);

        res.status(200).json(result);
    } catch (error: any) {
        // Trả về lỗi từ KTraTTKH hoặc từ Database
        res.status(400).json({ message: error.message });
    }
}