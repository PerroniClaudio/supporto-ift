import React from "react";
import { FaPlus, FaPaperclip } from "react-icons/fa";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useForm, Head } from "@inertiajs/react";

function NewTicketDialog({ requestTypes }) {
    const [requestTypesFilter, setRequestTypesFilter] = React.useState("0");
    const [requestTypeSearch, setRequestTypeSearch] = React.useState("");

    // const [ticketData, setTicketData] = React.useState({
    //     request_type: null,
    //     description: "",
    //     attachments: [],
    // });

    const {
        data: ticketData,
        setData: setTicketData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        message: "",
        request_type: null,
        description: "",
        attachments: [],
    });

    const createTicket = (e) => {
        e.preventDefault();
        post(route("tickets.store"), { onSuccess: () => reset() });
    };

    const setTicketParam = (param, value) => {
        setTicketData((prev) => ({ ...prev, [param]: value }));
    };

    return (
        <Dialog>
            <DialogTrigger className="bg-red-500 hover:bg-red-300 flex items-center p-4 rounded text-white gap-2 text-xl">
                <FaPlus className="text-white" />
                <span>Crea un ticket</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuovo ticket</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">
                                Si tratta di un Problema o di una Richiesta?
                            </label>

                            <Select
                                name="request-type-filter"
                                id="request-type-filter"
                                className="border border-gray-200 rounded p-2"
                                defaultValue={requestTypesFilter}
                                onValueChange={setRequestTypesFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Scegli" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Scegli</SelectItem>
                                    <SelectItem value="1">Problema</SelectItem>
                                    <SelectItem value="2">Richiesta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {requestTypesFilter != "0" && (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="request_type">
                                    Tipo di richiesta
                                </label>
                                <div className="rounded border border-gray-200 flex items-center px-2 h-10">
                                    <input
                                        placeholder="Cerca"
                                        type="search"
                                        value={requestTypeSearch}
                                        onChange={(e) => {
                                            setRequestTypeSearch(
                                                e.target.value
                                            );
                                        }}
                                        className="!outline-none text-gray-700 flex-1 px-1"
                                    />
                                </div>
                                <Select
                                    name="request-type"
                                    id="request-type"
                                    className="border border-gray-200 rounded p-2 w-full"
                                    disabled={requestTypeSearch == ""}
                                    onValueChange={(e) =>
                                        setTicketParam("request_type", e)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Scegli" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {requestTypes
                                            .filter(
                                                (rt) =>
                                                    rt.type ==
                                                        requestTypesFilter &&
                                                    rt.label
                                                        .toLowerCase()
                                                        .includes(
                                                            requestTypeSearch.toLowerCase()
                                                        )
                                            )
                                            .map((requestType) => (
                                                <SelectItem
                                                    value={requestType.id}
                                                    key={requestType.id}
                                                >
                                                    {requestType.label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {ticketData.request_type && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description">
                                        Descrizione del problema
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={ticketData.description}
                                        onChange={(e) =>
                                            setTicketParam(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-200 rounded p-2 focus:ring-0 focus:outline-none h-72"
                                        placeholder="Inserisci una descrizione dettagliata del problema"
                                        style={{ resize: "none" }}
                                    ></textarea>
                                </div>

                                <div className="flex">
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 flex justify-between items-center gap-2 shadow">
                                        <span>Allega un file</span>{" "}
                                        <FaPaperclip />
                                    </button>
                                </div>
                            </>
                        )}

                        {ticketData.description &&
                            ticketData.description.length > 30 && (
                                <form
                                    onSubmit={createTicket}
                                    className="flex justify-end"
                                >
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-300 text-white rounded p-2 shadow w-24 text-center"
                                    >
                                        Invia
                                    </button>
                                </form>
                            )}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default NewTicketDialog;
