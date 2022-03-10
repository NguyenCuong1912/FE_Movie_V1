import { quanLyLichChieuServices } from "../../services/QuanLyLichChieuServices"
import { LICH_CHIEU_EDIT, SET_LICH_CHIEU } from "../Types/QuanLyLichChieuType";
import { message } from 'antd';
import { history } from "../../App";
import { themSeatsAction } from "./QuanLySeatsAction";

export const layDanhSachLichChieuAction = (name = '') => {
    return async dispatch => {
        try {
            const result = await quanLyLichChieuServices.layDanhSachLichChieu(name);
            if (result.status === 200) {
                dispatch({
                    type: SET_LICH_CHIEU,
                    lstShowTime: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const chiTietLichChieuAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyLichChieuServices.chiTietLichChieu(id);
            if (result.status === 200) {
                dispatch({
                    type: LICH_CHIEU_EDIT,
                    showTimeEdit: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}
export const xoaLichChieuAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyLichChieuServices.xoaLichChieu(id);
            if (result.status === 200) {
                message.success("Xóa thành công");
                dispatch(layDanhSachLichChieuAction());
            } else {
                message.error("Xóa thất bại");
            }
        } catch (error) {
            message.error("Thất bại");
            console.log(error)
        }
    }
}
export const themLichChieuAction = (dataCreate) => {
    return async dispatch => {
        try {

            const result = await quanLyLichChieuServices.themLichChieu(dataCreate);
            if (result.status === 201) {
                const dataSeats = {
                    price: dataCreate.price,
                    idRoom: dataCreate.idRoom,
                    idShowTime: result.data.data.id
                }
                dispatch(themSeatsAction(dataSeats));
                message.success("Thêm thành công");
                history.push(`/Admin/ShowTimes`);
            }
        } catch (error) {
            message.error("Thất bại");
            console.log(error);
        }
    }
}
export const capNhatLichChieuAction = (id, dataEdit) => {
    return async dispatch => {
        try {
            const result = await quanLyLichChieuServices.capNhatLichChieu(id, dataEdit);
            if (result.status === 200) {
                message.success("Cập nhật thành công");
                history.push(`/Admin/ShowTimes`)
            }
        } catch (error) {
            console.log(error)
        }
    }
}