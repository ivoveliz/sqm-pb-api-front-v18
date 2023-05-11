<template>
  <!-- <div class="btn-group mb-2" role="group">
      <button type="button" class="btn btn-primary" @click="addDevice()">Listado ntidades</button>
      <button type="button" class="btn btn-danger" @click="removeDevice()">Eliminar Dispositivo</button>
      <button type="button" class="btn btn-success" @click="updateDevices()">Actualizar Todos los Dispositivos</button>
    </div> -->

    <div class="container">
    <h1 class="text-center mt-5">CONFIGURACION ENTIDADES</h1>
  </div>
  <div class="card-deck">
    
    <div v-for="device in devices" :key="device.deviceid" class="card">
      <div class="card-body">
        <form @submit.prevent="updateDevice(device)" class="device-form">
          <div class="form-group">
            <label for="deviceid" class="form-label">Device ID:</label>
            <input type="text" v-model="device.deviceid" id="deviceid" class="form-control">
          </div>
          <div class="form-group">
            <label for="modelid" class="form-label">Model ID:</label>
            <input type="text" v-model="device.modelid" id="modelid" class="form-control">
          </div>
          <div class="form-group">
            <label for="entityid" class="form-label">Entity ID:</label>
            <input type="text" v-model="device.entityid" id="entityid" class="form-control">
          </div>
          <div class="form-group">
            <label for="namedevice" class="form-label">Nombre del dispositivo:</label>
            <input type="text" v-model="device.namedevice" id="namedevice" class="form-control">
          </div>
          <div class="form-group">
            <label for="typedevice" class="form-label">Tipo de dispositivo:</label>
            <input type="text" v-model="device.typedevice" id="typedevice" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary update-btn">Actualizar</button>
          </div>
          <div class="form-group">
            <label for="downlink" class="form-label">Downlink:</label>
            <input type="text" v-model="device.downlink" id="downlink" class="form-control">
            <button type="button" class="btn btn-secondary downlink-btn" @click="sendDownlink(device)">Enviar Downlink</button>
          </div>
        
        </form>
   
      </div>
    </div>
  </div>
</template>


<style src="./DeviceList.css"></style>

<script>
import axios from 'axios';
const api = axios.create({
            baseURL: `${process.env.VUE_APP_API_URL}`,
          });
export default {
  name: 'DeviceList',
  data() {
    return {
      devices: [],
      
    };
  },
  methods: {
    
    updateDevice(device) {
    
          api.post(`/devices/${device.deviceid}`, {
        deviceid: device.deviceid,
      modelid: device.modelid,
      entityid: device.entityid,
      namedevice: device.namedevice,
      typedevice: device.typedevice // Agregar el campo typedevice
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    },
    sendDownlink(device) {
      api.post(`/devices/${device.deviceid}/downlink`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    },
    fetchDevices() {
      api.get(`/devices`)
      .then(response => {
        this.devices = response.data;
      })
      .catch(error => {
        console.log(error.response.data);
      });
    }
  },
  mounted() {
    this.fetchDevices();
    document.title = 'Entitades';
  },
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
};
</script>
