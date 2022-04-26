import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { exportFile, importFile } from "./fileImportExport";

export const ActionsPlugin = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <>
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
