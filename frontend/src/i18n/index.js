
//import store from '@/store'
export default {
    computed: {
        $lang(){
            return this.$store.state.lang.current
        }
    },
    methods: {
        t(text){
            const lang = this.$store.state.lang.current
            const translate = lang[text]
            return translate ? translate : `[${text}]`
        }
    }
}