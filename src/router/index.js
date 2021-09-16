import { createRouter, createWebHistory } from 'vue-router'
import Points from '../components/Points.vue'

let routes = [
  {
    path: '/',
    name: 'Points',
    component: Points,
    meta: {
      title: 'Azur Lane lista de puntos',
      metaTags: [
        {
          name: 'description',
          content: 'Página web creada para registrar tus puntos y compartirlos con la comunidad'
        },
        
      ]
    }
  },
  {
    path: '/registrarPuntos',
    name: 'registrarPuntos',
    component: Points,
    meta: {
      title: 'Azur Lane registro de puntos',
      metaTags: [
        {
          name: 'description',
          content: 'Página web creada para registrar tus puntos y compartirlos con la comunidad'
        },
        
      ]
    }
    
  },

  {
    path: '/actualizarPuntos',
    name: 'actualizarPuntos',
    component: Points,
    meta: {
      title: 'Azur Lane actualización de puntos',
      metaTags: [
        {
          name: 'description',
          content: 'Página web creada para registrar, actualizar tus puntos y compartirlos con la comunidad'
        },
        
      ]
    }
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
