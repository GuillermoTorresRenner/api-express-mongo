import { defineStore } from 'pinia';
import jwt_decode from "jwt-decode";
import { LocalStorage } from 'quasar';
export const useUser = defineStore('user', {
  state: () => ({
    user:"",
    token:""

  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    
  },
  actions: {
    saveUser(token){
      localStorage.setItem("token",token)
      this.token=token;
      if (token==='') {
        this.user="";
      }else{
          this.user=jwt_decode(token)
      }
    },
    sesionActiva(){
      const tk=LocalStorage.getItem("token");
      if (tk) {
        this.saveUser(tk)
      }else{
        this.saveUser("");
      }
    }
  },
});
