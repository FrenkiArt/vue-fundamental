import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import customDirectives from './directives';

import components from '@/components/ui/';

const app = createApp(App);

components.forEach((item) => {
  app.component(item.name, item);
});

customDirectives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount('#app');
