<template>
    <v-col cols="12">
                <v-btn class="d-block" block id="cbtns" @click="showSchedule" style="z-index: 3">
                    Ver Calendario
                </v-btn>
                <div id="cclndrs" class="d-none">
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
                        @click:event="deleteEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="getEvents"
                    ></v-calendar>
                    <!--
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
              
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div v-html="`Fecha: `+selectedEvent.start"></div>
              <div v-html="`Consultorio: `+selectedEvent.room"></div>
              <div v-if="selectedEvent.doctor" v-html="`Doctor: `+selectedEvent.doctor.userName"></div>
              <div v-if="!selectedEvent.doctor" v-html="`No se ha seleccionado un doctor.`" @click="openDialog(selectedEvent.id)" style="cursor: pointer"></div>
              <div v-if="selectedEvent.complete == 'no'" v-html="`Cita en progreso.`" @click="completeDate(selectedEvent.id)" style="cursor: pointer"></div>
              <div v-if="selectedEvent.complete == 'si'" v-html="`Cita terminada.`"></div>
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

        </v-menu>-->
                    </v-sheet>
                </div>
          </v-col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
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
       type: 'day',
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
    computed: {...mapGetters(["schedulesInBd"])},
    methods: {
      ...mapActions(["deleteScheduleById"]), 
        async showSchedule(){
        if(document.getElementById("cbtns").classList.contains("d-block")){
            document.getElementById("cbtns").classList.replace("d-block", "d-none");
            document.getElementById("cclndrs").classList.replace("d-none", "d-block");
          }
          await this.getEvents();
          if(this.events.length <= 0){
            const snackbarData = {
                timeout: 2000,
                text: 'No hay citas registradas.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
          }
      },
        getEvents () {
        const events = []

        //const min = new Date(`${start.date}T00:00:00`)
        //const max = new Date(`${end.date}T23:59:59`)
        //const days = (max.getTime() - min.getTime()) / 86400000
        //const eventCount = this.rnd(days, days + 20)
        const dates = this.$store.getters.schedulesInBd;
        //const eventCount = dates;

        Object.values(dates).map((horario) => 
            {
                const timestampStart = horario.dateStart + ' ' + horario.hourStart;
                const timestampEnd = horario.dateEnd + ' ' + horario.hourEnd;
                events.push({
                    name: horario.doctor_id.userName,
                    allInfo: horario,
                    start: timestampStart,
                    end:timestampEnd,
                    doctor:horario.doctor_id,
                    id: horario._id,
                    color: this.colors[this.rnd(0, this.colors.length - 1)]
                });
                /*
                events.forEach((item) => {
                  if(item.date == this.dateForCheckColorInCard && item.hour < this.hourToCheck){
                  item.color = 'orange';
                }else if(item.date < this.dateForCheckColorInCard && item.complete == 'si'){
                  item.color = 'green';
                }else if(item.date < this.dateForCheckColorInCard && item.complete == 'no'){
                  item.color = 'red';
                }else if(item.date > this.dateForCheckColorInCard){
                  item.color = 'blue';
                }else{
                  item.color = 'red';
                }
                });*/
                  
            }
          );
        this.events = events
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
      deleteEvent ({ event }) {
        if(document.getElementById("cbtns").classList.contains("d-none")){
            document.getElementById("cbtns").classList.replace("d-none", "d-block");
            document.getElementById("cclndrs").classList.replace("d-block", "d-none");
          }
        this.deleteScheduleById(event.id);
      }
    }
}
</script>