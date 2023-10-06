<?php

namespace App\Interfaces;
use App\Models\ServiceResponse;
interface IReadAndWrite
{
    public function getAll():ServiceResponse;
    public function getById(int $id):ServiceResponse;
    public function create(array $data):object;
    public function update(int $id, array $data):object;
    public function delete(int $id):bool;
}