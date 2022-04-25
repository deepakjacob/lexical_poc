import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { INSERT_TERM_COMMAND } from "./TermPlugin";

export function TermButton() {
  const [editor] = useLexicalComposerContext();
  const insertTerm = useCallback(
    (term: string, description: string, value: string) => {
      // Executing command defined in a plugin
      editor.dispatchCommand(INSERT_TERM_COMMAND, { term, description, value });
    },
    [editor]
  );
  return (
    <button onClick={() => insertTerm("term", "description", "value")}>
      Add term
    </button>
  );
}
