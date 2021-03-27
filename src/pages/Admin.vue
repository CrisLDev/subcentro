<template>
    <v-container class="lighten-5 mb-16">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-alert border="bottom" colored-border color="primary" elevation="2">
              <v-icon medium >{{mdiInformation}}</v-icon> Consultorios y especialidades
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-container>
              <AdminCreateConsultingForm/>
            </v-container>
            <v-container v-if="consulting_roomsInBd.length == 0">
              No hay consultorios.
            </v-container>
            <v-container v-if="consulting_roomsInBd.length !== 0">
              <v-chip v-for="room in consulting_roomsInBd" :key="room._id" @click="editRooom(room._id)">
                {{room.name}}
              </v-chip>
            </v-container>
          </v-col>
          <v-col cols="12">
            <v-container>
              <AdminCreateEspecialityForm/>
            </v-container>
            <v-container v-if="especialititesInBd.length == 0">
              No hay Especialidades.
            </v-container>
            <v-container v-if="especialititesInBd.length !== 0">
              <v-chip v-for="especiality in especialititesInBd" :key="especiality._id" @click="editEspeciality(especiality._id)">
                {{especiality.name}}
              </v-chip>
            </v-container>
          </v-col>
          <v-col cols="12">
            <v-alert border="bottom" colored-border color="primary" elevation="2">
              <v-icon medium >{{mdiInformation}}</v-icon> Crear doctor
            </v-alert>
          </v-col>
          <v-col>
            <v-container>
              <AdminCreateDoctorForm/>
            </v-container>
          </v-col>
          <v-col cols="12" class="mt-6 mb-1">
            <v-row align="center">
              <v-col lg="4" v-for="user in usersRole" :key="user._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div class="text-uppercase">{{user.role}}</div>
                    <p class="display-1 text--primary">
                        {{user.userName ? user.userName : 'N/A'}}
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
          <v-col cols="12" class="mt-6 mb-1">
            <v-row align="center">
              <v-col lg="4" v-for="user in adminsRole" :key="user._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div class="text-uppercase">{{user.role}}</div>
                    <p class="display-1 text--primary">
                        {{user.userName ? user.userName : 'N/A'}}
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
          <v-col cols="12" class="mt-6 mb-1">
            <v-row align="center">
              <v-col lg="4" v-for="user in doctorsRole" :key="user._id">
                <v-card
                    class="mx-auto"
                >
                    <v-card-text>
                    <div class="text-uppercase">{{user.role}}</div>
                    <p class="display-1 text--primary">
                        {{user.userName ? user.userName : 'N/A'}}
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
            <v-alert border="bottom" colored-border color="primary" elevation="2">
              <v-icon medium >{{mdiInformation}}</v-icon> Ver informacion de las citas
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-container v-if="consulting_roomsInBd.length == 0">
              No hay consultorios.
            </v-container>
            <v-container v-if="consulting_roomsInBd.length !== 0">
              <v-chip v-for="room in consulting_roomsInBd" :key="room._id" @click="searchByRoom(room.code)">
                {{room.name}}
              </v-chip>
            </v-container>
          </v-col>
          <v-col cols="12 mt-6 mb-16">
                <v-btn class="d-block" block id="cbtn" @click="showCalendar" style="z-index: 50">
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
        </v-menu>
                    </v-sheet>
                </div>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
        <v-card-title>
          <span class="headline">Contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="name"
                  label="Nombre completo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="code"
                  label="Codigo del conusltorio*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                >
                  <v-select
                  v-model="especiality"
                    :items="items"
                    label="Especialidad*"
                    required
                  ></v-select>
                </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="submitDeleteRoom"
          >
            Eliminar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitEditRoom"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog
            v-model="dialog2"
            width="500"
          >
            <v-card>
        <v-card-title>
          <span class="headline">Contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="nameEspeciality"
                  label="Nombre*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="submitDeleteEspeciality"
          >
            Eliminar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog2 = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitEditEspeciality"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog
            v-model="dialog3"
            width="500"
          >
            <v-card>
        <v-card-title>
          <span class="headline">Contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                >
                  <v-select
                  v-model="doctor"
                    :items="items2"
                    item-text="name"
                    item-value="id"
                    label="Doctor*"
                    @change="putName()"
                    required
                  ></v-select>
                </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog3 = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="putDoctor"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
        </div>
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
import { mdiInformation } from '@mdi/js';
import { mdiNewBox } from '@mdi/js';
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
      mdiInformation: mdiInformation,
      mdiNewBox: mdiNewBox,
      mdiChevronLeft: mdiChevronLeft,
      mdiChevronRight: mdiChevronRight,
      dialog: false,
      dialog2: false,
      dialog3: false,
      items: [],
      items2: [],
      roomIdToEdit:'',
      especialityIdToEdit: '',
      doctor: '',
      dateId: '',
      doctorName: ''
    }),
    components: {
        AdminUserEdit,
        AdminCreateConsultingForm,
        AdminCreateEspecialityForm,
        AdminCreateDoctorForm
    },
    computed: {...mapGetters(["usersInBd", "consulting_roomsInBd", "especialititesInBd", "doctorsInBd"]),
    usersRole(){
        return this.usersInBd.filter(user => user.role === "user")
    },
    doctorsRole(){
        return this.usersInBd.filter(doctor => doctor.role === "doctor")
    },
    adminsRole(){
        return this.usersInBd.filter(admin => admin.role === "admin")
    },
    name: {
        get () {
          return this.$store.state.consulting.roomToEdit.name
        },
        set (value) {
          this.$store.commit('updateRoomName', value)
        }
      },
      code: {
        get () {
          return this.$store.state.consulting.roomToEdit.code
        },
        set (value) {
          this.$store.commit('updateRoomCode', value)
        }
      },
      especiality: {
        get () {
          return this.$store.state.consulting.roomToEdit.especiality
        },
        set (value) {
          this.$store.commit('updateEspeciality', value)
        }
      },
      nameEspeciality: {
        get () {
          return this.$store.state.especialities.especialityToEdit.name
        },
        set (value) {
          this.$store.commit('updateEspecialityName', value)
        }
      },
    },
    methods: {
        ...mapActions(["getusersFromBD","deleteUser","getDatesFromBD", "getConsultingFromBD", 
        "getEspecialitiesFromBD", "getConsultingFromBDById", "updateRoom", "deleteRoom", "getEspecialityFromBDById", "updateEspeciality", "deleteEspeciality", "getUltimateSnackbarState", "getDatesForCodeRoom", "getDoctorsFromBD", "putDoctorId"]),
        putName(){
          this.doctorName = this.items2.filter(item => item.id == this.doctor)
        },
        async putDoctor(){
          const data = {
            id: this.dateId,
            doctor: this.doctor
          }
          await this.putDoctorId(data)
          this.dialog3 = false;
          document.getElementById("cclndr").classList.replace("d-block", "d-none");
          document.getElementById("cbtn").classList.replace("d-none", "d-block");
          await this.getDatesFromBD();
          await this.getEvents();
          this.selectedEvent.doctor.userName= this.doctorName;
        },
        openDialog(id){
          this.dateId = id;
          this.dialog3 = true;
        },
        editEspeciality(especialityId){
          this.dialog2 = true;
          this.especialityIdToEdit = especialityId;
          this.getEspecialityFromBDById(especialityId);
        },
        submitDeleteEspeciality(){
          this.deleteEspeciality(this.especialityIdToEdit)
        },
        submitEditEspeciality(){
          const dataToSend = {
                name: this.nameEspeciality,
                id: this.especialityIdToEdit
            }
          this.updateEspeciality(dataToSend)
        },
        editRooom(roomId){
          this.dialog = true;
          this.roomIdToEdit = roomId;
          this.getConsultingFromBDById(roomId);
        },
        async searchByRoom(code){
          if(document.getElementById("cbtn").classList.contains("d-none")){
            document.getElementById("cbtn").classList.replace("d-none", "d-block");
            document.getElementById("cclndr").classList.replace("d-block", "d-none");
          }
          await this.getDatesForCodeRoom(code);
        },
        submitDeleteRoom(){
          this.deleteRoom(this.roomIdToEdit)
        },
        submitEditRoom(){
          const dataToSend = {
                name: this.name,
                code: this.code,
                especiality: this.especiality,
                id: this.roomIdToEdit
            }
          this.updateRoom(dataToSend)
        },
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
                    room:evento.consulting_room,
                    doctor:evento.doctor_id,
                    complete:evento.complete,
                    id: evento._id,
                    color: this.colors[this.rnd(0, this.colors.length - 1)]
                })
            }
          );
        this.events = events
      },
      async showCalendar(){
        if(document.getElementById("cbtn").classList.contains("d-block")){
            document.getElementById("cbtn").classList.replace("d-block", "d-none");
            document.getElementById("cclndr").classList.replace("d-none", "d-block");
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
        this.getDoctorsFromBD();
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Admin';
            }
        },
        especialititesInBd(){
        const items = []
        Object.values(this.especialititesInBd).map((especiality) => 
            {
                items.push(especiality.name)
            }
          );
        this.items = items
      },
        doctorsInBd(){
        const items2 = []
        Object.values(this.doctorsInBd).map((doctor) => 
            {
                items2.push({name: doctor.userName, id: doctor._id})
            }
          );
        this.items2 = items2
      }
    }
}
</script>