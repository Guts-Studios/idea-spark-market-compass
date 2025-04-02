
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Schema for signup form
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Schema for reset password form
const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "reset">("login");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const { user, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Create forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Clear form errors when switching tabs
  useEffect(() => {
    setLoginError(null);
    setSignupError(null);
    setResetError(null);
    setSignupSuccess(false);
    setResetSuccess(false);
  }, [activeTab]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Handle login submission
  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setLoginError(null);
      await signIn(data.email, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back to MarketCompass",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "Failed to sign in. Please check your credentials.");
    }
  };

  // Handle signup submission
  const onSignupSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      setSignupError(null);
      await signUp(data.email, data.password, data.fullName);
      setSignupSuccess(true);
      signupForm.reset();
    } catch (error: any) {
      console.error("Signup error:", error);
      setSignupError(error.message || "Failed to create account. Please try again.");
    }
  };

  // Handle reset password submission
  const onResetSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      setResetError(null);
      await resetPassword(data.email);
      setResetSuccess(true);
      resetForm.reset();
    } catch (error: any) {
      console.error("Reset password error:", error);
      setResetError(error.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to MarketCompass</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" && "Sign in to your account"}
            {activeTab === "signup" && "Create your account"}
            {activeTab === "reset" && "Reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "signup" | "reset")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              {loginError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginForm.formState.isSubmitting}
                  >
                    {loginForm.formState.isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center">
                <Button 
                  variant="link" 
                  className="px-0 font-normal text-sm"
                  onClick={() => setActiveTab("reset")}
                >
                  Forgot your password?
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              {signupError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{signupError}</AlertDescription>
                </Alert>
              )}
              
              {signupSuccess && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Account created successfully! Please check your email for verification instructions.
                    <br />
                    <Button 
                      variant="link" 
                      className="px-0 font-normal text-sm text-green-700"
                      onClick={() => setActiveTab("login")}
                    >
                      Go to login
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              {!signupSuccess && (
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={signupForm.formState.isSubmitting}
                    >
                      {signupForm.formState.isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              )}
            </TabsContent>
            
            <TabsContent value="reset">
              {resetError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{resetError}</AlertDescription>
                </Alert>
              )}
              
              {resetSuccess && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Reset email sent successfully! Please check your inbox for further instructions.
                    <br />
                    <Button 
                      variant="link" 
                      className="px-0 font-normal text-sm text-green-700"
                      onClick={() => setActiveTab("login")}
                    >
                      Back to login
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              {!resetSuccess && (
                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                    <FormField
                      control={resetForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={resetForm.formState.isSubmitting}
                    >
                      {resetForm.formState.isSubmitting ? "Sending reset email..." : "Send Reset Email"}
                    </Button>
                  </form>
                </Form>
              )}
              
              {!resetSuccess && (
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    className="px-0 font-normal text-sm"
                    onClick={() => setActiveTab("login")}
                  >
                    Back to login
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
