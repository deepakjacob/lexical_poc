import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  createCommand,
  $getSelection,
  RangeSelection,
} from "lexical";
import { useEffect } from "react";
import { $createTermNode } from "./TermNode";

// Create a custom command with a typed payload.
type InsertTermCommandPayload = {
  term: string;
  description: string;
  value: string;
};
export const INSERT_TERM_COMMAND: LexicalCommand<InsertTermCommandPayload> =
  createCommand();

export function TermPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Similar with command listener, which returns unlisten callback
    const removeListener = editor.registerCommand(
      INSERT_TERM_COMMAND,
      (payload: InsertTermCommandPayload) => {
        // Adding custom command that will be handled by this plugin
        editor.update(() => {
          const selection = $getSelection();
          if (selection !== null) {
            const { term, description, value } = payload;
            (selection as RangeSelection).insertNodes([
              $createTermNode(term, description, value),
            ]);
          }
        });

        // Returning true indicates that command is handled and no further propagation is required
        return true;
      },
      0
    );

    return () => {
      removeListener();
    };
  }, [editor]);

  return null;
}
