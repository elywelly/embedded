import { Button, ButtonProps, styled } from '@mui/material';
import { indigo } from '@mui/material/colors';

export const ColorSubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    '&:hover': {
        backgroundColor: indigo[700],
    },
}));