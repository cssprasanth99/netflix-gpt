import Gemini from "gemini-ai";
import { GEMINI_KEY } from "./constants";
import "whatwg-fetch";

export const gemini = new Gemini(GEMINI_KEY, {
  fetch: window.fetch.bind(window),
});
