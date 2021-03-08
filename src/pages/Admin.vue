<template>
    <v-container class="lighten-5 mb-16">
        <v-row align="center" justify="center">
          <v-col lg="6">
            <v-container>
              <AdminCreateConsultingForm/>
            </v-container>
            <v-container>
              <v-chip v-for="room in consulting_roomsInBd" :key="room._id">
                {{room.name}}
              </v-chip>
            </v-container>
          </v-col>
          <v-col lg="6">
            <v-container>
              <AdminCreateEspecialityForm/>
            </v-container>
            <v-container>
              <v-chip v-for="especiality in especialititesInBd" :key="especiality._id">
                {{especiality.name}}
              </v-chip>
            </v-container>
          </v-col>
          <v-col lg="12" md="6" sm="6" cols="12" class="mt-6 mb-1">
            <v-row align="center" justify="center">
              <v-col lg="4" v-for="user in usersInBd" :key="user._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div class="text-uppercase">{{user.role}}</div>
                    <p class="display-1 text--primary">
                        {{user.userName ? user.userName : 'N/A'}} - {{user.adress ? user.adress : 'N/A'}}
                    </p>
                    <p>{{user.fullName ? user.fullName : 'N/A'}}</p>
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
            </v-row>
          </v-col>
          <v-col cols="12">
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
                        <v-icon>{{mdiChevronLeft}}</v-icon>
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
                        <v-icon>{{mdiChevronRight}}</v-icon>
                    </v-btn>
                    </v-sheet>
                    <v-sheet height="600">
                    <v-calendar
                        ref="calendar"
                        v-model="focus"
                        :weekdays="weekday"
                        :type="type"
                        :events="events"
                        :event-overlap-mode="mode"
                        :event-overlap-threshold="30"
                        :event-color="getEventColor"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="getEvents"
                    ></v-calendar>
                    <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            ><!--
              <v-btn icon>
                <v-icon>{{mdiBorderColor}}</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>{{mdiHeart}}</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>{{mdiDotsVertical}}</v-icon>
              </v-btn>
              -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div v-html="selectedEvent.start"></div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
                    </v-sheet>
                </div>
          </v-col>
          <v-col class="mt-6 mb-16">
            <v-container>
              <AdminCreateDoctorForm/>
            </v-container>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AdminUserEdit from '../components/admin/AdminUserEdit';
import AdminCreateConsultingForm from '../components/admin/AdminCreateConsultingForm';
import AdminCreateEspecialityForm from '../components/admin/AdminCreateEspecialityForm';
import AdminCreateDoctorForm from '../components/admin/AdminCreateDoctorForm';
import { mdiBorderColor } from '@mdi/js';
import { mdiDotsVertical } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import { mdiChevronRight } from '@mdi/js';
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
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      mdiBorderColor: mdiBorderColor,
      mdiDotsVertical: mdiDotsVertical,
      mdiHeart: mdiHeart,
      mdiChevronLeft: mdiChevronLeft,
      mdiChevronRight: mdiChevronRight
    }),
    components: {
        AdminUserEdit,
        AdminCreateConsultingForm,
        AdminCreateEspecialityForm,
        AdminCreateDoctorForm
    },
    computed: {...mapGetters(["usersInBd", "consulting_roomsInBd", "especialititesInBd"])},
    methods: {
        ...mapActions(["getusersFromBD","deleteUser","getDatesFromBD", "getConsultingFromBD", "getEspecialitiesFromBD"]),
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
                const timestamp = evento.date + ' ' + evento.possible_hour;
                events.push({
                    name: evento.patient_id.userName,
                    allInfo: evento,
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
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
    },
    created() {
        this.getusersFromBD();
        this.getDatesFromBD();
        this.getConsultingFromBD();
        this.getEspecialitiesFromBD();
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Admin';
            }
        },
    }
}
</script>