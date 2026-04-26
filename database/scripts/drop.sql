-- =============================================================================
-- Drop toàn bộ objects đã tạo trong init.sql
-- Thứ tự: Tier 5 → 4 → 3 → 2 → 1, sau đó functions và sequences
-- =============================================================================

-- Xóa FK circular trước (tránh lỗi khi drop NHOMTHUE)
ALTER TABLE IF EXISTS KHACHHANG
    DROP CONSTRAINT IF EXISTS fk_khachhang_nhomthue;

-- =============================================================================
-- TIER 5
-- =============================================================================

DROP TABLE IF EXISTS TIEUCHI_NHUCAU;
DROP TABLE IF EXISTS GIUONG;

-- =============================================================================
-- TIER 4
-- =============================================================================

DROP TABLE IF EXISTS PHONG_TIEUCHI;
DROP TABLE IF EXISTS TAISAN;
DROP TABLE IF EXISTS LICHXEMPHONG;
DROP TABLE IF EXISTS NHUCAUTHUE;

-- =============================================================================
-- TIER 3
-- =============================================================================

DROP TABLE IF EXISTS CHINHANH_DICHVU;
DROP TABLE IF EXISTS TAIKHOAN_NV;
DROP TABLE IF EXISTS PHONG;
DROP TABLE IF EXISTS NHOMTHUE;

-- =============================================================================
-- TIER 2
-- =============================================================================

DROP TABLE IF EXISTS KHACHHANG;

-- =============================================================================
-- TIER 1
-- =============================================================================

DROP TABLE IF EXISTS NHANVIEN;
DROP TABLE IF EXISTS TIEUCHI;
DROP TABLE IF EXISTS DICHVU;
DROP TABLE IF EXISTS CHINHANH;
DROP TABLE IF EXISTS LOAIPHONG;

-- =============================================================================
-- FUNCTIONS (triggers bị xóa tự động theo bảng, functions thì không)
-- =============================================================================

DROP FUNCTION IF EXISTS validate_nhucauthue_ngay();
DROP FUNCTION IF EXISTS validate_lichxemphong_thoigian();
DROP FUNCTION IF EXISTS gen_ma_loaiphong();
DROP FUNCTION IF EXISTS gen_ma_chinhanh();
DROP FUNCTION IF EXISTS gen_ma_dichvu();
DROP FUNCTION IF EXISTS gen_ma_tieuchi();
DROP FUNCTION IF EXISTS gen_ma_nhanvien();
DROP FUNCTION IF EXISTS gen_ma_khachhang();
DROP FUNCTION IF EXISTS gen_ma_nhomthue();
DROP FUNCTION IF EXISTS gen_ma_phong();
DROP FUNCTION IF EXISTS gen_ma_taikhoan_nv();
DROP FUNCTION IF EXISTS gen_ma_nhucauthue();
DROP FUNCTION IF EXISTS gen_ma_lichxemphong();
DROP FUNCTION IF EXISTS gen_ma_taisan();

-- =============================================================================
-- SEQUENCES
-- =============================================================================

DROP SEQUENCE IF EXISTS seq_loaiphong;
DROP SEQUENCE IF EXISTS seq_chinhanh;
DROP SEQUENCE IF EXISTS seq_dichvu;
DROP SEQUENCE IF EXISTS seq_tieuchi;
DROP SEQUENCE IF EXISTS seq_nhanvien;
DROP SEQUENCE IF EXISTS seq_khachhang;
DROP SEQUENCE IF EXISTS seq_nhomthue;
DROP SEQUENCE IF EXISTS seq_phong;
DROP SEQUENCE IF EXISTS seq_taikhoan_nv;
DROP SEQUENCE IF EXISTS seq_nhucauthue;
DROP SEQUENCE IF EXISTS seq_lichxemphong;
DROP SEQUENCE IF EXISTS seq_taisan;
