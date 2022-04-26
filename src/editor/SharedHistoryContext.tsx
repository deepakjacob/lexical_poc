/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import {
  createEmptyHistoryState,
  HistoryState,
} from "@lexical/react/LexicalHistoryPlugin";
import * as React from "react";
import { createContext, useContext, useMemo } from "react";

type ContextShape = {
  historyState?: HistoryState;
};

const Context = createContext({
  historyState: { current: null, redoStack: [], undoStack: [] },
});

export const SharedHistoryContext = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const historyContext = useMemo(
    () => ({ historyState: createEmptyHistoryState() }),
    []
  );
  return (
    <Context.Provider value={historyContext as any}>
      {children}
    </Context.Provider>
  );
};

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context);
};
