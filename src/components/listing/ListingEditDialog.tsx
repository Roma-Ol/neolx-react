import { IListingEditDialog } from './types.ts';
import { DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import React from 'react';
import { toast } from 'react-toastify';
import ListingEditForm from '../forms/listing/ListingEditForm.tsx';

const ListingEditDialog: React.FC<IListingEditDialog> = ({
  isOpen,
  handleClose,
  entityId,
  refreshEntities,
  fields,
}) => {
  const handleSave = async () => {
    toast.success('Listing was updated!');
    handleClose();
    refreshEntities();
  };

  return (
    <Modal
      onClose={handleClose}
      open={isOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <ModalDialog>
        <DialogTitle id='alert-dialog-title'>Edit Listing</DialogTitle>
        <DialogContent>
          <ListingEditForm entityId={entityId} values={fields} handleSave={handleSave} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ListingEditDialog;
