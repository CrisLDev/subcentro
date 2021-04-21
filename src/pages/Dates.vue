<template>
    <v-container class="lighten-5 mb-16">
        <v-row justify="center" class="mb-16">
            <v-col cols="12" md="8" sm="12" class="mt-6">
                <DateCalendar/>
            </v-col>
            <v-col cols="12" md="3" sm="12" class="mt-6" v-if="datesForDoctorLoged.length !== 0">
                <TableDoctorTable/>
            </v-col>
            <div class="scroll">
                    <AdminSchedule/>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import DateCalendar from '../components/dates/DateCalendar';
import TableDoctorTable from '../components/dates/TableDoctorDates';
import AdminSchedule from '../components/admin/AdminSchedule';
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "Dates",
    components: {
        DateCalendar,
        TableDoctorTable,
        AdminSchedule
    },
    data: () => ({
      reveal: false
    }),
    computed: {...mapGetters(["datesForDoctorLoged","datesInBd"])},
    methods: {
        ...mapActions(["getDatesFromBD", "getSchedulesFromDb", "getSchedulesFromDbByUserId"]),
    },
    created() {
        this.getDatesFromBD();
        this.getSchedulesFromDb();
    },
    mounted(){
        this.getSchedulesFromDbByUserId(this.$store.state.auth.user._id);
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

<style>
div.scroll{
    width: 100%;
}
</style>