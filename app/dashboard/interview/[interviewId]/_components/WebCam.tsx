"use client";
import { Button } from "@/components/ui/button";
import { WebcamIcon } from "lucide-react";
import React, { useState } from "react";
import Webcam from "react-webcam";
function WebCam({style} : {style : React.CSSProperties | undefined}) {
  const [allowWebCam, setAllowedWebCam] = useState(false);

  return (
    <div className="my-3">
      {allowWebCam ? (
        <div className="flex flex-col gap-4 items-center">
        <Webcam
          onUserMedia={() => setAllowedWebCam(true)}
          onUserMediaError={() => setAllowedWebCam(false)}
          mirrored={true}
          style={style}
        />
        <Button variant="ghost" className="border" onClick={()=>setAllowedWebCam(false)}>Disable Camera</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
        <WebcamIcon className="h-80 w-80 p-10 bg-secondary "/>
        <Button variant="ghost" className="border" onClick={()=>setAllowedWebCam(true)}>Enable Camera</Button>
        </div>
      )}
    </div>
  );
}

export default WebCam;
