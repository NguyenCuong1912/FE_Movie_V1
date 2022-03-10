import { LICH_CHIEU_EDIT, SET_LICH_CHIEU } from './../Types/QuanLyLichChieuType';
import { ShowTime } from '../../_core/Models/ShowTimeModel'
const initialState = {
    lstShowTime: [],
    showTimeEdit: new ShowTime()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_LICH_CHIEU: {
            state.lstShowTime = action.lstShowTime
            return { ...state }
        }
        case LICH_CHIEU_EDIT: {
            state.showTimeEdit = action.showTimeEdit
            return { ...state }
        }

        default:
            return state
    }
}
