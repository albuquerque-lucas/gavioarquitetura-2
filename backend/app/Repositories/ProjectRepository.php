<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Project;
use App\Models\ServiceResponse;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository implements IReadAndWrite
{
    private ServiceResponse $response;
    public function __construct()
    {
        $this->response = new ServiceResponse();
    }
    public function getAll():ServiceResponse
    {
        $list = Project::all();
        if ($list === null) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Projects not found'
            ]);
        } else {
            $this->response->setAttributes(200, $list);
        }
        return $this->response;
    }

    public function getById(int $id): ServiceResponse
    {
        $project = Project::find($id);
        if ($project === null) {
            $this->response->setAttributes(404, (object)[
                'message' => 'Project not found'
            ]);
        } else {
            $this->response->setAttributes(200,  $project );
        }
        return $this->response;
    }

    public function create(array $data) : object
    {
        return Project::create($data);
    }

    public function update(int $id, array $data) : object
    {
        $project = Project::findOrFail($id);
        $project->update($data);
        return $project;
    }

    public function delete(int $id) : bool
    {
        $project = Project::findOrFail($id);
        return $project->delete();
    }   
}