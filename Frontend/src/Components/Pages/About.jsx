import React from "react";
import {Link} from 'react-router-dom'
import aboutImg1 from '../../assets/about--card-1.jpg';
import aboutImg2 from '../../assets/about--card-2.jpg';
import aboutImg3 from '../../assets/about--card-3.jpg';
import bgImage1 from '../../assets/blog-1.jpg';

import member1 from '../../assets/team-1.jpg'
import member2 from '../../assets/team-2.jpg'
import member3 from '../../assets/team-3.jpg'
import member4 from '../../assets/team-4.jpg'
import member5 from '../../assets/team-5.jpg'
function About(){
    return (
        <>
        <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
            <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                <Link to='/'className="hover:underline text-gray-700 font-medium">
                Home
                </Link>
                <span className="text-gray-500">&nbsp; / &nbsp;</span>
                <span className="text-yellow-700 font-semibold">About</span>
            </div>
        </div>
        <div className="relative flex items-center justify-center h-[60vh] sm:h-[70vh] bg-cover bg-center" style={{backgroundImage:`url(${bgImage1})`}}>
         <div className="absolute inset-0 bg-black/80 backdrop-filter backdrop-blur-sm"></div>
         <div className="relative z-10 text-center text-white px-[8%] lg:px-[12%]">
           <p className="uppercase tracking-widest text-xs sm:text-sm text-gray-300 mb-2">Who we Are</p>
           <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 font-bricolage">About Us</h2>
           <div className="w-32 h-[2px] bg-yellow-599 mx-auto mb-4"></div>
           <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            We are passionate about delivering creative digital experiences and building products with lasting value and beauty.
           </p>
         </div>
        </div>
        <div className="section-title px-[8%] lg:px-[12%] my-10">
        <span className="text-xl font-semibold bg-yellow-300 px-5 py-2 rounded-full">Vision </span>
        <h1 className="text-5xl font-bold font-bricolage mt-5">Our Vision</h1>
        </div>
        <div className="px-[8%] lg:px-[12%] mt-16 mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    {
                    img:aboutImg1,
                    title:'What we really do?',
                    text:'We create meaningful digital experiences that empower people,brands, and businesses to grow with confidence.'
                },
                {
                    img:aboutImg2,
                    title:'Our Vision',
                    text:'We strive to innovate and inspire through refined digital solutions- shaping a smarter, more connected world for tomorrow'
                },
                {
                    img:aboutImg3,
                    title:'History of beginning',
                    text:'We create meaningful digital experiences that empower people,brands, and businesses to grow with confidence.'
                }                
                ].map((card,index)=>(
                    <div key={index} className="group relative bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300 p-5 text-left hover:bg-white">
                     <div className="overflow-hidden rounded-xl">
                        <img src={card.img} alt={card.title}
                        className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                     </div>
                     <h3 className="mt-8 text-lg font-semibold text-yellow-500 font-bricolage">{card.title}
                     </h3>
                     <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {card.text}
                     </p>
                     <div className="mt-4 w-0 group-hover:w-full h-[2px] bg-yellow-500 transition-all duration-300">
                     </div>
                    </div>
                ) )
                }
            </div>
        </div>
        <div className="bg-gray-50 py-32 px-[8%] lg:px-[12%]">
            <div className="flex flex-wrap justify-center gap-10 items-start text-center">
               {[
                  {
                    img:member1,name:'Debasish Jena',role:'CEO/Founder'
                  },

                  {
                    img:member2,name:'Roja Roy',role:'Client Care'
                  },

                  {
                    img:member3,name:'Michel Disuza',role:'Support Boss'
                  },

                  {
                    img:member4,name:'Pamela Doe',role:'Delivery Driver'
                  },
                  {
                    img:member5,name:'Puja Singh',role:'Packing Girl'
                  }
               ].map((member,id)=>(
                <div key={id} className="flex flex-col items-center">
                    <div  className="w-60 h-60 rounded-full border border-gray-300 shadow-md overflow-hidden">
                        <img src={member.img}
                         alt={member.name} className="w-full object-cover transition-transform duration-300 hover:scale-110"
                         />
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-yellow-500 font-bricolage">{member.name}
                    </h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                </div>
               ))
               }
            </div>
        </div>
        <div className="bg-white py-20 px-[8%] lg:px-[12%]">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
             <div className="w-full lg:w-1/2">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-yellow-500 rounded-sm"></div>
                 <h2 className="text-yellow-500 uppercase tracking-[0.2em] text-sm font-semibold">Our Performance</h2>
               </div>
               <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6 font-bricolage">We Belive In Quality Products</h1>
               <p className="text-gray-600 text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat necessitatibus dolorem corrupti optio debitis exercitationem quas eius culpa recusandae ipsa ab minima esse nobis ex tenetur, ipsum eveniet provident non animi corporis? Laboriosam perferendis id, provident laborum et alias praesentium recusandae nam eligendi sequi velit mollitia? Voluptas cupiditate id laborum!

               </p>
             </div>
             <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={aboutImg1} alt="about perdormance"className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"/>
              </div>
             </div>
           </div>
        </div>
        </>
    )
}
export default About;