import React from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { FaArrowLeft, FaPlus, FaArrowDown, FaPaperPlane } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const dateTimeOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    minute: "2-digit",
    hour: "2-digit",
};

function Detail({ ticket, auth }) {
    const created_at = new Date(ticket.created_at).toLocaleDateString(
        "it-IT",
        dateTimeOptions
    );

    let dt = new Date(ticket.created_at);
    let dtScadenza = new Date(
        dt.setMinutes(dt.getMinutes() + ticket.time)
    ).toLocaleDateString("it-IT", dateTimeOptions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket #{ticket.id}
                </h2>
            }
        >
            <div className="container mx-auto flex flex-col lg:flex-row gap-4 p-4 lg:p-8">
                <section className="flex-[1_1_0%] flex flex-col gap-4 p-4 bg-white rounded shadow">
                    <div>
                        <h2 className="text-xl font-bold">Richiesta</h2>
                        <input
                            type="text"
                            name="request_type"
                            id="request_type"
                            className="w-full border border-gray-300 rounded p-2"
                            disabled
                            value={ticket.request_type.label}
                        />
                    </div>

                    <div className="flex w-full gap-2">
                        <div className="flex-[1_1_0%]">
                            <h2 className="text-xl font-bold">
                                Data creazione
                            </h2>
                            <input
                                type="text"
                                name="request_type"
                                id="request_type"
                                className="w-full border border-gray-300 rounded p-2"
                                disabled
                                value={created_at}
                            />
                        </div>
                        <div className="flex-[1_1_0%]">
                            <h2 className="text-xl font-bold">Data scadenza</h2>
                            <input
                                type="text"
                                name="request_type"
                                id="request_type"
                                className="w-full border border-gray-300 rounded p-2"
                                disabled
                                value={dtScadenza}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full gap-2">
                        <h3 className="flex-1 text-xl">File caricati</h3>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 shadow">
                            <FaPlus />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col bg-gray-50 w-full rounded p-2  shadow">
                        <article className="flex justify-between items-center p-2 hover:bg-gray-200 rounded">
                            <h3>Nome del file</h3>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 shadow">
                                <FaArrowDown />
                            </button>
                        </article>
                    </div>
                </section>
                <section className="flex-[2_1_0%] flex flex-col gap-4 p-4 bg-white rounded shadow ">
                    <div className="flex-[4_1_0%] bg-gray-50 rounded flex flex-col p-4 overflow-auto max-h-[50vh]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                            if (item % 2 !== 0) {
                                return (
                                    <article
                                        className="flex justify-between gap-2 p-2"
                                        key={item}
                                    >
                                        <div className="flex-1 bg-gray-700 text-white rounded p-4 shadow flex flex-col">
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Quis aut unde libero sed aliquid
                                                eos non excepturi ratione
                                                repellat, placeat corporis
                                                soluta quas ab esse saepe cumque
                                                nesciunt reiciendis aspernatur
                                                doloremque id distinctio! Odio
                                                deserunt incidunt et! Deleniti
                                                doloremque aut vitae
                                                consequuntur eaque obcaecati
                                                odio.
                                            </p>
                                            <div className="flex flex-row-reverse">
                                                <span className="text-gray-400 text-sm">
                                                    12/05/2023 16:35
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex flex-col items-center justify-center">
                                            <span className="text-gray-700">
                                                CP
                                            </span>
                                        </div>
                                    </article>
                                );
                            } else {
                                return (
                                    <article
                                        className="flex justify-between gap-2 p-2"
                                        key={item}
                                    >
                                        <div className="flex-1  rounded p-4 order-2 shadow-inner bg-white border">
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Quis aut unde libero sed aliquid
                                                eos non excepturi ratione
                                                repellat, placeat corporis
                                                soluta quas ab esse saepe cumque
                                                nesciunt reiciendis aspernatur
                                                doloremque id distinctio! Odio
                                                deserunt incidunt et! Deleniti
                                                doloremque aut vitae
                                                consequuntur eaque obcaecati
                                                odio.
                                            </p>
                                            <div className="flex flex-row-reverse">
                                                <span className="text-gray-400 text-sm">
                                                    12/05/2023 16:35
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-12 w-12 rounded-full bg-gray-700 flex flex-col items-center justify-center order-1 shadow">
                                            <span className="text-white">
                                                CP
                                            </span>
                                        </div>
                                    </article>
                                );
                            }
                        })}
                    </div>
                    <div className="flex-[1_1_0%] w-full flex justify-between gap-2 p-4">
                        <textarea
                            name=""
                            id=""
                            className="bg-white shadow-inner p-4 flex-1 rounded border border-gray-200 cursor-pointer  focus:border-gray-200 focus:ring-0 focus:outline-none"
                            placeholder="Scrivi un messaggio..."
                            style={{ resize: "none" }}
                        ></textarea>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 shadow w-12 h-12 flex items-center justify-center">
                            <FaPaperPlane />
                        </button>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

export default Detail;
