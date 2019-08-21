<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class MiddlewareLevel2
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
        if( 
            Auth::check()&&Auth::user()->role==='Super Admin'
            ||
            Auth::check()&&Auth::user()->role==='Manager'
        )
        {
            return $next($request);
        }else{
            return response()->json([
                'message'   =>  'Just super admin and manager can do this handle!',
                'status'    =>  false,
            ], 404);
        }
    }
}
