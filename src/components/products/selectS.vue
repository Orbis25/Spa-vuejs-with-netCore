<template>
 <el-select v-model="selectValue" filterable @change="selectSupplier(selectValue)" placeholder="Select">
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
        let supplier = this
        supplier.get()
    },
    methods:{
        get(){
            let supplier = this
            supplier.$store.state.services.supplierService
            .getAllSupplier()
            .then(c =>{
                supplier.data = c.data
            })
            .catch(c =>{})
        },
        selectSupplier(value){
            this.$emit('SupplierSelected',value)
        }

    } 
}
</script>

<style>

</style>
