<template>
    <v-card elevation="2">
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                    Nueva cita
                </div>
                <v-list-item-title class="text-h5 mb-1">
                    <v-container>
                        <v-row>
                            <v-text-field
                                v-model="userNameN"
                                label="Nombre del paciente*"
                                required
                                :counter="20"
                                :error-messages="userNameNErrors" 
                                @input="$v.userNameN.$touch()" 
                                @blur="$v.userNameN.$touch()"
                            />
                        </v-row>
                    </v-container>
                </v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
  name: 'AdminCreateDate',
  data: () => ({
      userNameN: '',
      fullNameN: '',
      telephoneNumberN: ''
    }),
}
</script>