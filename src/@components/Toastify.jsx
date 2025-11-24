import { toast } from 'react-toastify';

export const success = (msg, time = 2000) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const error = (msg, time = 2000) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}