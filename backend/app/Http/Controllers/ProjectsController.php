<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectRepository;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    private ProjectRepository $repository;

    public function __construct()
    {
        $this->repository = new ProjectRepository();
    }

    public function index(Request $request)
    {
        $order = $request->input('order', 'desc');
        $hasAttribute = filter_var($request->input('hasAttribute', true), FILTER_VALIDATE_BOOLEAN);
        $attribute = $request->input('attribute', 'id');
        $categoryId = $request->input('categoryId', null);

        $res = $this->repository->getAll($order, $hasAttribute, $attribute, $categoryId);
        return response()->json($res->data(), $res->status());
    }

    public function store(ProjectRequest $request)
    {
        $requestData = $request->all();
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('projects/cover', 'public');
        } else {
            $imagePath = null;
        }
        $data = [
            'name' => $requestData['name'],
            'description' => $requestData['description'],
            'area' => $requestData['area'],
            'year' => $requestData['year'],
            'address' => $requestData['address'],
            'image_url' => $imagePath,
            'category_id' => $requestData['category_id'],
            'active_carousel' => $requestData['active_carousel'],
        ];
        $res = $this->repository->create($data);
        return response()->json($res->data(), $res->status());
    }

    public function show(int $id)
    {
        $res = $this->repository->getById($id);
        return response()->json($res->data(), $res->status());
    }

    public function update(Request $request, int $id)
    {
        $data = $request->all();
        $hasImage = false;
    
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('projects/cover', 'public');
            $data['image_url'] = $imagePath;
            $hasImage = true;
        }

        if (array_key_exists('category_id', $data) && $data['category_id'] === '0') {
            $data['category_id'] = 1;
        }
    
        $res = $this->repository->update($id, $data, $hasImage);
    
        return response()->json($res->data(), $res->status());
    }

    public function destroy(int $id)
    {
        $res = $this->repository->delete($id);
        return response()->json($res->data(), $res->status());
    }

    public function getByCategory(int $categoryId)
    {
        $res = $this->repository->getByCategory($categoryId);
        return response()->json($res->data(), $res->status());
    }

    public function getImages(int $projectId, Request $request)
    {
        $order = $request->input('order', 'desc');
        $res = $this->repository->getImages($projectId, $order);
        return response()->json($res->data(), $res->status());
    }

    public function deleteImage(int $imageId)
    {
        $res = $this->repository->deleteImage($imageId);
        return response()->json($res->data(), $res->status());
    }
}
