import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Content CMS | LogicSoft Technologies",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}