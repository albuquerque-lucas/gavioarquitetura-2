<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectRepository;
use App\Http\Requests\ProjectRequest;

class ProjectsController extends Controller
{
    private ProjectRepository $repository;

    public function __construct()
    {
        $this->repository = new ProjectRepository();
    }

    public function index()
    {
        $res = $this->repository->getAll();
        return response()->json($res->data(), $res->status());
    }

    public function store(ProjectRequest $request)
    {
        $requestData = $request->all();
        $data = [
            'name' => $requestData['name'],
            'description' => $requestData['description'],
            'area' => $requestData['area'],
            'year' => $requestData['year'],
            'address' => $requestData['address'],
            'image_url' => $request->file('image_url')->store('projects/cover', 'public'),
            'category_id' => $requestData['category_id'],
            'active_carousel' => $requestData['active_carousel'],
        ];
        $res = $this->repository->create($data);
        return response()->json($res->data(), $res->status());
        // return response()->json($data);
    }

    public function show(int $id)
    {
        $res = $this->repository->getById($id);
        return response()->json($res->data(), $res->status());
    }

    public function update(ProjectRequest $request, int $id)
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
}
