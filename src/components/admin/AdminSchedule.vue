<template>
    <v-col cols="12">
                <v-btn class="d-block" block id="cbtns" @click="showSchedule" style="z-index: 3">
                    Ver Calendario
                </v-btn>
                <div id="cclndrs" class="d-none">
    <Schedule
                      :time-ground="['09:00', '18:00']"
      :week-ground="['LUN', 'MAR', 'MIE', 'JUE', 'VIE']"
      :color="[
        '#2B2E4A',
        '#521262',
        '#903749',
        '#53354A',
        '#40514E'
      ]"
      :task-detail="[
        lunes,
        martes,
        miercoles,
        jueves,
        viernes
      ]">

    </Schedule>
                </div>
          </v-col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    data: () => ({
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      color: ["#2B2E4A", "#521262", "#903749", "#53354A", "#40514E", "#537780"]
    }),
    computed: {...mapGetters(["schedulesInBd"])},
    methods: {
      ...mapActions(["deleteScheduleById"]), 
        async showSchedule(){
          await this.getEvents();
        if(document.getElementById("cbtns").classList.contains("d-block")){
            document.getElementById("cbtns").classList.replace("d-block", "d-none");
            document.getElementById("cclndrs").classList.replace("d-none", "d-block");
          }
          if(this.lunes.length <= 0 && this.martes.length <= 0 && this.miercoles.length <= 0 && this.jueves.length <= 0 && this.viernes.length <= 0){
            const snackbarData = {
                timeout: 2000,
                text: 'No hay citas registradas.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
          }
      },
      getEvents () {
        const events = [];
        const schedules = this.$store.getters.schedulesInBd;
        Object.values(schedules).map((schedule) => 
            {
                events.push({
                    dateStart: schedule.dateStart,
                    dateEnd: schedule.dateEnd, 
                    title: schedule.title,
                    detail: schedule.day,
                    doctor_id: schedule.doctor_id._id,
                    id: schedule._id,
                    styleObj: this.addStyles(schedule.dateStart, schedule.dateEnd)
                })
            }
          );
        this.lunes  = events.filter(schedule => schedule.detail === "01");
        this.martes  = events.filter(schedule => schedule.detail === "02");
        this.miercoles  = events.filter(schedule => schedule.detail === "03");
        this.jueves  = events.filter(schedule => schedule.detail === "04");
        this.viernes  = events.filter(schedule => schedule.detail === "05");
      },
      initTimeGroud: function initTimeGroud(value) {
			if (value && value.length == 2) {
				var startTime = value[0].split(":")[0] * 1;
				var endTime = value[1].split(":")[0] * 1;
				value = [];
				for (var i = startTime; i <= endTime; i++) {
					// console.log(1);
					// value.push()
					var hour = i < 10 ? "0" + i : "" + i;
					value.push(hour + ":00");
				}
			} else {
				value = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
			}
			return value;
		},
      addStyles(startDate, endDate){
        this.pageTimeGround = this.initTimeGroud(this.timeGround);
        var startMin = startDate.split(':')[0] * 60 + startDate.split(':')[1] * 1;
				var endMin = endDate.split(':')[0] * 60 + endDate.split(':')[1] * 1;
				// console.log(endMin);
				var difMin = endMin - startMin;
				// console.log(startMin);
				// console.log(endMin);
				return  {
					height: difMin * 100 / 60 + 'px',
					top: (startMin - (this.pageTimeGround[0].split(":")[0] * 60 + this.pageTimeGround[0].split(":")[1] * 1)) * 100 / 60 + 50 + 'px',
					backgroundColor: this.color[~~(Math.random() * this.color.length)]
					// console.log(this.color[~~(Math.random() * 4)]);
					// console.log(this.taskDetail);
					// console.log(this.timeGround);
				};
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

<style>
ul{
    list-style-type: none!important;
    padding-left: 0!important;
}
.task-list-item{
  border-radius: 5px!important;
  width: 16%!important;
}
.task-list-item h3 {
    display: none!important;
}
.task-list-item p {
    margin: 0.1rem 0.4rem!important;
    font-size: 12px!important;
}
.task-list p {
  font-size: 12px!important;
    padding: 1rem 0.1rem!important;
}
.task-list {
    width: 16%!important;
}
.time-ground ul li p {
  width: 80%!important;
}

@media (max-width: 1400px) {
  .schedule{
    margin: 0 250px!important;
  }
}
@media (max-width: 1200px) {
  .schedule{
    margin: 0 200px!important;
  }
}
@media (max-width: 900px) {
  .schedule{
    margin: 0 150px!important;
  }
}
@media (max-width: 600px) {
  .schedule{
    margin: 0 100px!important;
  }
}
</style>