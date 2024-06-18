import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verified() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const active = location?.state?.active;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-400 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Verified Details
        </h1>
        <div className=" max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left Column */}
          <div className="md:w-1/2 p-4 flex flex-col items-center">
            <img
              src={active?.image}
              alt="Verified"
              className="w-48 h-48 object-cover rounded-lg mb-4"
            />
            {active && (
              <div className="text-left w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  {" "}
                  Image Details
                </h2>
                <table className="min-w-full bg-white table-auto">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Instance ID:
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {active.instanceId}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Format:
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {active.format}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Signature Info
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                        {active.signatureInfo
                          ? Object.keys(active.signatureInfo).map((key) => (
                              <div key={key} className="mb-1">
                                <span className="font-semibold">
                                  {key.replace(/_/g, " ")}:
                                </span>{" "}
                                {String(active.signatureInfo[key])}
                              </div>
                            ))
                          : "No Signature Info"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Ingredients
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                        {active.ingredients.length > 0
                          ? active.ingredients.map((ingredient, index) => (
                              <div key={index} className="mb-2">
                                <div>
                                  <span className="font-semibold">Title:</span>{" "}
                                  {ingredient.title}
                                </div>
                                <div>
                                  <span className="font-semibold">Format:</span>{" "}
                                  {ingredient.format}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Instance ID:
                                  </span>{" "}
                                  {ingredient.instanceId}
                                </div>
                                <div className="mt-1 border-t border-gray-300"></div>
                              </div>
                            ))
                          : "No Ingredients"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 p-4 bg-gray-50 flex flex-col justify-center">
            {data && (
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800  text-center mb-2">
                  iVALT Information
                </h2>
                <table className="min-w-full bg-white table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-100">
                      <td className="font-semibold text-gray-700 border px-4 py-2">
                        Mobile
                      </td>
                      <td className="border px-4 py-2">{data.mobile}</td>
                    </tr>
                    {data.name && (
                      <tr className="hover:bg-gray-100">
                        <td className="font-semibold text-gray-700 border px-4 py-2">
                          Name
                        </td>
                        <td className="border px-4 py-2">{data.name}</td>
                      </tr>
                    )}
                    {data.address && (
                      <tr className="hover:bg-gray-100">
                        <td className="font-semibold text-gray-700 border px-4 py-2">
                          Address
                        </td>
                        <td className="border px-4 py-2">{data.address}</td>
                      </tr>
                    )}
                    {data.email && (
                      <tr className="hover:bg-gray-100">
                        <td className="font-semibold text-gray-700 border px-4 py-2">
                          Email
                        </td>
                        <td className="border px-4 py-2">{data.email}</td>
                      </tr>
                    )}
                    {data.imei && (
                      <tr className="hover:bg-gray-100">
                        <td className="font-semibold text-gray-700 border px-4 py-2">
                          Trusted Device
                        </td>
                        <td className="border px-4 py-2">{data.imei}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
