import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold text-center text-red-600 mb-1">Redis Management</h1>
      <Menu />
    </div>
  );
}