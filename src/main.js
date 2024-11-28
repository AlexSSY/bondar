import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fas, far)

const app = createApp(App)

// Dynamically import and register components
// const components = import.meta.glob('./components/ui/*.vue')

// for (const path in components) {
//   components[path]().then((module) => {
//     const componentName = module.default.name || path.split('/').pop().replace('.vue', '')
//     app.component(componentName, module.default)
//   })
// }

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
