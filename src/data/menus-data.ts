import { TreeNode } from '../models/TreeNode';

const root = new TreeNode('root');
const first = new TreeNode('first item');
first.parentId = root.id;
const second = new TreeNode('second item');
second.parentId = root.id;
const third = new TreeNode('third item');
third.parentId = root.id;
root.children = [first, second, third];

export default { root };