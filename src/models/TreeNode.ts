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
}