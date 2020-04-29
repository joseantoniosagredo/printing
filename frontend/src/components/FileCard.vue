<template>
    <v-card class="card">
        <v-card-title>{{file.name}}</v-card-title>
        <v-card-text>
            <InputCustom :type="[1,2,4]" label='Group' v-model="computedGroup" />
            <InputCustom type="number" label='Copies' v-model="computedCopies" />
            <div class="flex">
                <v-checkbox label="Color?" v-model="computedColor"></v-checkbox>
                <v-checkbox label="Binded?" v-model="computedBind"></v-checkbox>
                <v-checkbox label = "Doble Sided?" v-model="computedDuobleSided"></v-checkbox>
            </div>
            <div>
                <label>Pages</label>
                <p>{{totalPages}}</p>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
/**
 * {
        file: { type: Types.ObjectId, ref: ModelsNames.FILE },
        doubleSided: { type: Boolean, required: true },
        group: { type: Number, required: true },
        bind: { type: Boolean, required: true },
    }
 */
import InputCustom from '@/components/InputCustom'
import {calculatePages} from '@/utils'
import { mapGetters } from "vuex";
export default {
    components:{
        InputCustom
    },
    props:{
        file:{ 
        },
        doubleSided:{type:Boolean, required:true},
        group:{type:Number, required:true},
        bind:{type:Boolean, required:true},
        copies:{type:Number, required:true},
        pages:{type:Number,required:true},
        color:{type:Boolean, required:true}
    },
    computed:{
        ...mapGetters(['config']),
        computedGroup:{
            get(){
                return this.group
            },
            set(value){
                this.$emit('update:group',value)
            }
        },
        computedCopies:{
            get(){
                return this.copies
            },
            set(value){
                this.$emit('update:copies',value)
            }
        },
        computedColor:{
            get(){
                return this.color
            },
            set(value){
                this.$emit('update:color',value)
            }
        },
        computedDuobleSided:{
            get(){
                return this.doubleSided
            },
            set(value){
                this.$emit('update:doubleSided',value)
            }
        },
        
        computedBind:{
            get(){
                return this.bind
            },
            set(value){
                this.$emit('update:bind',value)
            }
        },
        totalPages(){
            return calculatePages(this.pages,this.group,this.doubleSided,this.copies)
        }
    }

}
</script>

<style lang="stylus" scoped>
.flex {
    display flex
}
.card {
    padding 5px
    margin 10px
    background-color #efefef
}
</style>