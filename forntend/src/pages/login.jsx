import {useState} from "react";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import { Zap } from "lucide-react";
import { login } from "../lib/api.js";
import { Link, useNavigate } from "react-router";


const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: loginMutation, isPending, error} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.clear();
            queryClient.setQueryData(["authUser"], data.user);
            navigate(data.user?.isOnboarded ? "/" : "/onboarding");
        },
    });

    const   handleLogin=(e) =>  {
        e.preventDefault();
        loginMutation(loginData);
    }

    const errorMessage =
        error?.response?.data?.message ||
        (error?.message === "Network Error" ? "Cannot connect to backend server" : error?.message) ||
        "Login failed";
    
    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
    
    {/*login page section*/}
    <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
    {/*logo*/}
    <div className="mb-4 flex items-center justify-start gap-2">
        <Zap className="size-9 text-primary"/>
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Conectify</span>
    </div>
        {/*eooe in mesageing*/}
       {error && (
        <div className="alert alert-error mb-4">
            <span>{errorMessage}</span>
        </div>
       )

        }
    <div className="w-full">
    <form onSubmit={handleLogin}>
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">signin to your account</p>
     
    </div>
    <div className="flex flex-col gap-3">
         <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signin" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    
     {/* IMAGE SECTION */}
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

    );
}

export default LoginPage;
