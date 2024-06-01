import { Box, Typography } from '@mui/joy';
import { ReactNode } from 'react';

interface IFieldsetProps {
  label?: string;
  inputComponent: ReactNode;
  error?: string;
}
const Fieldset: React.FC<IFieldsetProps> = ({ label, inputComponent, error }) => {
  return (
    <Box>
      {label && <Typography>{label}</Typography>}
      {inputComponent}
      {error && (
        <Typography color='danger' fontSize={12}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Fieldset;
