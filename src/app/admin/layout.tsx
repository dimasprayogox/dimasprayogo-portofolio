import { AdminSidebar } from "@/components/layout/sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "CMS Dashboard to manage portfolio content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
