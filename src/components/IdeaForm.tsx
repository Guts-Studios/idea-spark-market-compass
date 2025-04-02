
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const IdeaForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ideaName: "",
    category: "",
    description: "",
    targetAudience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Idea Submitted Successfully!",
        description: "Redirecting you to the dashboard...",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ideaName">Business Idea Name</Label>
        <Input
          id="ideaName"
          name="ideaName"
          placeholder="Enter your business idea name"
          value={formData.ideaName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={handleSelectChange} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ecommerce">E-Commerce</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="consumer_goods">Consumer Goods</SelectItem>
            <SelectItem value="food_beverage">Food & Beverage</SelectItem>
            <SelectItem value="health_wellness">Health & Wellness</SelectItem>
            <SelectItem value="tech_hardware">Tech Hardware</SelectItem>
            <SelectItem value="financial">Financial Services</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Idea Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Briefly describe your business idea..."
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          id="targetAudience"
          name="targetAudience"
          placeholder="Who is your target audience?"
          value={formData.targetAudience}
          onChange={handleChange}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Analyzing..." : "Submit for Analysis"}
      </Button>
    </form>
  );
};

export default IdeaForm;
