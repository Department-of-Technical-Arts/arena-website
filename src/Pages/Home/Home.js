import React from 'react';
import { ScrollContainer, ScrollPage, Animator, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from 'react-scroll-motion';
import './Home.css'
import video from './BG.mp4'
import bg1 from './bg-1.jpg'
const Home = () => {
    return (<>
        <section className="top" id='top'>
            
            <ScrollContainer>
                <ScrollPage>
                    <Animator animation={batch(Fade(), Sticky())}>
                        <div className='first-page'>
                            <video className='video-bg' autoPlay loop muted><source src={video} type='video/mp4' /></video>
                            <div className='title'><b>ARENA 2023</b></div>
                            <div className='sub-heading'>Where Legends Are Born</div>

                            <div className='scroll-div'>Scroll Down</div>
                        </div>
                    </Animator>
                    
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Fade(), Sticky(), MoveOut())}>
                        <div className='second-page'>
                            <img className='bg-image-1' src={bg1}/>
                            <div className='title sec'><b>ARENA 2023</b></div>
                            <div className='sub-heading sec'>Where Legends Are Born</div>
                        </div>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        </section></>
    );
}

export default Home;