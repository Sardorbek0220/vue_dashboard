<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex d-flex lg2>
        <template>
          <v-btn @click="openDialog" style="background-color: #0866C6; color: white;">
            Add domain
          </v-btn>
        </template>
        <v-dialog
          v-model="dialog"
          width="500">
          <v-card>
            <v-card-title class="headline"
              primary-title>
              Add domain
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 xs6 md11>
                      <v-text-field
                        v-model="domain"
                        label="Domain"/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="secondary"
                @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn
                color="success"
                :loading="loading"
                @click="addDomain">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex d-flex lg12 sm12 xs12>
        <template>
          <v-data-table
            :headers="headers"
            :items="data"
            :rows-per-page-items="[10, 25]">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.domain }}</td>
              <td class="text-xs-left">{{ props.item.url }}</td>
              <td class="text-xs-left"><v-icon style="cursor: pointer" color="red" @click="deleteDomain(props.item.domain)">delete</v-icon></td>
            </template>
          </v-data-table>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      user: {},
      domain: '',
      dialog: false,
      data: [],
      headers: [
        {
          text: 'Domain',
          value: 'domain',
          align: 'left',
          sortable: true
        },
        {
          text: 'Url',
          value: 'url',
          align: 'left',
          sortable: true
        },
        {
          text: 'Delete',
          value: 'action',
          align: 'left',
        }
      ]
    }
  },

  created() {
    if (localStorage.getItem("manager_user")) {
      this.user = JSON.parse(localStorage.getItem("manager_user"));
      this.getDomains(this.user);
    }else{
      this.$router.push({ name: 'Login' });
    }
  },

  methods: {
    openDialog() {
      this.dialog = true;
      this.domain = ''
    },
    addDomain(){
      if (this.domain == '') {
        alert("Domain can not be empty !")
        return;
      }
      
      let data = this.data.filter( d => d.domain == this.domain );
      if (data.length > 0) {
        alert("Domain is already exist !")
        return;
      }

      this.axios.post("https://sdmanager.salesdoc.uz/api/v2/domain/add", 
        { domain: this.domain, user_id: this.user.user_id },
        { headers: { Authorization: `Bearer ${this.user.token}` } }
      ).then(response => {
        if (response.data.success === true) {
          this.dialog = false;
          this.data.push({domain: this.domain, url: "https://"+this.domain+".salesdoc.io"})
        }else{
          alert("Something went wrong !");
        }        
      });
    },
    deleteDomain(domain){
      if(confirm("Are you sure !")){
        this.axios.delete("https://sdmanager.salesdoc.uz/api/v2/domain/delete?user_id="+this.user.user_id+"&domain="+domain, 
          { headers: { Authorization: `Bearer ${this.user.token}` } }
        ).then(response => {
          if (response.data.success === true) {
            this.dialog = false;
            this.data = this.data.filter( d => d.domain !== domain ); 
          }else{
            alert("Something went wrong !");
          }        
        });
      }
    },
    getDomains(user){
      this.axios.get("https://sdmanager.salesdoc.uz/api/v2/domain/list?user_id="+user.user_id, 
        { headers: { Authorization: `Bearer ${user.token}` } }).then(response => {
          if (response.data.success === true) {
            this.data = response.data.result;
          }else{
            alert("Something went wrong !");
          }        
      });
    }
  }
}
</script>

<style>
  .table {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>
