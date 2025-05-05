
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neura-gradient p-4">
      <div className="glass-card p-8 md:p-12 rounded-xl text-center max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold text-neuraxGreen mb-4">404</h1>
        <p className="text-2xl text-white mb-6">Page Not Found</p>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark flex items-center gap-2">
          <Home size={16} />
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
