import { useDispatch, useSelector } from 'react-redux';
import { cambioFase, correccion, editItem, eliminar, individualBitacora, individualValePeticion, listTotal, listVale, listValesConta, obtenerRechazo, rechazoVale, saveVale, valesVigentes } from '../store/thunks';
import { individualVale } from '../store';


export const useVale = () => {

    const dispatch = useDispatch();
    const { list, states, individual, currents, itemRechazo, bitacoraVale, bitacoraValeIndividual, total, totalBitacoraVale } = useSelector((state) => state.vouncher);

    const listValesH = (busqueda, limite, pagina, tab) => {
        dispatch(listVale(busqueda, limite, pagina, tab));
    }

    const valesVigentesH = () => {
        dispatch(valesVigentes());
    }

    const saveValeH = (data) => {
        dispatch(saveVale(data))
    }

    const individualValeH = (data) => {
        dispatch(individualVale(data));
    }

    const cambioFaseH = (fase, data, tab) => {
        dispatch(cambioFase(fase, data, tab));
    }

    const rechazoValeH = (idExpediente, data) => {
        dispatch(rechazoVale(idExpediente, data))
    }

    const individualValePeticionH = (id) => {
        dispatch(individualValePeticion(id))
    };

    const editItemH = (id, data) => {
        dispatch(editItem(id, data));
    }

    const obtenerRechazoH = (idVale) => {
        dispatch(obtenerRechazo(idVale));
    }

    const correccionH = (idVale, data, tab) => {
        dispatch(correccion(idVale, data, tab));
    }

    const eliminarH = (idExpediente, tab) => {
        dispatch(eliminar(idExpediente, tab));
    }

    const listValesContaH = (busqueda, limite, pagina, tab, idAgencia) => {
        dispatch(listValesConta(busqueda, limite, pagina, tab, idAgencia));
    }

    const listTotalH = (busqueda, limite, pagina, idAgencia) => {
        dispatch(listTotal(busqueda, limite, pagina, idAgencia));
    }

    const individualBitacoraH = (idExpediente) => {
        dispatch(individualBitacora(idExpediente))
    }

    return {
        //valores
        list,
        states,
        individual,
        currents,
        itemRechazo,
        bitacoraVale,
        bitacoraValeIndividual,
        total,
        totalBitacoraVale,

        //funciones
        listValesH,
        valesVigentesH,
        saveValeH,
        individualValeH,
        cambioFaseH,
        rechazoValeH,
        individualValePeticionH,
        editItemH,
        obtenerRechazoH,
        correccionH,
        eliminarH,
        listValesContaH,
        listTotalH,
        individualBitacoraH
    }
}
