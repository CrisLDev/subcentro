<template>
    <v-container class="lighten-5 mb-16">
        <v-row align="center" justify="center">
            <v-col cols="12" class="mt-6 mb-16">
                <DateCalendar/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DateCalendar from '../components/dates/DateCalendar';
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "Dates",
    components: {
        DateCalendar
    },
    data: () => ({
      reveal: false
    }),
    computed: {...mapGetters(["datesInBd"])},
    methods: {
        ...mapActions(["getDatesFromBD"]),
    },
    created() {
        this.getDatesFromBD();
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