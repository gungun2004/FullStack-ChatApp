import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import {Link} from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigninUp } = useAuthStore();

  const validateForm = () => {                //here we made validateForm function to call on submit
    const { name, email, password } = formData;
    if (!name.trim()) toast.error("Name is required");
    if (!email.trim()) toast.error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return toast.error("Invalid Email Format")
      if(!password.trim()) return toast.error("Password is required")
    if(password.length<6) return toast.error("Password must be atleast 6 characters");
   
    return true;  // success 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      signup(formData); // if form is valid then call signup function
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-indigo-950">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 ">
        <div className="w-full max-w-md space-y-6 bg-indigo-950">
          {/* Logo */}
          <div>
          <h2 className="text-3xl font-bold text-center  text-sky-300">Create an Account</h2>
</div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium  text-sky-300">Full Name</label>
              <div className="flex items-center border bg-indigo-950 rounded-lg px-3 py-2">
                <User className="w-5 h-5  bg-indigo-950  text-sky-300 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                  placeholder="John Doe"
                  className="w-full focus:outline-none  bg-indigo-950  text-sky-300 mr-2 "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium  text-sky-300">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <Mail className="w-5 h-5 text-sky-300 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                   onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  placeholder="you@example.com"
                  className="w-full focus:outline-none  bg-indigo-950  text-sky-300 mr-2"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium  text-sky-300">Password</label>
              <div className="flex items-center border  bg-indigo-950  text-sky-300 mr-2 rounded-lg px-3 py-2">
                <Lock className="w-5 h-5  mr-2  text-sky-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  placeholder="••••••••"
                  className="w-full focus:outline-none  bg-indigo-950  text-sky-300 mr-2"
                />
               <div
  className="cursor-pointer text-sky-300 ml-2"
  onClick={() => setShowPassword((prev) => !prev)}
>
  {showPassword ? (
    <EyeOff className="w-5 h-5" />
  ) : (
    <Eye className="w-5 h-5 " />
  )}
</div>

              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-sky-300 hover:bg-indigo-950 hover:text-sky-300 text-indigo-950 font-medium py-2 rounded-lg transition duration-300"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                <Loader2 className="size-5 animate-spin"/>
                Loading...
                </>
              ):
              (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-sky-300 ">
            Already have an account?{" "}
            <Link to="/login" className="hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
    <AuthImagePattern
    title="Join Our Community"
    subtitle="Connect with friends, share moments, and stay touch with your loved ones."/>
    </div>
  )
};

export default SignUpPage;
