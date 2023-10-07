<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Repositories\UserRepository;
use Auth;

class UserController extends Controller
{
    private UserRepository $repository;
    public function __construct()
    {
        $this->repository = new UserRepository();
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        $attempt = Auth::attempt($credentials);
        if (!$attempt) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        return response()->json($token, 200);
    }
}
