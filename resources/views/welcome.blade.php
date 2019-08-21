<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Laravel</title>
	<!-- Fonts -->
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" />
	<link href="//fonts.googleapis.com/css?family=Roboto:400,700,300" rel="stylesheet" type="text/css" />
	<link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/dashboard.css')}}" rel="stylesheet" type="text/css">
</head>

<body>
	<div id="root"></div>
	<script src="{{asset('js/app.js')}}"></script>
</body>

</html>