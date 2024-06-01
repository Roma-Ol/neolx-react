import { DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import React, { ReactNode } from 'react';

interface IEntityEditDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  form: ReactNode;
}

const EntityEditDialog: React.FC<IEntityEditDialogProps> = ({ isOpen, handleClose, form }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <ModalDialog size='lg'>
        <DialogTitle
          id='alert-dialog-title'
          sx={{ fontSize: '22px', marginBottom: 2, color: 'primary.500' }}
        >
          Edit User
        </DialogTitle>
        <DialogContent>{form}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default EntityEditDialog;
