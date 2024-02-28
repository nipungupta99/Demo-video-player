import React from 'react';
import DroneLogo from '../dronebeeLogo-white.jpeg'

const Footer = () => {
return (
    <div className="bg-black text-white flex flex-row gap-2 justify-between  p-10 mt-10" >
        <div className="flex flex-col py-5 mt-5" >
            <p className="mb-2">Created By:</p>
            <p className="font-bold text-[24px]">DRONE BEE TECHNOLOGIES PVT. LTD.</p>
            <div><a href="mailto:7017958799">7017958799</a>/<a href="mailto:8459322489">8459322489</a></div>
            <a href="mailto:dronebeeltd@gmail.com">dronebeeltd@gmail.com</a>
        </div>
        <div>
            <img src={DroneLogo} width="200px" className="rounded-2xl" />
        </div>

    </div>
)
}
export default Footer