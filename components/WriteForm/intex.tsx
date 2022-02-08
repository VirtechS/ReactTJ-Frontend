import { Button, Input } from "@material-ui/core";
import React from "react";
import styles from "./WriteForm.module.scss";
import dynamic from "next/dynamic";
import { Api } from "../../utils/api";

const Editor = dynamic(() => import("../Editor").then((m) => m.Editor), {
  ssr: false,
});

interface WriteFormProps {
  data?: any;
}

export const WriteForm: React.FC<WriteFormProps> = () => {
  const [isLoading, isSetLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [blocks, setBlocks] = React.useState([]);

  const onAddPost = async () => {
    try {
      isSetLoading(true);
      const post = await Api().post.create({
        title,
        body: blocks,
      });
      console.log(post);
    } catch (error) {
      console.warn("create post", error);
      alert(error);
    } finally {
      isSetLoading(false);
    }
  };
  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor onChange={(arr) => setBlocks(arr)} />
      </div>
      <Button disabled={isLoading}  onClick={onAddPost} variant="contained" color="primary">
        Опубликовать
      </Button>
    </div>
  );
};
