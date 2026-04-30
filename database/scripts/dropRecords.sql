-- =============================================================================
-- Xóa toàn bộ dữ liệu mẫu và reset sequences
-- Encoding: UTF-8
-- =============================================================================

SET client_encoding TO 'UTF8';

-- Phá vòng circular FK (KHACHHANG ↔ NHOMTHUE) trước khi TRUNCATE
UPDATE KHACHHANG SET MaNhomThue = NULL;

-- Xóa dữ liệu theo thứ tự từ lá → gốc, CASCADE xử lý phần còn lại
TRUNCATE TABLE
    TIEUCHI_NHUCAU,
    PHONG_TIEUCHI,
    GIUONG,
    TAISAN,
    LICHXEMPHONG,
    NHUCAUTHUE,
    TAIKHOAN_NV,
    CHINHANH_DICHVU,
    NHOMTHUE,
    PHONG,
    KHACHHANG,
    NHANVIEN,
    TIEUCHI,
    DICHVU,
    CHINHANH,
    LOAIPHONG
CASCADE;

-- Reset tất cả sequences về 1
ALTER SEQUENCE seq_loaiphong    RESTART WITH 1;
ALTER SEQUENCE seq_chinhanh     RESTART WITH 1;
ALTER SEQUENCE seq_dichvu       RESTART WITH 1;
ALTER SEQUENCE seq_tieuchi      RESTART WITH 1;
ALTER SEQUENCE seq_nhanvien     RESTART WITH 1;
ALTER SEQUENCE seq_khachhang    RESTART WITH 1;
ALTER SEQUENCE seq_nhomthue     RESTART WITH 1;
ALTER SEQUENCE seq_phong        RESTART WITH 1;
ALTER SEQUENCE seq_taikhoan_nv  RESTART WITH 1;
ALTER SEQUENCE seq_nhucauthue   RESTART WITH 1;
ALTER SEQUENCE seq_lichxemphong RESTART WITH 1;
ALTER SEQUENCE seq_taisan       RESTART WITH 1;
