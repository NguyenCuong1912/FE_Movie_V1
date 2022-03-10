import { baseServices } from "./baseServices";

export class QuanLySeatsServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    themSeats = (dataCreate) => {
        return this.post(`/seats`, dataCreate)
    }
    layDanhSachGheTheoLichCHieu = (idShowTime) => {
        return this.get(`seats?id=${idShowTime}`)
    }

}
export const quanLySeatsServices = new QuanLySeatsServices();
