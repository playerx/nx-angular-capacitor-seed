import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { AppComponent } from './app.component';

storiesOf('AppComponent', module)
  .add('to Storybook', () => ({
    component: AppComponent,
    props: {
      welcomeMessage: 'Hello from StoryBook',
      welcomeClicked: action('welcomeClicked'),
    },
  }));
