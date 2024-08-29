import { Close } from '@mui/icons-material';
import { Backdrop, Box, Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { AddToCartItem } from './add-to-cart-item';
import { Item } from './interface';
import { ButtonBuyProvider } from './provider';
import {
  CLOSE_BUTTON_SIZE,
  CloseButton,
  MIN_WIDTH,
  StyledList,
} from './styles';

type ButtonBuyProps = {
  children?: React.ReactNode;
  onItemSelected?: (item: Item) => void;
  items: Item[];
  locales?: Intl.LocalesArgument;
  currency?: string;
};

export function ButtonBuy(props: ButtonBuyProps) {
  const listItemRef = React.useRef<HTMLUListElement>(null);
  const [anchorRef, setAnchorRef] = useState<HTMLElement>();
  const open = Boolean(anchorRef);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorRef(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorRef(undefined);
  };

  const boundingClient = anchorRef?.getBoundingClientRect();
  const isClosedToLeft = (boundingClient?.x ?? 0) < MIN_WIDTH;

  const listItemHeight =
    listItemRef.current?.getBoundingClientRect()?.height ?? 0;

  const closeButtonPosition = useMemo(() => {
    if (!boundingClient) {
      return {
        x: 0,
        y: 0,
      };
    }

    return {
      x: isClosedToLeft
        ? boundingClient?.x
        : boundingClient?.x + boundingClient?.width - 40,
      y: boundingClient?.y,
    };
  }, [boundingClient, isClosedToLeft]);

  const listPosition = useMemo(() => {
    if (!closeButtonPosition) {
      return { left: -listItemHeight, top: 0 };
    }
    const isReachedTop = listItemHeight > closeButtonPosition.y;

    return {
      left: isClosedToLeft
        ? closeButtonPosition.x + CLOSE_BUTTON_SIZE + 16
        : closeButtonPosition.x - (MIN_WIDTH + 16),
      top: isReachedTop
        ? closeButtonPosition.y
        : closeButtonPosition.y - listItemHeight + CLOSE_BUTTON_SIZE,
    };
  }, [closeButtonPosition, isClosedToLeft, listItemHeight]);

  return (
    <ButtonBuyProvider locales={props.locales} currency={props.currency}>
      {props.children ? (
        <Box
          onClick={handleClick}
          sx={{
            width: 'fit-content',
            opacity: open ? 0 : 1,
          }}
        >
          {props.children}
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            opacity: open ? 0 : 1,
          }}
        >
          Buy
        </Button>
      )}

      {open && (
        <CloseButton
          onClick={handleClose}
          sx={() => ({
            left: closeButtonPosition.x,
            top: closeButtonPosition.y,
          })}
        >
          <Close fontSize="small" />
        </CloseButton>
      )}

      <StyledList
        ref={listItemRef}
        sx={(theme) => ({
          position: 'fixed',
          opacity: open ? 1 : 0,
          zIndex: (theme) => (open ? theme.zIndex.drawer + 3 : -10000),
          ...listPosition,
        })}
      >
        {props.items.map((item) => (
          <AddToCartItem
            item={item}
            onClick={props.onItemSelected}
            key={item.title}
          />
        ))}
      </StyledList>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      />
    </ButtonBuyProvider>
  );
}

export default ButtonBuy;
