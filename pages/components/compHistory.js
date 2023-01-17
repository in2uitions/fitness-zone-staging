import parse from "html-react-parser";
import Popup from "reactjs-popup"

export default function CompHistory({data = {}}) {
    return (
        <>
            <div className="container mx-auto my-20 flex flex-col lg:px-24 md:px-24 px-10">
                <div className="flex flex-col justify-center items-center text-center mb-10 mt-20">
                    <p className="font-bold futura-bold text-4xl">{data?.title}</p>

                </div>
                {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)} </p> : null}
                {data.show_moredescription ? <Popup
                    trigger={
                        <button>
                            <p className="bg-transparent text-md text-[#009FE3] futura-book mt-2 outline-none flex justify-start items-start">Read more ...</p>
                        </button>
                    } modal
                    position="center"
                    closeOnDocumentClick={false}
                >
                    {close => (
                        <div className="container w-screen flex flex-col justify-center relative py-12 lg:px-20 md:px-20 px-0">
                            <button className="flex w-full justify-end right-12 text-white lg:pr-0 md:pr-0 pr-3" onClick={close}>
                                <img src="/close-X.svg" />
                            </button>
                            {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.description}`)} </p> : null}
                            {data.show_moredescription ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.show_moredescription}`)} </p> : null}

                        </div>
                    )}
                </Popup> : null}

            </div>
        </>
    )
}