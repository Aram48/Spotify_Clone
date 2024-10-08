import { useState } from 'react';
import { assets } from '../admin-assets/assets';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';


export const AddAlbum = () => {

    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#121212');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('bgColor', color);

            const response = await axios.post(`${url}/api/album/add`, formData);

            if (response.data.success) {
                toast.success('Album added successfully');
                setName('');
                setDesc('');
                setImage(false);
                setColor('#121212');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : <>
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-8 text-gray-600">
            <div className="flex flex-col gap-4">
                <p>Upload Image</p>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    hidden
                    onChange={e => setImage(e.target.files[0])}
                />
                <label htmlFor="image">
                    <img
                        src={image ? URL.createObjectURL(image) : assets.upload_area}
                        className='w-24 cursor-pointer'
                    />
                </label>
            </div>

            <div className='flex flex-col gap-2.5 '>
                <p>Album Name</p>
                <input
                    type="text"
                    placeholder='Type Here'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[40vw] sm:w-[250px]'
                />
            </div>

            <div className='flex flex-col gap-2.5 '>
                <p>Album Description</p>
                <input
                    type="text"
                    placeholder='Type Here'
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[40vw] sm:w-[250px]'
                />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Background Color</p>
                <input
                    type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                />
            </div>
            <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>Add</button>

        </form>
    </>
}