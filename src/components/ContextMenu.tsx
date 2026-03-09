import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createPortal } from 'react-dom';
import useMenuRoot from '../hooks/useMenuRoot';
import RenameDialog from './RenameDialog';
import { TreeNode } from '../models/TreeNode';

type ContextMenuProps = {
    top: number,
    left: number,
    node: TreeNode
};

function ContextMenu({ top, left, node }: ContextMenuProps) {
    const { onAdd, onDelete } = useMenuRoot();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const onAddClick = useCallback(
        () => onAdd(node.id),
        [node]
    );

    const onRenameClick = useCallback((e: any) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    }, [setIsDialogOpen]);

    const onDeleteClick = useCallback(() => {
        if (node.parentId) {
            onDelete(node.id, node.parentId);
        }
    }, [node]);

    const onModalClose = useCallback(() => setIsDialogOpen(false), [setIsDialogOpen]);

    const stackStyles = {
        border: "1px solid black",
        borderRadius: "10px",
        boxShadow: "1px 1px 3px 0 #ccc",
        backgroundColor: "white",
        minHeight: "120px",
        minWidth: "100px",
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        paddingTop: "5px",
        paddingRight: "10px",
        paddingLeft: "10px"
    };

    return createPortal(
        <div>
            <Stack sx={stackStyles} spacing={1}>
                <Button size='small' variant={"outlined"} onClick={onAddClick}>
                    ADD ITEM
                </Button>
                <Button size='small' variant={"outlined"} onClick={onRenameClick}>
                    RENAME ITEM
                </Button>
                <Button size='small' variant={"outlined"} onClick={onDeleteClick}>
                    DELETE ITEM
                </Button>
            </Stack>
            <RenameDialog node={node} isOpen={isDialogOpen} onClose={onModalClose} />
        </div>,
        document.body
    );
}

export default ContextMenu;
