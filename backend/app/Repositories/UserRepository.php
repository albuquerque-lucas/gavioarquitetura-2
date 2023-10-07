<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\User;
use App\Models\ServiceResponse;

class UserRepository implements IReadAndWrite
{
    private ServiceResponse $response;

    public function __construct()
    {
        $this->response = new ServiceResponse();
    }

    public function getAll(): ServiceResponse
    {
        $list = User::all();
        if ($list->isEmpty()) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Users not found'
            ]);
            return $this->response;
        }

        $this->response->setAttributes(200, $list);
        return $this->response;
    }

    public function getById(int $id): ServiceResponse
    {
        $user = User::find($id);
        if (!$user) {
            $this->response->setAttributes(404, (object)[
                'message' => 'User not found'
            ]);
            return $this->response;
        }

        $this->response->setAttributes(200, $user);
        return $this->response;
    }

    public function create(array $data): ServiceResponse
    {
        $user = User::create($data);
        if (!$user) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error creating user'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(201, $user);
        return $this->response;
    }

    public function update(int $id, array $data): ServiceResponse
    {
        $user = User::find($id);
        if (!$user) {
            $this->response->setAttributes(404, (object)[
                'message' => 'User not found'
            ]);
            return $this->response;
        }

        $user->update($data);
        $this->response->setAttributes(200, $user);
        return $this->response;
    }

    public function delete(int $id): ServiceResponse
    {
        $user = User::find($id);
        if (!$user) {
            $this->response->setAttributes(404, (object)[
                'message' => 'User not found'
            ]);
            return $this->response;
        }

        $isDeleted = $user->delete();
        if (!$isDeleted) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error deleting user'
            ]);
        } else {
            $this->response->setAttributes(200, (object)[
                'message' => 'User deleted successfully'
            ]);
        }

        return $this->response;
    }

    public function login()
    {
        
    }
}
