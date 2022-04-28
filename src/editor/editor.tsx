import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import EditorTheme from "../themes/EditorTheme";
import { ActionsPlugin } from "./ActionsPlugin";
import { AutoFocusPlugin } from "./AutoFocusPlugin";
import { onChange } from "./onChange";
import { useSharedHistoryContext } from "./SharedHistoryContext";
import { TermButton } from "./TermButton";
import { TermNode } from "./TermNode";
import { TermPlugin } from "./TermPlugin";
import { ToolbarPlugin } from "./ToolbarPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
const theme = {};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    nodes: [TermNode],
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
          {/* <LexicalPlainTextPlugin
          contentEditable={<LexicalContentEditable />}
          placeholder={<div>Enter some text...</div>}
        /> */}
          <RichTextPlugin
            contentEditable={<LexicalContentEditable />}
            placeholder={<div></div>}
          />
          <LexicalMarkdownShortcutPlugin />
          {/* <LexicalOnChangePlugin onChange={onChange} /> */}
          <HistoryPlugin externalHistoryState={historyState} />
          <AutoFocusPlugin />
          <TermPlugin />
          <TermButton />
          <ActionsPlugin />
        </div>
      </LexicalComposer>
    </>
  );
}

export default Editor;
