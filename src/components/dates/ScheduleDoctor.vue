<template>
    <Schedule
                      :time-ground="['09:00', '18:00']"
      :week-ground="['LUN', 'MAR', 'MIE', 'JUE', 'VIE']"
      :color="[
        '#2B2E4A',
        '#521262',
        '#903749',
        '#53354A',
        '#40514E',
        '#537780',
      ]"
      :task-detail="[
        [
          {
            dateStart: '09:30',
            dateEnd: '10:30',
            title: 'Metting',
            detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.'
          },
          {
            dateStart: '11:30',
            dateEnd: '13:50',
            title: 'Metting',
            detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.'
          },
        ],
        [
          {
            dateStart: '10:30',
            dateEnd: '12:00',
            title: 'Metting',
          },
          {
            dateStart: '12:30',
            dateEnd: '14:50',
            title: 'Metting',
          }
        ],
        [
          {
            dateStart: '12:30',
            dateEnd: '13:30',
            title: 'Metting',
          },
          {
            dateStart: '15:30',
            dateEnd: '16:50',
            title: 'Metting',
          }
        ],
        [
          {
            dateStart: '09:50',
            dateEnd: '10:50',
            title: 'Metting',
          },
          {
            dateStart: '11:30',
            dateEnd: '13:50',
            title: 'Metting',
          }
        ],
        [
          {
            dateStart: '12:30',
            dateEnd: '13:30',
            title: 'Metting',
          },
          {
            dateStart: '14:30',
            dateEnd: '15:50',
            title: 'Metting',
          }
        ]
      ]">

    </Schedule>
</template>

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