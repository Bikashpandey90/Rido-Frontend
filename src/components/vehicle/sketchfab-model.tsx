
import { useEffect, useRef } from "react"

interface SketchfabModelProps {
    modelId: string
    height?: number | string
    autoStart?: boolean
    transparent?: boolean
    className?: string
}

export default function SketchfabModel({
    modelId,
    height = 300,
    
    className = "",
}: SketchfabModelProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Handle resize to maintain aspect ratio
    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current) {
                const width = iframeRef.current.parentElement?.clientWidth || 300
                iframeRef.current.style.height = typeof height === "number" ? `${height}px` : height
                iframeRef.current.style.width = `${width}px`
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [height])

    return (
        <div
            className={`sketchfab-embed-wrapper w-full ${className}`}
            style={{ height: typeof height === "number" ? `${height}px` : height }}
        >
            <iframe
                ref={iframeRef}
                title="Sketchfab 3D Model"
                frameBorder="0"
                allow="autoplay; xr-spatial-tracking"
                style={{ width: "100%", height: "100%" }}
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&transparent=1&ui_watermark=0&ui_infos=0&ui_settings=0&ui_fullscreen=0&ui_controls=0&ui_hint=0&ui_help=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1`}
            />
        </div>
    )
}
