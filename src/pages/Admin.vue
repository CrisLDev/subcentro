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
    }),
    components: {
        AdminUserEdit,
    },
    computed: {...mapGetters(["usersInBd"])},
    methods: {
        ...mapActions(["getusersFromBD","deleteUser"]),
        deleteU(id){
            this.deleteUser(id)
        }
    },
    created() {
        this.getusersFromBD();
    },
}
</script>