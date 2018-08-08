<template>
 <el-select v-model="selectValue" filterable @change="selectCategory(selectValue)" placeholder="Select">
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
        let category = this
        category.get()
    },
    methods:{
        get(){
            let category = this
            category.$store.state.services.categoryService
            .getAll()
            .then(c =>{
                category.data = c.data
            })
            .catch(c =>{})
        },
        selectCategory(value){
            this.$emit('CategorySelected',value)
        }

    } 
}
</script>

<style>

</style>
