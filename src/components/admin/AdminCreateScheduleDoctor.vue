<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="6">
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Fecha de incio"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-menu
                        ref="menu1"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time"
                            label="Hora de inicio"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu3"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu1.save(time)"
                        ></v-time-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="6">
                    <v-menu
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date2"
                            label="Fecha de fin"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date2"
                        @input="menu4 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-menu
                        ref="menu"
                        v-model="menu5"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time2"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time2"
                            label="Hora de fin"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu5"
                        v-model="time2"
                        full-width
                        @click:minute="$refs.menu.save(time2)"
                        ></v-time-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12">
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
                <v-col cols="12">
                    <v-btn
                        color="primary darken-1"
                        block
                        @click="submit"
                    >
                        Guardar
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    components:{
        
    },
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        time: null,
        time2: null,
        items2: [],
        doctor: ''
    }),
    computed: {...mapGetters(["doctorsInBd"])},
    methods:{
        ...mapActions(["createNewSchedule", "getUltimateSnackbarState"]), 
        async submit(){
            if(this.date || this.date2 || this.time || this.time2){
                const snackbarData = {
                timeout: 2000,
                text: 'Por favor rellena todos los datos.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
            }
            const dataToSend = {
                dateStart: this.date,
                hourStart: this.time,
                dateEnd: this.date2,
                hourEnd: this.time2,
                doctor_id: this.doctor
            }
        if(document.getElementById("cbtns").classList.contains("d-none")){
            document.getElementById("cbtns").classList.replace("d-none", "d-block");
            document.getElementById("cclndrs").classList.replace("d-block", "d-none");
          }
          this.createNewSchedule(dataToSend)
        }
    },
    watch: {
        doctorsInBd(){
        const items2 = []
        Object.values(this.doctorsInBd).map((doctor) => 
            {
                items2.push({name: !doctor.fullName ? doctor.userName + ' -  N/A' : doctor.userName + ' - ' + doctor.fullName, id: doctor._id})
            }
          );
        this.items2 = items2
      }
    }
}
</script>