import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";
import DropDown, { DropDownItem } from "./DropDown";

const blockTypeToBlockName: { [key: string]: string } = {
  bullet: "Bulleted List",
  check: "Check List",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};
interface BlockFormatDropDownProps {
  blockType: string;
  editor: LexicalEditor;
}

const BlockFormatDropDown = ({
  editor,
  blockType,
}: BlockFormatDropDownProps): JSX.Element => {
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize: any) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headingSize)
          );
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  return (
    <DropDown
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={"icon block-type " + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem className="item" onClick={formatParagraph}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={() => formatHeading("h1")}>
        <span className="icon h1" />
        <span className="text">Heading 1</span>
        {blockType === "h1" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={() => formatHeading("h2")}>
        <span className="icon h2" />
        <span className="text">Heading 2</span>
        {blockType === "h2" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={() => formatHeading("h3")}>
        <span className="icon h3" />
        <span className="text">Heading 3</span>
        {blockType === "h3" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "bullet" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "number" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={formatCheckList}>
        <span className="icon check-list" />
        <span className="text">Check List</span>
        {blockType === "check" && <span className="active" />}
      </DropDownItem>
      <DropDownItem className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </DropDownItem>
    </DropDown>
  );
};

export default BlockFormatDropDown;
