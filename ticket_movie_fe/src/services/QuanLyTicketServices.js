import { baseServices } from "./baseServices";

export class QuanLyTicketServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    datVe = (dataCreate) => {
        return this.post(`/tickets`, dataCreate)
    }
    danhSachVeTheoUser = (idUser) => {
        return this.get(`/tickets/listTicket/${idUser}`)
    }


}
export const quanLyTicketServices = new QuanLyTicketServices();
