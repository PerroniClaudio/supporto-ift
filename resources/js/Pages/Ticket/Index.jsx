/**
 * Lista dei ticket aperti da un utente specifico.
 */

import { useMemo } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import {
    FaPlus,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { BiFilter } from "react-icons/bi";
import { useTable } from "react-table";

function Index() {
    const data = useMemo(
        () => [
            {
                col1: "Ticket #1",
                col2: "Cannolo",
            },
            {
                col1: "Ticket #2",
                col2: "Cassata",
            },
            {
                col1: "Ticket #3",
                col2: "Brioche",
            },
            {
                col1: "Ticket #4",
                col2: "Gelato",
            },
            {
                col1: "Ticket #5",
                col2: "Granita",
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: "Ticket",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Titolo",
                accessor: "col2",
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <div className="h-screen flex flex-col text-gray-700">
            {/* Navbar con logo + sito ift?  */}

            <nav className="flex justify-between p-2 mx-4">
                <div className="bg-gray-700 p-4 rounded-full">
                    <img
                        src="https://ifortech.com/assets/images/logo-header.png"
                        alt="logo"
                        className="w-32"
                    />
                </div>

                <a
                    href="https://ifortech.com/"
                    className="flex items-center gap-1 text-red-500"
                >
                    Visita ifortech.com <RxArrowTopRight />
                </a>
            </nav>

            {/* Hero con il tasto per creare un ticket */}

            <div className="mx-4 flex flex-col items-center justify-center gap-4 p-4 py-24 border-t border-gray-300">
                <h1 className="text-4xl font-bold text-center">
                    Benvenuto nel sistema di ticketing di IFT
                </h1>

                <button className="bg-red-500 flex items-center p-4 rounded text-white gap-2 text-xl">
                    <FaPlus className="text-white" />
                    <span>Crea un ticket</span>
                </button>
            </div>

            {/* Lista dei ticket */}

            <div className="flex-1 flex flex-col items-center gap-4 p-32 py-8 bg-gray-100 shadow-inner">
                <section className="bg-white w-full rounded shadow">
                    {/* Filtri */}

                    <nav className="w-full flex items-center p-4 gap-2">
                        <div className="font-semibold text-xl  flex items-center gap-2 text-gray-700 flex-[3_1_0%]">
                            <h3>Ticket aperti</h3>
                            <div className="bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-full w-8 aspect-square flex flex-col items-center justify-center">
                                5
                            </div>
                        </div>

                        <div className="rounded border border-gray-200 flex items-center px-2 gap-1 flex-[2_1_0%]">
                            <FaSearch className="text-gray-700" />
                            <input
                                type="search"
                                name=""
                                id=""
                                className=" border-transparent focus:border-transparent focus:ring-0 text-gray-700"
                                placeholder="Cerca "
                            />
                        </div>

                        <button className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200">
                            <BiFilter className="text-gray-700" />
                            Filtra
                        </button>
                    </nav>

                    <section className="w-full p-4 shadow-inner">
                        <table
                            className="table-auto w-full"
                            {...getTableProps()}
                        >
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps()}
                                                className="text-left text-gray-400"
                                            >
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="border-b border-gray-200"
                                        >
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="py-2"
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>

                    <section className="w-full flex items-center justify-between p-4 gap-2 ">
                        <div className="flex items-center gap-2">
                            <select
                                name=""
                                id="pages"
                                className="rounded border border-gray-200 cursor-pointer  focus:border-gray-200 focus:ring-0"
                            >
                                <option value="">10</option>
                                <option value="">20</option>
                                <option value="">50</option>
                            </select>
                            <label htmlFor="pages">Righe per pagina</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200">
                                <FaChevronLeft className="text-gray-700" />
                            </button>
                            <span className="text-gray-700">Pagina</span>
                            <select
                                name=""
                                id="pages"
                                className="rounded border border-gray-200 cursor-pointer  focus:border-gray-200 focus:ring-0"
                            >
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                            <span className="text-gray-700">di 4</span>
                            <button className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200">
                                <FaChevronRight className="text-gray-700" />
                            </button>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}

export default Index;
