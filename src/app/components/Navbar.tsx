import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-5 w-full text-lg h-[70px]">
      <ul className="flex  flex-row justify-center  items-center gap-10   w-full">
        <li className="hover:text-slate-400">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-slate-400">
          <Link href="/preference">Preferencias</Link>
        </li>
        <li className="hover:text-slate-400">
          <Link href="/payment_methods">Métodos de Pago</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
