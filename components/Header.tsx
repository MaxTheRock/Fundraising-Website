"use client"

import { motion } from "framer-motion"
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-6 md:p-8">
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-xs sm:text-sm md:text-4xl sd:text-10px font-black leading-tight tracking-tighter 
                   text-center md:text-left md:top-0 md:left-0 
                   absolute md:relative mobile-bottom-right"
      >
        MAX'S<br className="block sm:hidden" /> AFRICAN ADVENTURE
      </motion.h1>
    </header>
  );
};

export default Header;
