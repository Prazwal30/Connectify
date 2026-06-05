import { useState } from 'react'
import { Zap } from "lucide-react";
import {Link, useNavigate} from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import{signin} from "../lib/api.js"
const Signin = () => {
const [signindata,setSignindata]=useState({
fullName:"",
email:"",
password:"",    
}); 
const queryClient =useQueryClient()
const navigate = useNavigate()
const {mutate:signinmutation, isPending,error} =useMutation({
  mutationFn: signin,
  onSuccess:(data)=> {
    queryClient.setQueryData(["authUser"], data.user);
    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] !== "authUser",
    });
    navigate(data.user?.isOnboarded ? "/" : "/onboarding");
  },
})
const handleSignin=(e)=>{
    e.preventDefault();  
    signinmutation(signindata);
}
const errorMessage =
  error?.response?.data?.message ||
  (error?.message === "Network Error" ? "Cannot connect to backend server" : error?.message) ||
  "Signin failed";
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
  <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Zap className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Conectify
            </span>
          </div>
          {/*error*/}
{error && (
  <div className="alert alert-error mb-4">
  <span>{errorMessage}</span>
  </div>
)}



          <div className="w-full">
<form onSubmit={handleSignin}>
<div className="space-y-5">
<div>
<h2 className="text-xl font-semibold">Create your account
</h2>
<p className="text-sm opacity-70">Join our community today</p>
</div>
<div className="space-y-4">
  <div className="form-control w-full">
    <label className="label pb-1">
      <span className="label-text">Full Name</span>
    </label>
      <input type="text"
      placeholder="for eg prazwal"
      className="input  input-bordered w-full"
      value ={signindata.fullName}
      onChange={(e)=> setSignindata({...signindata,fullName:e.target.value})}
      required
      />

  </div>
  <div className="form-control w-full">
    <label className="label pb-1">
      <span className="label-text">Email</span>
    </label>
      <input type="email"
      placeholder="for eg prazwal@gmail.com"
      className="input  input-bordered w-full"
      value ={signindata.email}
      onChange={(e)=> setSignindata({...signindata,email:e.target.value})}
      required
      />

  
</div>

<div className="form-control w-full">
    <label className="label pb-1">
      <span className="label-text">Password</span>
    </label>
      <input type="password"
      placeholder="*********"
      className="input  input-bordered w-full"
      value ={signindata.password}
      onChange={(e)=> setSignindata({...signindata,password:e.target.value})}
      required
      />
<p className="text-xs opacity-70 mt-1">
  Password must be 6 characters long
</p>
</div>
 <div className="form-control">
    <label className="label cursor-pointer justify-start gap-2">
    <input type="checkbox" className="checkbox checkbox-sm" required />
         <span className="text-xs leading-tight">
           I agree to the{" "}
    <span className="text-primary hover:underline">terms of service</span> and{" "}
     <span className="text-primary hover:underline">privacy policy</span>
       </span>
      </label>
  </div>
  <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
   {isPending ? "Signin...": "Create Account"}
  </button>
<div className="text-center mt-4">
  <p className="text-sm">
    Already have an account?{" "}
    <Link to="/login" className="text-primary hover:underline">
    Sign in
    </Link>
  </p>
</div>
</div>
 </div>

</form>
         </div>
        </div>
      
       <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-amico.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
