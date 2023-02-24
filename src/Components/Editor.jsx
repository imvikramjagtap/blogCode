import JoditEditor from "jodit-react";
import { useRef } from "react";

export default function Editor({setContent, content }) {
  const edit = useRef(null);

  return (
    <div className="bg-white">
      <JoditEditor
        ref={edit}
        value={content}
        onChange={(newContent) => setContent(newContent)}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
}
