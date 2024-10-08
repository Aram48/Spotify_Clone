import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../admin-assets/assets';


export const SideBar = () => {


    return <>
        <div className="bg-[#003A10] min-h-screen pl-[4vw]">
            <img className='mt-5 w-[10vw] sm:w-[100px] hidden sm:block ' src={assets.logo} alt="logo" />
            <img className='mt-5 w-[5vw] sm:w-[40px] mr-5 sm:hidden block' src={assets.logo_small} alt="logo_small" />

            <div className='flex flex-col gap-5 mt-10'>

                <NavLink to='/add-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
                    <img className='w-5' src={assets.add_song} alt="add_song" />
                    <p className='hidden sm:block'>Add Song</p>
                </NavLink>

                <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
                    <img className='w-5' src={assets.song_icon} alt="song_icon" />
                    <p className='hidden sm:block'>List Song</p>
                </NavLink>

                <NavLink to='add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
                    <img className='w-5' src={assets.add_album} alt="add_album" />
                    <p className='hidden sm:block'>Add Album</p>
                </NavLink>

                <NavLink to='list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
                    <img className='w-5' src={assets.album_icon} alt="album_icon" />
                    <p className='hidden sm:block'>List Album</p>
                </NavLink>

            </div>
        </div>

    </>
}