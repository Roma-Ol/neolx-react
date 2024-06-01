import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import React from 'react';

interface IEntityDeleteDialogProps {
  id: string;
  isOpen: boolean;
  title: string;
  isLoading: boolean;
  handleClose: () => void;
  handleDelete: (id: string) => void;
}

const EntityDeleteDialog: React.FC<IEntityDeleteDialogProps> = ({
  id,
  isOpen,
  title,
  isLoading,
  handleClose,
  handleDelete,
}) => {
  return (
    <Modal
      onClose={handleClose}
      open={isOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <ModalDialog>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>This cannot be underdone</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(id)} variant='outlined' loading={isLoading} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default EntityDeleteDialog;
