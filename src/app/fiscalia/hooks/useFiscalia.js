import { useDispatch, useSelector } from 'react-redux';
import { createFiscalia, listFiscaliaData, updateFiscalias } from '../store';

export const useFiscalia = () => {

    const dispatch = useDispatch();
    const { individualFiscalia, listFiscalia, totalFiscalia, } = useSelector((state) => state.fiscalia);

    const listFiscaliaH = (busqueda, limite, pagina, id) => {
        dispatch(listFiscaliaData(busqueda, limite, pagina, id));
    }

    const createFiscaliaH = (data, navigate) => {
        dispatch(createFiscalia(data, navigate));
    }

    const updateFiscaliaH = (data, idRol) => {
        dispatch(updateFiscalias(data, idRol));
    }

    return {
        //valores
        individualFiscalia,
        listFiscalia, 
        totalFiscalia,

        //funciones
        listFiscaliaH,
        createFiscaliaH,
        updateFiscaliaH
    }
}
