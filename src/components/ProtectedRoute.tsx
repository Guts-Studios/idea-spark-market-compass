
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to auth page if not logged in
      navigate("/auth", { state: { from: location } });
    }
  }, [user, loading, navigate, location]);

  // Show loading or render the child routes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
