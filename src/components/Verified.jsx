import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verified() {

  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const active = location?.state?.active;

  console.log(data)
  console.log(active);

 



  return (
    <>
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Verified Details</h1>
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/* Left Column */}
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <img
            src={active?.image} // Placeholder image, replace with actual image URL
            alt="Verified"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
          {active && (
            <div className="text-left w-full">
              <h2 className="text-2xl font-bold mb-2">{active.title}</h2>
                <p><span className="font-semibold">Instance ID:</span> {active.instanceId}</p>
                <p><span className="font-semibold">Format:</span> {active.format}</p>
              <p><span className="font-semibold">Signature Info:</span></p>
              <ul className="list-disc list-inside mb-4">
                <li><span className="font-semibold">Issuer:</span> {active.signatureInfo.issuer}</li>
                <li><span className="font-semibold">Serial Number:</span> {active.signatureInfo.cert_serial_number}</li>
                <li><span className="font-semibold">Time:</span> {active.signatureInfo.time}</li>
              </ul>
              <div>
                <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
                {active.ingredients.length > 0 && active.ingredients.map((ingredient, index) => (
                  <div key={index} className="mb-2">
                    <p><span className="font-semibold">Title:</span> {ingredient.title}</p>
                    <p><span className="font-semibold">Format:</span> {ingredient.format}</p>
                    <p><span className="font-semibold">Instance ID:</span> {ingredient.instanceId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 p-4 bg-gray-50 flex flex-col justify-center">
          {data && (
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">Mobile Data</h2>
              <p><span className="font-semibold">Mobile:</span> {data.mobile}</p>
              {data.name && <p><span className="font-semibold">Name:</span> {data.name}</p>}
              {data.address && <p><span className="font-semibold">Address:</span> {data.address}</p>}
              {data.email && <p><span className="font-semibold">Email:</span> {data.email}</p>}
              {data.imei && <p><span className="font-semibold">IMEI:</span> {data.imei}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}





//   return (
//     <>
//       <div className="flex items-center justify-center h-screen bg-slate-200 mb-10 ">
//         <div className="bg-gradient-to-r from-[#ff9900] to-[#00b8d4] rounded-lg shadow-lg p-8 w-full max-w-md">
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-bold text-white">
//               Authentication Successful
//             </h2>
//             <p className="text-lg text-white">
//               You are now verified. You can now upload your images/files.
//             </p>
//           </div>
//           <div>
            
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
