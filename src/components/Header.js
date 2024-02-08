import React from 'react';

const Header = () => {
    const login = localStorage.getItem('isLogin')
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
       <div className="p-4 bg-black text-white shadow grid grid-cols-1 sm:flex justify-between items-center gap-4" >
            <div className="flex flex-col justify-start" >
               <h1 className=" text-[26px] sm:text-[32px] font-bold" >NFR BG Rail Line Project</h1>
                <h2 className="text-[14px]">
                    Bairabi to Sairang(Mizoram) UAV Monitoring work Progress report
                </h2>
            </div>
            <div>
                {login === 'true' &&
                    <button onClick={() => handleLogout()} className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2">
                        Logout
                    </button>}
            </div>
       </div>
    )
}
export default Header