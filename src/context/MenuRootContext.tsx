import { createContext, Dispatch, SetStateAction, useState } from 'react';
import MenuRootWrapper from '../data/menus-data';
import { useImmer, Updater } from "use-immer";
import { TreeNode } from '../models/TreeNode';
import { DataSource } from '../models/DataSource';

type MenuRootContextType = {
  root: TreeNode,
  setRoot: Updater<TreeNode>
} | null;

export const MenuRootContext = createContext<MenuRootContextType>(null);

export const MenuRootProvider = ({ children }: React.PropsWithChildren) => {
  const [root, setRoot] = useImmer<TreeNode>(MenuRootWrapper.root);

  return (
    <MenuRootContext.Provider value={{ root, setRoot }}>
      {children}
    </MenuRootContext.Provider>
  );
};