import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TestPage from '../views/TestPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUp from '../views/SignUp.vue'
import WelcomePage from '../views/WelcomePage.vue'
import AuthService from '../services/authService'
import UsersPage from '../views/UsersPage.vue'
import RestaurantPage from '../views/RestaurantPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: WelcomePage,
    },
    {
      path: '/users',
      name: 'UsersPage',
      component: UsersPage
    },
    {
      path: '/restaurant',
      name: 'RestaurantPage',
      component: RestaurantPage
    }
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/sign-up', '/about-us', '/test'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = AuthService.isLoggedIn();

  if(!loggedIn & authRequired){
    return next('/login');
  }
  next()
})

export default router
