import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditorDemo({
   code,
   selectedLanguage,setCodes,socket
}) {
   
   
   


   return (
      
      <Editor
         height="500px"
         language={selectedLanguage}
         value={code}
         options={{
     wordWrap:"on"
  }}
    onChange={(value)=>{

   const newCode = value || "";

   setCodes((prevCodes)=>({

      ...prevCodes,

      [selectedLanguage]: newCode

   }));

   socket.emit(
      "code-change",
      {
         language: selectedLanguage,
         code: newCode
      }
   );

}}
      />
   );
}

export default CodeEditorDemo;