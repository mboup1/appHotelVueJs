import { createRouter, createWebHashHistory } from 'vue-router'
import HotelsList from '../components/HotelsList.vue';
import AddHotelForm from '../components/AddHotelForm.vue';
import UpdateHotelForm from '../components/UpdateHotelForm.vue';
import ModalHotel from '../components/ModalHotel.vue';
import BookRoom from '../components/BookRoom.vue';

const routes = [
    { path: '/hotels', component: HotelsList, name: 'Hotels' },
    { path: '/add', component: AddHotelForm, name: 'AddHotelForm' },
    { path: '/update', component: UpdateHotelForm, name: 'UpdateHotelForm' },
    { path: '/infoshotel', component: ModalHotel, name: 'ModalHotel' },
    { path: '/bookroom', component: BookRoom, name: 'BookRoom' },

    { path: '/:pathMatch(.*)', redirect: '/hotels'}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
