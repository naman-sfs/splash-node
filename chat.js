import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import template from "./prompt.js";

async function generateQuestions(gender,bio,interests){

    const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.5
    });
    
    const prompt = ChatPromptTemplate.fromTemplate(template);
    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const result = await chain.invoke({ gender,bio,interests });
    return result
}

export default generateQuestions
