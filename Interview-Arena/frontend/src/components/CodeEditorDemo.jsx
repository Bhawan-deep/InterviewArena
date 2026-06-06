import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditorDemo({
   code,
   setCode
}) {


   return (
      <Editor
         height="500px"
         defaultLanguage="javascript"
         value={code}
         options={{
     wordWrap:"on"
  }}
         onChange={(value)=>{
   setCode(value);
}}
      />
   );
}

export default CodeEditorDemo;