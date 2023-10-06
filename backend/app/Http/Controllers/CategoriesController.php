<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CategoriesRepository;

class CategoriesController extends Controller
{
    public function index()
    {
        $result = CategoriesRepository::getAll();
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $data = $request->all();
        $result = CategoriesRepository::create($data);
        return response()->json($result, 201);
    }
    public function show(int $id)
    {
        $result = CategoriesRepository::getById($id);
        return response()->json($result, 200);
    }
    public function update(Request $request, int $id)
    {
        $data = $request->all();
        $result = CategoriesRepository::update($id, $data);
        return response()->json($result, 200);
    }
    public function destroy(int $id)
    {
        $result = CategoriesRepository::delete($id);
        return response()->json($result, 200);
    }
}
