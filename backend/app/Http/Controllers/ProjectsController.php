<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Repositories\ProjectRepository;

class ProjectsController extends Controller
{
    public function index()
    {
        $result = ProjectRepository::getAll();
        return response()->json($result, 200);
    }
    public function store(ProjectRequest $request)
    {
        $data = $request->all();
        $result = ProjectRepository::create($data);
        return response()->json($result, 201);
    }

    public function show(int $id)
    {
        $result = ProjectRepository::getById($id);
        return response()->json($result, 200);
    }

    public function update(ProjectRequest $request, int $id)
    {
        $data = $request->all();
        $result = ProjectRepository::update($id, $data);
        return response()->json($result, 200);
    }

    public function destroy(int $id)
    {
        $result = ProjectRepository::delete($id);
        return response()->json($result, 200);
    }
}
