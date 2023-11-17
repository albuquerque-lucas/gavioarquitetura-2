<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Project;
use App\Models\ServiceResponse;
use DB;
use Storage;

class ProjectRepository implements IReadAndWrite
{
    private ServiceResponse $response;

    public function __construct()
    {
        $this->response = new ServiceResponse();
    }

    public function getAll(): ServiceResponse
    {
        $list = Project::paginate();
        if ($list->isEmpty()) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Projects not found'
            ]);
            return $this->response;
        }

        $this->response->setAttributes(200, $list);
        return $this->response;
    }

    public function getById(int $id): ServiceResponse
    {
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
    }

    public function create(array $data): ServiceResponse
    {
        $project = Project::create($data);
        if (!$project) {
            $this->response->setAttributes(500, (object)[
                'message' => 'Error creating project'
            ]);
            return $this->response;
        }
        $this->response->setAttributes(201, $project);
        return $this->response;
    }

    public function update(int $id, array $data): ServiceResponse
    {
        $project = Project::find($id);
        
        if (!$project) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Project not found'
            ]);
            return $this->response;
        }
        
        if ($project->image_url && Storage::disk('public')->exists($project->image_url)) {
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
    
        return $this->response;
    }

    public function delete(int $id): ServiceResponse
    {
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
                'deleted' => $isDeleted,
            ]);
        } else {
            $this->response->setAttributes(200, (object)[
                'message' => 'Project deleted successfully',
                'deleted' => $isDeleted,
            ]);
        }

        return $this->response;
    }
}
