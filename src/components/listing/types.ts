import { IListingCreateFormFields } from '../forms/listing/types.ts';

export interface IListingProps {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  isAdmin?: boolean;
  isOwner?: boolean;
  refreshListings: () => void;
}

interface IEditDialogBase {
  isOpen: boolean;
  handleClose: () => void;
  refreshEntities: () => void;
  entityId: string;
}

export interface IListingEditDialog extends IEditDialogBase {
  fields: IListingCreateFormFields;
}
