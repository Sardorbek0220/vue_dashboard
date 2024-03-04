<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex d-flex lg12 sm12 xs12>
        <template>
          <v-data-table
            :headers="headers"
            :items="data"
            :rows-per-page-items="[10, 25]">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.domain }}</td>
              <td class="text-xs-left">{{ props.item.url }}</td>
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
        }
      ]
    }
  },

  created() {
    if (localStorage.getItem("manager_user")) {
      this.getDomains(localStorage.getItem("manager_user"));
    }else{
      this.$router.push({ name: 'Login' });
    }
  },

  methods: {
    getDomains(storage){
      var user = JSON.parse(storage);
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
