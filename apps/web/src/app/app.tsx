import { AddShoppingCartRounded } from '@mui/icons-material';
import { Button, Container, createTheme, ThemeProvider } from '@mui/material';
import { ButtonBuy } from '@web-interview-fullstack/feature-ui';

export function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <ButtonBuy
          onItemSelected={(item) => console.log(item)}
          items={[
            {
              title: '50ml',
              price: 80,
            },
            {
              title: '30ml',
              price: 60,
            },
            {
              title: '5ml',
              price: 15,
              tag: '3 x 5ml for $40.00',
            },
          ]}
        >
          <Button variant="contained">
            <AddShoppingCartRounded fontSize="small" sx={{ mr: 1 }} /> Buy
          </Button>
        </ButtonBuy>
        <ButtonBuy
          onItemSelected={(item) => console.log(item)}
          items={[
            {
              title: '50ml',
              price: 80,
            },
            {
              title: '30ml',
              price: 60,
            },
            {
              title: '5ml',
              price: 15,
              tag: '3 x 5ml for $40.00',
            },
          ]}
        />
        <ButtonBuy
          onItemSelected={(item) => console.log(item)}
          items={[
            {
              title: '50ml',
              price: 80,
            },
            {
              title: '30ml',
              price: 60,
            },
            {
              title: '5ml',
              price: 15,
              tag: '3 x 5ml for $40.00',
            },
          ]}
        >
          <Button variant="contained">
            <AddShoppingCartRounded fontSize="small" sx={{ mr: 1 }} /> Buy
          </Button>
        </ButtonBuy>
      </Container>
    </ThemeProvider>
  );
}

export default App;
