import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import BlockFormatDropDown from "./BlockFormatDropdown";
import { IS_APPLE } from "./shared";

export interface ToolbarPluginProps {}

export const ToolbarPlugin = (props: ToolbarPluginProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  const supportedBlockTypes = new Set([
    "paragraph",
    "quote",
    "h1",
    "h2",
    "h3",
    "bullet",
    "number",
    "check",
  ]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar">
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
        aria-label={`Format text as bold. Shortcut: ${
          IS_APPLE ? "⌘B" : "Ctrl+B"
        }`}
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
        aria-label={`Format text as italics. Shortcut: ${
          IS_APPLE ? "⌘I" : "Ctrl+I"
        }`}
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
        aria-label={`Format text to underlined. Shortcut: ${
          IS_APPLE ? "⌘U" : "Ctrl+U"
        }`}
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        title="Strikethrough"
        aria-label="Format text with a strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && activeEditor === editor && (
        <>
          <BlockFormatDropDown blockType={blockType} editor={editor} />
          <Divider />
        </>
      )}
    </div>
  );
};

function Divider() {
  return <div className="divider" />;
}
