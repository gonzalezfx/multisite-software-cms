<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Resources\API\UserResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:user'],
            'password' => ['required', 'string', 'min:5', 'confirmed'],
        ]);

        $encryptedPasswordRequest = $request->merge([
            'password' => Hash::make($request->password),
            'username' => $request->email,
        ]);

        $user = User::create($encryptedPasswordRequest->only([
            'name',
            'username',
            'email',
            'password',
        ]));

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('user')->ignore($user->id)],
            'password' => ['sometimes', 'string', 'min:5', 'confirmed'],
        ]);

        if ($request->filled('password')) {
            $encryptedPasswordRequest = $request->merge([
                'password' => Hash::make($request->password),
            ]);

            $finalData = $encryptedPasswordRequest->only([
                'name',
                'email',
                'password',
            ]);
        } else {
            $finalData = $request->only([
                'name',
                'email',
            ]);
        }

        $user->update($finalData);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $users = User::all();

        if ($users->count() < 2) {
            return response()->json([
                'error' => 'No es posible eliminar el único administrador existente',
            ], 400);
        } else {
            $user->delete();

            return response()->json(null, 204);
        }
    }
}
