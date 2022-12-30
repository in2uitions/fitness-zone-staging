export default function TrainerDetails() {
    return (
        <>
            <div className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-10 container mx-auto lg:px-20 md:px-20 px-3 mt-40">
                <div className="col-span-4">
                    <div className="membership-box p-3 flex flex-col justify-center items-center mt-8">
                        <p className="text-white text-2xl futura-bold">Basic Package</p>
                        <p className="rounded-md flex space-x-2 mt-2 cursor-pointer text-white p-3 active-button futura-book">Natasha Hamod</p>
                        <div className="flex flex-col mt-4">
                        <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                            $ 1200
                        </span>
                        </p>
                        <p className='text-[#009FE3] -mt-4 tracking text-xs'>per session</p>
                    </div>
                    </div>
                    </div>
                   <div className="col-span-4">
                    <p className="text-[#009FE3] futura-bold">Package Details</p>
                    <p className="text-white">The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>
                     </p>
                   </div>
                   <div className="col-span-4">
                    <button className="bg-[#009FE3] p-2 text-white futura-bold mt-8 rounded-md">BOOK PACKAGE</button>
                   </div>
                
            </div>
        </>
    )
}