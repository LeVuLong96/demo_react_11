import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeatures.propTypes = {};

function AlbumFeatures(props) {
    const albumList = [
        {
            id: 1,
            name: 'Nhạc thịnh hành',
            thumbnaiUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/1/0/7/810726a65e6a652401f92529c6cbfdd6.jpg' 
        },
        {
            id: 2,
            name: 'Rap Việt',
            thumbnaiUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/f/a/2/dfa2f4c19921c2b8a5b442bf2dfee593.jpg' 
        },
        {
            id: 3,
            name: 'Nhạc Việt',
            thumbnaiUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/2/6/5/3/26531d3aff94294eed073325c2e30a5e.jpg' 
        },
        {
            id: 4,
            name: 'Nhạc Hoa',
            thumbnaiUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/6/8/68d5535b971d558f594f10a5affd0a71_1307683159.jpg' 
        },
    ]

    return (
        <div>
            <AlbumList albumList={albumList}/>
        </div>
    );
}

export default AlbumFeatures;