<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class MiddlewareLevel1
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()&&Auth::user()->role==='Super Admin')
        {
            return $next($request);
        }else{
            return response()->json([
                'message' => 'Just super admin can do this handle!',
                'status' => false,
            ], 404);
            // return abort(403, 'You are not authorized!');
        }
    }
}
