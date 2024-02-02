<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Category;
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
        if ($list->isEmpty()) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Categories not found'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(200, $list);
        return $this->response;
    }
    public function getById(int $id):ServiceResponse
    {
        $category = Category::find($id);
        if (!$category) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Category not found'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(200, $category);
        return $this->response;
    }

    public function getProjects(int $id):ServiceResponse
    {
        $category = Category::find($id);
        if (!$category) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Category not found'
            ]);
            return $this->response;
        }
        $projects = $category->projects()->paginate();
        if ($projects->isEmpty()) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Projects not found'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(200, $projects);
        return $this->response;
    }   

    public function create(array $data):ServiceResponse
    {
        $category = Category::create($data);
        if (!$category) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error creating category'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(201, $category);
        return $this->response;
    }
    public function update(int $id, array $data):ServiceResponse
    {
        $category = Category::find($id);
        if (!$category) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Category not found'
            ]);
            return $this->response;
        }
        $category->update($data);
        $this->response->setAttributes(200, $category);
        return $this->response;
    }
    public function delete(int $id):ServiceResponse
    {
        $category = Category::find($id);
        $isDeleted = $category->delete();
        if (!$isDeleted) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error deleting category'
            ]);
        } else {
            $this->response->setAttributes(200, (object)[
                'message' => 'Category deleted successfully'
            ]);
        }
        return $this->response;
    }
}