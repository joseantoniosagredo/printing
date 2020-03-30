<template>
  <v-data-table
    @change="$emit('change',$event)"
    @input="$emit('input',$event)"
    :value="selected"
    :headers="headers"
    :items="files"
    item-key="_id"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
    </template>
  </v-data-table>
</template>
<script>
/**
 * FILE {
    user: Types.ObjectId
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    pages: number
}
 */
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
                value: 'originalname',
            },
            {
                text: 'Pages',
                align: 'start',
                value: 'pages',
            }],
            files:[{
                _id:'sdfg12341',
                user: 'asdfasd',
                fieldname: 'asdfasdf',
                originalname: 'CV_Jose.pdf',
                encoding: 'utf8',
                mimetype: 'test',
                size: 2000,
                destination: 'asdf',
                filename: 'asdfaasd',
                path: '/api/PATH',
                pages: 25
            },{
                _id:'asdfa2314',
                user: 'asdfasd',
                fieldname: 'asdfasdf',
                originalname: 'Fotos de gatitos.pdf',
                encoding: 'utf8',
                mimetype: 'test',
                size: 2000,
                destination: 'asdf',
                filename: 'asdfaasd',
                path: '/api/PATH',
                pages: 20
            }]
        }
    },
}
</script>