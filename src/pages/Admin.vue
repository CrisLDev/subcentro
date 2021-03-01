<template>
    <v-container class="lighten-5 mb-16">
        <v-row align="center" justify="center">
            <v-col lg="4" md="6" sm="6" cols="12" class="mt-6 mb-1" v-for="user in usersInBd" :key="user._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div>Dia de consulta</div>
                    <p class="display-1 text--primary">
                        {{user.userName}} - {{user.adress}}
                    </p>
                    <p>{{user.fullName}}</p>
                    <div class="text--primary">
                    </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-container fluid>
                            <div><AdminUserEdit :user_id="user._id" /></div>
                            <br>
                            <div>
                                <v-btn
                                outlined
                                rounded
                                text
                                @click="deleteU(user._id)"
                            >
                                Eliminar
                            </v-btn>
                            </div>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" class="mt-6 mb-16">
                <v-btn block id="cbtn" @click="showCalendar">
                    Ver Calendario
                </v-btn>
                <div id="cclndr" class="d-none">
                    <v-sheet
                    tile
                    height="54"
                    class="d-flex"
                    >
                    <v-btn
                        icon
                        class="ma-2"
                        @click="$refs.calendar.prev()"
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-select
                        v-model="type"
                        :items="types"
                        dense
                        outlined
                        hide-details
                        class="ma-2"
                        label="type"
                    ></v-select>
                    <v-select
                        v-model="mode"
                        :items="modes"
                        dense
                        outlined
                        hide-details
                        label="event-overlap-mode"
                        class="ma-2"
                    ></v-select>
                    <v-select
                        v-model="weekday"
                        :items="weekdays"
                        dense
                        outlined
                        hide-details
                        label="weekdays"
                        class="ma-2"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        class="ma-2"
                        @click="$refs.calendar.next()"
                    >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    </v-sheet>
                    <v-sheet height="600">
                    <v-calendar
                        ref="calendar"
                        v-model="value"
                        :weekdays="weekday"
                        :type="type"
                        :events="events"
                        :event-overlap-mode="mode"
                        :event-overlap-threshold="30"
                        :event-color="getEventColor"
                        @change="getEvents"
                    ></v-calendar>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AdminUserEdit from '../components/admin/AdminUserEdit';
export default {
    name: "Admin",
    data: () => ({
      reveal: false,
       type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    components: {
        AdminUserEdit,
    },
    computed: {...mapGetters(["usersInBd"])},
    methods: {
        ...mapActions(["getusersFromBD","deleteUser","getDatesFromBD"]),
        deleteU(id){
            this.deleteUser(id)
        },
        getEvents () {
        const events = []

        //const min = new Date(`${start.date}T00:00:00`)
        //const max = new Date(`${end.date}T23:59:59`)
        //const days = (max.getTime() - min.getTime()) / 86400000
        //const eventCount = this.rnd(days, days + 20)
        const dates = this.$store.getters.datesInBd;
        //const eventCount = dates;

        Object.values(dates).map((evento) => 
            {
                const timestamp = evento.date + ' ' + evento.hour;
                events.push({
                    name: 'Consulta',
                    start: timestamp,
                    end:timestamp,
                    color: this.colors[this.rnd(0, this.colors.length - 1)]
                })
            }
          );
        this.events = events
      },
      async showCalendar(){
          await this.getEvents();
          document.getElementById("cbtn").classList.add("d-none");
          document.getElementById("cclndr").classList.replace("d-none", "d-block")
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
    created() {
        this.getusersFromBD();
        this.getDatesFromBD();
    },
}
</script>