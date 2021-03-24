<template>
<div>
  <v-btn class="d-block" block id="cbtn" @click="showCalendar" style="z-index: 50">
                    Ver Calendario
                </v-btn>
    <div id="cclndr" class="d-none">
                    <v-sheet
                    tile
                    height="100%"
                    width="100%"
                    class="d-inline-block"
                    >
                    <v-select
                        v-model="type"
                        :items="types"
                        dense
                        outlined
                        hide-details
                        class="ma-2"
                        label="Tipo"
                    ></v-select>
                    <v-select
                        v-model="mode"
                        :items="modes"
                        dense
                        outlined
                        hide-details
                        label="Tipo de presentación"
                        class="ma-2"
                    ></v-select>
                    <v-select
                        v-model="weekday"
                        :items="weekdays"
                        dense
                        outlined
                        hide-details
                        label="Días"
                        class="ma-2"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        class="mr-auto"
                        @click="$refs.calendar.prev()"
                    >
                        <v-icon>{{mdiChevronLeft}}</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        class="ml-auto"
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
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div v-html="selectedEvent.start"></div>
              <div v-html="selectedEvent.room"></div>
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
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import { mdiBorderColor } from '@mdi/js';
import { mdiDotsVertical } from '@mdi/js';
import { mdiInformation } from '@mdi/js';
import { mdiNewBox } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import { mdiChevronRight } from '@mdi/js';
export default {
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
      mdiInformation: mdiInformation,
      mdiNewBox: mdiNewBox,
      mdiChevronLeft: mdiChevronLeft,
      mdiChevronRight: mdiChevronRight,
    }),
    computed: {...mapGetters(["datesForDoctorLoged", "userLoged"])},
    watch: {
      userLoged(){
        this.consultDateByDoctorId(this.userLoged._id)
      }
    },
    methods: {
      ...mapActions(["consultDateByDoctorId"]),
      getEvents () {
        const events = []

        //const min = new Date(`${start.date}T00:00:00`)
        //const max = new Date(`${end.date}T23:59:59`)
        //const days = (max.getTime() - min.getTime()) / 86400000
        //const eventCount = this.rnd(days, days + 20)
        const dates = this.$store.getters.datesForDoctorLoged;
        //const eventCount = dates;
        Object.values(dates).map((evento) => 
            {
                const timestamp = evento.date + ' ' + evento.possible_hour;
                events.push({
                    name: evento.patient_id.userName,
                    allInfo: evento,
                    start: timestamp,
                    end:timestamp,
                    room:evento.consulting_room,
                    color: this.colors[this.rnd(0, this.colors.length - 1)]
                })
            }
          );
        this.events = events
      },
      async showCalendar(){
        await this.consultDateByDoctorId(this.$store.getters.userLoged._id);
        await this.getEvents();
        if(document.getElementById("cbtn").classList.contains("d-block")){
            document.getElementById("cbtn").classList.replace("d-block", "d-none");
            document.getElementById("cclndr").classList.replace("d-none", "d-block");
          }
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
      }
    }
}
</script>