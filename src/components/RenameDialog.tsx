import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMenuRoot from '../hooks/useMenuRoot';
import { TreeNode } from '../models/TreeNode';

type RenameDialogProps = {
    node: TreeNode,
    isOpen: boolean,
    onClose: () => void
}

function RenameDialog({ node, isOpen, onClose }: RenameDialogProps) {
    const { onRename } = useMenuRoot();
    const [newName, setNewName] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onSaveName = useCallback(() => {
        if (newName === "") {
            setError(true);
        } else {
            onRename(node.id, newName);
            onClose();
        }
    }, [newName, setError, onRename, onClose]);

    return (
        <Dialog
            onClose={onClose}
            open={isOpen}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onContextMenu={(e) => e.stopPropagation()}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Rename item
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <TextField
                        sx={{ display: "block", marginBottom: "10px" }}
                        id="name"
                        label="Name" variant="standard"
                        value={newName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewName(e.target.value);
                            setError(false);
                        }}
                        error={error}
                        helperText={error ? "Name can't be empty" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onSaveName}>
                        Save
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default RenameDialog;