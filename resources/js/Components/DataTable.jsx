import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [statusSelected, setStatusSelected] = React.useState({
        aperto: true,
        assegnato: true,
        elaborazione: true,
        attesa_utente: true,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    React.useEffect(() => {
        updateStatusFilters();
    }, [statusSelected]);

    const updateStatusFilters = () => {
        let filterArray = [];

        for (const [key, value] of Object.entries(statusSelected)) {
            let kv = 0;

            switch (key) {
                case "aperto":
                    kv = 0;
                    break;
                case "assegnato":
                    kv = 1;
                    break;
                case "elaborazione":
                    kv = 2;
                    break;
                case "attesa_utente":
                    kv = 3;
                    break;
            }

            if (value) {
                if (!filterArray.includes(kv)) {
                    filterArray.push(kv);
                }
            }
        }

        table.getColumn("col5").setFilterValue(filterArray);
    };

    const updateStatusSelected = (status) => {
        setStatusSelected({
            ...statusSelected,
            [status]: !statusSelected[status],
        });
    };

    const pagesOptionsSelect = [];

    for (let i = 0; i < table.getPageCount(); i++) {
        pagesOptionsSelect.push(
            <option value={i} key={i}>
                {i + 1}
            </option>
        );
    }

    return (
        <section className="bg-white w-full rounded shadow">
            <nav className="w-full flex items-center p-4 gap-2">
                <div className="font-semibold text-xl  flex items-center gap-2 text-gray-700 flex-[3_1_0%]">
                    <h3>Ticket</h3>
                    <div className="bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-full w-8 aspect-square flex flex-col items-center justify-center">
                        {data.length}
                    </div>
                </div>

                <div className="rounded border border-gray-200 flex items-center px-2 gap-1 flex-[2_1_0%] h-full">
                    <FaSearch className="text-gray-700" />
                    <input
                        placeholder="Cerca"
                        value={table.getColumn("col2").getFilterValue()}
                        onChange={(event) => {
                            table
                                .getColumn("col2")
                                .setFilterValue(event.target.value);
                        }}
                        className="!outline-none text-gray-700 flex-1 h-10 px-1"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200">
                        <BiFilter className="text-gray-700" />
                        Filtra
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                        <DropdownMenuLabel>Filtra per stadio</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={statusSelected.aperto}
                            onCheckedChange={() => {
                                updateStatusSelected("aperto");
                            }}
                        >
                            <div className="flex items-center gap-2 rounded-full px-1 w-full">
                                <div className="bg-green-500 rounded-full w-4 h-4"></div>
                                <span className="hidden 2xl:block">Aperto</span>
                            </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusSelected.assegnato}
                            onCheckedChange={() => {
                                updateStatusSelected("assegnato");
                            }}
                        >
                            <div className="flex items-center gap-2 rounded-full px-1 w-full">
                                <div className="bg-yellow-500 rounded-full w-4 h-4"></div>
                                <span className="hidden 2xl:block">
                                    Assegnato
                                </span>
                            </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusSelected.elaborazione}
                            onCheckedChange={() => {
                                updateStatusSelected("elaborazione");
                            }}
                        >
                            <div className="flex items-center gap-2 rounded-full px-1 w-full">
                                <div className="bg-orange-500 rounded-full w-4 h-4"></div>
                                <span className="hidden 2xl:block">
                                    Elaborazione
                                </span>
                            </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusSelected.attesa_utente}
                            onCheckedChange={() => {
                                updateStatusSelected("attesa_utente");
                            }}
                        >
                            <div className="flex items-center gap-2 rounded-full px-1 w-full">
                                <div className="bg-purple-500 rounded-full w-4 h-4"></div>
                                <span className="hidden 2xl:block">
                                    Attesa Utente
                                </span>
                            </div>
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
            <section className="w-full p-4 shadow-inner">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center border-b border-gray-200"
                                >
                                    Nessun risultato.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full flex items-center justify-between p-4 gap-2 ">
                <div className="flex items-center gap-2">
                    <select
                        name=""
                        id="pages"
                        className="rounded border border-gray-200 cursor-pointer  focus:border-gray-200 focus:ring-0"
                        value={`${table.getState().pagination.pageSize}`}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="pages">Righe per pagina</label>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <FaChevronLeft className="text-gray-700" />
                    </button>
                    <span className="text-gray-700">Pagina</span>
                    <select
                        name=""
                        id="pages"
                        className="rounded border border-gray-200 cursor-pointer  focus:border-gray-200 focus:ring-0"
                        value={table.getState().pagination.pageIndex}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                    >
                        {pagesOptionsSelect}
                    </select>
                    <span className="text-gray-700">
                        di {table.getPageCount()}
                    </span>
                    <button
                        className="bg-transparent p-2 flex items-center gap-2 rounded border border-gray-200"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <FaChevronRight className="text-gray-700" />
                    </button>
                </div>
            </section>
        </section>
    );
}
