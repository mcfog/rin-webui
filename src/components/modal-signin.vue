
<style scoped lang="less">
  input{
    color:white;
  }
  button{
    background-color: gray;
  }
</style>

<template>
<rin-modal modal-id="modal-signin" v-on:keyup="onKeyup">
  <h1>{{"Welcome to Bangumi.moe" | locale}}</h1>
  <form>
    <div class="rin-message rin-error" v-if="message">{{ message | locale}}</div>

    <div class="rin-row">
      <div class="rin-col">
        <span class="rin-input">
          <label for="signin_username">{{"Username" | locale}}</label>
          <input id="signin_username" type="text" v-model="username" placeholder="{{'nickname or email' | locale}}">
        </span>
      </div>

      <div class="rin-col" style="margin-left:0.3em;">
        <span class="rin-input">
          <label for="signin_password">{{"Password" | locale}}</label>
          <input id="signin_password" type="password" v-model="password" placeholder="{{'please input your passsword' | locale}}">
        </span>
      </div>
    </div>

    <div class="rin-checkbox">
      <input id="signin_cookie" type="checkbox" checked="checked" v-model="cookie">
      <label for="signin_cookie">{{"Save account info locally" | locale}}</label>
    </div>

  </form>

</rin-modal>
</template>

<script>
  export default {
    components:{
      'rin-modal': require('./rin-modal'),
    },
    data () {
      return { username: null, password: null, message: null, loading: false };
    },
    methods:{
      'cancel' () { return 0; },
      'onKeyup' () { this.message = ''; }
    },
    events:{
      'modal-ok-click' () {
        if (this.loading) return;

        this.$broadcast("modal-start-loading");
        this.loading = true;
        this.$dispatch('UserSignIn', {
          username: this.username,
          password: this.password
        });
      },
      'modal-closed' () {
        this.$broadcast("modal-stop-loading");
        this.loading = false;
      },

      'UserSignInOk' (user) {
        if(user.username == this.username) {
          this.$broadcast('close-modal');
        }

        this.loading = false;
        this.$broadcast("modal-stop-loading");
      },
      'UserSignInFailed' (msg) {
        this.$broadcast("modal-stop-loading");
        this.loading = false;
        this.message = msg;
      }
    }
  };
</script>
