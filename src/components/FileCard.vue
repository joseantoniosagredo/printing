<template>
    <v-card>
        <v-card-title>{{file.originalname}}</v-card-title>
        <InputCustom :type="[1,2,4]" label='Group' v-model="computedGroup" />
        <InputCustom type="number" label='Copies' v-model="computedCopies" />
        <div>
            <label>Final price</label>
            <p></p>
        </div>
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
export default {
    components:{
        InputCustom
    },
    props:{
        file:{ 
        },
        dobleSided:{type:Boolean, required:true},
        group:{type:Number, required:true},
        bind:{type:Boolean, required:true},
        copies:{type:Number, required:true},
    },
    computed:{
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
        }
    }

}
</script>