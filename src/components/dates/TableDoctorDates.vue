<template>
  <v-simple-table >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Paciente
          </th>
          <th class="text-left">
            Fecha
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="date in datesForDoctorLoged.slice(0,5)"
          :key="date._id"
        >
          <td>{{ date.patient_id.userName }}</td>
          <td>{{ date.date }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mapGetters,mapActions } from 'vuex';
export default {
    computed: {...mapGetters(["datesForDoctorLoged", "userLoged"])},
    methods: {
        ...mapActions(["consultDateByDoctorId"]),
    },
    created() {
        this.consultDateByDoctorId(this.userLoged._id);
        console.log(this.datesInBd)
    },
}
</script>