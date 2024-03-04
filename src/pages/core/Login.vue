<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4 v-if="sendingPhone">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="static/logo.png" alt="Manager" width="40" height="40">
                  <h3 class="flex my-4 secondary--text">Manager</h3>
                </div>
                <v-form>
                  <!-- <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="userEmail"
                    :error="error"
                    :rules="[rules.required]"/>
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/> -->
                  <v-text-field
                    append-icon="phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    v-model="userPhone"
                    :error="error"
                    :rules="[rules.required]"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="secondary" @click="login" :loading="loading">Get code</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 md4 lg4 v-else>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h3 class="flex my-4 secondary--text">Sending code</h3>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="mail"
                    name="code"
                    placeholder="Write 4 numbers"
                    type="number"
                    v-model="userCode"
                    :error="error"
                    :rules="[rules.required]"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="secondary" @click="sendCode" :loading="loading">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- <v-flex xs12 sm8 md4 lg4>
            <template>
              <v-progress-circular
                :size="80"
                color="primary"
                indeterminate
                style="margin-left: 50%;"
              ></v-progress-circular>
            </template>
          </v-flex> -->
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      sendingPhone: true,
      sms_token: 'a12T05RpG3yLbzasaX3UJVAnLmt34',
      type: 'sd_manager',
      info: [],
      loading: false,
      // userEmail: 'admin@yopmail.com',
      // password: '123456',
      userPhone: '',
      userCode: '',
      // hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    async login(){

      if (!this.userPhone) {
        this.result = "Phone can't be null.";
        this.showResult = true;
        return;
      }

      this.loading = true;

      let form = {
        phone: this.userPhone,
        type: this.type,
        token: this.sms_token
      }

      await axios.post('https://sdmanager.salesdoc.uz/api/v2/sms/send', form).then(response => (
        this.info = response
      ));

      this.loading = false
      if (this.info.data.success === true) {
        this.sendingPhone = false
      }
      else {
        this.error = true;
        this.result = "Phone is incorrect.";
        this.showResult = true;
      }
    },
    async sendCode(){

      if (!this.userCode) {
        this.result = "Code can't be null.";
        this.showResult = true;
        return;
      }

      this.loading = true;

      let form = {
        phone: this.userPhone,
        code: this.userCode,
        type: this.type,
        token: this.sms_token
      }

      await axios.post('https://sdmanager.salesdoc.uz/api/v2/user/checkCode', form).then(response => (
        this.info = response
      ));

      this.loading = false
      if (this.info.data.success === true) {
        localStorage.setItem("manager_user", JSON.stringify(this.info.data.result));
        this.$router.push({ name: 'Dashboard' });
      }
      else {
        this.error = true;
        this.result = "Code is incorrect.";
        this.showResult = true;
      }
    }
  }
}
</script>

<style scoped lang="css">
  #login {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
