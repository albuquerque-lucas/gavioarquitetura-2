<?php

namespace App\Repositories;

use App\Interfaces\IReadAndWrite;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository implements IReadAndWrite
{
    public static function getAll(): Collection
    {
        return Project::all();
    }

    public static function getById(int $id): object
    {
        return Project::findOrFail($id);
    }

    public static function create(array $data) : object
    {
        return Project::create($data);
    }

    public static function update(int $id, array $data) : object
    {
        $project = Project::findOrFail($id);
        $project->update($data);
        return $project;
    }

    public static function delete(int $id) : bool
    {
        $project = Project::findOrFail($id);
        return $project->delete();
    }   
}