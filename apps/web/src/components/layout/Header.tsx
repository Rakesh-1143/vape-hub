import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "../ui/Brand";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Brand />
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
        onClick={() => setOpen(false)}
      >
        <a href="#collection">Explore the collection</a>
        <a href="#our-store">Our store</a>
        <a href="#questions">Good to know</a>
        <a className="nav-visit" href="#visit">
          Visit us <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
