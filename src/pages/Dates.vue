<template>
    <v-container>
        <v-row no-gutters align="center" justify="center">
            <v-col md="12" cols="12" class="mt-6 mb-1" v-for="date in datesInBd" :key="date._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div>Dia de consulta</div>
                    <p class="display-1 text--primary">
                        {{date.date}}
                    </p>
                    <p>{{date.code}}</p>
                    <div class="text--primary">
                        {{date.hour}} - {{date.consulting_room}}
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
}
</script>