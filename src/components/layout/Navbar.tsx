import { ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navPill =
  "text-primary-foreground hover:opacity-80 px-5 py-2.5 rounded-[2rem] text-[15px] font-medium transition-opacity inline-flex items-center gap-1";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent border-b border-black/[0.04]">
      <div className="container mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="Wafrivet" className="h-28 md:h-36 w-auto" />
        </Link>

        <nav className="font-quicksand hidden lg:flex items-center bg-primary rounded-full p-1.5 shadow-sm">
          <Link to="/#product" className="bg-[#E5EBE5] text-primary px-6 py-2.5 rounded-[2rem] text-[15px] font-medium transition-colors">
            Product
          </Link>
          <Link to="/#how-it-works" className={navPill}>
            How it Works
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className={`${navPill} outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-[2rem]`}>
              For
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[min(calc(100vw-2rem),28rem)] p-3 rounded-2xl">
              <div className="grid gap-2 sm:grid-cols-3">
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-0 focus:bg-transparent">
                  <Link to="/farmers" className="flex flex-col items-start gap-1 rounded-xl border border-transparent p-4 hover:bg-accent hover:border-border">
                    <span className="font-semibold text-[#111811]">Farmers</span>
                    <span className="text-xs text-muted-foreground leading-snug">Farmer OS, tags, alerts</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-0 focus:bg-transparent">
                  <Link to="/vets" className="flex flex-col items-start gap-1 rounded-xl border border-transparent p-4 hover:bg-accent hover:border-border">
                    <span className="font-semibold text-[#111811]">Vets & Agro-vets</span>
                    <span className="text-xs text-muted-foreground leading-snug">NFC records, AI assistant</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-0 focus:bg-transparent">
                  <Link to="/suppliers" className="flex flex-col items-start gap-1 rounded-xl border border-transparent p-4 hover:bg-accent hover:border-border">
                    <span className="font-semibold text-[#111811]">Suppliers</span>
                    <span className="text-xs text-muted-foreground leading-snug">Hub, demand, logistics</span>
                  </Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={`${navPill} outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-[2rem]`}>
              Pricing
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-[14rem] rounded-xl p-1">
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/#pricing">Pricing for Farmers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/#pricing">Pricing for Vets & Agro-vets</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/#pricing">Pricing for Suppliers</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={`${navPill} outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-[2rem]`}>
              Company
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-[14rem] rounded-xl p-1">
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/careers">Careers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/referral">Referral & Creator Program</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to="/riders">Rider & Logistics Partners</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="https://app.wafrivet.com/login" className="text-[15px] font-medium text-[#111811] hover:text-[#2D4D31] transition-colors" />
            Login
          </a>
          <Link
            to="/#pricing"
            className="border-2 border-primary text-primary px-6 py-2.5 rounded-full text-[15px] font-medium hover:bg-primary/5 transition-colors"
          >
            Book Demo
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-primary/30" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6 font-quicksand">
                <Link to="/#product" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  Product
                </Link>
                <Link to="/#how-it-works" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  How it Works
                </Link>
                <Link to="/farmers" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  For Farmers
                </Link>
                <Link to="/vets" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  For Vets
                </Link>
                <Link to="/suppliers" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  For Suppliers
                </Link>
                <Link to="/#pricing" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  Pricing
                </Link>
                <Link to="/careers" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  Careers
                </Link>
                <Link to="/referral" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  Referral program
                </Link>
                <Link to="/riders" className="py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium">
                  Riders & logistics
                </Link>
                <a href="https://app.wafrivet.com/login" className="mt-2 py-3 px-2 rounded-lg hover:bg-muted text-[15px] font-medium text-[#111811]">
                  Login
                </a>
                <Link to="/#pricing" className="mt-2 py-3 px-4 rounded-full bg-primary text-primary-foreground text-center text-[15px] font-semibold">
                  Book Demo
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
