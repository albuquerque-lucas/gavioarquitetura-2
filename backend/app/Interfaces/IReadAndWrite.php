<?php

namespace App\Interfaces;
use Illuminate\Database\Eloquent\Collection;

interface IReadAndWrite
{
    public static function getAll():Collection;
    public static function getById(int $id):object;
    public static function create(array $data):object;
    public static function update(int $id, array $data):object;
    public static function delete(int $id):bool;
}