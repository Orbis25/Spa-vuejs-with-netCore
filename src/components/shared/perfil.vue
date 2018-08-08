<template>
    <v-navigation-drawer 
    class="bg-menu "
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    stateless
    height="700"
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0 ho">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{usuario}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense >
      <v-divider></v-divider>
      <v-list-tile
        v-for=" item in items"
        :key="item.title"
        @click="redirect(item.path)"
        class="ho"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          
          <v-list-tile-title >{{ item.title }}</v-list-tile-title>
          
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
      <!-- nav final -->
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Inicio', icon: 'home', path: '/' },
        { title: 'Empleados', icon: 'work', path: '/empleados' },
        { title: 'Productos', icon: 'inbox', path: '/productos'},
        { title: 'Clientes', icon: 'accessibility', path: '/clientes' },
        { title: 'Ventas', icon: 'shopping_cart', path: '/ventas' },
        { title: 'Cerrar sesion', icon: 'exit_to_app' }
      ],
      mini: false,
      right: null,
      usuario:'Orbis Alonzo G.'
    }
  },
  methods: {
    redirect(path) {
      if (path === undefined) return
      this.$router.push(path)
    }
  }
}
</script>
<style>
.ho:hover {
  background: #0336ff;
  color: white;
}
.bg-menu{
  color: white;
  background: #1b3c59;
  z-index: 100;
  position: fixed;
}
</style>