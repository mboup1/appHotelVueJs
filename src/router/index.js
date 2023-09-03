import { createRouter, createWebHashHistory } from 'vue-router'
import HotelsList from '../components/HotelsList.vue';
import AddHotelForm from '../components/AddHotelForm.vue';
import UpdateHotelForm from '../components/UpdateHotelForm.vue';

const routes = [
    { path: '/hotels', component: HotelsList, name: 'Hotels' },
    { path: '/add', component: AddHotelForm, name: 'AddHotelForm' },
    { path: '/update', component: UpdateHotelForm, name: 'UpdateHotelForm' },

    { path: '/:pathMatch(.*)', redirect: '/hotels'}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
