import React from "react";

function Detail({ ticket }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Ticket #{ticket.id}</h1>
            </div>
        </div>
    );
}

export default Detail;
