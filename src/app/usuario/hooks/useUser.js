import { useDispatch, useSelector } from 'react-redux';
import { createUser, deleteUser, getUsuario, listUsers, listUsers2, updateUser } from '../store/thunks';
import { individualUser } from '../store';


export const useUser = () => {

    const dispatch = useDispatch();
    const { list, states, individual, total } = useSelector((state) => state.users);

    const listUsersH = (busqueda, limite, pagina, estado, idFiscalia) => {
        dispatch(listUsers(busqueda, limite, pagina, estado, idFiscalia));
    }

    const listUsersH2 = (busqueda, limite, pagina, estado, idFiscalia, id) => {
        dispatch(listUsers2(busqueda, limite, pagina, estado, idFiscalia, id));
    }

    const createUsersH = (data, navigate) => {
        dispatch(createUser(data, navigate));
    }

    const individualUsersH = (data) => {
        dispatch(individualUser(data));
    }

    const updateUserH = (data, idUsuario, flagHabilitarDeshabilitar = false) => {
        dispatch(updateUser(data, idUsuario, flagHabilitarDeshabilitar));
    }

    const deleteUserH = (idUsuario) => {
        dispatch(deleteUser(idUsuario));
    }

    const getIndividualUserH = (id) => {
        dispatch(getUsuario(id));
    }

    return {
        //valores
        list,
        states,
        individual,
        total,

        //funciones
        listUsersH,
        updateUserH,
        deleteUserH,
        individualUsersH,
        listUsersH2,
        createUsersH,
        getIndividualUserH
    }
}
