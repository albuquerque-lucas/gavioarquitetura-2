<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Repositories\CategoriesRepository;

class CategoriesController extends Controller
{
    private CategoriesRepository $repository;
    public function __construct()
    {
        $this->repository = new CategoriesRepository();
    }
    public function index()
    {
        $res = $this->repository->getAll();
        return response()->json($res->data(), $res->status());
    }
    public function store(CategoryRequest $request)
    {
        $data = $request->all();
        $res = $this->repository->create($data);
        return response()->json($res->data(), $res->status());
    }
    public function show(int $id)
    {
        $res = $this->repository->getById($id);
        return response()->json($res->data(), $res->status());
    }
    public function update(CategoryRequest $request, int $id)
    {
        $data = $request->all();
        $res = $this->repository->update($id, $data);
        return response()->json($res->data(), $res->status());
    }
    public function destroy(int $id)
    {
        $res = $this->repository->delete($id);
        return response()->json($res->data(), $res->status());
    }

    public function projects(int $id)
    {
        $res = $this->repository->getProjects($id);
        return response()->json($res->data(), $res->status());
    }
}
