import axios from "axios";

const offenceApi = axios.create({
    baseURL: `https://api.usa.gov/crime/fbi/cde/arrest/state/AK`,
});

export const getOffences = async () => {
    const response = await offenceApi.get(`/all`,{ params: { from: 2015, to: 2020, API_KEY: "iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv" } });
    return response.data.data;
};