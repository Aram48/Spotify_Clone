import { Navbar } from "./NavBar"
import { AlbumItem } from "./AlbumItem";
import { SongItem } from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const DisplayHome = () => {

    const { songsData, albumsData } = useContext(PlayerContext);

    return <>
        <Navbar />
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
                {
                    albumsData.map((item) => (
                        <AlbumItem
                            key={item._id}
                            name={item.name}
                            desc={item.desc}
                            id={item._id}
                            image={item.image}
                        />
                    ))
                }
            </div>
        </div>

        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto">
                {
                    songsData.map((item) => (
                        <SongItem
                            key={item._id}
                            name={item.name}
                            desc={item.desc}
                            image={item.image}
                            id={item._id}
                        />
                    ))
                }
            </div>
        </div>
    </>
}