import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

export const client = new OpenAI({
  apiKey: OPENAI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});
