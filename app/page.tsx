import MapboxExplorer from "@/app/components/MapboxExplorer"
import NavBar from "@/app/components/navbar/NavBar"

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <div className="bg-slate-900 pb-32">
        <NavBar />
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl text-white font-bold tracking-tight">Dashboard</h1>
          </div>
        </header>
      </div>
      <main className="relative -mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="px-5 sm:px-6 py-6 bg-white shadow-md rounded-lg">
            <MapboxExplorer />
          </div>
        </div>
      </main>
    </div>
  );
}
