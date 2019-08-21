<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Outside the system in HomeController
// Login functions
Route::post('login', 'HomeController@login');
// Reset password function
Route::post('send-email', 'HomeController@sendMail');
// Check token function
Route::get('change-password/{token}', 'HomeController@checkToken');
// Change password function
Route::post('change-password/{token}', 'HomeController@changePass');

// Inside the system 
// Using auth.jwt middleware to check user
Route::group(['middleware' => 'jwt.verify'], function () {

    // HomeController logout function
    Route::post('logout', 'HomeController@logout');

    // UserController
    // Getting all users in system
    Route::get('users', 'UserController@index');
    // Getting user follow id
    Route::get('users/{id}', 'UserController@show');
    // Updating the user infos
    Route::post('users/{id}', 'UserController@update');

    // Limiting just super admin can handle
    Route::group(['middleware' => 'MiddlewareLevel1'], function () {

        // UserController
        // Creating a new user
        Route::post('users', 'UserController@store');
        // Deleting the user
        Route::delete('users/{id}', 'UserController@destroy');

        // OTController
        // Showing all member registed OT time and sort them
        Route::post('members/OTs', 'OTController@allDataSort');

        // DayOffController
        // Show all day off for super admin
        Route::get('day-offs', 'DayOffController@all');
        // Show all day off have accept for super admin
        Route::get('day-offs/all-status', 'DayOffController@showAllStatus');
        // Approving day off for super admin
        Route::post('day-offs/accepted/{id}', 'DayOffController@approve');
        // Canceling day off for super admin
        Route::post('day-offs/declined/{id}', 'DayOffController@cancel');
    });

    // Limiting just super admin and manage can handle
    Route::group(['middleware' => 'MiddlewareLevel2'], function () {

        // TeamController
        // Creating a team
        Route::post('teams', 'TeamController@store');
        // Deleting a team
        Route::delete('teams/{id}', 'TeamController@destroy');
        // Searching the member in system
        Route::post('team/{id}/member-search', 'TeamController@searchMember');
        // Adding the team member
        Route::post('team/{id}/add-member', 'TeamController@addMember');
        // Deleting the team member
        Route::delete('team/{id}/delete-member/{idU}', 'TeamController@deleteMember');
        // Searching the member follow team
        Route::post('team/{id}/member-search-team', 'TeamController@searchMemberFlTeam');

        // OTController
        // Adding the OT time for team member
        Route::post('team/{id}/member/add-ot', 'OTController@store');
        // Showing members follow team registed OT time
        Route::get('team/{id}/members/OTs', 'OTController@showTeam');
        // Showing a member follow team registed OT time
        Route::get('member/OTs/{id}', 'OTController@showOneOT');
        // Updating the OT time
        Route::post('OTs/edit/{id}', 'OTController@update');
        // Destroy the OT time
        Route::delete('OTs/delete/{id}', 'OTController@destroy');
    });

    // TeamController
    // Getting all teams
    Route::get('teams', 'TeamController@index');
    // Getting all member in a team
    Route::get('team/{id}/members', 'TeamController@showMemberFlTeam');
    // Show all team id 
    Route::get('teams/all-id', 'TeamController@getId');

    // OTController
    // Showing a member registed OT time
    Route::get('member/OTs', 'OTController@show');

    //DayOffController
    // get number all day off is waiting for super admin
    Route::get('day-offs/waiting', 'DayOffController@allWaiting');
    // get number all day off is accepted for super admin
    Route::get('day-offs/accepted', 'DayOffController@allAccepted');
    // get number all day off is declined for super admin
    Route::get('day-offs/declined', 'DayOffController@allDeclined');
    // Show all day off of member for user
    Route::get('day-offs/user', 'DayOffController@userAll');
    // Create day off
    Route::post('day-offs', 'DayOffController@store');
    // Updating day off
    Route::post('day-offs/{id}', 'DayOffController@update');
    // Destroying day off
    Route::delete('day-offs/{id}', 'DayOffController@destroy');
    // Show detail day off for each user
    Route::get('day-offs/{id}', 'DayOffController@show');
    // Show all day off approved
    Route::get('day-offs/user/approved', 'DayOffController@showAllAprroved');

    // DocumentController
    Route::get('documents', 'DocumentController@all');
    // DocumentController
    Route::get('documents/{id}', 'DocumentController@getOne');
});
