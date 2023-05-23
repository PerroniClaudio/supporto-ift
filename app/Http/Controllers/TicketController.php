<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\RequestType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
 

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Ticket/Index', [
            'tickets' => Ticket::where('stadium', '<>', '4' )->with('request_type')->latest()->get(),
            'request_types' => RequestType::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'request_type' => ['required', 'exists:request_types,id'],
            'description' => ['required', 'string'],
        ]);

        Ticket::create([
            'request_type' => $request->request_type,
            'description' => $request->description,
            'user_id' => 0,
            'time' => 180
        ]);

        $id = Ticket::latest()->first()->id;
        
        return redirect()->route('tickets.show', $id);

    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket = Ticket::where('id', $ticket->id)->with('request_type')->first();

        return Inertia::render('Ticket/Detail', [
            'ticket' => $ticket,
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
