import { useState, useEffect } from 'react';
import { assets } from '../admin-assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';

export const AddSong = () => {
    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [album, setAlbum] = useState('none');
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('audio', song);
            formData.append('album', album);

            const response = await axios.post(`${url}/api/song/add`, formData);

            if (response.data.success) {
                toast.success('Song added successfully');
                setName('');
                setDesc('');
                setAlbum('none');
                setImage(false);
                setSong(false);
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            toast.error('An error occurred while adding the song');
        }

        setLoading(false);
    };

    const loadAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);

            if (response.data.success) {
                setAlbumData(response.data.album);

            } else {
                toast.error('Unable to load albums data');
            }

        } catch (error) {
            toast.error('Error Occur');
        }
    }

    useEffect(() => {
        loadAlbumData();
    }, []);

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-8 text-gray-600">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input
                        type="file"
                        id="song"
                        accept="audio/*"
                        hidden
                        onChange={(e) => setSong(e.target.files[0])}
                    />
                    <label htmlFor="song">
                        <img className="w-24 cursor-pointer" src={song ? assets.upload_added : assets.upload_song} alt="upload_song" />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="image">
                        <img className="w-24 cursor-pointer" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload_image" />
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <p>Song name</p>
                <input
                    type="text"
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[40vw] sm:w-[250px]"
                    placeholder="Type Here"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p>Song description</p>
                <input
                    type="text"
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[40vw] sm:w-[250px]"
                    placeholder="Type Here"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select defaultValue={album} onChange={(e) => setAlbum(e.target.value)} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]">
                    <option disabled value="none">None</option>
                    {
                        albumData.map((item) => (
                            <option key={item._id} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">
                Add
            </button>
        </form>
    );
};