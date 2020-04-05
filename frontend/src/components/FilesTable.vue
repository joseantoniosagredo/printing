<template>
  <v-data-table
    @change="$emit('change',$event)"
    @input="$emit('input',$event)"
    :headers="headers"
    :value="rows"
    :items="rows"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:top>
    </template>
    <template v-slot:item.remove="{ item }">
        <v-btn class='delete' icon @click="$emit('delete',item.name)" > <v-icon>mdi-delete</v-icon></v-btn>
      </template>
  </v-data-table>
</template>
<script>

export default {
    props:{
        "show-select":{
            type:Boolean,
            default:false
        },
        selected:{
            type:Array,
        }
    },
    data(){
        return {
            headers:[{
                text: 'File Name',
                align: 'start',
                value: 'name',
            },
            {
                text: 'Pages',
                align: 'start',
                value: 'pages',
            },{
                text:'',
                align: 'start',
                value: 'remove',
            }],
            
        }
    },
    computed: {
        rows(){
            return this.selected.map(e => ({name:e.file.name,pages:e.pages}))
        }
    },
}
</script>
<style lang="stylus" scoped>
    .delete {
        transition color .2s
        &:hover {
            color red
        }
    }
        

</style>