// Components/CallToActionButton/CallToActionButton.stories.js
import React from 'react';
import { CallToActionButton } from './CallToActionButton';

export default {
  title: 'Custom/CallToActionButton',
  component: CallToActionButton,
  argTypes: {
    align: {
      control: { type: "select" },
      options: ['left', 'center', 'right']
    },
    buttonLabel: { control: 'text' },
    destination: { control: 'text' },
    type: {
      control: { type: "select" },
      options: ['primary', 'secondary']
    },
  },
};

const Template = (args) => <CallToActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  align: 'left',
  buttonLabel: 'Get Started',
  destination: '/',
  type: 'primary',
};

export const Primary = Template.bind({});
Primary.args = {
  align: 'center',
  buttonLabel: 'Primary Button',
  destination: '/about',
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  align: 'center',
  buttonLabel: 'Secondary Button',
  destination: '/about',
  type: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
  align: 'center',
  buttonLabel: 'Danger Button',
  destination: '/about',
  type: 'danger',
};