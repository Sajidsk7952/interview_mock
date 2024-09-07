"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { interviewdata } from "@/utils/types";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Questions from "../_components/Questions";
import Aswers from "../_components/Aswers";

function StartInterview({ params }: { params: { interviewId: string } }) {
  const { interviewId } = params;
  const [QuesData, setQuesData] = useState<
    { question: string; answer: string }[] | null
  >(null);
  const [activeState,setActiveState] = useState<number>(0)
  useEffect(() => {
    const interviewData = async function interviewData() {
      const getInterview = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        .execute();
      
      const quesResp = JSON.parse(getInterview[0].jsonMockResp);
      setQuesData(quesResp);
    };
    interviewData();
  }, [interviewId]);
  return (
    <div>
      <h1>start interview of {interviewId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center align-middle gap-6">
      <Questions mockQuestions = {QuesData} activeState = {activeState}/>
      <Aswers />
      </div>
    </div>
  );
}

export default StartInterview;
