import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  User, 
  Calendar, 
  MessageCircle, 
  Bell, 
  Search,
  Menu,
  X
} from 'lucide-react';
import mascotImage from '../assets/jhams_academy_mascot.png';

const Header = ({ currentPage, onPageChange, notifications = 3 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'student', label: 'Área do Aluno', icon: User },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'chat', label: 'Mensagens', icon: MessageCircle },
  ];

  const handleNavClick = (pageId) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={mascotImage} 
              alt="JHAMS Academy" 
              className="w-10 h-10 floating-animation"
            />
            <div>
              <h1 className="text-xl font-bold neon-text">JHAMS</h1>
              <p className="text-xs text-muted-foreground">Academy</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.div key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative ${isActive ? 'cyber-gradient text-primary-foreground' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.id === 'chat' && notifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => handleNavClick('alerts')}
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs pulse-glow"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border py-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`justify-start ${isActive ? 'cyber-gradient text-primary-foreground' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.id === 'chat' && notifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="ml-auto w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

