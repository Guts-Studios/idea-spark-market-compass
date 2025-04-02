
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  TrendingUp,
  Users,
  MessageSquare,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link to={to}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full flex items-center justify-start gap-2 ${
          isActive ? "" : "hover:bg-muted"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: <BarChart2 size={18} />, label: "Dashboard" },
    { to: "/market-trends", icon: <TrendingUp size={18} />, label: "Market Trends" },
    { to: "/competitors", icon: <Users size={18} />, label: "Competitors" },
    { to: "/sentiment", icon: <MessageSquare size={18} />, label: "Sentiment" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button size="icon" variant="outline" onClick={toggleMenu}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-card overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">MarketCompass</span>
            </Link>
          </div>
          <div className="mt-8 flex flex-col flex-grow px-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>

          {/* User profile section */}
          {user && (
            <div className="p-4 border-t border-gray-200 mt-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User size={18} />
                    <span className="truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User size={16} />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <div className="flex items-center gap-2 text-destructive">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 md:hidden">
          <div className="flex flex-col p-4 space-y-4 pt-16">
            <div className="flex items-center justify-center mb-8">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <span className="text-xl font-bold text-primary">MarketCompass</span>
              </Link>
            </div>
            {navItems.map((item) => (
              <div key={item.to} onClick={() => setIsMenuOpen(false)}>
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                />
              </div>
            ))}

            {/* User profile section for mobile */}
            {user && (
              <div className="pt-4 border-t border-gray-200 mt-auto">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User size={18} />
                    <span>My Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-destructive" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
