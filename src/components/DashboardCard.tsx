
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  children, 
  className = "" 
}) => {
  return (
    <Card className={`shadow-sm card-hover h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md md:text-lg flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
