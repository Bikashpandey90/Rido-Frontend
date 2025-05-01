import SketchfabModel from "./sketchfab-model"



export default function VehicleModel({
    vehicleType = "car",
    height = 300,
}: {
    vehicleType?: "car" | "bike"
    height?: number
}) {
    // Different model IDs for car and bike
    const modelIds = {
        car: "a065dbb4ab824cd0a07e2eaf02672d0f", // Modern Cartoon Cup Car - Darsche 91
        bike: "b4effba1fb8e4f3c9da2677361c5fde3", // Ducati Diavel Dark 1200CC
    }

    return (
        <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden">
            <SketchfabModel modelId={modelIds[vehicleType]} height={height} autoStart={true} transparent={true} />
        </div>
    )
}
