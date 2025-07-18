import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MyCard from '../components/MyCard';

    export default function Home() {
    
    //KHAI BÁO BIẾN LƯU THÔNG TIN 
    const [data, setData] = useState([]);

    //GỌI API ĐỂ LẤY THÔNG TIN
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL)
                setData(response.data)
            } catch (error) {
                console.error('lỗi', error);
            }
        }
        fetchData();
    }, []);

return (
    <div className='row'>  
        {data.map((item) => item.available === true && <MyCard key={item.id} item={item} />)}
    </div>
)
}
