import { IconButton, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MIN_WIDTH = 300;
export const CLOSE_BUTTON_SIZE = 40;

export const StyledList = styled(List)(({ theme }) => ({
  minWidth: MIN_WIDTH,
  maxWidth: theme.spacing(38),
  bgcolor: 'transparent',
  padding: 0,
  display: 'grid',
  gap: theme.spacing(1),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: theme.spacing(1),
  background: theme.palette.background.paper,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  minHeight: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    minHeight: theme.spacing(7),
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  width: CLOSE_BUTTON_SIZE,
  height: CLOSE_BUTTON_SIZE,
  position: 'fixed',
  backgroundColor: theme.palette.background.paper,
  borderRadius: CLOSE_BUTTON_SIZE,
  zIndex: theme.zIndex.drawer + 10,
  color: 'black',
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));
