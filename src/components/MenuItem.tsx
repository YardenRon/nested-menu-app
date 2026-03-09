import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TreeNode, NodeType } from '../models/TreeNode';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from './Menu';
import './MenuItem.css';
import ContextMenu from './ContextMenu';

type MenuItemProps = {
    node: TreeNode
};

function MenuItem({ node }: MenuItemProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
    const points = useRef<{x: number, y: number}>({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = () => setIsContextMenuOpen(false);
        window.addEventListener("click", handleClick);
        return () => {
          window.removeEventListener("click", handleClick);
        };
      }, []);

    const onMouseEnter = useCallback(() => setIsHovered(true), []);
    const onMouseLeave = useCallback(() => setIsHovered(false), []);

    const onContextMenu = useCallback((e: any) => {
        e.stopPropagation();
        e.preventDefault();
        points.current = {
            x: e.pageX,
            y: e.pageY,
        };
        setIsContextMenuOpen(prev => !prev);
    } , []);

    const hoverStyles = isHovered? "hovered" : "";

    return (
        <div className={`menu-item ${hoverStyles}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onContextMenu={onContextMenu}>
            <span>{node.name}</span>
            {node.nodeType === NodeType.SubMenu && <ArrowDropDownIcon sx={{ fontSize: 20 }} />}
            {node.nodeType === NodeType.SubMenu && <Menu key={node.id} menu={node} isDisplayed={isHovered} direction={'right-side'}/>}
            {isContextMenuOpen && (
                <ContextMenu top={points.current?.y} left={points.current?.x} node={node} />
            )}
        </div>
    );
}

export default MenuItem;