import { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

export const Player = () => {

    const {
        seekBg,
        seekBar,
        track,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        shuffle,
        playAgain,
        seekSong
    } = useContext(PlayerContext);

    return track ? <>
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img className='w-12 cursor-pointer' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc ? track.desc.slice(0, 12) : ''}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img onClick={shuffle} className='w-4 cursor-pointer' src={assets.shuffle_icon} />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} />
                    {
                        playStatus
                            ? < img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} />
                            : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} />
                    <img onClick={playAgain} className='w-4 cursor-pointer' src={assets.loop_icon} />
                </div>

                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-gray-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img src={assets.plays_icon} className='w-4 cursor-pointer' />
                <img src={assets.mic_icon} className='w-4 cursor-pointer' />
                <img src={assets.queue_icon} className='w-4 cursor-pointer' />
                <img src={assets.speaker_icon} className='w-4 cursor-pointer' />
                <img src={assets.volume_icon} className='w-4 cursor-pointer' />
                <div className='w-20 bg-slate-50 h-1 rounded cursor-pointer'>
                </div>
                <img src={assets.mini_player_icon} className='w-4 cursor-pointer' />
                <img src={assets.zoom_icon} className='w-4 cursor-pointer' />
            </div>
        </div>
    </> : null
}