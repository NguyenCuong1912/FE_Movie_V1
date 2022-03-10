import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MultipleRow from '../../../components/ReactSlick/MultipleRow'
import { layDanhSachCumRapAction } from '../../../redux/Actions/QuanLyCumRapAction';
import { layDanhSachPhimAction } from '../../../redux/Actions/QuanLyPhimAction';
import CarouselClient from '../../../templates/ClientTemplate/Template/Carousel/CarouselClient'
import HomeMenu from './HomeMenu';

export default function HomeClient(props) {
    const { lstPhim } = useSelector(state => state.QuanLyPhimReducer)
    const { lstGroupCinemas } = useSelector(state => state.QuanLyCumRapReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layDanhSachCumRapAction())
    }, [])
    return (
        <div>
            <CarouselClient />
            <div className='px-14' >
                <MultipleRow arrPhim={lstPhim} />
                <HomeMenu heThongRap={lstGroupCinemas} />
            </div>
        </div>
    )
}
