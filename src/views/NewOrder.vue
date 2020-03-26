<template>
    <v-card
     class="mx-auto"
    max-width="600"
    outlined>
     <form @submit.prevent="submit">
        <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Create new order</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
       
            <InputCustom v-for="(value,key) in config" :key="key" :label="key" :type="value" v-model="values[key]"/>
     
      </v-list-item-content>
        
    </v-list-item>

    <v-card-actions>
      <v-btn type='submit' text>Submit</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
       </form>
    </v-card>
</template>

<script>
import InputCustom from '@/components/InputCustom'
import { mapGetters, mapActions } from 'vuex'
export default {
    components:{
        InputCustom
    },
    data(){
        return {
            values:{}
        }
    },
    created(){
        this.fetchConfig()
    },
    computed:{
        ...mapGetters(['config'])
    },
    watch:{
        config(){
            Object.keys(this.config).forEach(key => this.$set(this.values,key,''))    
        },
    },
    methods:{
        ...mapActions(['fetchConfig']),
        submit(){
            let options = {}
            Object.keys(this.config).forEach((key )=> {
                options[key] = this.values[key]
            })
            console.log(options)
        }
    }
}
</script>
<style scoped>

</style>