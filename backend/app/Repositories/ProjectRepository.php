<?php

namespace App\Repositories;

use App\Models\Project;
use App\Models\ServiceResponse;
use DB;
use Storage;
use App\Models\ProjectImage;
use Exception;

class ProjectRepository
{
    private ServiceResponse $response;

    public function __construct()
    {
        $this->response = new ServiceResponse();
    }

    public function getAll(
        string $order = 'desc',
        bool $hasAttribute = true,
        string $attribute = 'id',
        int $categoryId = null
    ): ServiceResponse {
        try {
            $this->validateParameters($order, $attribute);
    
            $checkedAttribute = $this->normalizeAttribute($attribute);
    
            $query = Project::orderBy($checkedAttribute, $order);
    
            $this->applyCategoryFilter($query, $categoryId);
            $this->applyAttributeFilter($query, $attribute, $hasAttribute);
    
            $list = $query->paginate();
    
            if ($list->isEmpty()) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Projects not found'
                ]);
                return $this->response;
            }
    
            $this->response->setAttributes(200, $list);
            return $this->response;
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while fetching projects',
                'error' => $e->getMessage(),
            ]);
            return $this->response;
        }
    }
    
    private function validateParameters(string $order, string $attribute): void
    {
        $validOrders = ['asc', 'desc'];
        $validFilters = ['id', 'name', 'active_carousel', 'image_url'];
    
        if (!in_array($order, $validOrders) || !in_array($attribute, $validFilters)) {
            throw new Exception("Invalid order ($order) or filter attribute ($attribute) parameters.");
        }
    }
    
    private function normalizeAttribute(string $attribute): string
    {
        return ($attribute === 'active_carousel' || $attribute === 'image_url') ? 'id' : $attribute;
    }
    
    private function applyCategoryFilter($query, $categoryId): void
    {
        if ($categoryId !== null) {
            $query->where('category_id', $categoryId);
        }
    }
    
    private function applyAttributeFilter($query, $attribute, $hasAttribute): void
    {
        if ($attribute === 'active_carousel') {
            $query->where($attribute, $hasAttribute ? 1 : 0);
        }
    
        if ($attribute === 'image_url' && $hasAttribute) {
            $query->where($attribute, '!=', 'projects/cover/no-image.jpg');
        } elseif ($attribute === 'image_url' && !$hasAttribute) {
            $query->where($attribute, '=', 'projects/cover/no-image.jpg');
        }
    }
    
    

    public function getById(int $id): ServiceResponse
    {
        try {
            return DB::transaction(function () use ($id) {
                $project = Project::with('category', 'images')->find($id);
                if (!$project) {
                    $this->response->setAttributes(404, (object)[
                        'message' => 'Project not found'
                    ]);
                    return $this->response;
                }
    
                $this->response->setAttributes(200, $project);
                return $this->response;
            });
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while fetching the project by ID',
                'error' => $e->getMessage(),
            ]);
            return $this->response;
        }
    }
    

    public function getByCategory(int $categoryId, string $order = "desc"): ServiceResponse
    {
        try {
            $validOrders = ['asc', 'desc'];
    
            if (!in_array($order, $validOrders)) {
                $this->response->setAttributes(400, (object)[
                    'message' => 'Invalid order parameter. Use "asc" or "desc".'
                ]);
                return $this->response;
            }
    
            $projects = Project::where('category_id', $categoryId)
                ->orderBy('id', $order)
                ->paginate();
    
            if ($projects->isEmpty()) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Projects not found for the specified category'
                ]);
                return $this->response;
            }
    
            $this->response->setAttributes(200, $projects);
            return $this->response;
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while fetching projects by category',
                'error' => $e->getMessage(),
            ]);
            return $this->response;
        }
    }
    
    

    public function create(array $data): ServiceResponse
    {
        try {
            $project = Project::create($data);
            if (!$project) {
                $this->response->setAttributes(500, (object)[
                    'message' => 'Error creating project'
                ]);
                return $this->response;
            }
            $this->response->setAttributes(201, $project);
            return $this->response;
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while creating the project',
                'error' => $e->getMessage(),
            ]);
            return $this->response;
        }
    }
    
    public function update(int $id, array $data, bool $hasImage = false): ServiceResponse
    {
        try {
            $project = Project::find($id);
    
            if (!$project) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Project not found'
                ]);
                return $this->response;
            }
    
            if ($hasImage && $project->image_url != 'projects/cover/no-image.jpg' && Storage::disk('public')->exists($project->image_url)) {
                Storage::disk('public')->delete($project->image_url);
            }
    
            $project->fill($data);
    
            if ($project->isDirty()) {
                $project->save();
                $this->response->setAttributes(200, $project);
            } else {
                $this->response->setAttributes(200, (object)[
                    'message' => 'No changes to apply',
                    'project' => $project
                ]);
            }
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while updating the project',
                'error' => $e->getMessage(),
            ]);
        }
    
        return $this->response;
    }

    public function delete(int $id): ServiceResponse
    {
        try {
            $project = Project::find($id);
    
            if (!$project) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Project not found',
                    'deleted' => null,
                ]);
                return $this->response;
            }
    
            if ($project->image_url) {
                Storage::disk('public')->delete($project->image_url);
            }
    
            $isDeleted = $project->delete();
    
            if (!$isDeleted) {
                $this->response->setAttributes(500, (object)[
                    'message' => 'Error deleting project',
                ]);
            } else {
                $this->response->setAttributes(200, (object)[
                    'message' => 'Project deleted successfully',
                ]);
            }
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'An error occurred while deleting the project',
                'error' => $e->getMessage(),
            ]);
        }
    
        return $this->response;
    }
    

    public function getImages(int $projectId, string $order = 'desc'): ServiceResponse
    {
        $validOrders = ['asc', 'desc'];
    
        if (!in_array($order, $validOrders)) {
            $this->response->setAttributes(400, (object)[
                'message' => 'Invalid order parameter. Use "asc" or "desc".'
            ]);
            return $this->response;
        }
    
        try {
            $images = ProjectImage::where('project_id', $projectId)
                ->orderBy('id', $order)
                ->get();
    
            if ($images->isEmpty()) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Images not found for the specified project'
                ]);
            } else {
                $this->response->setAttributes(200, $images);
            }
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error retrieving images',
                'error' => $e->getMessage()
            ]);
        }
    
        return $this->response;
    }

    public function deleteImage($imageId): ServiceResponse
    {
        $imageArray = [
            "images/imagem_projeto90_1.jpg",
            "images/imagem_projeto90_2.jpg",
            "images/imagem_projeto90_3.jpg",
            "images/imagem_projeto90_4.jpg",
            "images/imagem_projeto90_5.jpg",
            "images/imagem_projeto90_6.jpg",
            "images/imagem_projeto90_7.jpg"
        ];
        try {
            $image = ProjectImage::find($imageId);
    
            if (!$image) {
                $this->response->setAttributes(404, (object)[
                    'message' => 'Image not found'
                ]);
                return $this->response;
            }

            if (in_array($image->image_path, $imageArray)) {
                Storage::disk('public')->delete($image->image_path);

            }
    
            $image->delete();
    
            $this->response->setAttributes(200, (object)[
                'message' => 'Image deleted successfully'
            ]);
        } catch (Exception $e) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error deleting image',
                'error' => $e->getMessage()
            ]);
        }
    
        return $this->response;
    }

    public function deleteMultipleImages(array $imageIds): ServiceResponse
{
    try {
        return DB::transaction(function () use ($imageIds) {
            $imageArray = [
                "images/imagem_projeto90_1.jpg",
                "images/imagem_projeto90_2.jpg",
                "images/imagem_projeto90_3.jpg",
                "images/imagem_projeto90_4.jpg",
                "images/imagem_projeto90_5.jpg",
                "images/imagem_projeto90_6.jpg",
                "images/imagem_projeto90_7.jpg"
            ];

            foreach ($imageIds as $imageId) {
                $image = ProjectImage::find($imageId);

                if (!$image) {
                    $this->response->setAttributes(404, (object)[
                        'message' => "Image with ID $imageId not found."
                    ]);
                    return $this->response;
                }

                if (in_array($image->image_path, $imageArray)) {
                    Storage::disk('public')->delete($image->image_path);
                }

                $image->delete();
            }

            $this->response->setAttributes(200, (object)[
                'message' => 'Images deleted successfully'
            ]);
            return $this->response;
        });
    } catch (Exception $e) {
        $this->response->setAttributes(500, (object)[
            'message' => 'An error occurred while deleting images',
            'error' => $e->getMessage()
        ]);
        return $this->response;
    }
}
    
}
