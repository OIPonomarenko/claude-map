import Image from "next/image"
import Link from "next/link"
import {navLinks} from "@/app/components/navbar/navLinks"



const NavBar = () => {

  const navLinksTSX = navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="text-sm font-medium text-slate-200 py-2 px-3 rounded-md hover:bg-slate-950 hover:text-white"
    >
      {link.label}
    </Link>
  ))

  return (
    <nav>
      <div className="max-w-7xl px-8 sm:px-6 mx-auto">
        <div className="border-b border-white/10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="shrink-0">
                <Image src="/location_logo.svg" alt="Map Explorer Logo" width={32} height={32} priority />
              </div>

              <div className="hidden md:block">
                <div className="flex items-baseline ms-10">
                  {navLinksTSX}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center md:ms-6">
                <button className="rounded-full relative text-slate-200 cursor-pointer hover:bg-slate-950 hover:text-white p-2">
                  <Image src="/bell_light.svg" alt="Notification bell" width={24} height={24} priority />
                </button>
                <div>

                </div>
              </div>
            </div>

            <div className="flex md:hidden -me-2"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
