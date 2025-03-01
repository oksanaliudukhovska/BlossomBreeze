import React, { useState } from 'react';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink} from 'react-router';
import { useSelector } from 'react-redux';

const Header = () => {
    const items = useSelector((state) => state.cart.items);
    const [menuOpen, setMenuOpen] = useState(false);
   
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-headerDark/95 text-bezchBase2/70">
            <div className="flex justify-between items-center px-6 py-4 md:py-10 md:px-10">
            {/* hidden  */}
            <nav className="hidden lg:flex justify-center text-sm lg:text-lg font-bold uppercase">
                <NavLink to="/bouquets" className="mr-6">Bouquets</NavLink>
                <NavLink to="/plants" className="mr-6">Houseplants</NavLink>
                <NavLink to="/questions" className="mr-6">Q&A</NavLink>
            </nav>
                {/*mobile burger */}
                <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
                    <Bars3Icon className="w-7 h-7 text-bezchBase2" />
                </button>

                {/*logo */}
                <NavLink to="/" className='absolute right-1/2 lg:left-1/2'>
                    <div className="text-gold text-2xl md:text-3xl font-corintia font-bold text-right">
                        <span className="block leading-none">Blossom</span>
                        <span className="block leading-none">Breeze</span>
                    </div>
                </NavLink>

                {/* card and user */}
                <div className="flex items-center">
                    <NavLink to="/cart" className="relative inline-block">
                        <ShoppingCartIcon className="h-7 w-7 text-mint mr-3" />
                        <span className="absolute top-0 right-2 rounded-full w-4 h-4 bg-bezchBase2/80 text-headerDark text-xs font-bold flex items-center justify-center">
                        {items?.length ?? 0}
                        </span>
                    </NavLink>
                    <NavLink to="/profile">
                        <UserIcon className="h-6 w-6 text-mint ml-3" />
                    </NavLink>
                </div>
            </div>

         

            {/* mobile */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-headerDark/95 flex flex-col items-center justify-center text-xl font-bold uppercase z-50 transition-opacity duration-300 opacity-100">
                    <button className="absolute top-6 right-6" onClick={() => setMenuOpen(false)}>
                        <XMarkIcon className="w-8 h-8 text-bezchBase2" />
                    </button>
                    <NavLink to="/bouquets" className="mb-6" onClick={() => setMenuOpen(false)}>Bouquets</NavLink>
                    <NavLink to="/plants" className="mb-6" onClick={() => setMenuOpen(false)}>Houseplants</NavLink>
                    <NavLink to="/questions" className="mb-6" onClick={() => setMenuOpen(false)}>Q&A</NavLink>
                </div>
            )}
        </header>
    );
};

export default Header;
