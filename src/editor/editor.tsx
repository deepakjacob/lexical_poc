import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { TermNode } from "./TermNode";
import { TermButton } from "./TermButton";
import { TermPlugin } from "./TermPlugin";
import { ActionsPlugin } from "./ActionsPlugin";
import { AutoFocusPlugin } from "./AutoFocusPlugin";
import { onChange } from "./onChange";

const theme = {};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    theme,
    onError,
  };

  return (
    <>
      <LexicalComposer initialConfig={{ ...initialConfig, nodes: [TermNode] }}>
        <LexicalPlainTextPlugin
          contentEditable={<LexicalContentEditable />}
          placeholder={<div>Enter some text...</div>}
        />
        <LexicalOnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <TermPlugin />
        <TermButton />
        <ActionsPlugin />
      </LexicalComposer>
    </>
  );
}

export default Editor;
