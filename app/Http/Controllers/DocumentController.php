<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Document;

class DocumentController extends Controller
{
    public function all()
    {
        $result =   Document::all();
        if (empty($result)) {
            return response()
                ->json([
                    'message'   =>  'Show one field in document table fail!',
                    'status'    =>  false
                ]);
        } else {
            return response()
                ->json([
                    'message'   =>  'Show one field in document table successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ]);
        }
    }

    public function getOne($id)
    {
        $result =   Document::where('id', $id)->first();
        if (empty($result)) {
            return response()
                ->json([
                    'message'   =>  'Show detail data in document detail fail!',
                    'status'    =>  false
                ], 404);
        } else {
            return response()
                ->json([
                    'message'   =>  'Show detail data in document detail successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ], 200);
        }
    }
}