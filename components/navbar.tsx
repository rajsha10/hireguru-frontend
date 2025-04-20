"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800" 
          : "bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm5 10a2 2 0 100-4 2 2 0 000 4zm-10 0a2 2 0 100-4 2 2 0 000 4zm5 12a6 6 0 100-12 6 6 0 000 12z" 
                fill="#6366F1" 
              />
            </svg>
            <span className="text-2xl font-bold text-white">
              HireGuru
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Features", "How It Works", "Contact"].map((item) => (
            <div key={item} className="relative group">
              <Link 
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800/80">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900/95 backdrop-blur-sm border-gray-800 text-gray-300">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem asChild className="focus:bg-gray-800 focus:text-white">
                  <Link href={user.role === "candidate" ? "/candidate-dashboard" : "/hr-dashboard"} className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-gray-800 focus:text-white">
                  <Link href="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 focus:bg-gray-800 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors duration-200">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  size="sm" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 hover:shadow-md hover:shadow-indigo-900/20"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800/80">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900/95 backdrop-blur-md border-l border-gray-800 text-gray-300">
            <div className="flex flex-col gap-6 pt-6">
              {["Home", "Features", "How It Works", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                {user ? (
                  <>
                    <Link
                      href={user.role === "candidate" ? "/candidate-dashboard" : "/hr-dashboard"}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}