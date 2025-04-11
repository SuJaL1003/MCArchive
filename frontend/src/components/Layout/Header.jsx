import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-purple-700">
          <Link to="/">MCArchive</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/mca" className="hover:text-purple-600 transition">MCA</Link>
          <Link to="/contact" className="hover:text-purple-600 transition">Contact</Link>

          {!auth.user ? (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <button className="p-2 rounded-full bg-purple-600 text-white flex items-center gap-2">
                <User size={20} />
              </button>

              {/* Dropdown appears on hover */}
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-50 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {auth.user.username || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-lg font-medium">
          <Link
            to="/"
            className="block hover:text-purple-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/mca"
            className="block hover:text-purple-600"
            onClick={() => setMenuOpen(false)}
          >
            MCA
          </Link>
          <Link
            to="/contact"
            className="block hover:text-purple-600"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {!auth.user ? (
            <Link
              to="/login"
              className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
