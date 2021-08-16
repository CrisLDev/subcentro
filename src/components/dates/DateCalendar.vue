<template>
<div>
  <v-btn class="d-block" block id="cbtn" @click="showCalendar" style="z-index: 3">
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
              <v-toolbar-title v-html="`Paciente: `+selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div v-html="`Fecha: `+selectedEvent.start"></div>
              <div v-html="`Consultorio: `+selectedEvent.room"></div>
              <div v-if="selectedEvent.doctor" v-html="`Doctor: `+selectedEvent.doctor.userName"></div>
              <div v-if="!selectedEvent.doctor" v-html="`No se ha seleccionado un doctor.`"></div>
              <div v-if="selectedEvent.complete == 'no' && selectedEvent.date <= dateForCheckColorInCard && selectedEvent.hour < hourToCheck" v-html="`Click para marcar como completada.`" @click="completeDate(selectedEvent.id)" style="cursor: pointer"></div>
            </v-card-text>
            <v-card-actions>
              <DashboardCreateDateForm v-if="selectedEvent.complete == 'si'" :id_modal="selectedEvent.patient_id" />
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancelar
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
import DashboardCreateDateForm from "../dashboard/DashboardCreateDateForm";
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
      dateForCheckColorInCard: '',
      hourToCheck: ''
    }),
    components: {
    DashboardCreateDateForm
  },
    computed: {...mapGetters(["datesForDoctorLoged", "userLoged"])},
    watch: {
      userLoged(){
        this.consultDateByDoctorId(this.userLoged._id)
      }
    },
    methods: {
      ...mapActions(["consultDateByDoctorId", "updateCompleteDate"]),
      getEvents () {
        const events = []
        const dates = this.$store.getters.datesForDoctorLoged;
        Object.values(dates).map((evento) => 
            {
                const timestamp = evento.date + ' ' + evento.possible_hour;
                events.push({
                    name: evento.patient_id.userName,
                    allInfo: evento,
                    start: timestamp,
                    id: evento._id,
                    end:timestamp,
                    date: evento.date,
                    hour: evento.possible_hour,
                    doctor:evento.doctor_id,
                    complete:evento.complete,
                    room:evento.consulting_room,
                    patient_id: evento.patient_id._id,
                });
                events.forEach((item) => {
                  if(item.date == this.dateForCheckColorInCard && item.hour < this.hourToCheck&& item.complete == 'no'){
                  item.color = 'orange';
                }else if(item.date <= this.dateForCheckColorInCard && item.complete == 'si'){
                  item.color = 'green';
                }else if(item.date <= this.dateForCheckColorInCard && item.complete == 'no'){
                  item.color = 'red';
                }else if(item.date > this.dateForCheckColorInCard){
                  item.color = 'blue';
                }else{
                  item.color = 'red';
                }
                });
            }
          );
        this.events = events
      },
      async showCalendar(){
        await this.consultDateByDoctorId(this.userLoged._id);
        await this.getEvents();
        if(document.getElementById("cbtn").classList.contains("d-block")){
            document.getElementById("cbtn").classList.replace("d-block", "d-none");
            document.getElementById("cclndr").classList.replace("d-none", "d-block");
          }
      },
      async completeDate(id){
        await this.updateCompleteDate(id);
          this.selectedOpen = false;
          this.selectedEvent.complete = 'si';
        await this.consultDateByDoctorId(this.userLoged._id);
        await this.getEvents();
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
    },
    mounted(){
      this.consultDateByDoctorId(this.userLoged._id);
      this.getEvents()
    },
    created() {
      let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear();
let hour = date.getHours() + ':' + date.getMinutes();
this.hourToCheck = hour;

if(month < 10 && day < 10){
  this.dateForCheckColorInCard = `${year}-0${month}-0${day}`;
}else if(month < 10){
  this.dateForCheckColorInCard = `${year}-0${month}-${day}`;
}else if(day < 10){
  this.dateForCheckColorInCard = `${year}-${month}-0${day}`;
}else{
  this.dateForCheckColorInCard = `${year}-${month}-${day}`;
}
    }
}
</script>