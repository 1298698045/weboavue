import { createApp } from 'vue';
import ToastComponent from "@/components/Toast.vue";

const Toast = (message, type = 'success', timeout = 3000) => {
    const toastApp = createApp(ToastComponent, { message, type });
    const container = document.createElement('div');
    document.body.appendChild(container);
    toastApp.mount(container);
    setTimeout(() => {
        toastApp.unmount();
        document.body.removeChild(container);
    }, timeout);
}
Toast.success = (message, timeout = 3000) => {
    Toast(message, 'success', timeout);
}
Toast.error = (message, timeout = 3000) => {
    Toast(message, 'error', timeout);
}
export default Toast;