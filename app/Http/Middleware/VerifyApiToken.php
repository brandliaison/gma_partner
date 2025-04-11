<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Internal-Token');

        if ($token !== 'cOn6EAPBd9hKgx5CuygnlNwxXks67jUqZPbXuj0U964e2283') {
            return response()->json(['message' => $request->all()], 401);
        }

        return $next($request);
    }
}
