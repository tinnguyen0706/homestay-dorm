-- =============================================================================
-- Hệ thống Quản lý Phòng trọ
-- Encoding: UTF-8
-- =============================================================================

SET client_encoding TO 'UTF8';

-- =============================================================================
-- SEQUENCES  (auto-generate mã dạng prefix + 3 chữ số)
-- =============================================================================

CREATE SEQUENCE IF NOT EXISTS seq_loaiphong    START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_chinhanh     START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_dichvu       START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_tieuchi      START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_nhanvien     START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_khachhang    START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_nhomthue     START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_phong        START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_taikhoan_nv  START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_nhucauthue   START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_lichxemphong START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS seq_taisan       START 1 INCREMENT 1;

-- =============================================================================
-- TIER 1: Bảng không có FK
-- =============================================================================

CREATE TABLE IF NOT EXISTS LOAIPHONG (
    MaLoai  VARCHAR(5)  PRIMARY KEY,
    TenLoai VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS CHINHANH (
    MaChiNhanh VARCHAR(5)   PRIMARY KEY,
    DiaChi     VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS DICHVU (
    MaDV      VARCHAR(5)     PRIMARY KEY,
    TenDV     VARCHAR(100)   NOT NULL,
    DonGia    NUMERIC(15, 2) NOT NULL CHECK (DonGia >= 0),
    DonViTinh VARCHAR(20)    NOT NULL
);

CREATE TABLE IF NOT EXISTS TIEUCHI (
    MaTieuChi  VARCHAR(5)   PRIMARY KEY,
    TenTieuChi VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS NHANVIEN (
    MaNV   VARCHAR(5)  PRIMARY KEY,
    HoTen  VARCHAR(100) NOT NULL,
    Email  VARCHAR(100) UNIQUE
               CHECK (Email ~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
    SDT    VARCHAR(11)  UNIQUE
               CHECK (SDT ~ '^\d{9,11}$'),
    Loai   VARCHAR(25)  NOT NULL
               CHECK (Loai IN ('Quản lý', 'Nhân viên sale', 'Nhân viên kỹ thuật', 'Nhân viên thu ngân'))
);

-- =============================================================================
-- TIER 2: KHACHHANG — tạm thời không có FK → NHOMTHUE (phá vòng circular)
-- =============================================================================

CREATE TABLE IF NOT EXISTS KHACHHANG (
    MaKH       VARCHAR(5)   PRIMARY KEY,
    HoTen      VARCHAR(100) NOT NULL,
    GioiTinh   VARCHAR(3)   CHECK (GioiTinh IN ('Nam', 'Nữ')),
    Email      VARCHAR(100) UNIQUE
                   CHECK (Email ~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
    QuocTich   VARCHAR(50)  NOT NULL,
    SDT        VARCHAR(11)  UNIQUE
                   CHECK (SDT ~ '^\d{9,11}$'),
    MaNhomThue VARCHAR(5)   -- FK thêm sau qua ALTER TABLE bên dưới
);

-- =============================================================================
-- TIER 3: Phụ thuộc Tier 1 & 2
-- =============================================================================

CREATE TABLE IF NOT EXISTS NHOMTHUE (
    MaNhomThue   VARCHAR(5) PRIMARY KEY,
    MaKH_DaiDien VARCHAR(5) NOT NULL
        REFERENCES KHACHHANG(MaKH)
);

-- Đóng vòng circular: KHACHHANG.MaNhomThue → NHOMTHUE
ALTER TABLE KHACHHANG
    DROP CONSTRAINT IF EXISTS fk_khachhang_nhomthue;
ALTER TABLE KHACHHANG
    ADD CONSTRAINT fk_khachhang_nhomthue
        FOREIGN KEY (MaNhomThue) REFERENCES NHOMTHUE(MaNhomThue);

CREATE TABLE IF NOT EXISTS PHONG (
    MaPhong         VARCHAR(5)  PRIMARY KEY,
    TenPhong        VARCHAR(50) NOT NULL,
    SucChuaToiDa    SMALLINT    NOT NULL CHECK (SucChuaToiDa > 0),
    GioiTinhChoPhep VARCHAR(6)  NOT NULL
        CHECK (GioiTinhChoPhep IN ('Nam', 'Nữ', 'Cả hai')),
    TrangThai       VARCHAR(15) NOT NULL
        CHECK (TrangThai IN ('Còn trống', 'Đã đầy')),
    MaLoai          VARCHAR(5)  NOT NULL REFERENCES LOAIPHONG(MaLoai),
    MaChiNhanh      VARCHAR(5)  NOT NULL REFERENCES CHINHANH(MaChiNhanh)
);

CREATE TABLE IF NOT EXISTS TAIKHOAN_NV (
    MaTaiKhoanNV VARCHAR(5)   PRIMARY KEY,
    Username     VARCHAR(50)  NOT NULL UNIQUE
                     CHECK (LENGTH(Username) >= 4),
    Password     VARCHAR(255) NOT NULL,
    MaNV         VARCHAR(5)   NOT NULL UNIQUE
                     REFERENCES NHANVIEN(MaNV)
    CONSTRAINT check_password_strength CHECK (
        LENGTH(PASSWORD) >= 8 AND
        PASSWORD ~ '[A-Z]' AND
        PASSWORD ~ '[0-9]' AND
        PASSWORD ~ '[!@#$%^&*()]'
    )
);

CREATE TABLE IF NOT EXISTS CHINHANH_DICHVU (
    MaChiNhanh VARCHAR(5) NOT NULL REFERENCES CHINHANH(MaChiNhanh),
    MaDV       VARCHAR(5) NOT NULL REFERENCES DICHVU(MaDV),
    PRIMARY KEY (MaChiNhanh, MaDV)
);

-- =============================================================================
-- TIER 4: Phụ thuộc Tier 3
-- =============================================================================

CREATE TABLE IF NOT EXISTS NHUCAUTHUE (
    MaNhuCau      VARCHAR(5)     PRIMARY KEY,
    SoNguoiDuKien SMALLINT       NOT NULL CHECK (SoNguoiDuKien > 0),
    HinhThucThue  VARCHAR(20)    NOT NULL
        CHECK (HinhThucThue IN ('Thuê phòng', 'Thuê giường')),
    GiaMin        NUMERIC(15, 2) NOT NULL CHECK (GiaMin >= 0),
    GiaMax        NUMERIC(15, 2) NOT NULL CHECK (GiaMax >= GiaMin),
    ThoiDiemVao   DATE           NOT NULL,
    ThoiHanThue   SMALLINT       NOT NULL CHECK (ThoiHanThue > 2),
    KhuVuc        VARCHAR(100),
    TrangThai     VARCHAR(25)    NOT NULL
        CHECK (TrangThai IN ('Chờ duyệt', 'Đang tìm', 'Đã khớp', 'Đã hủy', 'Hết hạn')),
    MaKH          VARCHAR(5)     NOT NULL REFERENCES KHACHHANG(MaKH),
    MaNhomThue    VARCHAR(5)     REFERENCES NHOMTHUE(MaNhomThue),
    MaLoai        VARCHAR(5)     NOT NULL REFERENCES LOAIPHONG(MaLoai)
);

CREATE TABLE IF NOT EXISTS LICHXEMPHONG (
    MaLichHen   VARCHAR(5)  PRIMARY KEY,
    ThoiGianHen TIMESTAMP   NOT NULL,
    TrangThai   VARCHAR(15) NOT NULL
        CHECK (TrangThai IN ('Chờ xác nhận', 'Đã xác nhận', 'Đã hoàn thành', 'Đã hủy')),
    MaNhuCau    VARCHAR(5)  NOT NULL REFERENCES NHUCAUTHUE(MaNhuCau),
    MaNV        VARCHAR(5)  NOT NULL REFERENCES NHANVIEN(MaNV),
    MaPhong     VARCHAR(5)  NOT NULL REFERENCES PHONG(MaPhong)
);

CREATE TABLE IF NOT EXISTS TAISAN (
    MaTaiSan  VARCHAR(5)     PRIMARY KEY,
    TenTaiSan VARCHAR(100)   NOT NULL,
    GiaDenBu  NUMERIC(15, 2) NOT NULL CHECK (GiaDenBu >= 0),
    MaPhong   VARCHAR(5)     NOT NULL REFERENCES PHONG(MaPhong),
    Loai      VARCHAR(15)    NOT NULL
        CHECK (Loai IN ('Giường', 'Tài sản khác'))
);

CREATE TABLE IF NOT EXISTS PHONG_TIEUCHI (
    MaPhong   VARCHAR(5) NOT NULL REFERENCES PHONG(MaPhong),
    MaTieuChi VARCHAR(5) NOT NULL REFERENCES TIEUCHI(MaTieuChi),
    PRIMARY KEY (MaPhong, MaTieuChi)
);

-- =============================================================================
-- TIER 5: Phụ thuộc Tier 4
-- =============================================================================

CREATE TABLE IF NOT EXISTS GIUONG (
    MaTaiSan      VARCHAR(5)     PRIMARY KEY
                      REFERENCES TAISAN(MaTaiSan),
    GiaThueGiuong NUMERIC(15, 2) NOT NULL CHECK (GiaThueGiuong > 0),
    TrangThai     VARCHAR(10)    NOT NULL
        CHECK (TrangThai IN ('Đã cọc', 'Đã thuê', 'Trống'))
);

CREATE TABLE IF NOT EXISTS TIEUCHI_NHUCAU (
    MaTieuChi VARCHAR(5) NOT NULL REFERENCES TIEUCHI(MaTieuChi),
    MaNhuCau  VARCHAR(5) NOT NULL REFERENCES NHUCAUTHUE(MaNhuCau),
    PRIMARY KEY (MaTieuChi, MaNhuCau)
);

-- =============================================================================
-- TRIGGERS: Validate ràng buộc thời gian chỉ khi INSERT
-- (CHECK trên CURRENT_DATE/NOW() không phù hợp cho UPDATE)
-- =============================================================================

-- ThoiDiemVao phải >= ngày hiện tại khi tạo mới
CREATE OR REPLACE FUNCTION validate_nhucauthue_ngay()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ThoiDiemVao < CURRENT_DATE THEN
        RAISE EXCEPTION 'ThoiDiemVao phải >= ngày hiện tại';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_validate_nhucauthue_ngay
    BEFORE INSERT ON NHUCAUTHUE
    FOR EACH ROW EXECUTE FUNCTION validate_nhucauthue_ngay();

-- ThoiGianHen phải >= thời điểm tạo lịch
CREATE OR REPLACE FUNCTION validate_lichxemphong_thoigian()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ThoiGianHen < NOW() THEN
        RAISE EXCEPTION 'ThoiGianHen phải >= thời điểm hiện tại';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_validate_lichxemphong_thoigian
    BEFORE INSERT ON LICHXEMPHONG
    FOR EACH ROW EXECUTE FUNCTION validate_lichxemphong_thoigian();

-- =============================================================================
-- TRIGGERS: Auto-generate mã (prefix + 3 chữ số)
-- =============================================================================

CREATE OR REPLACE FUNCTION gen_ma_loaiphong() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaLoai := 'LP' || LPAD(nextval('seq_loaiphong')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_loaiphong
    BEFORE INSERT ON LOAIPHONG
    FOR EACH ROW EXECUTE FUNCTION gen_ma_loaiphong();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_chinhanh() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaChiNhanh := 'CN' || LPAD(nextval('seq_chinhanh')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_chinhanh
    BEFORE INSERT ON CHINHANH
    FOR EACH ROW EXECUTE FUNCTION gen_ma_chinhanh();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_dichvu() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaDV := 'DV' || LPAD(nextval('seq_dichvu')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_dichvu
    BEFORE INSERT ON DICHVU
    FOR EACH ROW EXECUTE FUNCTION gen_ma_dichvu();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_tieuchi() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaTieuChi := 'TC' || LPAD(nextval('seq_tieuchi')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_tieuchi
    BEFORE INSERT ON TIEUCHI
    FOR EACH ROW EXECUTE FUNCTION gen_ma_tieuchi();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_nhanvien() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaNV := 'NV' || LPAD(nextval('seq_nhanvien')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_nhanvien
    BEFORE INSERT ON NHANVIEN
    FOR EACH ROW EXECUTE FUNCTION gen_ma_nhanvien();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_khachhang() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaKH := 'KH' || LPAD(nextval('seq_khachhang')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_khachhang
    BEFORE INSERT ON KHACHHANG
    FOR EACH ROW EXECUTE FUNCTION gen_ma_khachhang();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_nhomthue() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaNhomThue := 'NT' || LPAD(nextval('seq_nhomthue')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_nhomthue
    BEFORE INSERT ON NHOMTHUE
    FOR EACH ROW EXECUTE FUNCTION gen_ma_nhomthue();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_phong() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaPhong := 'PH' || LPAD(nextval('seq_phong')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_phong
    BEFORE INSERT ON PHONG
    FOR EACH ROW EXECUTE FUNCTION gen_ma_phong();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_taikhoan_nv() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaTaiKhoanNV := 'TK' || LPAD(nextval('seq_taikhoan_nv')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_taikhoan_nv
    BEFORE INSERT ON TAIKHOAN_NV
    FOR EACH ROW EXECUTE FUNCTION gen_ma_taikhoan_nv();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_nhucauthue() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaNhuCau := 'NC' || LPAD(nextval('seq_nhucauthue')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_nhucauthue
    BEFORE INSERT ON NHUCAUTHUE
    FOR EACH ROW EXECUTE FUNCTION gen_ma_nhucauthue();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_lichxemphong() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaLichHen := 'LX' || LPAD(nextval('seq_lichxemphong')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_lichxemphong
    BEFORE INSERT ON LICHXEMPHONG
    FOR EACH ROW EXECUTE FUNCTION gen_ma_lichxemphong();

-- ----

CREATE OR REPLACE FUNCTION gen_ma_taisan() RETURNS TRIGGER AS $$
BEGIN
    NEW.MaTaiSan := 'TS' || LPAD(nextval('seq_taisan')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trg_gen_ma_taisan
    BEFORE INSERT ON TAISAN
    FOR EACH ROW EXECUTE FUNCTION gen_ma_taisan();