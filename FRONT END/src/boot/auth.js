import { boot } from 'quasar/wrappers'
import { useUser } from 'src/stores/useUser';

const user=useUser();

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth && user.getToken==='')) {
      
        next({ name: "Login" });
         
       } else {
        next();
       }
     });
  })