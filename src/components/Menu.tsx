import React from 'react';
import Stack from '@mui/material/Stack';
import { TreeNode } from '../models/TreeNode';
import MenuItem from './MenuItem';

type Direction = 'downwards' | 'right-side';

type MenuProps = {
    menu: TreeNode,
    isDisplayed: boolean,
    direction: Direction
};

function Menu({ menu, isDisplayed, direction }: MenuProps) {
    const isMenuEmpty = menu === null || menu.children === null || menu.children.length === 0;
    if (!isDisplayed || isMenuEmpty) {
        return null;
    }

    let stackStyles: any = { 
        border: "1px solid black",
        minWidth: "100px",
        maxWidth: "200px", 
        borderRadius: "10px",
        boxShadow: "1px 1px 3px 0 #ccc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    if (direction === 'right-side') {
        stackStyles = {
            ...stackStyles,
            position: "absolute",
            left: "100%", 
            top: "0%"
        }
    }

    return (
        <Stack sx={stackStyles}>
            {menu.children?.map(node => <MenuItem key={node.id} node={node} />)}
        </Stack>
    );
}

export default Menu;
