<template>
    <div>Welcome</div>
</template>
<script>
import {verifyUser} from '../Api'
export default {
    mounted() {
        console.log(verifyUser)
        verifyUser(this.$route.query.token,(err)=> {
            if(err) console.error(err)
        })
    },
}
</script>