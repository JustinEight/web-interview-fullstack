import { Theme } from '@mui/material/styles';
import { StyledListItem } from './styles';
import { Item } from './interface';
import { Chip, Stack, Typography } from '@mui/material';
import { AddShoppingCartRounded } from '@mui/icons-material';
import { useContext } from 'react';
import { ButtonBuyContext } from './provider';
import { numberFormat } from './helper';

export const AddToCartItem = ({
  item,
  onClick,
}: {
  item: Item;
  onClick?: (item: Item) => void;
}) => {
  const { locales, currency } = useContext(ButtonBuyContext);

  return (
    <StyledListItem
      onClick={() => onClick?.(item)}
      sx={(theme: Theme) => ({
        boxShadow: theme.shadows[2],
      })}
      alignItems="flex-start"
      key={item.title}
    >
      <Stack direction="row" gap={1} width="100%" alignItems="center">
        <AddShoppingCartRounded fontSize="small" />
        <Stack direction="row" gap={1} justifyContent="space-between" flex={1}>
          <Typography fontWeight="bold" fontSize="small">
            {item.title}
          </Typography>
          <Typography fontWeight="bold" fontSize="small">
            {numberFormat({
              value: item.price,
              locales,
              currency,
            })}
          </Typography>
        </Stack>
      </Stack>
      {item.description && (
        <Typography mt={1} fontSize="small">
          {item.description}
        </Typography>
      )}
      {item.tag && (
        <Chip
          size="small"
          label={item.tag}
          sx={{
            mt: 2,
            borderRadius: 1,
          }}
        />
      )}
    </StyledListItem>
  );
};
