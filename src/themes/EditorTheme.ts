/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import "./EditorTheme.css";

const theme = {
  characterLimit: "EditorTheme__characterLimit",
  code: "EditorTheme__code",
  codeHighlight: {
    atrule: "EditorTheme__tokenAttr",
    attr: "EditorTheme__tokenAttr",
    boolean: "EditorTheme__tokenProperty",
    builtin: "EditorTheme__tokenSelector",
    cdata: "EditorTheme__tokenComment",
    char: "EditorTheme__tokenSelector",
    class: "EditorTheme__tokenFunction",
    "class-name": "EditorTheme__tokenFunction",
    comment: "EditorTheme__tokenComment",
    constant: "EditorTheme__tokenProperty",
    deleted: "EditorTheme__tokenProperty",
    doctype: "EditorTheme__tokenComment",
    entity: "EditorTheme__tokenOperator",
    function: "EditorTheme__tokenFunction",
    important: "EditorTheme__tokenVariable",
    inserted: "EditorTheme__tokenSelector",
    keyword: "EditorTheme__tokenAttr",
    namespace: "EditorTheme__tokenVariable",
    number: "EditorTheme__tokenProperty",
    operator: "EditorTheme__tokenOperator",
    prolog: "EditorTheme__tokenComment",
    property: "EditorTheme__tokenProperty",
    punctuation: "EditorTheme__tokenPunctuation",
    regex: "EditorTheme__tokenVariable",
    selector: "EditorTheme__tokenSelector",
    string: "EditorTheme__tokenSelector",
    symbol: "EditorTheme__tokenProperty",
    tag: "EditorTheme__tokenProperty",
    url: "EditorTheme__tokenOperator",
    variable: "EditorTheme__tokenVariable",
  },
  hashtag: "EditorTheme__hashtag",
  heading: {
    h1: "EditorTheme__h1",
    h2: "EditorTheme__h2",
    h3: "EditorTheme__h3",
    h4: "EditorTheme__h4",
    h5: "EditorTheme__h5",
  },
  image: "editor-image",
  link: "EditorTheme__link",
  list: {
    listitem: "EditorTheme__listItem",
    nested: {
      listitem: "EditorTheme__nestedListItem",
    },
    olDepth: [
      "EditorTheme__ol1",
      "EditorTheme__ol2",
      "EditorTheme__ol3",
      "EditorTheme__ol4",
      "EditorTheme__ol5",
    ],
    ul: "EditorTheme__ul",
  },
  ltr: "EditorTheme__ltr",
  paragraph: "EditorTheme__paragraph",
  quote: "EditorTheme__quote",
  rtl: "EditorTheme__rtl",
  table: "EditorTheme__table",
  tableCell: "EditorTheme__tableCell",
  tableCellHeader: "EditorTheme__tableCellHeader",
  text: {
    bold: "EditorTheme__textBold",
    code: "EditorTheme__textCode",
    italic: "EditorTheme__textItalic",
    strikethrough: "EditorTheme__textStrikethrough",
    underline: "EditorTheme__textUnderline",
    underlineStrikethrough: "EditorTheme__textUnderlineStrikethrough",
  },
};

export default theme;
