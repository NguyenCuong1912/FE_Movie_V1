import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../../components/CircleRating/CircleRating.css'
import { useSelector, useDispatch } from 'react-redux';
// import { layChiTietThongTinPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import { Rate, Button, Tabs } from 'antd';
import _, { result } from 'lodash';
import { NavLink } from 'react-router-dom';
import { layChiTietPhimAction } from './../../../redux/Actions/QuanLyPhimAction';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { quanLyPhimServices } from '../../../services/QuanLyPhimServices';
import { quanLyRapChieuServices } from '../../../services/QuanLyRapChieuServices';
import { layDanhSachCumRapAction } from '../../../redux/Actions/QuanLyCumRapAction';
import { quanLyLichChieuServices } from '../../../services/QuanLyLichChieuServices';
export default function DetailsFilm(props) {
    const dispatch = useDispatch();
    const { phimEdit } = useSelector(state => state.QuanLyPhimReducer);
    const { lstGroupCinemas } = useSelector(state => state.QuanLyCumRapReducer);
    const id = props.match.params.id;

    const [state, setState] = useState({
        listRap: [], listPhim: []
    })
    console.log(state.listPhim)
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
            const resultPhim = await quanLyLichChieuServices.lichChieuTheoMaPhimAndMaRap(props.match.params.id, idCinema);
            if (resultPhim.status === 200) {
                await setState({
                    ...state, listPhim: resultPhim.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        dispatch(layChiTietPhimAction(id));
        dispatch(layDanhSachCumRapAction())

    }, [])
    const { TabPane } = Tabs;
    return (
        <div className='bg-cover bg-center' style={{ backgroundImage: `url(${DOMAIN_STATIC_FILE}${phimEdit.imgFilm})`, }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0}
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-3'>
                            <img style={{ width: '100%', height: 250 }} src={`${DOMAIN_STATIC_FILE}${phimEdit.imgFilm}`} alt={`${phimEdit.imgFilm}`} />
                            <div className='flex flex-col  justify-center ml-5 col-span-2'>
                                <p className='text-2xl font-bold'>{phimEdit.nameFilm}</p>
                                <p>{phimEdit.description}</p>
                                <p>{moment(phimEdit.showtime).format('DD-MM-YYYY hh:mm')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid col-start-10 col-span-4 '>
                        <div className={`c100 p${phimEdit?.rate * 10} big`} >
                            <span>{phimEdit?.rate}</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                            <div className='w-full text-center'>
                                <Rate allowHalf value={phimEdit?.rate / 2} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='bg-white  rounded py-10  mt-20'>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Lịch chiếu" key="1">
                                <Tabs tabPosition='left'>
                                    {lstGroupCinemas?.map((rapChieu, index) => {
                                        return <TabPane className='my-3' key={index} tab={
                                            <div onClick={() => { handleChangeGroup(rapChieu.id) }}>
                                                <img style={{ width: 50, height: 50 }} src={`${DOMAIN_STATIC_FILE}${rapChieu.logo}`} alt={rapChieu.logo} />
                                            </div>
                                        }
                                        >
                                            <Tabs tabPosition='left'>
                                                {state.listRap?.map((rap, index) => {
                                                    return <TabPane key={index} tab={
                                                        <div onClick={() => { handleChangeCinema(rap.id) }} style={{ width: 300 }} className='flex flex-wrap'>
                                                            <img style={{ width: 60, height: 60 }} src={`${DOMAIN_STATIC_FILE}${rap.logo}`} alt={`${rap.logo}`} />
                                                            <div className='text-black text-left ml-3'>
                                                                <p>{_.truncate(rap.name, {
                                                                    length: 30,
                                                                    separator: '.'
                                                                })}</p>
                                                                <p>{_.truncate(rap.address, {
                                                                    length: 30,
                                                                    separator: '.'
                                                                })}</p>
                                                            </div>
                                                        </div>
                                                    }>
                                                        {state.listPhim?.map((lichChieu, index) => {
                                                            return <Button className='mx-3 border rounded px-3 py-2' key={index}>
                                                                <NavLink to={`/checkout/${lichChieu.id}`}>
                                                                    {moment(lichChieu.showDate).format("hh:mm A")}
                                                                </NavLink>
                                                            </Button>
                                                        })
                                                        }
                                                    </TabPane>
                                                })}
                                            </Tabs>
                                        </TabPane>
                                    })}

                                </Tabs>
                            </TabPane>
                            <TabPane tab="Chi tiết" key="2">
                                Chi tiết
                            </TabPane>
                            <TabPane tab="Liên hệ" key="3">
                                Liên hệ
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            </CustomCard>
        </div>
    )
}
