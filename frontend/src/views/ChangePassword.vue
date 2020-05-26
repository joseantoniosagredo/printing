<template>
    <ChangePasswordUI @submit="handleSubmit"/>
</template>
<script>
import ChangePasswordUI from '@/components/ChangePasswordUI'
import {changePassword} from '@/Api'
export default {
    components:{
        ChangePasswordUI
    },
    methods: {
        handleSubmit({password}){
            const {token,user} = this.$route.query
            changePassword(user,token,password,(err)=>{
                if(err) return console.error(err)
                this.$route.push({name:'login'})
            })
        }
    },
}
</script>