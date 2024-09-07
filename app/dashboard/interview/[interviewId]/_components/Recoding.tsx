"use client";
import { AudioWaveform, CircleStop, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";

type ResultType = {
    speechBlob?: Blob;
    timestamp: number;
    transcript: string;
  };

interface SpeechToTextHook {
    error: string;
    interimResult: string | undefined;
    isRecording: boolean;
    results: string[] | ResultType[];
    // setResults: Dispatch<SetStateAction<ResultType[]>>;
    startSpeechToText: () => Promise<void>;
    stopSpeechToText: () => void;
}

export default function Recording() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  }: SpeechToTextHook = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [userAns,setUserAns] = useState("");
  useEffect(()=>{
    results.map((res)=> (
        setUserAns(prev => prev+res?.transcript)
    ))
  },[results])
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  const handleRecording = ()=>{
    if(isRecording){
        // console.log(userAns);
        stopSpeechToText();
    }else{
        startSpeechToText();
    }
  }
  return (
    <div>
      {/* <h1>Recording: {isRecording ? 'true' : 'false'}</h1> */}
      <button onClick={handleRecording} className={`flex gap-1 text-lg ${isRecording ? 'text-red-500' : 'text-primary'} border p-4 rounded-md`}>
        {isRecording ? <> <CircleStop />Stop Recording</> : <><Mic />Start Recording</>}
      </button>
      <Button onClick={()=>{console.log(userAns)}}>Show user Answer</Button>
    </div>
  );
}