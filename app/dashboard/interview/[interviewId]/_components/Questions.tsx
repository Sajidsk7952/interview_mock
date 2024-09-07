import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
interface Question {
  question: string;
  answer: string;
}
interface QuestionsProps {
  activeState: number;
  mockQuestions: Question[] | null;
}

function Questions({ mockQuestions, activeState }: QuestionsProps) {
  // console.log(mockQuestions);
  const handleTextToSpeech = ()=> {
    if('speechSynthesis' in window){
        const text : string = mockQuestions[activeState]?.question;
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }else{
        alert('Your browser does not support text-to-speech functionality.');
    }
  }
  return (
    <section>
      {mockQuestions && (
        <section className="flex flex-col gap-6 my-2 p-4 rounded-md border">
          <div className="flex flex-wrap gap-3">
            {mockQuestions.map((ques, idx: number) => (
              <div
                className={`p-4 rounded-xl ${
                  activeState === idx
                    ? "bg-primary text-white"
                    : "bg-secondary text-black"
                }`}
                key={idx}
              >
                <h4 className="">Question - {idx + 1}</h4>
              </div>
            ))}
          </div>
          <div className="my-6">
            <Volume2 onClick={handleTextToSpeech} className="cursor-pointer"/>
            <p>{mockQuestions[activeState]?.question}</p>
          </div>
          <div className="bg-blue-100 rounded-md my-4 p-4">
            <h4 className="text-blue-600 flex">
              <Lightbulb />
              <strong>NOTE:</strong>
            </h4>
            <h4 className="text-blue-600">
              Click on the record answer to start recording and when you
              Complete your interview then you can see your feedback with actual
              answer
            </h4>
          </div>
        </section>
      )}
    </section>
  );
}

export default Questions;
