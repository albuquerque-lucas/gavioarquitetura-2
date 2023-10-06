<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use App\Models\ServiceResponse;
class CategoriesRepository implements IReadAndWrite
{
    private ServiceResponse $response;
    public function __construct()
    {
        $this->response = new ServiceResponse();
    }
    public function getAll():ServiceResponse
    {
        $list = Category::all();
        if ($list === null) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Categories not found'
            ]);
        } else {
            $this->response->setAttributes(200, $list);
        }
        return $this->response;
    }
    public function getById(int $id):object
    {
        $category = Category::find($id);
        if ($category === null) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Category not found'
            ]);
        } else {
            $this->response->setAttributes(200, $category);
        }
        return $this->response;
    }
    public function create(array $data):object
    {
        return Category::create($data);
    }
    public function update(int $id, array $data):object
    {
        $category = Category::findOrFail($id);
        $category->update($data);
        return $category;
    }
    public function delete(int $id):bool
    {
        $category = Category::findOrFail($id);
        return $category->delete();
    }
}