"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import WebCam from "./_components/WebCam";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { interviewdata } from "@/utils/types";

function InterviewPage({ params }: { params: { interviewId: string } }) {
  const [interviewData, setInterviewData] = useState<interviewdata | null>(
    null
  );
  useEffect(() => {
    const interviewData = async function interviewData() {
      const getInterview = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        .execute();
      console.log(getInterview[0]);
      console.log(typeof getInterview);
      //   return getInterview[0];/
      setInterviewData(getInterview[0]);
    };
    interviewData();
  }, [params.interviewId]);
  return (
    <section>
      <h1 className="font-bold text-2xl tracking-wide">Let's Begin</h1>
      <section className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <div className="border rounded-xl p-6 my-4">
            <h3 className="my-3">
              <strong>Job Position: </strong>
              {interviewData?.jobPosition}
            </h3>
            <h3 className="my-3">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData?.jobDesc}
            </h3>
            <h3 className="my-3">
              <strong>Years of Experience:</strong>
              {interviewData?.jobExp}
            </h3>
          </div>
          <div className="bg-yellow-100 border rounded-lg p-4">
            <h3 className="flex font-bold text-yellow-500">
              <Lightbulb />
              Information
            </h3>
            <p className="text-yellow-500">
              Enable MicroPhone and video to start your AI generated Mock
              Interview,
              <br /> This interview consists of 5 questions of which you are
              needed to answer and after completion of your interview you will
              get a feedback
              <br />
              <span className="text-yellow-600">We never record your video </span>
            </p>
          </div>
          <div className="my-4">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}><Button>Start Interview</Button></Link>
          </div>
        </div>
        <WebCam style={{ height: 320, width: 320 }}/>
      </section>
    </section>
  );
}

export default InterviewPage;
