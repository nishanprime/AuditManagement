import {
  CLIENT_DEL_FAIL,
  CLIENT_DEL_REQ,
  CLIENT_DEL_SUCCESS,
  CLIENT_DETAILS_FAIL,
  CLIENT_DETAILS_REQUEST,
  CLIENT_DETAILS_SUCCESS,
  CLIENT_UPDATE_PROFILE_FAIL,
  CLIENT_UPDATE_PROFILE_REQUEST,
  CLIENT_UPDATE_PROFILE_SUCCESS,
  CLIENT_SINGLE_DETAILS_REQ,
  CLIENT_SINGLE_DETAILS_SUCCESS,
  CLIENT_SINGLE_DETAILS_FAIL,
  CLIENT_CREATE_FAIL,
  CLIENT_CREATE_REQ,
  CLIENT_CREATE_SUCCESS,
  CLIENT_CREATE_RESET,
  CLIENT_LOGIN_REQUEST,
  CLIENT_LOGIN_SUCCESS,
  CLIENT_LOGIN_FAIL,
  CLIENT_LOGOUT,
  CLIENT_SEND_MESSAGE_REQUEST,
  CLIENT_SEND_MESSAGE_SUCCESS,
  CLIENT_SEND_MESSAGE_FAIL,
} from "../constants/clientConstants";
import axios from "axios";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

export const clientLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENT_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/clients/login",
      { email, password },
      config
    );
    dispatch({
      type: CLIENT_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("clientInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CLIENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clientLogoutAction = () => (dispatch) => {
  localStorage.removeItem("clientInfo");
  dispatch({
    type: CLIENT_LOGOUT,
  });

  // dispatch({
  //   type: USER_LIST_RESET,
  // });
};

export const getClientDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/clients`, config);
    dispatch({
      type: CLIENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getASingleClientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_SINGLE_DETAILS_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/clients/${id}`, config);
    dispatch({
      type: CLIENT_SINGLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_SINGLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_DEL_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/clients/${id}`, config);
    dispatch({
      type: CLIENT_DEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_DEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateClientProfile = (client) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_UPDATE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/clients/${client._id}`,
      client,
      config
    );
    dispatch({
      type: CLIENT_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch(getASingleClientDetails(client._id));
  } catch (error) {
    dispatch({
      type: CLIENT_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createClientAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_CREATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/clients`, {}, config);
    dispatch({
      type: CLIENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendMessageAction =
  ({ messageToSend }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CLIENT_SEND_MESSAGE_REQUEST,
      });
      const {
        clientLogin: { clientInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `BearerClient ${clientInfo.token}`,
        },
      };

      await axios.put(
        `/api/clients/${clientInfo._id}/message`,
        { messageToSend },
        config
      );
      dispatch({
        type: CLIENT_SEND_MESSAGE_SUCCESS,
        payload: messageToSend,
      });
    } catch (error) {
      dispatch({
        type: CLIENT_SEND_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
