import React, { useState, useRef, useEffect } from "react"

const ThumbnailGenerator = ({ videoFile, className }: { videoFile: string | undefined, className: string }) => {

    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    const generateThumbnail = async () => {

        if (videoRef.current && videoFile) {
            videoRef.current.src = videoFile
            await new Promise((resolve) => {
                videoRef.current!.onloadedmetadata = resolve
            })

            videoRef.current.currentTime = 2

            await new Promise((resolve) => {
                videoRef.current!.onseeked = resolve
            })

            const canvas = document.createElement("canvas")

            if (canvas && videoRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
                canvas.width = videoRef.current.videoWidth
                canvas.height = videoRef.current.videoHeight
                const context = canvas.getContext("2d")
                if (context && canvas.width !== 0 && canvas.height !== 0) {
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
                    setThumbnail(canvas.toDataURL())
                }
            }
        }
    }

    useEffect(() => {
        generateThumbnail()
    }, [videoFile])

    return (
        <>
            <video style={{ display: "none" }} ref={videoRef}  />
            {thumbnail ? (
                <img src={thumbnail} alt="Video thumbnail" className={className} />
            ) : (
                <p>Generating thumbnail...</p>
            )}
        </>
    )
}

export default ThumbnailGenerator