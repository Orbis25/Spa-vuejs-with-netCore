
  <template>
  <div id="app">
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu  theme="light" width="auto" >
                            <MenuItem name="1-1" > <span @click="redirect('/Inicio')"><v-icon>home</v-icon> Inicio</span> </MenuItem>
                            <MenuItem name="1-2"><span @click="redirect('/empleados')"><v-icon>work</v-icon> Empleados </span></MenuItem>
                            <MenuItem name="1-3"><span @click="redirect('/clientes')"><v-icon>accessibility</v-icon> Clientes </span></MenuItem> 
                            <MenuItem name="1-4"><span @click="redirect('/productos')"><v-icon>inbox</v-icon> Productos </span></MenuItem>   
                            <MenuItem name="1-5"><span @click="redirect('/ventas')"><v-icon>shopping_cart</v-icon> Ventas </span></MenuItem>   
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>{{path}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'app',
  data(){
    return{
    }
  },
  methods: {
    redirect(path) {
      if (path === undefined) return
      this.$router.push(path)
    }
  },
  computed:{
      path(){
          let path = this
          return path.$route.name
      }
  }
}
</script>
<style scoped>
.layout{
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

</style>
