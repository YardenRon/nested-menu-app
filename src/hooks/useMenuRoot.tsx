import { useCallback, useContext } from 'react';
import { MenuRootContext } from '../context/MenuRootContext';
import { NodeType, TreeNode } from '../models/TreeNode';

const useMenuRoot = () => {
    const context = useContext(MenuRootContext);

    if (!context) {
        throw new Error('useMenuRoot must be used within a MenuRootProvider');
    }

    const { root, setRoot } = context;

    const onAdd = useCallback((nodeId: string) => {
        setRoot((draft) => {
            const node = draft.find(nodeId);
            if (node) {
                node.changeTo(NodeType.SubMenu);
                node.createChild("new item");
            }
        });
    }, [setRoot]);

    const onRename = useCallback((nodeId: string, newName: string) => {
        setRoot((draft) => {
            const node = draft.find(nodeId);
            if (node) {
                node.name = newName;
            }
        });
    }, [setRoot]);

    const onDelete = useCallback((nodeId: string, parentId: string) => {
        setRoot((draft) => {
            const parent = draft.find(parentId);
            if (parent) {
                parent.removeChild(nodeId);
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