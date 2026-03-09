import { NodeType, TreeNode } from '../models/TreeNode';

export function find(root: TreeNode, id: string): TreeNode | null {
    if (root.id === id) {
        return root;
    }

    if (root.children) {
        let node;
        for (const child of root.children) {
            node = find(child, id);
            if (node) return node;
        }
    }

    return null;
}

export function changeNodeType(node: TreeNode, newType: NodeType) {
    if (newType === NodeType.SubMenu && node.nodeType === NodeType.SingleItem) {
        node.nodeType = NodeType.SubMenu;
        node.children = [];
    }

    if (newType === NodeType.SingleItem && node.nodeType === NodeType.SubMenu) {
        node.nodeType = NodeType.SingleItem;
        node.children = null;
    }
}

export function createChild(node: TreeNode, name: string) {
    if (node.children) {
        const child = new TreeNode(name);
        child.parentId = node.id;
        node.children.push(child);
    }
}

export function removeChild(node: TreeNode, id: string) {
    if (node.children) {
        node.children = node.children.filter(child => child.id !== id);
        if (node.children.length === 0) {
            changeNodeType(node, NodeType.SingleItem);
        }
    }
}