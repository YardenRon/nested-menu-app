import { useCallback, useContext } from 'react';
import { MenuRootContext } from '../context/MenuRootContext';
import { NodeType, TreeNode } from '../models/TreeNode';
import { find, changeNodeType, createChild, removeChild } from '../utils/tree-node-utils';

const useMenuRoot = () => {
    const context = useContext(MenuRootContext);

    if (!context) {
        throw new Error('useMenuRoot must be used within a MenuRootProvider');
    }

    const { root, setRoot } = context;

    const onAdd = useCallback((nodeId: string) => {
        setRoot((draft) => {
            const node = find(draft, nodeId);
            if (node) {
                changeNodeType(node, NodeType.SubMenu);
                createChild(node, "new item");
            }
        });
    }, [setRoot]);

    const onRename = useCallback((nodeId: string, newName: string) => {
        setRoot((draft) => {
            const node = find(draft, nodeId);
            if (node) {
                node.name = newName;
            }
        });
    }, [setRoot]);

    const onDelete = useCallback((nodeId: string, parentId: string) => {
        setRoot((draft) => {
            const parent = find(draft, parentId);
            if (parent) {
                removeChild(parent, nodeId);
            }
        });
    }, [setRoot]);

    const onReplace = useCallback((newData: TreeNode) => {
        setRoot(() => newData);
    }, [setRoot]);

    return {
        root,
        onAdd,
        onRename,
        onDelete,
        onReplace
    };
};

export default useMenuRoot;