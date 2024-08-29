import type { Meta, StoryObj } from '@storybook/react';
import { ButtonBuy } from './button-buy';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ButtonBuy> = {
  component: ButtonBuy,
  title: 'ButtonBuy',
};
export default meta;
type Story = StoryObj<typeof ButtonBuy>;

export const Primary: Story = {
  args: {
    items: [
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
    ],
    onItemSelected(item) {
      console.log(item);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/50ml/gi)).toBeTruthy();
    expect(canvas.getByText(/30ml/gi)).toBeTruthy();
    expect(canvas.getByText(/3 x 5ml for $40.00/gi)).toBeTruthy();
  },
};
