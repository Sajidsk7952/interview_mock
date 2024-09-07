"use client";
import React, { FormEvent, useState } from "react";
import {chatSession} from '@/utils/GeminiAI';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {db} from '@/utils/db';
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from 'moment';
import Error from "next/error";
import { useRouter } from "next/navigation";
function AddInterview() {
  const [openDiagoue, setOpenDialogue] = useState<true | false>(false);
  const [loading,setLoading] = useState <boolean> (false);
  const {user} = useUser();
  const router = useRouter();
  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = async(e) => {
    setLoading(true);
    e.preventDefault();
    const formData : FormData = new FormData(e.currentTarget);
    const jobRole: FormDataEntryValue|null  = formData.get("jobRole");
    const jobDescription:  FormDataEntryValue|null = formData.get("jobDesc");
    const jobExp: FormDataEntryValue|null  = formData.get("jobExp");
    // console.log(jobRole, jobDescription, jobExp);
    try {
      const inputPromt = `job: ${jobRole}, job Description :${jobDescription}, Job Experience ${jobExp} years, Generate 5 interview questions in json format, generate question and answer as fields`
    const result = await chatSession.sendMessage(inputPromt);
    const resultResp: string = result.response.text().replace('```json','').replace('```','');
    console.log(JSON.parse(resultResp));

    const dbResp = await db.insert(MockInterview).values(
      {
        jsonMockResp : resultResp,
        mockId : uuidv4(),
        jobPosition : jobRole,
        jobDesc : jobDescription,
        jobExp : jobExp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt : moment().format('DD MM YYYY'),
      }
    ).returning({mockId : MockInterview.mockId});
    setOpenDialogue(false);
    setLoading(false);
    router.push(`/dashboard/interview/${dbResp[0]?.mockId}`);
    console.log(dbResp);
    } catch (error) {
      throw new Error(error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="border p-10 rounded-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialogue(true)}
      >
        <h2 className="font-semibold text-xl text-center">+ Add Interview</h2>
      </div>
      <Dialog open={openDiagoue}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell Us more!</DialogTitle>
            {/* <h1 className="text-xl font-bold">Tell Us More!</h1> */}
            <DialogDescription>
              <div>
                <form onSubmit={submitHandler}>
                  <div className="mt-4 my-3">
                    <label htmlFor="jobRole">Job Role</label>
                    <Input
                      type="text"
                      id="jobRole"
                      name="jobRole"
                      placeholder="Ex. Developer"
                      required
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="jobDesc">Job Description/Tech Stack</label>
                    <Textarea
                      id="jobDesc"
                      name="jobDesc"
                      placeholder="Ex. Java, Spring, MySQL"
                      required
                    />
                  </div>
                  <div className="mb-4 my-3">
                    <label htmlFor="jobExp">Years of Experience</label>
                    <Input
                      type="number"
                      id="jobExp"
                      name="jobExp"
                      placeholder="Ex. 2"
                      required
                      max={50}
                    />
                  </div>
                  <div className="flex gap-4 justify-end my-3">
                    <Button
                      variant={"ghost"}
                      onClick={() => setOpenDialogue(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>{loading ? <><Loader2 className="animate-spin"/>Generating From AI</>: 'Start Inteview'}</Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddInterview;
