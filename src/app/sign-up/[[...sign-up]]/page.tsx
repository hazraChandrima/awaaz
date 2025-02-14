import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa6";

export default function Page() {
  return (
   <div className="py-12 px-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-[35rem] mx-auto">
         <div className="p-6 sm:p-8">
           <div className="text-center">
             <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
             <p className="mt-2 text-sm text-gray-600">
               Already have an account ?
               <a
                 className="ml-2 text-blue-600 hover:underline font-medium"
                 href="/sign-in"
               >
                 Sign in
               </a>
             </p>
           </div>
   
           <div className="mt-6">
             <div className="flex space-x-2">
   
             <button
               type="button"
               className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
               >
               <FaGoogle />
               Google
             </button>
             <button
               type="button"
               className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
               >
               <FaFacebook />
               Facebook
             </button>
             <button
               type="button"
               className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
               >
               <FaLinkedinIn />
               LinkedIn
             </button>
               </div>
   
             <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 mx-6">
               Or
             </div>
   
             <form>
               <div className="grid gap-y-4">
                 <div>
                   <label htmlFor="name" className="block text-sm mb-2 text-gray-700">Full Name</label>
                   <input
                     type="text"
                     id="name"
                     name="name"
                     className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                     required
                   />
                 </div>
                 <div>
                   <label htmlFor="email" className="block text-sm mb-2 text-gray-700">Email address</label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                     required
                   />
                 </div>
                 <div>
                   <div className="flex justify-between items-center">
                     <label htmlFor="password" className="block text-sm mb-2 text-gray-700">Password</label>
                   </div>
                   <input
                     type="password"
                     id="password"
                     name="password"
                     className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                     required
                   />
                 </div>
                 <div>
                   <div className="flex justify-between items-center">
                     <label htmlFor="confirm-password" className="block text-sm mb-2 text-gray-700">Confirm Password</label>
                   </div>
                   <input
                     type="password"
                     id="confirm-password"
                     name="confirm-password"
                     className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                     required
                   />
                 </div>
   
                 <button
                   type="submit"
                   className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#CA3C25] text-white hover:bg-[#B83420] transition duration-200"
                 >
                   Create Now
                 </button>
               </div>
             </form>
           </div>
         </div>
       </div>
  );
}
