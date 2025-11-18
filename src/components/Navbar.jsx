import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="px-4 sm:px-6 lg:px-8 pt-4 text-[#fff]">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} alt="Qosyne Logo" className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/privacy" className="hover: transition">Privacy & Policy</Link>
                    <Link to="/terms" className="hover: transition">Terms & Condition</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl  focus:outline-none">{menuOpen ? <HiX /> : <HiMenu />}</button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-2 py-2 px-4 bg-blue-800">
                    <Link to="/privacy"className="block"onClick={() => setMenuOpen(false)}>Privacy & Policy</Link>
                    <Link to="/terms"className="block"onClick={() => setMenuOpen(false)}>Terms & Condition</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
