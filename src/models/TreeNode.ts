import { immerable } from "immer"

export enum NodeType {
    'SingleItem',
    'SubMenu'
}

export class TreeNode {
    [immerable] = true;

    id: string;
    name: string;
    nodeType: NodeType;
    parentId: string | null;
    children: TreeNode[] | null;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.nodeType = NodeType.SingleItem;
        this.parentId = null;
        this.children = null;
    }

    find(id: string): TreeNode | null {
        if (this.id === id) {
            return this;
        }

        if (this.children) {
            let node;
            for (const child of this.children) {
                node = child.find(id);
                if (node) return node;
            }
        }

        return null;
    }

    changeTo(desiredType: NodeType) {
        if (desiredType === NodeType.SubMenu && this.nodeType === NodeType.SingleItem) {
            this.nodeType = NodeType.SubMenu;
            this.children = [];
        }

        if (desiredType === NodeType.SingleItem && this.nodeType === NodeType.SubMenu) {
            this.nodeType = NodeType.SingleItem;
            this.children = null;
        }
    }

    createChild(name: string) {
        if (this.children) {
            const child = new TreeNode(name);
            child.parentId = this.id;
            this.children.push(child);
        }
    }

    removeChild(id: string) {
        if (this.children) {
            this.children = this.children.filter(node => node.id !== id);
            if (this.children.length === 0) {
                this.changeTo(NodeType.SingleItem);
            }
        }
    }
}