import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { exportFile, importFile } from "./fileImportExport";
import { $getRoot, $createTextNode } from "lexical";
import { useCallback } from "react";
import { $convertToMarkdownString } from "@lexical/markdown";
export const ActionsPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const markdown = $convertToMarkdownString();
      console.log(markdown);
    });
  }, [editor]);
  return (
    <>
      <button
        className="action-button"
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown"
      >
        Markdown
        <i className="markdown" />
      </button>
      <button
        className="action-button import"
        onClick={() => importFile(editor)}
        title="Import"
        aria-label="Import editor state from JSON"
      >
        Import
        <i className="import" />
      </button>
      <button
        className="action-button export"
        onClick={() =>
          exportFile(editor, {
            fileName: `Playground ${new Date().toISOString()}`,
            source: "Playground",
          })
        }
        title="Export"
        aria-label="Export editor state to JSON"
      >
        Export
        <i className="export" />
      </button>
    </>
  );
};
