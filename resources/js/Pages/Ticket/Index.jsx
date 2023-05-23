/**
 * Lista dei ticket aperti da un utente specifico.
 */

import { useMemo } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
import { DataTable } from "@/Components/DataTable";
import NewTicketDialog from "@/Components/NewTicketDialog";
import { RiArrowUpDownFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const dateTimeOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    minute: "2-digit",
    hour: "2-digit",
};

function Index({ tickets, request_types, auth }) {
    const columns = useMemo(
        () => [
            {
                header: "ID",
                accessorKey: "col1",
            },
            {
                header: ({ column }) => {
                    return (
                        <button
                            className="bg-transparent border-none flex items-center justify-between w-full"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            <span>Problema/Richiesta</span>
                            <RiArrowUpDownFill />
                        </button>
                    );
                },
                accessorKey: "col2",
            },
            {
                header: ({ column }) => {
                    return (
                        <button
                            className="bg-transparent border-none hidden lg:flex items-center justify-between w-full "
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            <span>Data</span>
                            <RiArrowUpDownFill />
                        </button>
                    );
                },
                accessorKey: "col3",
                cell: ({ row }) => {
                    return (
                        <p className="hidden lg:flex">
                            {row
                                .getValue("col3")
                                .toLocaleDateString("it-IT", dateTimeOptions)}
                        </p>
                    );
                },
            },
            {
                header: ({ column }) => {
                    return (
                        <button
                            className="bg-transparent border-none hidden lg:flex items-center justify-between w-full"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            <span>Scadenza</span>
                            <RiArrowUpDownFill />
                        </button>
                    );
                },
                accessorKey: "col4",
                cell: ({ row }) => {
                    return (
                        <p className="hidden lg:flex">
                            {row
                                .getValue("col4")
                                .toLocaleDateString("it-IT", dateTimeOptions)}
                        </p>
                    );
                },
            },
            {
                header: "Stadio",
                accessorKey: "col5",
                cell: ({ row }) => {
                    let html = "";

                    switch (row.getValue("col5")) {
                        case 0:
                            html = (
                                <div className="flex items-center justify-center lg:justify-start gap-2 rounded-full xl:border border-gray-200 px-1 w-full">
                                    <div className="bg-green-500 rounded-full w-4 h-4"></div>
                                    <span className="hidden xl:block">
                                        Aperto
                                    </span>
                                </div>
                            );
                            break;
                        case 1:
                            html = (
                                <div className="flex items-center justify-center lg:justify-start gap-2 rounded-full xl:border border-gray-200 px-1 w-full">
                                    <div className="bg-yellow-500 rounded-full w-4 h-4"></div>
                                    <span className="hidden xl:block">
                                        Assegnato
                                    </span>
                                </div>
                            );
                            break;
                        case 2:
                            html = (
                                <div className="flex items-center justify-center lg:justify-start gap-2 rounded-full xl:border border-gray-200 px-1 w-full">
                                    <div className="bg-orange-500 rounded-full w-4 h-4"></div>
                                    <span className="hidden xl:block">
                                        Elaborazione
                                    </span>
                                </div>
                            );
                            break;
                        case 3:
                            html = (
                                <div className="flex items-center justify-center lg:justify-start gap-2 rounded-full xl:border border-gray-200 px-1 w-full">
                                    <div className="bg-purple-500 rounded-full w-4 h-4"></div>
                                    <span className="hidden xl:block">
                                        Attesa Utente
                                    </span>
                                </div>
                            );
                            break;
                        case 4:
                            html = (
                                <div className="flex items-center justify-center lg:justify-start gap-2 rounded-full xl:border border-gray-200 px-1 w-full">
                                    <div className="bg-red-500 rounded-full w-4 h-4"></div>
                                    <span className="hidden xl:block">
                                        Chiuso
                                    </span>
                                </div>
                            );
                            break;
                        default:
                            html = <p>{row.getValue("col5")}</p>;
                            break;
                    }

                    return html;
                },
                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id));
                },
            },
            {
                header: "",
                accessorKey: "col6",
                cell: ({ row }) => {
                    return (
                        <a
                            href={`/tickets/${row.getValue("col1")}`}
                            className="bg-transparent p-2 flex items-center justify-center gap-2 rounded border border-gray-200"
                        >
                            <FaChevronRight className="text-gray-700" />
                        </a>
                    );
                },
            },
        ],
        []
    );

    const data = useMemo(
        () =>
            tickets.map((ticket) => {
                let dt = new Date(ticket.created_at);
                let dtScadenza = new Date(
                    dt.setMinutes(dt.getMinutes() + ticket.time)
                );

                return {
                    col1: ticket.id,
                    col2: ticket.request_type.label,
                    col3: dt,
                    col4: dtScadenza,
                    col5: ticket.stadium,
                    col6: "",
                };
            }),
        []
    );

    // return (
    //     <div className="h-screen flex flex-col text-gray-700">
    //         <ToastContainer />
    //         {/* Navbar con logo + sito ift?  */}

    //         <nav className="flex justify-between p-2 mx-4">
    // <div className="bg-gray-700 p-4 rounded-full">
    //     <img
    //         src="https://ifortech.com/assets/images/logo-header.png"
    //         alt="logo"
    //         className="w-32"
    //     />
    // </div>;

    //             <a
    //                 href="https://ifortech.com/"
    //                 className="flex items-center gap-1 text-red-500"
    //             >
    //                 Visita ifortech.com <RxArrowTopRight />
    //             </a>
    //         </nav>

    //     </div>
    // );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="mx-4 flex flex-col items-center justify-center gap-4 p-4 py-24">
                    <h1 className="text-4xl font-bold text-center">
                        Benvenuto nel sistema di ticketing di IFT
                    </h1>

                    <NewTicketDialog requestTypes={request_types} />
                </div>
            }
        >
            {/* Lista dei ticket */}

            <div className="flex-1 flex flex-col items-center gap-4 px-4 lg:px-32 py-6  bg-gray-100 shadow-inner container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
