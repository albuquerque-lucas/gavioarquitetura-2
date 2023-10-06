<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoriesRepository implements IReadAndWrite
{
    public static function getAll():Collection
    {
        return Category::all();
    }
    public static function getById(int $id):object
    {
        return Category::findOrFail($id);
    }
    public static function create(array $data):object
    {
        return Category::create($data);
    }
    public static function update(int $id, array $data):object
    {
        $category = Category::findOrFail($id);
        $category->update($data);
        return $category;
    }
    public static function delete(int $id):bool
    {
        $category = Category::findOrFail($id);
        return $category->delete();
    }
}