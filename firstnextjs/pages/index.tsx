import Login from "@/app/Login/Login";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main >
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Login />
      </div>
    </main>
  );
}
