import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verified() {

  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  console.log(data)




  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-200 mb-10 ">
        <div className="bg-gradient-to-r from-[#ff9900] to-[#00b8d4] rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Authentication Successful
            </h2>
            <p className="text-lg text-white">
              You are now verified. You can now upload your images/files.
            </p>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}
