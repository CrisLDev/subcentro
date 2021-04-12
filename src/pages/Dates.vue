<template>
    <v-container class="lighten-5 mb-16">
        <v-row justify="center" class="mb-16">
            <v-col cols="12" sm="8" class="mt-6">
                <DateCalendar/>
            </v-col>
            <v-col cols="12" sm="3" class="mt-6" v-if="datesForDoctorLoged.length !== 0">
                <TableDoctorTable/>
            </v-col>
            <v-col cols="12" class="mt-6">
                <DateSchedulesDoctor/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DateCalendar from '../components/dates/DateCalendar';
import DateSchedulesDoctor from '../components/dates/DateSchedulesDoctor';
import TableDoctorTable from '../components/dates/TableDoctorDates';
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "Dates",
    components: {
        DateCalendar,
        TableDoctorTable,
        DateSchedulesDoctor
    },
    data: () => ({
      reveal: false
    }),
    computed: {...mapGetters(["datesForDoctorLoged","datesInBd"])},
    methods: {
        ...mapActions(["getDatesFromBD", "getSchedulesFromDb"]),
    },
    created() {
        this.getDatesFromBD();
        this.getSchedulesFromDb();
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Citas';
            }
        },
    }
}
</script>