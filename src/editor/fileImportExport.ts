import { CLEAR_HISTORY_COMMAND, LexicalEditor, VERSION } from "lexical";

export function exportFile(
  editor: LexicalEditor,
  config: Readonly<{ fileName?: string; source?: string }> = Object.freeze({})
) {
  const now = new Date();
  const editorState = editor.getEditorState();
  const documentJSON = {
    editorState: editorState,
    lastSaved: now.getTime(),
    source: config.source || "Lexical",
    version: VERSION,
  };
  const fileName = config.fileName || now.toISOString();
  exportBlob(documentJSON, `${fileName}.lexical`);
}

// Adapted from https://stackoverflow.com/a/19328891/2013580
function exportBlob(data: any, fileName: string) {
  const a = document.createElement("a");
  const body = document.body;
  if (body === null) {
    return;
  }
  body.appendChild(a);
  a.style.display = "none";
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "octet/stream" });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export function importFile(editor: LexicalEditor) {
  readTextFileFromSystem((text) => {
    const json = JSON.parse(text);
    const editorState = editor.parseEditorState(
      JSON.stringify(json.editorState)
    );
    editor.setEditorState(editorState);
    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
  });
}

function readTextFileFromSystem(callback: (text: string) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".lexical";
  input.addEventListener("change", (e: Event) => {
    // $FlowFixMe
    const file = (e.target as any)?.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      // $FlowFixMe
      const content = readerEvent.target?.result;
      callback(content as any);
    };
  });
  input.click();
}
