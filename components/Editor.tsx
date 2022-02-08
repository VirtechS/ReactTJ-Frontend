import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  onChange: (blocks: OutputData["blocks"]) => void;
}

export const Editor: React.FC<EditorProps> = ({ onChange }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      placeholder: "Введите текст вашей статьи",
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error("ERROR editor", e));
    };
  }, []);

  return <div id="editor" />;
};
