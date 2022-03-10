import React, { useState, memo } from 'react'
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import _ from 'lodash'
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { quanLyRapChieuServices } from '../../../services/QuanLyRapChieuServices';
import { quanLyPhimServices } from '../../../services/QuanLyPhimServices';
const { TabPane } = Tabs;
function HomeMenu(props) {
    const { heThongRap } = props
    const dispatch = useDispatch();
    const [state, setState] = useState({
        tabPosition: 'left', listRap: [], listPhim: []
    })
    const handleChangeGroup = async (id) => {
        try {
            const result = await quanLyRapChieuServices.layRapChieuTheoMaCumRap(id);
            if (result.status === 200) {
                await setState({
                    ...state, listRap: result.data, listPhim: []
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangeCinema = async (idCinema) => {
        try {
            const resultPhim = await quanLyPhimServices.layPhimTheoMaRap(idCinema);
            if (resultPhim.status === 200) {
                await setState({
                    ...state, listPhim: resultPhim.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Tabs className='border rounded mx-2' tabPosition={state.tabPosition}>
                {heThongRap.map((item, index) => {
                    return <TabPane tab={
                        <div onClick={() => { handleChangeGroup(item.id) }}>
                            <img className='w-10 rounded-full' src={`${DOMAIN_STATIC_FILE}${item.logo}`} alt={`${DOMAIN_STATIC_FILE}${item.logo}`} />
                        </div>}
                        key={index}>
                        {
                            <Tabs tabPosition={state.tabPosition} >
                                {state.listRap?.map((rap, index) => {
                                    return <TabPane key={index} tab={
                                        <div className='flex w-25 pb-2 border-b' onClick={() => { handleChangeCinema(rap.id) }} >
                                            <div className='h-16 w-16'>
                                                <img className='w-full h-full' src={`${DOMAIN_STATIC_FILE}${rap.logo}`} alt={`${DOMAIN_STATIC_FILE}${rap.logo}`} />
                                            </div>
                                            <div className='flex flex-col items-start flex-wrap ml-2'>
                                                <p className='text-base m-0 text-green-500'>{_.truncate(rap.name, { length: 25, separator: '.' })}</p>
                                                <p className='text-sm m-0 text-gray-400'>{_.truncate(rap.address, { length: 25, separator: '.' })}</p>
                                                <p className='text-red-400 m-0 text-xs'>[Chi tiết]</p>
                                            </div>
                                        </div>
                                    }>
                                        {state.listPhim?.map((phim, index) => {
                                            return <div key={index} className=' pb-2 mb-2 border-b'>
                                                <div className='flex ml-2' >
                                                    <img onClick={() => { history.push(`/DetailsFilm/${phim.idFilm}`) }} className='w-20 h-20 cursor-pointer' src={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`} alt={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`} />
                                                    <div className='ml-2'>
                                                        <p className='text-lg font-medium text-black'>{phim.nameFilm}</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-wrap mt-2' >
                                                    {phim.lstShowDate?.map((time, index) => {
                                                        return <button className='rounded m-2 py-0.5 px-4 border' key={index}>
                                                            <NavLink to={`${`/checkout/${time.id}`}`}>
                                                                {moment(time.showDate).format('hh:mm A')}
                                                            </NavLink>
                                                            <p className='m-0 text-xs'>{moment(time.showDate).format('DD/MM/YYYY')}</p>
                                                        </button>
                                                    })}
                                                </div>
                                            </div>
                                        })}

                                    </TabPane>
                                })}
                            </Tabs>
                        }
                    </TabPane>
                })}


            </Tabs>
        </>
    )
}
export default memo(HomeMenu)