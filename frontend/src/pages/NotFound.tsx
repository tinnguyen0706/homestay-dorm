import { Button } from "@/components/ui/button";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-6 px-4">
            <img
                src="/404_NotFound.png"
                alt="404 Not Found"
                className="w-80 max-w-full object-contain drop-shadow-md"
            />

            <p className="text-muted-foreground text-base">
                Bạn đang đi vào vùng cấm địa
            </p>

            <Button className="bg-orange-300">
                <a href="/">Quay về trang đăng nhập</a>
            </Button>
        </div>
    );
}
