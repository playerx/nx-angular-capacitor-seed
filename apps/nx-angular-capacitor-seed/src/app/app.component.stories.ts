import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/angular'
import { AppComponent } from './app.component'

storiesOf('AppComponent', module)
	.add('to Storybook', () => ({
		component: AppComponent,
		props: {
			welcomeMessage: 'Hello from StoryBook',
			welcomeClicked: action('welcomeClicked'),
		},
	}))
