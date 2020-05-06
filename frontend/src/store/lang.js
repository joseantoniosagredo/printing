import es from '../i18n/langs/es'
import en from '../i18n/langs/en'
const SET_LANG = 'SET_LANG'
export default {
    state:{
        current:es
    },
    actions:{
        setLanguage({commit},lang){
            commit(SET_LANG,lang)
        }
    },
    mutations:{
        [SET_LANG](state,lang){
            switch(lang){
                case 'es':
                    state.current = es
                    break
                case 'en':
                    state.current = en
                    break
                default:
                    console.error('Language '+lang+ ' not implemented')
            }
        }
    }
}