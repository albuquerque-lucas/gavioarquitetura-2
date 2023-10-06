<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        $data = $request->all();
        $res = $this->repository->create($data);
        return response()->json($res, 201);
    }
    public function show(int $id)
    {
        $res = $this->repository->getById($id);
        return response()->json($res->data(), $res->status());
    }
    public function update(Request $request, int $id)
    {
        $data = $request->all();
        $res = $this->repository->update($id, $data);
        return response()->json($res, 200);
    }
    public function destroy(int $id)
    {
        $res = $this->repository->delete($id);
        return response()->json($res, 200);
    }
}
