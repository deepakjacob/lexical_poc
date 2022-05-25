import CheckListPlugin from "@lexical/react/LexicalCheckListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import MarkdownShortcutPlugin from "./MarkdownShortcutPlugin";
import { useSharedHistoryContext } from "./SharedHistoryContext";
import { ToolbarPlugin } from "./ToolbarPlugin";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import LexicalComposer from "@lexical/react/LexicalComposer";
import Nodes from "./Nodes";
import EditorTheme from "../themes/EditorTheme";
const theme = {};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    nodes: [...Nodes],
    onError: (error: any) => {
      console.log(error);
    },
    theme: EditorTheme,
  };
  const { historyState } = useSharedHistoryContext();
  return (
    <>
      <LexicalComposer initialConfig={initialConfig as any}>
        <ToolbarPlugin />
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="ContentEditable_root" />
            }
            placeholder={<div></div>}
          />
          <MarkdownShortcutPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin externalHistoryState={historyState} />
        </div>
      </LexicalComposer>
    </>
  );
}

export default Editor;
