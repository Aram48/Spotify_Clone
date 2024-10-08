import { useEffect, useState } from "react"
import { url } from '../App';
import axios from "axios";
import { toast } from "react-toastify";

export const ListSong = () => {

    const [data, setData] = useState([]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);

            if (response.data.success) {
                setData(response.data.songs);
            }

        } catch (error) {
            toast.error('Error Occur')
        }
    }

    const removeSong = async (id) => {
        try {
            const response = await axios.post(`${url}/api/song/remove`, { id });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchSongs();
            }
        } catch (error) {
            toast.error('Error Occur')
        }
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    return <>
        <div>
            <p>All Songs List</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {
                    data.map((item, i) => {
                        return (
                            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5" key={item._id}>
                                <img className="w-12" src={item.image} />
                                <p>{item.name}</p>
                                <p>{item.album}</p>
                                <p>{item.duration}</p>
                                <p
                                    onClick={() => removeSong(item._id)}
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