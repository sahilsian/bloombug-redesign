// Components/CallToActionButton/CallToActionButton.stories.js
import React from 'react';
import { CallToActionBar } from './CallToActionBar';

export default {
  title: 'Custom/CallToActionBar',
  component: CallToActionBar,
  argTypes: {
    title: { control: 'text' },
    paragraph: { control: 'text' },
    button_text: { control: 'text' },
    button_destination: { control: 'object' },
    onlineImage: { control: 'text' },
  },
};

const Template = (args) => <CallToActionBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Chat with us today. Let us build your dream website.',
    paragraph: 'Schedule a chat with our team. Let’s wireframe a perfect website for you that works perfect for your business needs. Gather in highly targeted clients and scale your business.', 
    button_text: 'Schedule a Chat',
    button_destination: '/services', 
    onlineImage: {
        width: 232, 
        height: 57, 
        url: 'https://greenclicktechnologies.com/kickitweb/wp-content/uploads/sites/14/2024/05/Group-60.png'
    },
};