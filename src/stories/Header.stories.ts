import { AppHeaderUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Header',
  component: AppHeaderUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof AppHeaderUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderWithUser: Story = {
  args: {
    isConstructorActive: true,
    isFeedActive: false,
    isProfileActive: false,
    isAuthenticated: true,
    userName: 'Иван Иванов'
  }
};

export const HeaderWithoutUser: Story = {
  args: {
    isConstructorActive: false,
    isFeedActive: true,
    isProfileActive: false,
    isAuthenticated: false,
    userName: undefined
  }
};
