import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

// TODO: Call API to fetch real data
const customers = [
  {
    id: "#KH-9021",
    initials: "NL",
    name: "Nguyen Van Lam",
    gender: "NAM",
    email: "lam.nguyen@email.com",
    phone: "+84 901 234 567",
    nationality: "Vietnam",
    group: "GRP_A1",
  },
  {
    id: "#KH-8842",
    initials: "TH",
    name: "Tran Thi Hoa",
    gender: "NỮ",
    email: "hoa.tran@provider.vn",
    phone: "+84 988 776 554",
    nationality: "Vietnam",
    group: "GRP_B2",
  },
  {
    id: "#KH-7719",
    initials: "SJ",
    name: "Sarah Jenkins",
    gender: "NỮ",
    email: "s.jenkins@global.com",
    phone: "+1 415 555 0192",
    nationality: "USA",
    group: "GRP_A1",
  },
  {
    id: "#KH-6650",
    initials: "LK",
    name: "Lee Kwang-ho",
    gender: "NAM",
    email: "lee.kh@kmail.co.kr",
    phone: "+82 10 1234 5678",
    nationality: "South Korea",
    group: "GRP_C3",
  },
  {
    id: "#KH-5543",
    initials: "AM",
    name: "Aarav Mehta",
    gender: "NAM",
    email: "aarav.m@email.in",
    phone: "+91 987 654 3210",
    nationality: "India",
    group: "GRP_B2",
  },
  {
    id: "#KH-4432",
    initials: "EC",
    name: "Elena Petrova",
    gender: "NỮ",
    email: "elena.p@mail.ru",
    phone: "+7 916 123 45 67",
    nationality: "Russia",
    group: "GRP_C3",
  },
  {
    id: "#KH-3321",
    initials: "MS",
    name: "Mohammed Al-Farsi",
    gender: "NAM",
    email: "m.alfarsi@email.sa",
    phone: "+966 50 123 4567",
    nationality: "Saudi Arabia",
    group: "GRP_A1",
  },
];

const ITEMS_PER_PAGE = 4;

const GenderBadge = ({ gender }: { gender: string }) => {
  const isMale = gender === "NAM";
  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
        isMale
          ? "bg-blue-100 text-blue-800"
          : "bg-orange-100 text-orange-800"
      }`}
    >
      {gender}
    </span>
  );
};

const Avatar = ({ initials, gender }: { initials: string; gender: string }) => {
  let bgColor = "bg-green-100";
  if (gender === "NỮ") {
    bgColor = "bg-orange-100";
  } else {
    bgColor = "bg-indigo-100";
  }

  let textColor = "text-green-800";
  if (gender === "NỮ") {
    textColor = "text-orange-800";
  } else {
    textColor = "text-indigo-800";
  }

  return (
    <div
      className={`w-8 h-8 rounded-full flex justify-center items-center ${bgColor}`}
    >
      <span className={`text-xs font-bold ${textColor}`}>{initials}</span>
    </div>
  );
};

export const MH_DSKH = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return customers.slice(startIndex, endIndex);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(1, Math.ceil(customers.length / ITEMS_PER_PAGE));
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6 font-inter">
          Danh sách khách hàng
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc ID khách hàng..."
              className="pl-10 h-11 rounded-lg bg-white border-gray-200 shadow-sm font-inter"
            />
          </div>
          <Select>
            <SelectTrigger className="w-55">
              <SelectValue placeholder="Tìm kiếm theo tên" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="name">Tìm kiếm theo tên</SelectItem>
                <SelectItem value="id">Tìm kiếm theo ID</SelectItem>
                <SelectItem value="phone">Tìm kiếm theo SĐT</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="border-b-gray-200">
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  ID
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Họ tên
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Giới tính
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Thông tin liên hệ
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Quốc tịch
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Mã nhóm
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-b-gray-100">
                  <TableCell className="px-6 py-4 font-mono text-sm text-gray-500">
                    {customer.id}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        initials={customer.initials}
                        gender={customer.gender}
                      />
                      <span className="font-semibold text-emerald-800">
                        {customer.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <GenderBadge gender={customer.gender} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="font-medium text-emerald-800">
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {customer.nationality}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-mono text-sm text-gray-500">
                    {customer.group}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              currentPage={currentPage}
              totalItems={customers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentItemsCount={currentCustomers.length}
              colSpan={6}
              onPageChange={handlePageChange}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};
