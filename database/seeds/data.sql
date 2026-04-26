-- =============================================================================
-- Dữ liệu mẫu cho Hệ thống Quản lý Phòng trọ
-- Encoding: UTF-8
-- Lưu ý: PK được sinh tự động bởi trigger (truyền 'X' làm placeholder)
-- =============================================================================
SET client_encoding TO 'UTF8';

-- =============================================================================
-- TIER 1: LOAIPHONG → LP001..LP005
-- =============================================================================

INSERT INTO LOAIPHONG (MaLoai, TenLoai) VALUES
    ('X', 'Phòng đơn'),
    ('X', 'Phòng đôi'),
    ('X', 'Phòng ba'),
    ('X', 'Phòng VIP'),
    ('X', 'Phòng ký túc xá');

-- =============================================================================
-- TIER 1: CHINHANH → CN001..CN003
-- =============================================================================

INSERT INTO CHINHANH (MaChiNhanh, DiaChi) VALUES
    ('X', '123 Nguyễn Trãi, Quận 1, TP.HCM'),
    ('X', '456 Lê Văn Việt, Quận 9, TP.HCM'),
    ('X', '789 Hoàng Diệu, Hải Châu, Đà Nẵng');

-- =============================================================================
-- TIER 1: DICHVU → DV001..DV010
-- =============================================================================

INSERT INTO DICHVU (MaDV, TenDV, DonGia, DonViTinh) VALUES
    ('X', 'Điện',          3500,   'kWh'),
    ('X', 'Nước',          15000,  'm³'),
    ('X', 'Internet',      100000, 'tháng'),
    ('X', 'Dọn phòng',     50000,  'lần'),
    ('X', 'Giữ xe máy',    80000,  'tháng'),
    ('X', 'Giữ xe đạp',    30000,  'tháng'),
    ('X', 'Máy lạnh',      150000, 'tháng'),
    ('X', 'Giặt ủi',       20000,  'kg'),
    ('X', 'Bảo vệ 24/7',   50000,  'tháng'),
    ('X', 'Thang máy',     30000,  'tháng');

-- =============================================================================
-- TIER 1: TIEUCHI → TC001..TC010
-- =============================================================================

INSERT INTO TIEUCHI (MaTieuChi, TenTieuChi) VALUES
    ('X', 'Có điều hòa'),
    ('X', 'Có ban công'),
    ('X', 'Có nhà vệ sinh riêng'),
    ('X', 'Có bếp'),
    ('X', 'Gần trường học'),
    ('X', 'Gần trung tâm thương mại'),
    ('X', 'Có thang máy'),
    ('X', 'Có chỗ đậu xe'),
    ('X', 'Yên tĩnh'),
    ('X', 'Có máy giặt');

-- =============================================================================
-- TIER 1: NHANVIEN → NV001..NV010
-- 1 quản lý, 5 sale, 2 kỹ thuật, 2 thu ngân
-- =============================================================================

INSERT INTO NHANVIEN (MaNV, HoTen, Email, SDT, Loai) VALUES
    ('X', 'Nguyễn Văn An',   'an.nguyen@homestay.vn',   '0901234561', 'Quản lý'),
    ('X', 'Trần Thị Bình',   'binh.tran@homestay.vn',   '0912345672', 'Nhân viên sale'),
    ('X', 'Lê Văn Cường',    'cuong.le@homestay.vn',    '0923456783', 'Nhân viên sale'),
    ('X', 'Phạm Thị Dung',   'dung.pham@homestay.vn',   '0934567894', 'Nhân viên sale'),
    ('X', 'Hoàng Văn Em',    'em.hoang@homestay.vn',    '0945678905', 'Nhân viên sale'),
    ('X', 'Vũ Thị Phương',   'phuong.vu@homestay.vn',   '0956789016', 'Nhân viên sale'),
    ('X', 'Đặng Văn Giang',  'giang.dang@homestay.vn',  '0967890127', 'Nhân viên kỹ thuật'),
    ('X', 'Bùi Thị Hoa',     'hoa.bui@homestay.vn',     '0978901238', 'Nhân viên kỹ thuật'),
    ('X', 'Ngô Văn Hùng',    'hung.ngo@homestay.vn',    '0989012349', 'Nhân viên thu ngân'),
    ('X', 'Đinh Thị Kim',    'kim.dinh@homestay.vn',    '0990123450', 'Nhân viên thu ngân');

-- =============================================================================
-- TIER 2: KHACHHANG → KH001..KH010  (MaNhomThue = NULL, sẽ UPDATE sau)
-- =============================================================================

INSERT INTO KHACHHANG (MaKH, HoTen, GioiTinh, Email, QuocTich, SDT, MaNhomThue) VALUES
    ('X', 'Nguyễn Thị Lan',   'Nữ',  'lan.nguyen@gmail.com',   'Việt Nam', '0911111111', NULL),
    ('X', 'Trần Văn Minh',    'Nam', 'minh.tran@gmail.com',    'Việt Nam', '0922222222', NULL),
    ('X', 'Lê Thị Ngọc',      'Nữ',  'ngoc.le@gmail.com',      'Việt Nam', '0933333333', NULL),
    ('X', 'Phạm Văn Quân',    'Nam', 'quan.pham@gmail.com',    'Việt Nam', '0944444444', NULL),
    ('X', 'Hoàng Thị Phương', 'Nữ',  'phuong.hoang@gmail.com', 'Việt Nam', '0955555555', NULL),
    ('X', 'Vũ Văn Sơn',       'Nam', 'son.vu@gmail.com',       'Việt Nam', '0966666666', NULL),
    ('X', 'Đặng Thị Tuyết',   'Nữ',  'tuyet.dang@gmail.com',   'Việt Nam', '0977777777', NULL),
    ('X', 'Bùi Văn Uy',       'Nam', 'uy.bui@gmail.com',       'Việt Nam', '0988888888', NULL),
    ('X', 'Ngô Thị Xuân',     'Nữ',  'xuan.ngo@gmail.com',     'Việt Nam', '0999999999', NULL),
    ('X', 'Đinh Văn Yên',     'Nam', 'yen.dinh@gmail.com',     'Việt Nam', '0900000000', NULL);

-- =============================================================================
-- TIER 3: NHOMTHUE → NT001..NT002
-- =============================================================================

INSERT INTO NHOMTHUE (MaNhomThue, MaKH_DaiDien) VALUES
    ('X', 'KH001'),
    ('X', 'KH003');

-- Đóng vòng circular: gán nhóm thuê cho các thành viên
UPDATE KHACHHANG SET MaNhomThue = 'NT001' WHERE MaKH IN ('KH001', 'KH002');
UPDATE KHACHHANG SET MaNhomThue = 'NT002' WHERE MaKH IN ('KH003', 'KH004', 'KH005');

-- =============================================================================
-- TIER 3: PHONG → PH001..PH015  (5 phòng / chi nhánh)
-- =============================================================================

INSERT INTO PHONG (MaPhong, TenPhong, SucChuaToiDa, GioiTinhChoPhep, TrangThai, MaLoai, MaChiNhanh) VALUES
    -- Chi nhánh CN001
    ('X', 'Phòng A01', 2, 'Nữ',     'Còn trống', 'LP001', 'CN001'),
    ('X', 'Phòng A02', 4, 'Nam',    'Đã đầy',    'LP002', 'CN001'),
    ('X', 'Phòng A03', 6, 'Cả hai', 'Còn trống', 'LP003', 'CN001'),
    ('X', 'Phòng A04', 1, 'Nữ',     'Còn trống', 'LP004', 'CN001'),
    ('X', 'Phòng A05', 8, 'Cả hai', 'Đã đầy',    'LP005', 'CN001'),
    -- Chi nhánh CN002
    ('X', 'Phòng B01', 2, 'Nam',    'Còn trống', 'LP001', 'CN002'),
    ('X', 'Phòng B02', 4, 'Nữ',     'Còn trống', 'LP002', 'CN002'),
    ('X', 'Phòng B03', 6, 'Cả hai', 'Đã đầy',    'LP003', 'CN002'),
    ('X', 'Phòng B04', 1, 'Nam',    'Còn trống', 'LP004', 'CN002'),
    ('X', 'Phòng B05', 8, 'Cả hai', 'Còn trống', 'LP005', 'CN002'),
    -- Chi nhánh CN003
    ('X', 'Phòng C01', 2, 'Nữ',     'Còn trống', 'LP001', 'CN003'),
    ('X', 'Phòng C02', 4, 'Cả hai', 'Đã đầy',    'LP002', 'CN003'),
    ('X', 'Phòng C03', 6, 'Nam',    'Còn trống', 'LP003', 'CN003'),
    ('X', 'Phòng C04', 1, 'Nữ',     'Còn trống', 'LP004', 'CN003'),
    ('X', 'Phòng C05', 8, 'Cả hai', 'Còn trống', 'LP005', 'CN003');

-- =============================================================================
-- TIER 3: TAIKHOAN_NV → TK001..TK010
-- Mật khẩu gốc (plain text): "password"
-- Hash: bcrypt cost 10 của chuỗi "password"
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO TAIKHOAN_NV (MaTaiKhoanNV, Username, Password, MaNV) VALUES
    ('X', 'admin',      crypt('@Admin123', gen_salt('bf', 10)), 'NV001'),
    ('X', 'sale01',     crypt('@Sale01123', gen_salt('bf', 10)), 'NV002'),
    ('X', 'sale02',     crypt('@Sale02123', gen_salt('bf', 10)), 'NV003'),
    ('X', 'sale03',     crypt('@Sale03123', gen_salt('bf', 10)), 'NV004'),
    ('X', 'sale04',     crypt('@Sale04123', gen_salt('bf', 10)), 'NV005'),
    ('X', 'sale05',     crypt('@Sale05123', gen_salt('bf', 10)), 'NV006'),
    ('X', 'tech01',     crypt('@Tech01123', gen_salt('bf', 10)), 'NV007'),
    ('X', 'tech02',     crypt('@Tech02123', gen_salt('bf', 10)), 'NV008'),
    ('X', 'cashier01',  crypt('@Cashier01123', gen_salt('bf', 10)), 'NV009'),
    ('X', 'cashier02',  crypt('@Cashier02123', gen_salt('bf', 10)), 'NV010');
-- =============================================================================
-- TIER 3: CHINHANH_DICHVU  (5 dịch vụ / chi nhánh = 15 records)
-- =============================================================================

INSERT INTO CHINHANH_DICHVU (MaChiNhanh, MaDV) VALUES
    ('CN001', 'DV001'), ('CN001', 'DV002'), ('CN001', 'DV003'), ('CN001', 'DV004'), ('CN001', 'DV005'),
    ('CN002', 'DV003'), ('CN002', 'DV004'), ('CN002', 'DV005'), ('CN002', 'DV006'), ('CN002', 'DV007'),
    ('CN003', 'DV006'), ('CN003', 'DV007'), ('CN003', 'DV008'), ('CN003', 'DV009'), ('CN003', 'DV010');

-- =============================================================================
-- TIER 4: NHUCAUTHUE → NC001..NC005
-- ThoiDiemVao phải >= ngày hiện tại (trigger kiểm tra khi INSERT)
-- =============================================================================

INSERT INTO NHUCAUTHUE (MaNhuCau, SoNguoiDuKien, HinhThucThue, GiaMin, GiaMax, ThoiDiemVao, ThoiHanThue, KhuVuc, TrangThai, MaKH, MaNhomThue, MaLoai) VALUES
    ('X', 1, 'Thuê phòng',  2000000,  4000000, '2026-05-01', 6,  'Quận 1, TP.HCM',       'Đang tìm',  'KH001', 'NT001', 'LP001'),
    ('X', 4, 'Thuê giường', 500000,  1500000,  '2026-05-15', 3,  'Quận 9, TP.HCM',       'Chờ duyệt', 'KH003', 'NT002', 'LP005'),
    ('X', 2, 'Thuê phòng',  3000000,  6000000, '2026-06-01', 12, 'Hải Châu, Đà Nẵng',   'Đã khớp',   'KH006', NULL,    'LP002'),
    ('X', 1, 'Thuê phòng',  1500000,  3000000, '2026-05-20', 6,  'Quận 1, TP.HCM',       'Đang tìm',  'KH007', NULL,    'LP004'),
    ('X', 3, 'Thuê giường', 600000,  1200000,  '2026-07-01', 12, 'Quận 9, TP.HCM',       'Chờ duyệt', 'KH008', NULL,    'LP003');

-- =============================================================================
-- TIER 4: LICHXEMPHONG → LX001..LX003
-- ThoiGianHen phải >= NOW() (trigger kiểm tra khi INSERT)
-- =============================================================================

INSERT INTO LICHXEMPHONG (MaLichHen, ThoiGianHen, TrangThai, MaNhuCau, MaNV, MaPhong) VALUES
    ('X', '2026-05-02 09:00:00', 'Đã xác nhận',  'NC001', 'NV002', 'PH001'),
    ('X', '2026-05-10 14:00:00', 'Chờ xác nhận', 'NC002', 'NV003', 'PH008'),
    ('X', '2026-05-20 10:30:00', 'Chờ xác nhận', 'NC004', 'NV004', 'PH004');

-- =============================================================================
-- TIER 4: TAISAN → TS001..TS075  (5 tài sản / phòng)
-- PH001-PH005 : 3 giường + 2 tài sản khác
-- PH006-PH015 : 2 giường + 3 tài sản khác
-- =============================================================================

INSERT INTO TAISAN (MaTaiSan, TenTaiSan, GiaDenBu, MaPhong, Loai) VALUES
    -- PH001  → TS001-TS005
    ('X', 'Giường tầng 1',  2000000, 'PH001', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH001', 'Giường'),
    ('X', 'Giường tầng 3',  2000000, 'PH001', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH001', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH001', 'Tài sản khác'),
    -- PH002  → TS006-TS010
    ('X', 'Giường tầng 1',  2000000, 'PH002', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH002', 'Giường'),
    ('X', 'Giường tầng 3',  2000000, 'PH002', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH002', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH002', 'Tài sản khác'),
    -- PH003  → TS011-TS015
    ('X', 'Giường tầng 1',  2000000, 'PH003', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH003', 'Giường'),
    ('X', 'Giường tầng 3',  2000000, 'PH003', 'Giường'),
    ('X', 'Bàn ăn',          400000, 'PH003', 'Tài sản khác'),
    ('X', 'Tủ lạnh',        2000000, 'PH003', 'Tài sản khác'),
    -- PH004  → TS016-TS020
    ('X', 'Giường tầng 1',  2000000, 'PH004', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH004', 'Giường'),
    ('X', 'Giường tầng 3',  2000000, 'PH004', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH004', 'Tài sản khác'),
    ('X', 'Ghế sofa',         800000, 'PH004', 'Tài sản khác'),
    -- PH005  → TS021-TS025
    ('X', 'Giường tầng 1',  2000000, 'PH005', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH005', 'Giường'),
    ('X', 'Giường tầng 3',  2000000, 'PH005', 'Giường'),
    ('X', 'Điều hòa',       3000000, 'PH005', 'Tài sản khác'),
    ('X', 'Máy giặt',       3500000, 'PH005', 'Tài sản khác'),
    -- PH006  → TS026-TS030
    ('X', 'Giường đơn 1',   1500000, 'PH006', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH006', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH006', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH006', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH006', 'Tài sản khác'),
    -- PH007  → TS031-TS035
    ('X', 'Giường đơn 1',   1500000, 'PH007', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH007', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH007', 'Tài sản khác'),
    ('X', 'Tủ lạnh',        2000000, 'PH007', 'Tài sản khác'),
    ('X', 'Bàn ăn',          400000, 'PH007', 'Tài sản khác'),
    -- PH008  → TS036-TS040
    ('X', 'Giường đôi 1',   2500000, 'PH008', 'Giường'),
    ('X', 'Giường đôi 2',   2500000, 'PH008', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH008', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH008', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH008', 'Tài sản khác'),
    -- PH009  → TS041-TS045
    ('X', 'Giường đơn 1',   1500000, 'PH009', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH009', 'Giường'),
    ('X', 'Ghế sofa',         800000, 'PH009', 'Tài sản khác'),
    ('X', 'Bàn ăn',          400000, 'PH009', 'Tài sản khác'),
    ('X', 'Tủ lạnh',        2000000, 'PH009', 'Tài sản khác'),
    -- PH010  → TS046-TS050
    ('X', 'Giường đôi 1',   2500000, 'PH010', 'Giường'),
    ('X', 'Giường đôi 2',   2500000, 'PH010', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH010', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH010', 'Tài sản khác'),
    ('X', 'Máy giặt',       3500000, 'PH010', 'Tài sản khác'),
    -- PH011  → TS051-TS055
    ('X', 'Giường đơn 1',   1500000, 'PH011', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH011', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH011', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH011', 'Tài sản khác'),
    ('X', 'Ghế sofa',         800000, 'PH011', 'Tài sản khác'),
    -- PH012  → TS056-TS060
    ('X', 'Giường tầng 1',  2000000, 'PH012', 'Giường'),
    ('X', 'Giường tầng 2',  2000000, 'PH012', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH012', 'Tài sản khác'),
    ('X', 'Bàn ăn',          400000, 'PH012', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH012', 'Tài sản khác'),
    -- PH013  → TS061-TS065
    ('X', 'Giường đơn 1',   1500000, 'PH013', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH013', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH013', 'Tài sản khác'),
    ('X', 'Tủ lạnh',        2000000, 'PH013', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH013', 'Tài sản khác'),
    -- PH014  → TS066-TS070
    ('X', 'Giường đôi 1',   2500000, 'PH014', 'Giường'),
    ('X', 'Giường đôi 2',   2500000, 'PH014', 'Giường'),
    ('X', 'Ghế sofa',         800000, 'PH014', 'Tài sản khác'),
    ('X', 'Điều hòa',       3000000, 'PH014', 'Tài sản khác'),
    ('X', 'Máy lạnh',       3000000, 'PH014', 'Tài sản khác'),
    -- PH015  → TS071-TS075
    ('X', 'Giường đơn 1',   1500000, 'PH015', 'Giường'),
    ('X', 'Giường đơn 2',   1500000, 'PH015', 'Giường'),
    ('X', 'Tủ quần áo',      500000, 'PH015', 'Tài sản khác'),
    ('X', 'Bàn học',         300000, 'PH015', 'Tài sản khác'),
    ('X', 'Tủ lạnh',        2000000, 'PH015', 'Tài sản khác');

-- =============================================================================
-- TIER 5: GIUONG  (35 records)
-- PH001-PH005 có 3 giường mỗi phòng  → TS001-3, TS006-8, TS011-13, TS016-18, TS021-23
-- PH006-PH015 có 2 giường mỗi phòng  → TS026-27, TS031-32, ..., TS071-72
-- =============================================================================

INSERT INTO GIUONG (MaTaiSan, GiaThueGiuong, TrangThai) VALUES
    -- PH001
    ('TS001', 1500000, 'Đã thuê'), ('TS002', 1500000, 'Đã thuê'), ('TS003', 1500000, 'Trống'),
    -- PH002
    ('TS006', 1500000, 'Đã thuê'), ('TS007', 1500000, 'Đã thuê'), ('TS008', 1500000, 'Đã thuê'),
    -- PH003
    ('TS011', 1500000, 'Trống'),   ('TS012', 1500000, 'Đã cọc'),  ('TS013', 1500000, 'Trống'),
    -- PH004
    ('TS016', 1800000, 'Trống'),   ('TS017', 1800000, 'Trống'),   ('TS018', 1800000, 'Trống'),
    -- PH005
    ('TS021', 1200000, 'Đã thuê'), ('TS022', 1200000, 'Đã thuê'), ('TS023', 1200000, 'Đã thuê'),
    -- PH006
    ('TS026', 1000000, 'Trống'),   ('TS027', 1000000, 'Trống'),
    -- PH007
    ('TS031', 1000000, 'Đã thuê'), ('TS032', 1000000, 'Trống'),
    -- PH008
    ('TS036', 2000000, 'Đã thuê'), ('TS037', 2000000, 'Đã thuê'),
    -- PH009
    ('TS041', 1000000, 'Trống'),   ('TS042', 1000000, 'Đã cọc'),
    -- PH010
    ('TS046', 2000000, 'Đã thuê'), ('TS047', 2000000, 'Đã thuê'),
    -- PH011
    ('TS051', 1000000, 'Trống'),   ('TS052', 1000000, 'Trống'),
    -- PH012
    ('TS056', 1500000, 'Đã thuê'), ('TS057', 1500000, 'Đã thuê'),
    -- PH013
    ('TS061', 1000000, 'Trống'),   ('TS062', 1000000, 'Trống'),
    -- PH014
    ('TS066', 2000000, 'Đã thuê'), ('TS067', 2000000, 'Trống'),
    -- PH015
    ('TS071', 1000000, 'Trống'),   ('TS072', 1000000, 'Đã cọc');

-- =============================================================================
-- TIER 4: PHONG_TIEUCHI  (3 tiêu chí / phòng = 45 records)
-- =============================================================================

INSERT INTO PHONG_TIEUCHI (MaPhong, MaTieuChi) VALUES
    ('PH001', 'TC001'), ('PH001', 'TC003'), ('PH001', 'TC009'),
    ('PH002', 'TC001'), ('PH002', 'TC004'), ('PH002', 'TC008'),
    ('PH003', 'TC002'), ('PH003', 'TC005'), ('PH003', 'TC007'),
    ('PH004', 'TC001'), ('PH004', 'TC002'), ('PH004', 'TC003'),
    ('PH005', 'TC007'), ('PH005', 'TC008'), ('PH005', 'TC010'),
    ('PH006', 'TC001'), ('PH006', 'TC003'), ('PH006', 'TC009'),
    ('PH007', 'TC002'), ('PH007', 'TC004'), ('PH007', 'TC006'),
    ('PH008', 'TC001'), ('PH008', 'TC003'), ('PH008', 'TC010'),
    ('PH009', 'TC005'), ('PH009', 'TC008'), ('PH009', 'TC009'),
    ('PH010', 'TC001'), ('PH010', 'TC007'), ('PH010', 'TC010'),
    ('PH011', 'TC002'), ('PH011', 'TC003'), ('PH011', 'TC009'),
    ('PH012', 'TC001'), ('PH012', 'TC004'), ('PH012', 'TC008'),
    ('PH013', 'TC003'), ('PH013', 'TC006'), ('PH013', 'TC009'),
    ('PH014', 'TC001'), ('PH014', 'TC002'), ('PH014', 'TC007'),
    ('PH015', 'TC003'), ('PH015', 'TC005'), ('PH015', 'TC010');

-- =============================================================================
-- TIER 5: TIEUCHI_NHUCAU  (1-2 tiêu chí / nhu cầu = 8 records)
-- =============================================================================

INSERT INTO TIEUCHI_NHUCAU (MaTieuChi, MaNhuCau) VALUES
    ('TC001', 'NC001'),
    ('TC003', 'NC002'), ('TC008', 'NC002'),
    ('TC001', 'NC003'),
    ('TC003', 'NC004'), ('TC009', 'NC004'),
    ('TC002', 'NC005'), ('TC005', 'NC005');
