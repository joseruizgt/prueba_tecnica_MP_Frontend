import { useDispatch, useSelector } from 'react-redux';
import { createJob, listJobs, updateJob } from '../store';


export const usePuesto = () => {

    const dispatch = useDispatch();
    const { listJob, individualJob, total } = useSelector((state) => state.job);

    const listJobH = (busqueda, limite, pagina, id) => {
        dispatch(listJobs(busqueda, limite, pagina, id));
    }

    const createJobH = (data, navigate) => {
        dispatch(createJob(data, navigate));
    }

    const updateJobH = (data, idRol) => {
        dispatch(updateJob(data, idRol));
    }

    return {
        //valores
        listJob,
        individualJob,
        total,

        //funciones
        listJobH,
        createJobH,
        updateJobH
    }
}
