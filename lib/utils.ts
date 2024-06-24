import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const fetchTextSnippets = async () => {
  try {
    const response = await axios.get('/path/to/textsnippets.xml');
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, 'text/xml');
    return xml;
  } catch (error) {
    console.error('Error fetching text snippets:', error);
    return null;
  }
};

const getTextSnippet = (xml:any, id:any, lang = 'en') => {
  const snippet = xml.querySelector(`text[id="${id}"] content[lang="${lang}"]`);
  return snippet ? snippet.textContent : '';
};
