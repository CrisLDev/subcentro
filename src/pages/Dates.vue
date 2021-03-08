<template>
    <v-container class="lighten-5 mb-16">
        <v-row align="center" justify="center">
            <v-col lg="4" md="12" cols="12" class="mt-6 mb-1" v-for="date in datesInBd" :key="date._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div>Dia de consulta</div>
                    <p class="display-1 text--primary">
                        {{date.date}} - {{date.hour}}
                    </p>
                    <p>{{date.code}}</p>
                    <p>{{date.consulting_room}}</p>
                    <div class="text--primary">
                         {{date.patient_id.userName}}
                    </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "Dates",
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