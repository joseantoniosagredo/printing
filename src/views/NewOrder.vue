<template>
    <v-card
     class="mx-auto"
    max-width="600"
    outlined>
     <form @submit.prevent="submit">
        <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Create new order</div>
        <div class="flex">
        <v-list-item-content>
            <v-list-item-title class="headline mb-1">Your information</v-list-item-title>
            <!--<v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>-->
            <div><label>Phone</label><p>{{getUser.phone}}</p></div>
            <div><label>Email</label><p>{{getUser.email}}</p></div>
        </v-list-item-content>
        <v-list-item-avatar
        tile
        size="80"
        color="grey"></v-list-item-avatar>
        </div>
            <InputCustom v-for="(value,key) in config.options" :key="key" :label="key" :type="value" v-model="values[key]"/>
             <v-file-input v-model="files" chips multiple label="File input"></v-file-input>
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
            values:{},
            files:[]
        }
    },
    created(){
        this.fetchConfig()
    },
    computed:{
        ...mapGetters(['config','getUser'])
    },
    watch:{
        config(){
            console.log('_____________',this.config.options)
            if(this.config && this.config.options)
            Object.keys(this.config.options).forEach(key => this.$set(this.values,key,''))    
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
            console.log(this.files)
        }
    }
}
</script>
<style scoped>
    .flex {
        display:flex;
    }
    label {
        display: inline-block;
        padding-right: 10px;
        font-weight: bold;
    }
    p {
        display: inline-block;
    }
</style>