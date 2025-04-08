<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class MultiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated in any of the guards
        if (Auth::guard('itstaff')->check()) {
            Auth::shouldUse('itstaff'); // Set default guard
            return $next($request);
        }

        if (Auth::guard('opstaff')->check()) {
            Auth::shouldUse('opstaff'); // Set default guard
            return $next($request);
        }

        if (Auth::guard('partner')->check()) {
            Auth::shouldUse('partner'); // Set default guard
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
