import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { url } from "../App";


export const ListAlbum = () => {

    const [data, setData] = useState([]);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);

            if (response.data.success) {
                setData(response.data.album);
            }

        } catch (error) {
            toast.error('Error Occur')
        }
    }

    const deleteAlbum = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id });

            if (response.data.success) {
                toast.success('Album successfuly deleted');
                await fetchAlbums();
            }
        } catch (error) {
            toast.error('Error Occur');
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, []);

    return <>
        <div>
            <p>All Albums List</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Color</b>
                    <b>Action</b>
                </div>
                {
                    data.map((item, i) => {
                        return (
                            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5" key={item._id}>
                                <img className="w-12" src={item.image} />
                                <p>{item.name}</p>
                                <p>{item.desc}</p>
                                <input type="color" value={item.bgColor} />
                                <p
                                    onClick={() => deleteAlbum(item._id)}
                                    className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white text-center font-semibold py-1 px-4 rounded-md hover:from-red-600 hover:to-red-700 shadow-lg transition-transform transform hover:scale-105"
                                >
                                    Delete
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
}