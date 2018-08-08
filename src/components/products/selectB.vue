<template>
 <el-select v-model="selectValue" filterable @change="selectBrand(selectValue)" placeholder="Select">
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
        let brand = this
        brand.get()
    },
    methods:{
        get(){
            let brand = this
            brand.$store.state.services.brandService
            .getAll()
            .then(c =>{
                brand.data = c.data
            })
            .catch(c =>{})
        },
        selectBrand(value){
            this.$emit('BrandSelected',value)
        }
    } 
}
</script>

<style>
</style>
