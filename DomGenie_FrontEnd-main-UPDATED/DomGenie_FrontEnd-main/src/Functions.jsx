import { useState,useEffect } from "react";

export const parseContent = (content) => {
  if (typeof content !== "string") {
    return <div>{content}</div>;
  }

   // Regex to find JSON inside <pre> tags
   const formattedContent = content.replace(
    /<pre>(.*?)<\/pre>/gs,
    (_, jsonString) => {
      try {
        const parsedJson = JSON.parse(jsonString);
        return `<pre>${JSON.stringify(parsedJson, null, 2)}</pre>`; // Pretty-print JSON
      } catch (error) {
        return `<pre>${jsonString}</pre>`; // Return as is if parsing fails
      }
    }
  );

  return (

    <div className="prose" dangerouslySetInnerHTML={{ __html: formattedContent }} />
  );
};


const TypingEffect = ({ text}) => {
  const [displayedText, setDisplayedText] = useState("");
const speed = 50
  useEffect(() => {
    if (!text) return; 
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};