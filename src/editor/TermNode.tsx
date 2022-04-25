import Chip from "@mui/material/Chip";
import lexical, {
  DecoratorNode,
  EditorConfig,
  LexicalEditor,
  NodeKey,
} from "lexical";
import TermPopover from "./TermPopover";

export class TermNode extends DecoratorNode<JSX.Element> {
  private __term: string;
  private __description: string;
  private __value: string;

  static getType(): string {
    return "term";
  }

  static clone(node: TermNode) {
    return new TermNode(
      node.__term,
      node.__description,
      node.__value,
      node.__key
    );
  }

  constructor(term: string, description: string, value: string, key?: NodeKey) {
    super(key);
    this.__term = term;
    this.__description = description;
    this.__value = value;
  }
  createDOM(config: EditorConfig<any>): HTMLElement {
    const div = document.createElement("div");
    div.style.display = "contents";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  setURL(term: string, description: string, value: string): void {
    const writable = this.getWritable();
    const w = writable as TermNode;
    w.__term = term;
    w.__description = description;
    w.__value = value;
  }

  getValue(): string {
    // getLatest() ensures we are getting the most
    // up-to-date value from the EditorState.
    const self = this.getLatest();
    return (self as any).__value;
  }

  setValue(value: string) {
    const self = this.getWritable();
    (self as any).__value = value;
  }

  decorate(editor: LexicalEditor): JSX.Element {
    return <TermPopover parent={this} />;
  }
  // isIsolated(): boolean {
  //   return true;
  // }
  // isTopLevel(): boolean {
  //   return true;
  // }
}

export function $createTermNode(
  term: string,
  description: string,
  value: string
): TermNode {
  return new TermNode(term, description, value);
}

export function $isTermNode(node: lexical.LexicalNode | null): boolean {
  return node instanceof TermNode;
}
