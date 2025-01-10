import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css'
const Featured = () => {
    return (
        <div className=' bg-fixed featured-item text-white pt-8 my-20'>
            <SectionTitle 
            subHeading="check it out"
            heading="Featured Item"
            
            
            >

            </SectionTitle>
            <div className=' bg-slate-500 opacity-65 md: flex justify-center items-center pb-20 pt-12 px-36 '>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md: ml-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem distinctio recusandae accusamus aliquid, quidem repellendus animi corrupti nihil, dignissimos eos magnam mollitia, maiores velit quia repudiandae odio! Veniam tenetur repudiandae corrupti voluptatem nesciunt alias excepturi accusantium illum eligendi, ut cumque.</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-2'>Order Now</button>
                </div>

            </div>
        </div>
    );
};

export default Featured;