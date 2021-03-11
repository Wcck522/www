import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import { Popup } from 'vant';
import 'vant/lib/index.css'

Vue.use(Popup)

Vue.config.productionTip = false

let playMusic = {
	playList:[],
	currentPlay: null,
	currentPlayId: null
}
new Vue({
	router,
	render: (h) => h(App),
	data: function() {
		return {
			isShowLoading: false,
			playMusic
		};
	},
}).$mount('#app')
