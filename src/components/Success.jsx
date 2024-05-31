import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackgroundBeams } from "../components/ui/background-beams";
import "@uploadcare/react-uploader/core.css"
// import FileUpload from './FileUpload';
import {FileUploaderRegular} from "@uploadcare/react-uploader";
import { createC2pa } from "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/+esm";

export default function Success() {

    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [menifestStore, setManifestStore] = useState(null);
    const [activeManifest, setActiveManifest] = useState(null);

    const handleChangeEvent = (items) => {
        setMessage("");
        setFiles([...items.allEntries.filter((file) => file.status === 'success')]);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state?.data;

    const currentTime = new Date();
    const timeString = currentTime.toTimeString().split(' ')[0]; // Better time formatting

    useEffect(() => {
        if (!data) {
            navigate('/');
        }
    }, [data, navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function readFile(fileUrl){
        setMessage("");
        // Initialize the c2pa-js SDK
        const c2pa = await createC2pa({
            wasmSrc:
                "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/assets/wasm/toolkit_bg.wasm",
            workerSrc:
                "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/c2pa.worker.min.js",
        });

        try {

            console.log("Sample Image URL:", fileUrl);

            console.log(c2pa)

            // Read in the uploaded image and get a manifest store
            const { manifestStore } = await c2pa.read(fileUrl);
            setManifestStore(manifestStore);

            if(!manifestStore){
                setMessage("Error reading image.");
                return;
            }

            console.log("Manifest Store:", manifestStore);

            // Get the active manifest
            const activeManifest = manifestStore?.activeManifest;
            console.log({activeManifest})
            setActiveManifest(activeManifest);
        } catch (err) {
            console.error("Error reading image:", err);
            setMessage("Error reading image.");
        }
    }

    useEffect(() => {
        if (files) {
            if(files[0]?.cdnUrl){
                readFile(files[0]?.cdnUrl).then();
            }
        }
    }, [files]);

    console.log(files[0])

    return (
        <div>
            <BackgroundBeams />

            

            <div className="min-h-screen bg-gray-700 bg-gradient-to-b from-gray-950 flex justify-center items-center">
                <div className="w-3/5 max-w-5xl p-5 md:p-10 z-10 bg-white rounded">

                    {/*<FileUpload/>*/}
                    {message && (
                    <div className=" text-center py-2 text-sm text-gray-500 mb-5 md:mb-10 bg-sky-300 border-sky-700">
                        {message}
                    </div>

                    )}
                    <FileUploaderRegular
                        pubkey="732cb0fc058282f38790"
                        maxLocalFileSizeBytes={10000000}
                        imgOnly={true}
                        sourceList="local, url, camera"
                        onChange={handleChangeEvent}
                    />
                    <hr/>
                    <br/>
                    <div>
                        <center>

                            {files.map((file) => (
                                <div key={file.uuid}>
                                    <img
                                        width={400}
                                        src={file.cdnUrl}
                                        alt={file.fileInfo.originalFilename}
                                    />
                                </div>
                            ))}
                        </center>
                    </div>

                    <div>
                        {activeManifest && (
                            <div className="container mx-auto p-4">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <p className="font-semibold text-center text-lg">
                                            Active Manifest
                                        </p>
                                    </div>
                                    <table className="min-w-full bg-white table-auto">
                                        <tbody>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <td className="py-3 px-4 text-sm text-gray-700">
                                                {activeManifest.title}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Format
                                            </th>
                                            <td className="py-3 px-4 text-sm text-gray-700">
                                                {activeManifest.format}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Instance ID
                                            </th>
                                            <td className="py-3 px-4 text-sm text-gray-700">
                                                {activeManifest.instanceId}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Signature Info
                                            </th>
                                            <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                                                {activeManifest.signatureInfo
                                                    ? Object.keys(activeManifest.signatureInfo).map(
                                                        (key) => (
                                                            <div key={key} className="mb-1">
                                  <span className="font-semibold">
                                    {key.replace(/_/g, " ")}:
                                  </span>{" "}
                                                                {String(activeManifest.signatureInfo[key])}
                                                            </div>
                                                        )
                                                    )
                                                    : "No Signature Info"}
                                            </td>
                                        </tr>
                                        {/* <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Instance</th>
              <td className="py-3 px-4 text-sm text-gray-700">{activeManifest.instance}</td>
            </tr> */}
                                        <tr>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Ingredients
                                            </th>
                                            <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                                                {activeManifest.ingredients.length > 0
                                                    ? activeManifest.ingredients.map(
                                                        (ingredient, index) => (
                                                            <div key={index} className="mb-2">
                                                                <div>
                                    <span className="font-semibold">
                                      Title:
                                    </span>{" "}
                                                                    {ingredient.title}
                                                                </div>
                                                                <div>
                                    <span className="font-semibold">
                                      Format:
                                    </span>{" "}
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
                                                        )
                                                    )
                                                    : "No Ingredients"}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button className="absolute top-5 right-5 text-white bg-red-500 px-4 py-2 rounded text-lg"
                        onClick={logout}>Logout
                </button>
            </div>
        </div>
    );
}


