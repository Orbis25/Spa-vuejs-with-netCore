<template>
 <el-select v-model="selectValue" filterable @change="selectModel(selectValue)" placeholder="Select">
    <el-option
      v-for="item in data"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      >
    </el-option>
    </el-select>
   
</template>

<script>
export default {
    data(){
        return{ 
            data:[],
            id:0,
            name:'',
            selectValue:''
        }
    },
    created(){
        let model = this
        model.get()
    },
    methods:{
        get(){
            let model = this
            model.$store.state.services.modelProductService
            .getAll()
            .then(c =>{
                model.data = c.data
            })
            .catch(c =>{})
        },
        selectModel(value){
            this.$emit('ModelSelected',value)
        }

    } 
}
</script>

<style>

</style>
