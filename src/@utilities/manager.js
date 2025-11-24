import CryptoJS from "crypto-js";
import { AES, enc } from 'crypto-js';
import { tagCodesSystem } from "../@tags/tagCodigos";
import { error as errorNotification } from "../@components";
import * as axios from '../@http/axiosClient';

const tokenKey = tagCodesSystem.token_usuario;
const rolKey = tagCodesSystem.rol_usuario;
const userKey = tagCodesSystem.usuario;
const permissionsKey = tagCodesSystem.permisos_usuario;
const agencyKey = tagCodesSystem.cat_agencias;
const jobKey = tagCodesSystem.cat_puestos;
const cat_roles = tagCodesSystem.cat_roles;
const permissionsSystemKey = tagCodesSystem.permisos_sistema;

//GUARDAR EN LOCAL STORAGE
export function saveTokenLocalStorage(token) {
    localStorage.setItem(tokenKey, token);
}

export function saveRolLocalStorage(rol) {
    // let auxRol = CryptoJS.AES.encrypt(rol.toString(), 'TYd23@201642').toString();
    localStorage.setItem(rolKey, rol);
}

export function saveUser(user) {
    // let auxRol = CryptoJS.AES.encrypt(rol.toString(), 'TYd23@201642').toString();
    localStorage.setItem(userKey, JSON.stringify(user));
}

export function savePermissions(permissions) {
    localStorage.setItem(permissionsKey, JSON.stringify(permissions));
}

export function saveAgencia(agencia) {
    localStorage.setItem(agencyKey, JSON.stringify(agencia));
}

export function saveJobLocalS(job) {
    localStorage.setItem(jobKey, JSON.stringify(job));
}

export function saveCatRolsLocalS(rols) {
    localStorage.setItem(cat_roles, JSON.stringify(rols));
}

export function savePermissionsSystem(permissions) {
    localStorage.setItem(permissionsSystemKey, JSON.stringify(permissions));
}

//OBTENER DEL LOCAL STORAGE
export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function getRol() {
    return localStorage.getItem(rolKey);
}

export function getPermissions() {
    return JSON.parse(localStorage.getItem(permissionsSystemKey));
}

export function getPermissionsUser() {
    return JSON.parse(localStorage.getItem(permissionsKey));
}

export function getUser() {
    return JSON.parse(localStorage.getItem(userKey));
}

export function getAgencyLocalS() {
    return JSON.parse(localStorage.getItem(agencyKey));
}

export function getJobLocalS() {
    return JSON.parse(localStorage.getItem(jobKey));
}

export function getCatRolesLocalS() {
    return JSON.parse(localStorage.getItem(cat_roles));
}

//REMOVER DEL LOCAL STORAGE
export function removeTokenLocalStorage() {
    localStorage.removeItem(tokenKey);
}

export function removeRolLocalStorage() {
    localStorage.removeItem(rolKey);
}

//DESENCRIPATR DE LOCAL STORAGE
export function decryptRolLocalStorage() {
    const rol = getRol();
    if (rol === null) return null;
    let bytes = CryptoJS.AES.decrypt(rol, 'TYd23@201642');
    let decryptRol = bytes.toString(CryptoJS.enc.Utf8);
    return decryptRol;
}

export async function logout(callback) {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(rolKey);
    localStorage.removeItem(userKey);
    localStorage.removeItem(agencyKey);
    localStorage.removeItem(cat_roles);
    localStorage.removeItem(jobKey);
    localStorage.removeItem(permissionsKey);
    localStorage.removeItem(tagCodesSystem.permisos_sistema);
    await axios.post('/logout', {});
    callback();
}

export function interceptorResponse(error) {
    if (error.response.status === 600) {
        errorNotification('Tu sesión ha expirado');
        setTimeout(() => {
            logout(() => {
                window.location.reload();
            });
        }, 1000);
    }
}

export const encriptItem = (item = "") => {
    let chain = AES.encrypt(item + '', import.meta.env.VITE_APP_CLAVE_ENCRIPT).toString();
    chain = chain.replace(/\//g, 'MICOOPE');
    return chain;
}

export const decryptItem = (item = "") => {
    try {
        var bytes = AES.decrypt(item.replace(/MICOOPE/g, '/'), import.meta.env.VITE_APP_CLAVE_ENCRIPT);
        var original = parseInt(bytes.toString(enc.Utf8));
        if (isNaN(original)) {
            return undefined
        } else {
            return original
        }
    } catch (error) {
        return undefined
    }
}

export const permissionValidation = (item) => {
    let permisos = JSON.parse(localStorage.getItem(permissionsKey));
    let countPermissions = 0;

    for (let i = 0; i < permisos.length; i++) {
        if (permisos[i] === item) {
            countPermissions++;
            break;
        }
    }

    if (countPermissions > 0) {
        return true;
    } else {
        return false
    }
}

export const convertFormatArrayUser = (array, flag = '') => {
    let arrayAux = [];

    for (let i = 0; i < array.length; i++) {
        let nombre = `${array[i].nombre.split(' ')[0]} ${array[i].apellido.split(' ')[0]} (${array[i].usuario})`;
        let nombre2 = `${array[i].nombre.split(' ')[0]} ${array[i].apellido.split(' ')[0]} (${array[i].puesto.puesto})`;

        if (flag === 'PUESTO') {
            arrayAux.push({
                idUsuario: array[i].idUsuario,
                nombre: nombre2,
            });
        } else {
            arrayAux.push({
                idUsuario: array[i].idUsuario,
                nombre,
            });
        }
    }

    return arrayAux;
}