<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;

use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function redirectToMicrosoft() {
        return Socialite::driver('azure')->redirect();
    }

    public function handleMicrosoftCallback() {
        $microsoftUser = Socialite::driver('azure')->stateless()->user();

        $user = SocialAccount::where('provider', 'azure')
        ->where('provider_id', $microsoftUser->getId())
        ->with('user')
        ->first();

        if (!$user) {
            // Register a new user or find an existing user by email
            $user = User::firstOrCreate([
                    'email' => $microsoftUser->getEmail(),
                    'email_verified_at' => now()->toDateTimeString(),
                    'name' => $microsoftUser->getName(),
                    'password' => Hash::make($microsoftUser->getId()),
            ]);

   

            // Create a new social account for the user
            $socialAccount = SocialAccount::firstOrCreate([
                "user_id" => $user->id,
                'provider' => 'azure',
                'provider_id' => $microsoftUser->getId(),
            ]);

            // Log the user in
            Auth::login($user);
        } else {
                    // Log the user in
            Auth::login($user->user);
        }



        // Redirect to the intended page or the default home page
        return redirect()->intended('/');
    }

}
