import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VIntersection from './directives/VIntersection';
import VFocus from './directives/VFocus';
import customDirectives from './directives';

import components from '@/components/ui/';

// createApp(App).use(store).use(router).mount('#app');

const app = createApp(App);

components.forEach((item) => {
  app.component(item.name, item);
});

customDirectives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount('#app');
