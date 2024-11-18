import { Product } from "./components/Product";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-800 text-white">
      <Product />
    </div>
  );
}
