import { Dispatch, AnyAction } from 'redux';
import { MyThunkAction } from '../../../interfaces/ReduxState';

// Constantes para las acciones de almacenamiento
export const POST_STORAGE = 'POST_STORAGE';
export const GET_STORAGE = 'GET_STORAGE';
export const UPDATE_STORAGE = 'UPDATE_STORAGE';
export const DELETE_STORAGE = 'DELETE_STORAGE';

// Funciones de acción para Storage
export function postStorage(data: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    // Código para realizar una acción POST en Storage
    try {
      // Lógica para enviar la solicitud y actualizar el estado si es necesario
      dispatch({
        type: POST_STORAGE,
        payload: data, // Puedes modificar esto según tus necesidades
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getStorage(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    // Código para realizar una acción GET en Storage
    try {
      // Lógica para enviar la solicitud y actualizar el estado si es necesario
      dispatch({
        type: GET_STORAGE,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateStorage(data: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    // Código para realizar una acción de actualización en Storage
    try {
      // Lógica para enviar la solicitud y actualizar el estado si es necesario
      dispatch({
        type: UPDATE_STORAGE,
        payload: data, // Puedes modificar esto según tus necesidades
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteStorage(id: number): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    // Código para realizar una acción de eliminación en Storage
    try {
      // Lógica para enviar la solicitud y actualizar el estado si es necesario
      dispatch({
        type: DELETE_STORAGE,
        payload: id, // Puedes modificar esto según tus necesidades
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
